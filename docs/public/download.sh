#!/bin/bash
#
# ROS2 Ubuntu 自动化安装脚本 (download.sh)
# ============================================================
# 权威中文社区调研来源（2025）：
#   1. 古月居 ROS2 安装方法（最系统中文教程 + VM 指导）
#      https://book.guyuehome.com/ROS2/1.系统架构/1.3_ROS2安装方法/
#   2. 清华大学 TUNA 镜像站官方帮助（国内最快最权威源）
#      https://mirrors.tuna.tsinghua.edu.cn/help/ros2/
#      https://mirrors.tuna.tsinghua.edu.cn/help/rosdistro/
#   3. 鱼香ROS 一键安装（中文社区使用最广，强烈推荐新手了解）
#      https://github.com/fishros/install
#      http://fishros.com/install
#
# 设计目标：
#   - 全自动、非交互（适合脚本/CI/批量部署）
#   - 国内网络优化（TUNA 镜像 + rosdistro 索引）
#   - 幂等安全（可重复执行不破坏环境）
#   - 清晰中文日志 + 彩色输出 + 详细排错提示
#
# 支持版本（自动检测）：
#   Ubuntu 22.04 (jammy)  → ROS 2 Humble  (LTS，最稳定，教程最多)
#   Ubuntu 24.04 (noble)  → ROS 2 Jazzy   (当前 LTS)
#
# 用法示例：
#   bash download.sh
#   bash download.sh --rosdistro humble --type desktop
#   bash download.sh --dry-run
#   bash download.sh --help
#
# 推荐存放位置（见 download.md）：
#   mkdir -p ~/ros2_install && cp download.sh ~/ros2_install/
#
# 磁盘要求（重要！）：
#   最小 20GB 可用空间（仅安装）
#   推荐 50GB+（开发 + colcon build + Gazebo）
#   虚拟机建议虚拟硬盘 60GB+（动态分配）
#
# ============================================================

set -euo pipefail

# --------------------------- 颜色与日志 ---------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log()   { echo -e "${GREEN}[INFO]${NC}  $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()   { echo -e "${RED}[ERROR]${NC} $1" >&2; exit 1; }
step()  { echo -e "\n${BLUE}=== $1 ===${NC}"; }

# --------------------------- 全局变量 ---------------------------
ROS_DISTRO=""
INSTALL_TYPE="desktop"   # desktop | base
DRY_RUN=false
LOG_FILE="${HOME}/ros2_install/install.log"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --------------------------- 用法帮助 ---------------------------
usage() {
    cat << EOF
ROS2 Ubuntu 自动化安装脚本

用法:
    $(basename "$0") [选项]

选项:
    -d, --rosdistro <humble|jazzy>   指定 ROS2 发行版（默认自动检测）
    -t, --type <desktop|base>        安装类型（默认 desktop，推荐）
    -n, --dry-run                    仅打印将执行的命令，不实际安装
    -h, --help                       显示此帮助

示例:
    $(basename "$0")                              # 自动检测 + desktop
    $(basename "$0") -d humble -t desktop         # 明确 Humble Desktop
    $(basename "$0") --dry-run                    # 预览所有命令
    sudo $(basename "$0")                         # 错误：不要用 root 运行

推荐 Ubuntu 版本:
    22.04 LTS  → Humble（最推荐新手/稳定）
    24.04 LTS  → Jazzy（最新 LTS）

磁盘空间要求（严格考证后更新）:
    仅安装：20 GB 可用
    真实开发：根分区建议 80-100GB+，或采用「核心在系统盘 + 工作空间外置」方案
    50GB 仅剩时：强烈建议 --type base + 工作空间放到第二块盘
    详见 download.md「系统盘仅剩 50GB 怎么办？」完整章节（含多来源证据）

更多说明请查看同目录下的 download.md
EOF
    exit 0
}

# --------------------------- 参数解析 ---------------------------
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -d|--rosdistro)
                ROS_DISTRO="$2"
                shift 2
                ;;
            -t|--type)
                INSTALL_TYPE="$2"
                shift 2
                ;;
            -n|--dry-run)
                DRY_RUN=true
                shift
                ;;
            -h|--help)
                usage
                ;;
            *)
                err "未知参数: $1 （使用 --help 查看用法）"
                ;;
        esac
    done

    # 校验 type
    if [[ "$INSTALL_TYPE" != "desktop" && "$INSTALL_TYPE" != "base" ]]; then
        err "无效的 --type 值: $INSTALL_TYPE （只能是 desktop 或 base）"
    fi
}

