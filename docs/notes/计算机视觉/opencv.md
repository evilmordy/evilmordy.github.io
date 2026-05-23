# 常见颜色空间

## 1. BGR（OpenCV 默认）

- Blue, Green, Red 通道
- 每个通道 0–255
- 适合计算机处理

## 2. RGB（更常见）

- Red, Green, Blue 通道
- 需要从 BGR 转换

```python
rgb_img = cv.cvtColor(bgr_img, cv.COLOR_BGR2RGB)
```

## 3. 灰度图（单通道）

- 0–255 灰度值
- 用于许多图像处理算法

```python
gray_img = cv.cvtColor(bgr_img, cv.COLOR_BGR2GRAY)
```

## 4. HSV（色调、饱和度、明度）

- 更符合人眼感知
- 适合颜色分割

```python
hsv_img = cv.cvtColor(bgr_img, cv.COLOR_BGR2HSV)
```

# 创建、显示、保存图像和简单操作

之前我们了解到，二维的 Numpy 数组可以表示二维图像，三维的可以表示彩色图像。OpenCV 也正是利用这一点，其中 Numpy 数组里元素的类型为 `uint8`，只需指定数组的 `dtype` 为 `np.uint8` 即可。

```python
import cv2 as cv
import numpy as np

# 创建一个纯黑色的画布
canvas = np.zeros((300, 300, 3), dtype=np.uint8)  # (0, 0, 0) 对应黑色
cv.imshow('black', canvas)
cv.waitKey(0)
cv.destroyAllWindows()
```

## 函数解释

1. `imshow(winname, img)`，其中第一个参数是窗口的名字，第二个参数是图像的变量名。
2. `waitKey()`：`imshow` 执行完后后面没有代码会立马结束运行，`waitKey` 顾名思义就是等待用户按下按键的意思，在按键按下之前会一直停在这一行代码，用户按下键盘按键后才会开始执行后面的代码。
3. `destroyAllWindows()`：顾名思义，摧毁所有 OpenCV 开启的窗口。

```python
img = cv.imread('image/cute.png', 1)
img = cv.resize(img, (0, 0), fx=0.8, fy=0.8)
img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)
print(img.shape)
cv.imwrite('new_cute.png', img)
cv.imshow('cute', img)
cv.waitKey(0)
cv.destroyAllWindows()
```

1. `img = cv.imread('image/cute.png', 1)`：使用 `cv.imread` 函数从指定路径读取名为 `cute.png` 的图像文件。第二个参数 `1` 表示以彩色模式（BGR）加载图像。如果指定 `0`，则图像将以灰度模式加载。
2. `img = cv.resize(img, (0, 0), fx=0.8, fy=0.8)`：使用 `cv.resize` 函数调整图像的大小。`(0, 0)` 表示不指定具体的宽度和高度，而是使用 `fx` 和 `fy` 参数来指定缩放比例。这里的 `fx=0.8` 和 `fy=0.8` 表示图像的宽度和高度将各自缩小到原来的 80%。
3. `img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)`：使用 `cv.rotate` 函数将图像顺时针旋转 90 度。`cv.ROTATE_90_CLOCKWISE` 是一个常量，表示旋转方向为顺时针 90 度。
4. `print(img.shape)`：打印图像的形状，即图像的高度、宽度和通道数。对于彩色图像，通道数通常是 3（BGR）。这行代码用于检查图像经过上述变换后的尺寸。
5. `cv.imwrite('new_cute.png', img)`：使用 `cv.imwrite` 函数将处理后的图像保存到指定路径。这里将图像保存为 `new_cute.png`。
6. `cv.imshow('cute', img)`：使用 `cv.imshow` 函数在窗口中显示处理后的图像。窗口名称为 `cute`，将要显示的图像为 `img`。
7. `cv.waitKey(0)`：使用 `cv.waitKey` 函数等待用户按键事件。参数 `0` 表示无限期等待，直到用户按下任意键为止。
8. `cv.destroyAllWindows()`：使用 `cv.destroyAllWindows` 函数关闭所有 OpenCV 打开的窗口。通常在 `cv.waitKey` 之后调用，以确保在用户按下任意键后关闭显示图像的窗口。

# 基础图像处理

## 1. 访问和修改像素

其实就是 Numpy 数组的索引和切片。

