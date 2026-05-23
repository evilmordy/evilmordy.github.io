
"它统一了分裂的社区库，自此 Python 才体现出它的优势。"

# NumPy 教案

## 一、数组的结构及创建

### ndarray 对象组成

`ndarray` 由一个指向数据的内存指针、数据类型（`dtype`）和表示矩阵形状（`shape`）的元组构成。

其中数据类型支持 `int8`、`int16`、`int32`、`int64`、`uint8`、`uint32`、`uint64`、`float16`、`float32`、`float64`。这里尤其要注意 `uint8`，它是图像处理的重要格式。

可以直接通过 `print` 查看 `dtype` 和 `shape`，创建数组的函数一般都能指定 `dtype`。

### 数组的创建

#### 手动创建

```python
import numpy as np

# 创建一维数组
a1 = np.array([1, 2, 3, 4, 5], dtype=int)
# 查看数组形状，注意，数组的形状很重要，如果对不上就会报错
print(a1.shape)
# 输出数组
print(a1)
```

我们会发现一维数组的形状为 `(5,)`，而不是 `(1, 5)` 或 `(5, 1)`。那么我们再做一个实验：

```python
a2 = np.array([[1, 2, 3, 4, 5]])
print(a2.shape)
```

我们发现输出为 `(1, 5)`。也就是说，一维数组默认是 1 行多列；二维数组则是外层中括号包含多个内层中括号，每个内层中括号代表一行。

显然，如果我们让 0 代表纯黑色、1 代表纯白色，那么二维数组就可以用来显示灰度图像，比如一张 600×600 的图像，它的形状就是 `(600, 600)`。如果我们把这个二维数组里每一个数字都替换为 `[a, b, c]`，`a`、`b`、`c` 分别代表红、绿、蓝，那么这个三维数组就可以存储一个彩色图像，其形状为 `(600, 600, 3)`。

#### 常用的创建函数

| 函数 | 说明与示例 |
|------|------------|
| `np.zeros()` | 快速创建全为 0 的数组，例如：`np.zeros(3)` 创建全为 0 的一维数组；`np.zeros((3, 4))` 创建三行四列的 0 数组 |
| `np.zeros_like()` | 括号里传入数组 `a`，则 0 数组的形状与 `a` 一致 |
| `np.ones()` | 创建全为 1 的数组，括号里传入的参数与 `zeros` 同理 |
| `np.eye()` | 创建单位数组，即对角线上全为 1，其它都是 0；传入整数 `s`，数组形状为 `(s, s)` |
| `np.arange(start, stop, step, dtype)` | 生成区间 `[start, stop)` 上步长间隔（公差）为 `step` 的等差数组 |
| `np.linspace(start, stop, num=50, endpoint=True)` | 生成区间 `[start, stop]` 上间隔相等的 `num` 个数据的等差数组，`num` 默认值为 50 |
| `np.logspace(start, stop, num=50, endpoint=True, base=10.0)` | 默认生成区间 $[base^{start}, base^{stop}]$ 上的 `num` 个数据的等比数组 |

运行下面的代码：

```python
a = np.ones(4, dtype=int)
b = np.ones((4, 1))
c = np.zeros(4)
d = np.zeros_like(a)
e = np.eye(3)
print(f'{a}\n{b}\n{c}\n{d}\n{e}')
```

思考输出结果，并运行验证你的答案。

```python
a = np.arange(1, 5)
b = np.linspace(1, 4, 4)
c = np.logspace(1, 3, 3, base=2)
print(f'{a}\n{b}\n{c}')
```

思考输出结果，并验证。

---

## 二、数组形状的修改

数组的形状可以通过 `reshape()`、`ravel()`、`flatten()`、`resize()` 等方法修改，但元素总数必须一致。换句话说，修改前后的 `size`（元素总数）应相同，否则会报错。

### reshape()

```python
import numpy as np

a = np.arange(12)
print(a.shape)  # (12,)
b = a.reshape(3, 4)
print(b)
print(b.shape)  # (3, 4)
```

`reshape()` 只是返回新视图（view），不会改变原数组 `a` 的形状。

```python
print(a.shape)  # 仍然是 (12,)
```

如果希望直接改变原数组的形状，可以使用 `a.shape = (3, 4)`。

注意：若 `reshape()` 无法整除元素个数，会报错。例如：

```python
np.arange(10).reshape(3, 4)
# 报错：cannot reshape array of size 10 into shape (3,4)
```

### ravel() 与 flatten()