# --------------------------- 执行包装（支持 dry-run） ---------------------------
run_cmd() {
    if $DRY_RUN; then
        echo -e "${YELLOW}[DRY-RUN]${NC} $*"
    else
        "$@"
    fi
}

run_cmd_sudo() {
    if $DRY_RUN; then
        echo -e "${YELLOW}[DRY-RUN]${NC} sudo $*"
    else
        sudo "$@"
    fi
}

# --------------------------- 检测 Ubuntu 版本与 ROS2 映射 ---------------------------
detect_ros_distro() {
    if [[ -n "$ROS_DISTRO" ]]; then
        log "使用用户指定的 ROS2 版本: $ROS_DISTRO"
        return
    fi

    if [[ ! -f /etc/os-release ]]; then
        err "无法检测系统版本（/etc/os-release 不存在）"
    fi

    # shellcheck disable=SC1091
    source /etc/os-release
    local codename="${UBUNTU_CODENAME:-$VERSION_CODENAME}"

    case "$codename" in
        jammy)
            ROS_DISTRO="humble"
            log "检测到 Ubuntu 22.04 (jammy) → 自动选择 ROS 2 Humble (LTS)"
            ;;
        noble)
            ROS_DISTRO="jazzy"
            log "检测到 Ubuntu 24.04 (noble) → 自动选择 ROS 2 Jazzy (LTS)"
            ;;
        *)
            warn "未识别的 Ubuntu 版本: $codename"
            warn "请使用 --rosdistro humble 或 jazzy 显式指定"
            ROS_DISTRO="jazzy"
            ;;
    esac
}

# --------------------------- 前置检查 ---------------------------
preflight_checks() {
    step "前置检查"

    if [[ $EUID -eq 0 ]]; then
        err "检测到你正在使用 root/sudo 运行脚本！\n请用普通用户执行（脚本内部会使用 sudo）。"
    fi

    if ! command -v sudo >/dev/null 2>&1; then
        err "未找到 sudo 命令，请先安装 sudo 并将当前用户加入 sudo 组。"
    fi

    # 创建日志目录
    mkdir -p "$(dirname "$LOG_FILE")"
    touch "$LOG_FILE"
    log "日志文件: $LOG_FILE"

    # 检查是否已安装
    if command -v ros2 >/dev/null 2>&1; then
        local installed_version
        installed_version=$(ros2 --version 2>/dev/null || echo "未知版本")
        warn "检测到系统已安装 ROS2: $installed_version"
        warn "脚本将跳过安装步骤，仅确保环境变量和 rosdep 配置正确。"
        echo "ROS2_ALREADY_INSTALLED=true" >> "$LOG_FILE"
    else
        echo "ROS2_ALREADY_INSTALLED=false" >> "$LOG_FILE"
    fi

    # 磁盘空间提示（严格考证后加强）
    local avail_kb
    avail_kb=$(df --output=avail / | tail -1)
    local avail_gb=$((avail_kb / 1024 / 1024))
    if (( avail_gb < 20 )); then
        warn "根分区可用空间仅剩 ${avail_gb}GB（严重不足）！"
        warn "ROS2 desktop 本身就要 2.5-4GB，colcon build 很容易爆盘。"
        warn "强烈建议：1) 使用 --type base 最小化安装；2) 把所有 ros2_ws 建在其它大容量盘上。"
        warn "详细方案请阅读配套 download.md 中的「系统盘仅剩 50GB 怎么办？」章节。"
    elif (( avail_gb < 25 )); then
        warn "根分区可用空间仅剩 ${avail_gb}GB（非常紧张）。"
        warn "建议使用 --type base，并把工作空间放到第二块磁盘/分区。"
        warn "详见 download.md「系统盘仅剩 50GB 怎么办？」完整方案（含严格考证）。"
    else
        log "根分区可用空间: ${avail_gb}GB"
    fi

    # ParaView 5.x 与 ROS2 desktop 所需的 python3-vtk9 互斥
    if [[ "$INSTALL_TYPE" == "desktop" ]] && dpkg -l python3-paraview 2>/dev/null | grep -q "^ii"; then
        local pv_ver
        pv_ver=$(dpkg-query -W -f='${Version}' python3-paraview 2>/dev/null)
        err "检测到 python3-paraview (${pv_ver}) 与 ROS2 desktop 所需的 python3-vtk9 冲突。\n\
Ubuntu 24.04 官方源仅提供 ParaView 5.x（仍冲突）；ParaView 6.0 需等 Ubuntu 26.04 或改用独立二进制/conda。\n\
可选方案：\n\
  1) sudo apt remove paraview python3-paraview paraview-doc && bash download.sh  # 卸载后装 desktop（推荐）\n\
  2) bash download.sh --type base          # 保留 ParaView，最小安装 ROS2\n\
  3) 等待 ParaView 6.0 官方 apt 包后再 apt install paraview\n\
详见 download.md「问题 6：ParaView 与 RViz 冲突」"
    fi
}