```python
# 获取某个像素点的值，就是索引就好了
px = img[100, 100]  # 返回 BGR 值
# 或者
b, g, r = img[100, 100]  # 分别获取通道值
# 修改像素值
img[100, 100] = [255, 0, 0]  # 设置为蓝色
```

## 2. ROI（感兴趣区域）操作

```python
# 截取区域，其实就是切片
roi = img[100:200, 200:300]  # [y1:y2, x1:x2]
# 复制区域
face = roi.copy()  # 创建副本而不是视图
```

## 3. 通道操作

```python
# 分离通道
b, g, r = cv.split(img)

# 合并通道
merged = cv.merge([b, g, r])

# 仅保留某个通道
blue_only = img.copy()
blue_only[:, :, 1:] = 0  # 将绿色和红色通道置 0
```

现在试试阅读代码，推测输出结果，并运行代码验证你的结果：

```python
img = cv.imread('image/cute.png', 1)
img = cv.resize(img, (0, 0), fx=0.8, fy=0.8)
img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)

for i in range(100):
    for j in range(img.shape[1]):
        img[i][j] = [255, 255, 255]

tag = img[0:100, 200:300]
img[100:200, 100:200] = tag

cv.imshow('cute_guy', img)
cv.waitKey(0)
cv.destroyAllWindows()
```

# 图像几何变换

## 1. 缩放

```python
# 指定大小缩放
resized = cv.resize(img, (width, height))
# 按比例缩放
scaled = cv.resize(img, None, fx=0.5, fy=0.5)  # 缩小一半
```

## 2. 旋转

```python
# 获取图像中心点
height, width = img.shape[:2]
center = (width // 2, height // 2)

# 创建旋转矩阵
rotation_matrix = cv.getRotationMatrix2D(center, angle=45, scale=1.0)
# 很显然这个函数需要旋转点的坐标（元组），angle, scale 来创建相应的旋转矩阵

# 执行旋转
rotated = cv.warpAffine(img, rotation_matrix, (width, height))
```

## 3. 平移

```python
# 创建平移矩阵
matrix = np.float32([[1, 0, 100], [0, 1, 50]])  # 向右 100，向下 50
# 执行平移
shifted = cv.warpAffine(img, matrix, (width, height))
```

# 图像增强与滤波

## 1. 高斯模糊

```python
# kernel_size 必须是奇数
blurred = cv.GaussianBlur(img, (5, 5), 0)
cv.imshow('Original Image', img)
cv.imshow('Blurred Image', blurred)
cv.waitKey(0)
cv.destroyAllWindows()
```

高斯模糊（Gaussian Blur）：这是一种常用的图像平滑技术，通过使用高斯函数权重来模糊图像，从而减少噪声和细节。

**参数解释：**

- `src`：输入的图像。可以是彩色图像（BGR）或灰度图像。类型：`numpy.ndarray`。
- `ksize`：高斯核的大小，格式为 `(width, height)`。必须是正数且至少为 3，同时宽度和高度必须是奇数。如果设置为 `(0, 0)`，OpenCV 会根据标准差 σ 自动计算核的大小。
- `sigmaX`：高斯核在 X 方向的标准差。如果设置为 0，OpenCV 会根据核的大小自动计算。
- `sigmaY`：高斯核在 Y 方向的标准差。如果设置为 0，它将取与 `sigmaX` 相同的值。

## 2. 边缘检测

Canny 边缘检测：这是一种多阶段的边缘检测算法，能够检测图像中的边缘。步骤：

1. 先转为灰度图减少计算成本
2. 高斯滤波：平滑图像，减少噪声
3. 使用 Sobel 算子计算像素水平和垂直上的梯度 $G_x, G_y$
4. 非极大值抑制：通过比较像素点和邻域像素点的梯度幅度，保留局部梯度幅度的最大值，可以细化边缘，使得边缘更清晰（瘦身）
5. 双阈值检测：超过最大阈值就认定为强边缘，低于最小阈值认定为非边缘，中间的认定为弱边缘。如果弱边缘与强边缘接触则保留，否则不保留

**参数解释：**

- `img`：输入的图像
- `100`：Canny 边缘检测算法的最小阈值
- `200`：Canny 边缘检测算法的最大阈值。这两个阈值用于确定哪些边缘是强边缘、弱边缘以及非边缘

