"一图胜千言，可视化让数据栩栩如生。"

## 关键函数一览

| 类别 | 函数 | 用途 | 重要性 |
|------|------|------|--------|
| 基础设置 | `plt.figure()` | 创建画布 | 核心 |
| | `plt.title()` | 设置标题 | 核心 |
| | `plt.xlabel()`, `plt.ylabel()` | 设置轴标签 | 核心 |
| 基础绘图 | `plt.plot()` | 绘制线图 | 核心 |
| | `plt.scatter()` | 绘制散点图 | 重要 |
| | `plt.bar()` | 绘制柱状图 | 重要 |
| 图例和标签 | `plt.legend()` | 添加图例 | 核心 |
| | `plt.text()` | 添加文本标注 | 常用 |
| 子图 | `plt.subplot()` | 创建子图 | 重要 |
| 显示和保存 | `plt.show()` | 显示图表 | 核心 |
| | `plt.savefig()` | 保存图表 | 重要 |

# 基础配置

## 环境设置

```python
import matplotlib.pyplot as plt
import numpy as np  # 配合 numpy 使用

# [重要] 中文显示设置
plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体
plt.rcParams['axes.unicode_minus'] = False  # 正确显示负号
```

# 基础绘图（核心部分）

## 一、折线图

调用格式：

```text
plot(x, y, linestyle, linewidth, color, marker, markersize, markeredgecolor, markerfacecolor, markeredgewidth, label, alpha)
```

### 1. x, y（必需）

含义：数据点的横坐标和纵坐标值。通常是列表、元组或数组。

示例：`x = [1, 2, 3, 4]`，`y = [1, 4, 2, 3]`

### 2. linestyle 或 ls（可选）

含义：线条的样式。

常用值：

- `'-'` 或 `'solid'`：实线（默认）
- `'--'` 或 `'dashed'`：虚线
- `'-.'` 或 `'dashdot'`：点划线
- `':'` 或 `'dotted'`：点线
- `'None'` 或 `' '`：不画线（只显示标记点）

### 3. linewidth 或 lw（可选）

含义：线条的宽度，以点为单位。

常用值：一个浮点数，如 `1.5`、`2.0`、`3`

### 4. color 或 c（可选）

含义：控制线条和标记点的整体颜色（如果未单独指定标记颜色）。

常用值：

- 颜色名称字符串：如 `'red'`、`'blue'`、`'green'`、`'black'`
- 简写颜色字符：如 `'r'`（红）、`'g'`（绿）、`'b'`（蓝）、`'k'`（黑）、`'c'`（青）、`'m'`（品红）、`'y'`（黄）
- RGB 或 RGBA 元组：如 `(0.8, 0.2, 0.5)`，`(1, 0.5, 0, 0.8)`
- 十六进制字符串：如 `'#FF00FF'`

### 5. marker（可选）

含义：数据点的标记形状。

常用值：

- `'.'`：点
- `','`：像素点（极小）
- `'o'`：圆圈
- `'v'`：倒三角形
- `'^'`：正三角形
- `'<'`：左三角形
- `'>'`：右三角形
- `'s'`：正方形
- `'*'`：星形
- `'+'`：加号
- `'x'`：叉号
- `'D'`：菱形
- `'None'` 或 `' '`：不显示标记

### 6. markersize 或 ms（可选）

含义：标记的大小。

常用值：一个浮点数，如 `5`、`8`、`10`

### 7. markeredgecolor 或 mec（可选）

含义：标记的边缘颜色。

常用值：与 color 参数相同。如果未指定，通常默认为 color 的值。

### 8. markerfacecolor 或 mfc（可选）

含义：标记的填充颜色。

常用值：与 color 参数相同。如果未指定，通常默认为 color 的值。可以设置为 `'none'` 来表示空心标记。

### 9. markeredgewidth 或 mew（可选）

含义：标记边缘的宽度。

常用值：一个浮点数，如 `1.0`、`1.5`

### 10. label（可选）

含义：用于图例的标签文本。设置后，需要在之后调用 `plt.legend()` 来显示图例。

示例：`label='销售数据'`

### 11. alpha（可选）

含义：透明度，范围从 0.0（完全透明）到 1.0（完全不透明）。

常用值：`0.3`、`0.5`、`0.8`