# --------------------------- 核心安装流程 ---------------------------
install_ros2() {
    if grep -q "ROS2_ALREADY_INSTALLED=true" "$LOG_FILE" 2>/dev/null; then
        step "ROS2 已存在，跳过安装，仅修复环境"
        return 0
    fi

    step "1/5 设置系统 Locale（古月居推荐第一步，防止中文系统报错）"
    run_cmd_sudo apt update -qq
    run_cmd_sudo apt install -y locales
    run_cmd_sudo locale-gen en_US en_US.UTF-8
    run_cmd_sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
    export LANG=en_US.UTF-8
    log "Locale 已设置为 en_US.UTF-8"

    step "2/5 安装前置工具并添加 ROS2 GPG 密钥（TUNA 现代推荐写法）"
    run_cmd_sudo apt install -y curl gnupg2 lsb-release
    if $DRY_RUN; then
        echo -e "${YELLOW}[DRY-RUN]${NC} curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key | sudo gpg --dearmor -o /usr/share/keyrings/ros-archive-keyring.gpg"
    else
        curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key | \
            sudo gpg --dearmor -o /usr/share/keyrings/ros-archive-keyring.gpg
    fi
    log "GPG 密钥已写入 /usr/share/keyrings/ros-archive-keyring.gpg"

    step "3/5 添加清华大学 TUNA ROS2 镜像源（国内速度最快）"
    # shellcheck disable=SC1091
    source /etc/os-release
    local codename="${UBUNTU_CODENAME:-$VERSION_CODENAME}"
    local repo_url="https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu"

    local arch
    arch=$(dpkg --print-architecture)
    if $DRY_RUN; then
        echo -e "${YELLOW}[DRY-RUN]${NC} echo 'deb [arch=${arch} signed-by=...] ${repo_url} ${codename} main' | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null"
    else
        echo "deb [arch=${arch} signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] ${repo_url} ${codename} main" | \
            sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
    fi
    log "已写入 TUNA 源: ${repo_url} ${codename}"

    step "4/5 更新 apt 并安装 ROS2 ${ROS_DISTRO} (${INSTALL_TYPE}) + 开发工具"
    run_cmd_sudo apt update -qq
    run_cmd_sudo apt install -y \
        "ros-${ROS_DISTRO}-${INSTALL_TYPE}" \
        python3-colcon-common-extensions \
        ros-dev-tools

    log "ROS2 ${ROS_DISTRO} ${INSTALL_TYPE} 安装完成"

    step "5/5 配置 rosdep（使用 TUNA rosdistro 索引，解决最大痛点）"
    run_cmd_sudo apt install -y python3-rosdep

    if [[ ! -f /etc/ros/rosdep/sources.list.d/20-default.list ]]; then
        run_cmd_sudo rosdep init || true
        log "rosdep init 完成"
    else
        log "rosdep 源已存在，跳过 init"
    fi

    # 关键：设置 TUNA 索引并更新
    export ROSDISTRO_INDEX_URL="https://mirrors.tuna.tsinghua.edu.cn/rosdistro/index-v4.yaml"
    run_cmd rosdep update
    log "rosdep update 完成（使用 TUNA 镜像）"

    echo "ROS2_INSTALLED_SUCCESSFULLY=true" >> "$LOG_FILE"
}