这两个方法都能将多维数组"拉平"为一维。不同在于：

- `ravel()` 返回的是视图（修改会影响原数组）
- `flatten()` 返回的是拷贝（修改不会影响原数组）

```python
a = np.arange(6).reshape(2, 3)
b = a.ravel()
c = a.flatten()
b[0] = 99
print(a)  # 原数组被改动
c[0] = 100
print(a)  # 原数组未改动
```

### resize()

`resize()` 会直接改变原数组本身的形状：

```python
a = np.arange(6)
a.resize(2, 3)
print(a)
```

若新形状元素数量更大，它会自动重复填充原元素。但是由于 `a = a.reshape(2, 3)` 也能修改数组本身，所以这个用得少。

---

## 三、数组的索引与切片

数组索引是 NumPy 的核心能力之一。灵活的索引能帮助我们快速访问和修改数据。

### 基本索引

```python
a = np.arange(1, 10, 1).reshape(3, 3)
print(a[0, 0])  # 第一行第一列元素
print(a[2, 1])  # 第三行第二列元素
```

索引从 0 开始，因此 `a[2, 1]` 代表第三行第二列。

### 切片操作

切片语法为 `a[start:end:step]`，与 Python 列表类似。但在多维数组中可以分别对每个维度切片：

```python
print(a[0:2, 1:3])  # 取前两行、后两列
```

### 步长与省略号

```python
print(a[::2, ::2])  # 每隔一行一列取一个元素
print(a[..., 1])    # 取所有行的第 2 列
print(a[:, 1])      # 同上
```

`...` 表示自动补齐剩余维度，适合高维数据（如图像）。

### 布尔索引

布尔索引可通过条件筛选数据，非常常用于机器学习中数据过滤：

```python
x = np.array([10, 20, 30, 40, 50])
mask = x > 25
print(mask)      # [False False  True  True  True]
print(x[mask])   # [30 40 50]
```

### 花式索引

花式索引是用整数数组指定要取的元素：

```python
x = np.array([10, 20, 30, 40, 50])
idx = [0, 2, 4]
print(x[idx])  # [10 30 50]
```

多维情况下也能用：

```python
a = np.arange(12).reshape(3, 4)
rows = [0, 2]
cols = [1, 3]
print(a[rows, cols])  # 取 (0,1) 和 (2,3) 位置的元素
```

⚠️ **注意**：花式索引返回的是拷贝，而不是视图。基础的切片和索引返回的是视图而非拷贝，也就是说你是可以用这个去直接改变原数组的值的；如果需要保留原数组就应该使用 `.copy()` 先创建一个一模一样的数组（Python 没有指针，你赋值后它们用的同一个地址）。

```python
import numpy as np

a = np.arange(1, 10, 1).reshape(3, 3)
print(a)
b = a
b[::2, ::2] = 1  # 每隔一行一列取一个元素
print(a)
```

结果 `a` 被修改了。

```python
import numpy as np

a = np.arange(1, 10, 1).reshape(3, 3)
print(a)
b = a.copy()
b[::2, ::2] = 1
print(a)
```

`a` 没被修改。

---

## 四、数组的合并与分割

在机器学习或图像处理中，我们常常需要把多个数组拼接成一个整体，或将大数组切分成若干子数组。NumPy 提供了一整套便捷的合并与分割函数。

### 数组的合并（拼接）

#### 1. 使用 `np.concatenate()`

`concatenate()` 是最底层、最通用的拼接函数。语法为：

```python
np.concatenate((a1, a2, ...), axis=0)
```

```python
a = np.ones((2, 3))
b = np.zeros((2, 3))
print(np.concatenate((a, b), axis=0))  # 按行拼接
print(np.concatenate((a, b), axis=1))  # 按列拼接
```

⚠️ **注意**：被拼接的数组在除拼接轴外的维度上必须形状一致。

#### 2. 使用 `np.vstack()` 与 `np.hstack()`

这是最常用的两个拼接函数，分别按"垂直方向"和"水平方向"合并。

```python
a = np.array([[1, 2, 3], [4, 5, 6]])
b = np.array([[7, 8, 9]])
print(np.vstack((a, b)))  # 垂直拼接（行叠加）
print(np.hstack((a, a)))  # 水平拼接（列叠加）
```

在图像处理中，`vstack` 可用于"上下拼图"，`hstack` 用于"左右拼图"。

#### 3. `np.stack()`：添加新维度后再拼接