```python
# Canny 边缘检测
edges = cv.Canny(img, 100, 200)  # 参数：最小阈值，最大阈值
cv.imshow('Original Image', img)
cv.imshow('Edges', edges)
cv.waitKey(0)
cv.destroyAllWindows()
```

你也可以提前处理图像：

```python
# 将图像转换为灰度图像
gray_img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

# 应用高斯模糊以减少噪声
blurred_img = cv.GaussianBlur(gray_img, (5, 5), 0)

# 使用 Canny 边缘检测算法
edges = cv.Canny(blurred_img, 100, 200)

# 显示原始图像和边缘检测后的图像
cv.imshow('Original Image', img)
cv.imshow('Edges', edges)
cv.waitKey(0)
cv.destroyAllWindows()
```

## 3. 阈值处理

### 原理

阈值处理是一种将图像中的像素值根据某个阈值进行二值化处理的技术。通过阈值处理，图像被转换为只有两种灰度级别的图像（通常是 0 和 255），从而简化图像的后续处理。阈值处理的基本原理是将图像中的每个像素值与其阈值进行比较，并根据比较结果将其设置为某种特定的值。

### 阈值处理的类型

1. **简单阈值（Global Thresholding）**：对整个图像应用一个全局阈值。像素值大于阈值的被设置为最大阈值（通常是 255），小于阈值的被设置为最小阈值（通常是 0）。
2. **自适应阈值（Adaptive Thresholding）**：根据图像的局部区域应用不同的阈值。这种方法适用于光照不均匀的图像，能够更好地提取边缘和细节。

```python
# 将图像转换为灰度图像
gray_img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

# 应用简单阈值处理
ret, thresh = cv.threshold(gray_img, 127, 255, cv.THRESH_BINARY)

# 应用自适应阈值处理
adaptive = cv.adaptiveThreshold(
    gray_img, 255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY, 11, 2,
)

# 显示原始图像、简单阈值处理后的图像和自适应阈值处理后的图像
cv.imshow('Original Image', img)
cv.imshow('Simple Thresholding', thresh)
cv.imshow('Adaptive Thresholding', adaptive)
cv.waitKey(0)
cv.destroyAllWindows()
```

### 简单阈值处理参数

- `gray_img`：输入的灰度图像
- `127`：阈值。像素值大于 127 的将被设置为 255，否则被设置为 0
- `255`：最大阈值。当像素值大于阈值时，将被设置为这个值
- `cv2.THRESH_BINARY`：阈值类型，表示使用二值化处理。其他常见的阈值类型还包括：
  - `cv2.THRESH_BINARY_INV`：反二值化
  - `cv2.THRESH_TRUNC`：截断
  - `cv2.THRESH_TOZERO`：零阈值
  - `cv2.THRESH_TOZERO_INV`：反零阈值

### 自适应阈值处理参数

- `gray_img`：输入的灰度图像
- `255`：最大阈值
- `cv2.ADAPTIVE_THRESH_GAUSSIAN_C`：自适应阈值方法，表示使用高斯加权求和的自适应阈值
- `cv2.ADAPTIVE_THRESH_MEAN_C`：使用邻域平均值减去常数 C 作为阈值
- `cv2.THRESH_BINARY`：阈值类型
- `11`：邻域大小，必须是奇数
- `2`：常数 C，从高斯加权求和中减去的常数值

# 在图像上绘图

