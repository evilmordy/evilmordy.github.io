---
date: '2026-08-27'
---

# Linux 下 VS Code 在 NTFS 上「正在写入文件」永远不结束

---

在 Data 盘写 PostgreSQL 教程，保存 `temp.sql` 一直转圈。关窗口提示文件还没存完。顺带弹出「Code 安装似乎损坏」和「扩展在磁盘上已被修改，请重新加载」。有时候 WebView 花掉，有时候整窗卡死。

第一反应会怪 VS Code 装坏了、去重装，或者怪壁纸扩展 `shalldie.background`。壁纸扩展确实改了安装文件，那两条「损坏 / 请重新加载」是它干的。但**解释不了保存卡住**：同样开着它，同盘上的 Python / React / Node 从来没这样过。

C++ 项目以前也这样。整份挪到 Ciallo（ext4）立刻好(我就是喜欢取这种名字嘛q_q)，扩展一个没删除。这次 SQL 走同一条路：拷到 `/media/songyuchao/Ciallo/plan`，Data 上的原目录删掉。

---

## 两个弹窗：安装损坏 和 “永远的”正在写入

**壁纸扩展**会改 `/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html`。VS Code 启动一校验 checksum，就报安装损坏；扩展每次激活再写一遍，又报「扩展已被修改，请重新加载」。重装 Code 没用，一开壁纸又被改回去。这条线和保存无关，所有项目都会弹，只是吵。

**永远写入**是另一条线。VS Code 保存不是原地覆盖，而是先写成临时文件，再 `rename()` 成真正的 `xxx.cpp` / `temp.sql`。两种文件系统对「文件还被别人开着」态度完全不同：

| | ext4（POSIX） | NTFS / ntfs3（近似 Windows） |
|---|---|---|
| 文件正被打开时 rename | 立刻成功 | 不能替换仍有打开句柄的文件，`rename` 会一直等 |
| 状态栏 | 瞬间完成 | 永远停在「正在保存 / 正在写入文件」 |

关掉窗口时日志是：

```text
onWillShutdown is taking a long time, pending operations: join.textFiles
onBeforeShutdown is taking a long time, pending operations: veto.backups
```

保存和热退出备份的 Promise 不回来，窗口就关不掉。磁盘本身没坏：在 Data 上用脚本模拟同样的写+fsync+rename，毫秒级完成。卡住的是 VS Code 的保存流水线在等一个永不返回的 `rename` / 保存钩子。

---

## 为什么偏偏是 C++ 和 SQL

不是 NTFS 上所有保存都会坏。Pylance、TS Server 吃的是编辑器内存里的 buffer，一般不会为了补全去占着 `.py` / `.tsx` 的磁盘句柄。所以同在 Data 上的 `pythonProject`、`ReactLearning`、`person-web` 感觉不到。

C/C++ 扩展带的是本地进程 `cpptools` / `cpptools-srv`。为了补全和跳转，它们会直接 `open` 源文件和一堆头文件。自动保存一触发：VS Code 要 rename 掉这个 `.cpp`，IntelliSense 还握着它，ntfs3 按 Windows 共享语义卡住。`files.autoSave: afterDelay` 过一秒再试，`overwriteFileOnDisk` 还不许放弃，就是死锁。挪到 ext4 之后，POSIX 允许「文件开着也能改名」，所以扩展不用卸。

SQL 换了个卡你的对象。打开 `.sql` 会启动 DBCode 的 language server，把文件映射到 PostgreSQL 连接，保存路径上挂着 `onWillSave` / `onDidSave`。状态栏那句「正在保存 temp.sql」要等这些钩子返回才会消失。钩子在 NTFS 上读文件、写映射、等 schema，UI 和 C++ 那次一模一样。

| 在编什么 | 真正碰磁盘文件的家伙 | 在 NTFS 上保存 |
|---|---|---|
| `.cpp` / `.h` | `cpptools` / `cpptools-srv`（原生） | 容易永远写入 |
| `.sql` | DBCode language server | 容易永远写入 |
| `.py` / `.ts` / `.tsx` / `.js` | Pylance / TS Server（内存 buffer） | 通常正常 |
| `.md` | 编辑器自己 | 通常正常 |

8 月 18 号卡死的 `camera_node.cpp` 也是这个坑，当时在 `~/vscode-save-recovery/` 里捡过文件。

---

## 处理

正在编辑、会唤醒 C++ IntelliSense 或 SQL 客户端的工作区，不要放在 `/media/songyuchao/Data`（ntfs3）上。资料可以存在 Data，源码放到 Ciallo 或家目录（ext4）。

已经摊上了的话：

```bash
# 完全退出 VS Code，别只关窗口
killall -9 code

# 工作区拷到 ext4 再打开
cp -a /media/songyuchao/Data/web-coding/plan /media/songyuchao/Ciallo/plan
code /media/songyuchao/Ciallo/plan
```

暂时还要在 NTFS 上改 SQL，至少关掉延迟自动保存，并在这个工作区禁用 DBCode。全局卸壁纸扩展解决不了写入卡住，只是少两句报错。

不要先去重装 VS Code。重装既修不好 rename 死锁，壁纸一开还是会把 `workbench.html` 改脏。