当你希望合并时保留独立维度（而不是直接叠加），可以使用 `stack()`：

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = np.stack((a, b), axis=0)  # 新维度在最前面
print(c.shape)  # (2, 3)
d = np.stack((a, b), axis=1)  # 新维度在中间
print(d.shape)  # (3, 2)
```

### 数组的分割

分割是合并的逆操作，常用于把训练数据拆分为训练集、验证集。

#### 1. 使用 `np.split()`

语法：

```python
np.split(array, indices, axis=0)
```

示例：

```python
a = np.arange(12).reshape(3, 4)
print(a)
a1, a2 = np.split(a, [1], axis=0)  # 在第 1 行后切分
print(a1)
print(a2)
```

#### 2. 快捷函数：`vsplit()` 与 `hsplit()`

```python
a = np.arange(16).reshape(4, 4)
top, bottom = np.vsplit(a, [2])
left, right = np.hsplit(a, [2])
```

**练习**：

1. 创建两个形状为 `(3, 4)` 的随机数组 A、B，按行拼接、按列拼接。
2. 用 `stack()` 将三张 28×28 灰度图像叠加成一个 `(3, 28, 28)` 的三维数组。
3. 将一个数组沿行方向平均分为三份。
4. 使用 `array_split()` 将长度为 10 的一维数组分为 3 份，并验证每份的长度。

---

## 五、广播机制（Broadcasting）

广播是 NumPy 的一大特性，它允许不同形状的数组在算术运算中自动对齐。

在机器学习中，广播被频繁用于：

- 向量与矩阵的加减
- 批量标准化
- 激活函数计算
- 权值矩阵的偏置项加法

### 广播的基本原则

广播规则可以概括为：

从尾部维度开始比较，如果两个维度相等，或其中一个为 1，则可以广播；否则抛出错误。

示例：

```python
a = np.ones((3, 4))
b = np.array([1, 2, 3, 4])
print(a + b)
```

`b` 的形状是 `(4,)`，自动广播成 `(3, 4)`。

### 手动调整维度以实现广播

有时我们需要用 `np.newaxis` 或 `None` 来手动增加维度。

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a[:, None] + b[None, :])
```

输出为一个 3×3 的矩阵，相当于外积运算。

### 广播失败示例

如果两个数组形状不兼容，就会报错：

```python
a = np.ones((3, 4))
b = np.ones((2, 1))
a + b
# ValueError: operands could not be broadcast together with shapes (3,4) (2,1)
```

解决方法：调整形状使其符合广播规则（如 `b.reshape(3, 1)`）。

### 典型应用场景

#### 1. 批量归一化（Batch Normalization）

```python
X = np.random.randn(5, 3)
mu = X.mean(axis=0)
sigma = X.std(axis=0)
X_norm = (X - mu) / sigma  # mu 和 sigma 自动广播
```

#### 2. 激活函数中的偏置项

```python
z = np.random.randn(64, 128)
b = np.random.randn(128)
out = z + b  # 自动沿 axis=0 扩展
```

#### 3. softmax 函数稳定实现

```python
def stable_softmax(z):
    z = z - np.max(z, axis=1, keepdims=True)
    exp = np.exp(z)
    return exp / exp.sum(axis=1, keepdims=True)
```

这里 `keepdims=True` 让 `max` 和 `sum` 保留二维形状，便于广播。

### 练习与思考

1. 创建一个 3×4 的矩阵 A，和一个长度为 4 的向量 b，验证广播加法效果。
2. 使用 `np.newaxis` 计算两个长度为 3 的向量的外积。
3. 创建一个 5×4 的矩阵，计算每列的 z-score 标准化结果。
4. 改写 softmax 函数，使输入可以是一维向量。

---

## 六、数组的运算与线性代数

NumPy 之所以成为机器学习与科学计算的基础工具，关键就在于它的矢量化运算与线性代数接口。掌握这些内容，你就能手写线性回归、PCA、神经网络的核心数学过程。

### 算术运算（Arithmetic Operations）

NumPy 的数组运算是"逐元素"的，即形状兼容（或可广播）时，对应位置元素执行运算。

```python
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])
b = np.array([[10, 20, 30],
              [40, 50, 60]])
```

#### 1. 基本运算

```python
print(a + b)   # 加
print(a - b)   # 减
print(a * b)   # 乘（逐元素）
print(a / b)   # 除
print(a ** 2)  # 平方
```

输出：