```python
image = cv.imread('image/cute.png', 1)
height = image.shape[0]
end1 = image.shape[1]
end2 = image.shape[0]

line = cv.line(image, (0, 0), (end1, end2), (255, 0, 0), 10)
# image: 以这个图像所在图层为画布，绘制线条
# (0, 0): 线条的起始点坐标
# (end1, end2): 线条的结束点坐标，此处为右下角
# (255, 0, 0): 线条的颜色，这里表示蓝色（在 BGR 颜色空间中）
# 10: 线条的宽度，单位为像素

# 使用 OpenCV 在图像上绘制一个黑色的矩形
rect1 = cv.rectangle(image, (100, 100), (200, 200), (0, 0, 0), 5)
# image: 在这个图像上绘制矩形
# (100, 100): 矩形的左上角坐标
# (200, 200): 矩形的右下角坐标
# (0, 0, 0): 矩形的颜色，这里表示黑色（在 BGR 颜色空间中）
# 5: 矩形边框的宽度，单位为像素

# 使用 OpenCV 在图像上绘制一个绿色的实心圆
circle = cv.circle(image, (300, 300), 60, (120, 255, 0), -1)
# image: 在这个图像上绘制圆
# (300, 300): 圆心的坐标
# 60: 圆的半径，单位为像素
# (120, 255, 0): 圆的颜色，这里表示绿色（在 BGR 颜色空间中）
# -1: 表示填充圆，即绘制一个实心圆

# 定义使用的字体样式为 FONT_HERSHEY_SIMPLEX
font = cv.FONT_HERSHEY_SIMPLEX

# 使用 OpenCV 在图像上绘制文本
text = cv.putText(
    image, 'Nuaa is the best', (200, height - 10), font, 1, (200, 40, 0), 1, cv.LINE_AA,
)
# image: 在这个图像上绘制文本
# 'Nuaa is the best': 要绘制的文本内容
# (200, height-10): 文本左下角的位置坐标（org 为文本左下角坐标）
# font: 字体样式，这里使用的是 FONT_HERSHEY_SIMPLEX
# 1: 字体大小
# (200, 40, 0): 文本的颜色，这里表示紫色（在 BGR 颜色空间中）
# 1: 文本边框的宽度，单位为像素
# cv.LINE_AA: 表示使用抗锯齿线，使文本更平滑

cv.imshow('draw', image)
cv.waitKey(0)
cv.destroyAllWindows()
```

# 霍夫变换与简单图形特征提取

此处只介绍霍夫直线变换的标准算法。

笛卡尔坐标系里，对于一条直线，可以由 $(x_1, y_1), (x_2, y_2)$ 或者 $y = kx + b$ 表示一根直线。如果直线确定了，那么显然 $k$ 和 $b$ 的值也就确定了，我们新建一个坐标系，横轴为 $k$，纵轴为 $b$——就这样我们把原坐标系的一条直线，映射成了另一个坐标系上的点，显然这个映射是可逆的。像空间的一个点确定了，它的坐标 $(k, b)$ 也就确定了，这两个值确定了原空间的直线也就确定了。变换后的空间称为霍夫空间。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/76eca3b8861ef30f3605d4522404f0067326fcd422febc0b540f59e099e39bba.jpg)

那么霍夫空间里一条直线对应什么呢？由 $y = kx + b$，可得方程组：

| 原空间点 | 方程 |
|----------|------|
| $(x_1, y_1)$ | $y_1 = kx_1 + b$ |
| $(x_2, y_2)$ | $y_2 = kx_2 + b$ |

化为以 $(k, b)$ 为变量的形式：

| 原空间点 | 霍夫空间直线 |
|----------|--------------|
| $(x_1, y_1)$ | $b = -kx_1 + y_1$ |
| $(x_2, y_2)$ | $b = -kx_2 + y_2$ |

也就是 $(x_1, y_1), (x_2, y_2)$ 对应霍夫空间中两条直线，这两条直线的交点就是直线的对应点。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/aa61e58d7ce6415315302fd0a46c201d7253ceea73529dcdb858dfb5f6e2e0f0.jpg)

显然："原空间 n 个点共线"等价于"霍夫空间中对应的 n 条线交于同一个点"。那么如果原空间就不止一条直线呢？霍夫变换会选择由尽可能多的直线汇成的点。例如：其实 (3, 2) 与 (4, 1) 也可以组成直线，只不过它有两个点确定，而图中 A、B 两点是由三条直线汇成。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/67e98cad607e7f73af17a04b217beca18e72f0cbcc0bb3a2851106200c03cc7e.jpg)

$$
y = kx + q \quad \Longrightarrow \quad q = -xk + y
$$

| 原空间点 $(x, y)$ | 霍夫空间直线 $q = -xk + y$ |
|-------------------|---------------------------|
| $(1, 0)$ | $q = -k$ |
| $(1, 1)$ | $q = -k + 1$ |
| $(2, 1)$ | $q = -2k + 1$ |
| $(4, 1)$ | $q = -4k + 1$ |
| $(3, 2)$ | $q = -3k + 2$ |