# --------------------------- 配置环境变量（幂等） ---------------------------
setup_environment() {
    step "配置用户环境变量（幂等追加到 ~/.bashrc）"

    local bashrc="$HOME/.bashrc"
    local source_line="source /opt/ros/${ROS_DISTRO}/setup.bash"
    local index_line='export ROSDISTRO_INDEX_URL=https://mirrors.tuna.tsinghua.edu.cn/rosdistro/index-v4.yaml'

    # 确保 .bashrc 存在
    touch "$bashrc"

    if ! grep -qF "$source_line" "$bashrc"; then
        echo "" >> "$bashrc"
        echo "# >>> ROS2 ${ROS_DISTRO} (added by download.sh) >>>" >> "$bashrc"
        echo "$source_line" >> "$bashrc"
        echo "$index_line" >> "$bashrc"
        echo "# <<< ROS2 ${ROS_DISTRO} <<<" >> "$bashrc"
        log "已追加 ROS2 source 行到 ~/.bashrc"
    else
        log "ROS2 source 行已存在于 ~/.bashrc，跳过"
    fi

    # 当前 shell 立即生效（便于后续验证）
    # shellcheck disable=SC1090
    if ! $DRY_RUN && [[ -f "/opt/ros/${ROS_DISTRO}/setup.bash" ]]; then
        source "/opt/ros/${ROS_DISTRO}/setup.bash"
        log "当前 shell 已 source ROS2 环境"
    fi
}

# --------------------------- 安装后验证 ---------------------------
post_install_verify() {
    step "安装后验证"

    if $DRY_RUN; then
        log "[DRY-RUN] 跳过真实验证"
        return 0
    fi

    if ! command -v ros2 >/dev/null 2>&1; then
        err "ros2 命令未找到！安装可能失败，请检查日志: $LOG_FILE"
    fi

    local version
    version=$(ros2 --version 2>/dev/null || echo "无法获取版本")
    log "ROS2 版本: $version"

    # 简单 rosdep 检查
    if rosdep --version >/dev/null 2>&1; then
        log "rosdep 可用"
    fi

    log "基础验证通过！"
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ROS2 安装成功！下一步操作：${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "1. 打开新终端（或执行）： source ~/.bashrc"
    echo ""
    echo "2. 验证通信（开两个终端）："
    echo "   终端A: ros2 run demo_nodes_cpp talker"
    echo "   终端B: ros2 run demo_nodes_py listener"
    echo ""
    echo "3. 小海龟仿真测试："
    echo "   终端A: ros2 run turtlesim turtlesim_node"
    echo "   终端B: ros2 run turtlesim turtle_teleop_key"
    echo ""
    echo "4. 推荐后续学习资源（见 download.md）："
    echo "   - 古月居电子书"
    echo "   - 鱼香ROS 《动手学ROS2》"
    echo ""
    echo "5. 【重要 - 磁盘紧张用户必看】"
    echo "   如果系统盘剩余空间 < 25GB，强烈建议把所有工作空间建在其它大容量盘上！"
    echo "   详细方案 + 精确命令见配套 download.md 中的「系统盘仅剩 50GB 怎么办？」章节。"
    echo ""
    echo -e "${YELLOW}日志位置: $LOG_FILE${NC}"
    echo ""
}

# --------------------------- 主流程 ---------------------------
main() {
    parse_args "$@"

    echo -e "${BLUE}"
    echo "=================================================="
    echo "  ROS2 Ubuntu 自动化安装脚本"
    echo "  基于古月居 + TUNA + 鱼香ROS 社区最佳实践"
    echo "=================================================="
    echo -e "${NC}"

    if $DRY_RUN; then
        warn "当前为 DRY-RUN 模式，不会执行任何实际安装命令"
    fi

    detect_ros_distro
    preflight_checks
    install_ros2
    setup_environment
    post_install_verify

    log "脚本执行完毕。"
    if ! $DRY_RUN; then
        log "请在**新终端**中验证安装结果。"
    fi
}

main "$@"