```text
[[11 22 33]
 [44 55 66]]
[[ -9 -18 -27]
 [-36 -45 -54]]
[[10 40 90]
 [160 250 360]]
[[0.1 0.1 0.1]
 [0.1 0.1 0.1]]
[[ 1  4  9]
 [16 25 36]]
```

### 矩阵乘法（Matrix Multiplication）

矩阵乘法在机器学习中极为常见，例如：

- 线性回归：$y = X\theta$
- 神经网络：$Z = W \times X + b$

NumPy 支持三种写法：

#### 1. 使用 `@`（推荐）

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(A @ B)
```

输出：

```text
[[19 22]
 [43 50]]
```

#### 2. 使用 `np.dot(A, B)`

等价于 `A @ B`，常用于兼容旧版本。

#### 3. 使用 `np.matmul(A, B)`

与 `@` 相同，但支持批量（多维）矩阵乘法。

### 逐元素函数（Universal Functions）

| 函数 | 说明 |
|------|------|
| `np.exp(x)` | 计算 $e^x$ |
| `np.log(x)` | 自然对数 |
| `np.sqrt(x)` | 平方根 |
| `np.sin(x)` / `np.cos(x)` | 三角函数 |
| `np.maximum(a, b)` | 逐元素取最大值 |
| `np.clip(x, a, b)` | 限定范围到 $[a, b]$ |

示例：

```python
x = np.linspace(-2, 2, 5)
print(np.exp(x))
print(np.clip(x, -1, 1))
```

### 聚合与统计函数

| 函数 | 说明 |
|------|------|
| `np.sum()` | 求和 |
| `np.mean()` | 均值 |
| `np.std()` | 标准差 |
| `np.var()` | 方差 |
| `np.min()` / `np.max()` | 最小/最大值 |
| `np.argmin()` / `np.argmax()` | 最小/最大索引 |
| `np.median()` | 中位数 |

示例：

```python
X = np.arange(6).reshape(2, 3)
print(X.sum(axis=0))   # 每列求和
print(X.mean(axis=1))  # 每行平均
```

### 线性代数（Linear Algebra）

NumPy 的 `linalg` 模块提供了常用的矩阵运算工具，是机器学习算法的基础。

#### 1. 矩阵转置与单位矩阵

```python
A = np.array([[1, 2, 3], [4, 5, 6]])
print(A.T)       # 转置
print(np.eye(3)) # 单位矩阵
```

#### 2. 逆矩阵与解线性方程

```python
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)  # 解方程组
print(x)
```

结果：

```text
[2. 3.]
```

⚠️ **对比**：`np.linalg.inv(A) @ b` 结果相同，但精度略差、性能更低。因此推荐使用 `solve()`。

#### 3. 行列式（determinant）

```python
A = np.array([[1, 2], [3, 4]])
print(np.linalg.det(A))
```

输出：`-2.0000000000000004`

#### 4. 特征值与特征向量

```python
A = np.array([[4, -2], [1, 1]])
vals, vecs = np.linalg.eig(A)
print(vals)
print(vecs)
```

输出（略）：

```text
[3. 2.]
[[ 0.89442719 -0.70710678]
 [ 0.4472136   0.70710678]]
```

说明：

- `vals` 是特征值 $\lambda$
- `vecs` 的每一列是对应的特征向量

#### 5. 奇异值分解（SVD）

SVD 在 PCA（主成分分析）和推荐系统中非常重要：

```python
X = np.random.randn(4, 3)
U, S, Vt = np.linalg.svd(X, full_matrices=False)
print(U.shape, S.shape, Vt.shape)
```

输出：

```text
(4, 3) (3,) (3, 3)
```

SVD 的意义：

$$
X = U \Sigma V^T
$$

其中 $U$ 和 $V^T$ 是正交矩阵，$\Sigma$ 包含奇异值。

### 6. 矩阵的范数（Norm）

范数是衡量矩阵或向量"长度"的标准，在正则化和优化中经常出现。

```python
x = np.array([3, 4])
print(np.linalg.norm(x))        # 二范数（默认）
print(np.linalg.norm(x, ord=1)) # 一范数
```

## 六、einsum：优雅的张量运算（可选进阶）

`np.einsum()` 用爱因斯坦求和约定表达复杂的矩阵乘法。例如：

```python
A = np.random.randn(3, 2)
B = np.random.randn(2, 4)
C = np.einsum('ik,kj->ij', A, B)
```

等价于 `A @ B`，但能自由控制维度对应关系。在实现神经网络反向传播或张量压缩时非常高效。