```python
# 基本线图示例
x = [1, 2, 3, 4, 5]    # 简单的数据点
y = [2, 4, 6, 8, 10]   # 线性关系数据

plt.figure(figsize=(8, 6))    # 设置图表大小
plt.plot(x, y, color='r', linestyle='-', label='示例直线')    # 'r-' 表示红色实线

# [重要] 图表元素添加
plt.title('基础线形图')    # 标题
plt.xlabel('电流/A')    # x 轴标签
plt.ylabel('电压/V')    # y 轴标签
plt.legend()    # 显示 label

plt.show()    # 显示图表

# [技巧] 在同一个图表中画多条线
plt.figure(figsize=(8, 6))
plt.plot(x, y, color='r', linestyle='-', label='直线')
plt.plot(x, [1, 3, 5, 7, 9], 'b--', label='虚线')    # 'b--' 表示蓝色虚线
plt.legend()
plt.title('多线图示例')
plt.show()
```

## 二、散点图（用于数据分布展示）

```python
# 创建简单的数据点
x = [1, 2, 3, 4, 5]
y = [2, 5, 3, 8, 6]

# [基础] 绘制散点图
plt.figure(figsize=(8, 6))
plt.scatter(
    x, y,
    s=100,       # 点的大小
    c='blue',    # 点的颜色
    alpha=0.6,   # 透明度
    label='数据点',  # 图例标签
)

# [重要] 添加标题和标签
plt.title('散点图示例')
plt.xlabel('X 轴')
plt.ylabel('Y 轴')
plt.legend()
plt.grid(True)  # 添加网格线
plt.show()
```

## 三、柱状图（数据对比）

```python
# 简单示例：展示学科成绩
subjects = ['语文', '数学', '英语', '物理', '化学']
scores = [85, 92, 78, 88, 95]

# 创建柱状图
plt.figure(figsize=(10, 6))
plt.bar(
    subjects, scores,
    width=0.6,       # 柱子宽度
    color='skyblue', # 颜色
    alpha=0.8,       # 透明度
)

# 重点：添加数值标签
for i, score in enumerate(scores):
    plt.text(i, score + 1, str(score), ha='center')  # 水平居中对齐

plt.title('各科成绩对比')
plt.ylabel('分数')
plt.ylim(0, 100)  # 设置 y 轴范围
plt.show()
```

## 四、子图

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 8))  # 创建 2 行 2 列的子图
x = [1, 2, 3, 4]
y = [1, 4, 9, 16]

# 第一个子图：线图
axes[0, 0].plot(x, y, 'r-')
axes[0, 0].set_title('线图')

# 第二个子图：散点图
axes[0, 1].scatter(x, y)
axes[0, 1].set_title('散点图')

# 第三个子图：柱状图
axes[1, 0].bar(x, y)
axes[1, 0].set_title('柱状图')

# 第四个子图：填充图
axes[1, 1].fill_between(x, y, alpha=0.3)
axes[1, 1].set_title('填充图')

plt.tight_layout()  # 自动调整子图布局
plt.show()
```

# 样式设置（基础美化）

## 常用线条样式表

| 符号 | 含义 | 示例 |
|------|------|------|
| `'r-'` | 红色实线 | `plt.plot(x, y, 'r-')` |
| `'b--'` | 蓝色虚线 | `plt.plot(x, y, 'b--')` |
| `'g:'` | 绿色点线 | `plt.plot(x, y, 'g:')` |
| `'k.'` | 黑色点图 | `plt.plot(x, y, 'k.')` |

```python
# 线条样式示例
x = [1, 2, 3, 4, 5]
plt.figure(figsize=(10, 6))

plt.plot(x, [i**2 for i in x], 'r-', label='红色实线')
plt.plot(x, [i*2 for i in x], 'b--', label='蓝色虚线')
plt.plot(x, [i+2 for i in x], 'g:', label='绿色点线')

plt.legend()
plt.title('不同线条样式示例')
plt.show()
```

# 一、图表保存

```python
# 保存图表为图片
plt.savefig(
    '图表.png',
    dpi=300,              # 分辨率
    bbox_inches='tight',  # 自动调整边界
)
```

但是注意，保存图片的代码必须放在 `plt.show()` 前面，因为 `plt.show()` 执行完后会清除画布。

# 二、常用设置

```python
# 坐标轴范围
plt.xlim([0, 10])    # 设置 x 轴范围
plt.ylim([0, 100])   # 设置 y 轴范围

# 坐标轴刻度
plt.xticks([0, 2, 4, 6, 8, 10])
plt.yticks([0, 25, 50, 75, 100])

# 图例位置
plt.legend(loc='best')  # 自动选择最佳位置
```

# 初学者常见问题

1. **中文显示乱码**
   - ✅ 解决：设置中文字体

```python
plt.rcParams['font.sans-serif'] = ['SimHei']
```

2. **图表不显示**
   - ✅ 解决：确保调用了 `plt.show()`

3. **子图重叠**
   - ✅ 解决：使用 `plt.tight_layout()`