但是对于 $k = 0$、$q$ 为无穷大的直线（平行 y 轴），我们就采取极坐标的方式修正。原空间的点在霍夫变换里本来对应直线，采用极坐标后就会对应三角函数。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/e0db2f5d9424309dc835c3cf10881fd5dff55c1af789f625d14d4ce657a5dc1f.jpg)

**笛卡尔坐标系**

$$
y = kx + q \quad \Longrightarrow \quad q = -xk + y
$$

| 原空间点 $(x, y)$ | 霍夫空间直线 |
|-------------------|--------------|
| $(1, 0)$ | $q = -k$ |
| $(2, 1)$ | $q = -2k + 1$ |
| $(3, 2)$ | $q = -3k + 2$ |

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/02eeab3000a297ef17ae82960c677b54dd206922e062db04f17b19ee1fc3af50.jpg)

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/2091ecbf764254e7e9b2c058ccebb046cd963ca45cb770b46e7d89be26f1df5d.jpg)

**霍夫空间**

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/30b92ba868e7614b02c3c5f6ca60e2bd68c64b1cc0f8dab7e3213bfaf62a2f4e.jpg)

**极坐标系**

$$
x \cos \theta + y \sin \theta = \rho \implies \rho = \cos \theta \cdot x + \sin \theta \cdot y
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/77a4d311e823f8ce2e4f0f8ae87c14e35eb1edd6d1031b11e9f22780440709d4.jpg)

| 原空间点 $(x, y)$ | 极坐标直线 $\rho = x\cos\theta + y\sin\theta$ |
|-------------------|---------------------------------------------|
| $(1, 0)$ | $\rho = \cos\theta$ |
| $(2, 1)$ | $\rho = 2\cos\theta + \sin\theta$ |
| $(3, 2)$ | $\rho = 3\cos\theta + 2\sin\theta$ |

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/7fbc1c669ec8926fd0c0a610264a6f42aa32afc523d0d20c11ed329a8850fdfa.jpg)

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/a86239338c8e6fe26b93960e8a785c4ff4dc34979808ba3fb607c135a9bc19fe.jpg)

**霍夫空间**

如图，极坐标中直线的表达式为 $\rho = x\cos\theta + y\sin\theta$（$\rho$ 为原点到直线的距离）。一条直线上每个点的 $\rho$ 在固定 $\theta$ 下是一样的。在计算机中，我们可以用小步长遍历 $\theta$ 的值，统计每个 $(\rho, \theta)$ 组合出现的次数（投票），哪个 $\rho$ 在所有 $\theta$ 中出现的次数最多，就证明这是哪条直线。实际中 $\theta$ 的取值不会跨度这么大，一般是 1 度。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/cf4ec0a7-a254-4a06-b5c0-34b03a00d70c/3a201bee3d781f8c95d503330ea8780d25b15a22061b1f2712da91c371cfc5e9.jpg)

$$
y = kx + b
$$

$$
\rho = x \cos \theta + y \sin \theta
$$

| 原空间点 $(x, y)$ | 极坐标直线 |
|-------------------|------------|
| $(1, 8)$ | $\rho = \cos\theta + 8\sin\theta$ |
| $(3, 6)$ | $\rho = 3\cos\theta + 6\sin\theta$ |
| $(5, 4)$ | $\rho = 5\cos\theta + 4\sin\theta$ |
| $(7, 2)$ | $\rho = 7\cos\theta + 2\sin\theta$ |
| $(8, 1)$ | $\rho = 8\cos\theta + \sin\theta$ |

在 OpenCV 中，有两种算法：

### 1. 标准霍夫变换

适用于检测图像中的直线，通过投票机制在参数空间中找到直线的可能性。这种方法会返回所有可能的直线，包括重叠的和不连续的线段。

```python
import cv2 as cv
import numpy as np

# 读取图像
image = cv.imread('image/TV_IR_0001.bmp', 1)
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

# 边缘检测
edges = cv.Canny(gray, 50, 150, apertureSize=3)

# 执行标准霍夫变换
lines = cv.HoughLines(edges, 1, np.pi / 180, 200)
# image: 输入的二值图像（通常是边缘检测后的图像）
# rho: 距离分辨率，单位是像素。通常是 1
# theta: 角度分辨率，单位是弧度。通常是 π/180
# threshold: 累加平面的阈值参数，只有累加数大于该阈值的点才被认为是直线

# 绘制检测到的直线
if lines is not None:
    for line in lines:
        rho, theta = line[0]
        a = np.cos(theta)
        b = np.sin(theta)
        x0 = a * rho
        y0 = b * rho
        x1 = int(x0 + 1000 * (-b))
        y1 = int(y0 + 1000 * a)
        x2 = int(x0 - 1000 * (-b))
        y2 = int(y0 - 1000 * a)
        cv.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)

# 显示结果
cv.imshow('Hough Lines', image)
cv.waitKey(0)
cv.destroyAllWindows()
```

### 2. 概率霍夫变换

相对于标准霍夫变换，概率霍夫变换更加高效，它假设直线是由随机选择的点组成的，因此在参数空间中只返回最长的、最可能的直线段。这种方法可以减少冗余的检测结果，提高速度。

```python
import cv2 as cv
import numpy as np

# 读取图像
image = cv.imread('image.jpg')
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

# 边缘检测
edges = cv.Canny(gray, 50, 150, apertureSize=3)

# 执行概率霍夫变换
lines = cv.HoughLinesP(
    edges, 1, np.pi / 180, threshold=100,
    minLineLength=100, maxLineGap=10,
)
# image: 输入的二值图像（通常是边缘检测后的图像）
# rho: 距离分辨率，单位是像素
# theta: 角度分辨率，单位是弧度
# threshold: 累加平面的阈值参数
# lines: 输出的直线数组，每条直线由一个四个元素的数组表示，分别是 (x1, y1, x2, y2)
# minLineLength: 可选参数，最小线段长度。小于该长度的线段会被丢弃
# maxLineGap: 可选参数，允许的最大间隔。如果两个线段之间的间隔小于该值，它们会被合并为一条线段

# 绘制检测到的直线
if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)

# 显示结果
cv.imshow('Hough Lines P', image)
cv.waitKey(0)
cv.destroyAllWindows()
```

# 视频流

## 从摄像头读取

```python
cap = cv.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv.imshow('video', frame)
    if cv.waitKey(1) == ord('q'):
        break
cap.release()
cv.destroyAllWindows()
```

首先 `cap` 会储存摄像头 0 的信息，如果你有一个摄像头就是 0，如果有多个就有不同的设备名称。

然后 `cap.read()` 会返回两个值，一个是布尔值，告诉你是否读取成功，另一个才是我们需要的每帧的图像信息，把它放在 while 循环里就可以实时看到摄像头里的图像了。

最后规定按下 `q`，退出循环。

## 从视频文件读取

```python
cap = cv.VideoCapture('video.mp4')
while True:
    ret, frame = cap.read()
    if not ret:
        print('can not read or end')
        break
    cv.imshow('video', frame)
    if cv.waitKey(1) == ord('q'):
        break
cap.release()
cv.destroyAllWindows()
```

显然 `.read()` 会读取指针指向的帧，`cap` 内部的指针会自己移动到下一帧。

阅读代码，推测输出效果并验证：

```python
img = cv.imread('image/cute.png', 1)
cap = cv.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    width = int(cap.get(3))
    height = int(cap.get(4))
    image = np.zeros(frame.shape, dtype=np.uint8)
    smaller_frame = cv.resize(frame, (0, 0), fx=0.5, fy=0.5)
    image[:height // 2, :width // 2] = cv.rotate(smaller_frame, cv.ROTATE_180)
    image[height // 2:, :width // 2] = cv.rotate(smaller_frame, cv.ROTATE_180)
    image[:height // 2, width // 2:] = smaller_frame
    image[height // 2:, width // 2:] = cv.resize(img, (width // 2, height // 2))

    cv.line(image, (0, 0), (width, height), (255, 0, 0), 10)
    cv.line(image, (0, height), (width, 0), (0, 0, 255), 5)
    cv.rectangle(image, (100, 100), (200, 200), (0, 0, 0), 5)
    cv.circle(image, (300, 300), 60, (120, 255, 0), -1)
    font = cv.FONT_HERSHEY_SIMPLEX
    cv.putText(image, 'Nuaa is the best', (200, height - 10), font, 1, (200, 40, 0), 1, cv.LINE_AA)

    cv.imshow('frame', image)

    if cv.waitKey(1) == ord('q'):
        break

cap.release()
cv.destroyAllWindows()
```

