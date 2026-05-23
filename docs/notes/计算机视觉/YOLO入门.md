# 安装

终端输入：

```bash
pip install ultralytics
```

事实上所有的基本用法都可以在官网上阅读：<https://docs.ultralytics.com/zh/>

从官网上下载预训练模型到本地：在 GitHub 的 README.md 里有各种不同型号的预训练模型。

# YOLO 执行预测

```python
from ultralytics import YOLO

# 加载预训练模型
model = YOLO('yolo11n.pt')  # 注意文件的位置，如果不在同一文件夹里就写你的路径
# 运行结果
results = model(source='gi.mp4', show=True, conf=0.4, save=True)
```

`source` 表示你要检测的对象，可以是图片，可以是视频，可以是 `uint8` 的 NumPy 数组。如果你要检测多个文件，就使用列表，比如：

```python
results = model(['image1.png', 'image2.png'])
```

- `source=0` 表示启用默认摄像头
- `show=True` 表示运行这段代码后显示结果
- `conf=0.4` 表示置信度大于 0.4 才被显示出来
- `save=True` 表示保存。终端会有这么一行：

```text
Results saved to runs\detect\predict10
```

表示你的预测结果保存到了 `runs` 文件夹里，只要找到就可以了。

`results` 这个变量将保存结果的信息。

# YOLO 执行分割

只需要把模型换成 seg 模型即可，官网有内置的 AI 聊天模型，可以很方便地把你导航到你想去的地方。

此处以 `yolov8n-seg.pt` 为例。

```python
from ultralytics import YOLO
import cv2 as cv

# Load a pretrained YOLO model
model = YOLO("yolov8n-seg.pt")

cap = cv.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        results = model(frame)
        annotated_frame = results[0].plot()
        cv.imshow('seg', annotated_frame)
        if cv.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break
cap.release()
cv.destroyAllWindows()
```

# YOLO 训练自己的模型

YOLO 需要两个文件夹：存放图片的文件夹和存放标注的文件夹，它们的子文件夹把数据划分为训练集、验证集和测试集（可选）：

```text
dataset/
├── images/
│   ├── train/
│   └── val/
└── labels/
    ├── train/
    └── val/
```

配置文件里就写：

```yaml
train: yolo/dataset/images/train  # 训练图片相对路径
val: yolo/dataset/images/val      # 验证图片相对路径
nc: 1                             # 类别数量
names: ['an']                     # 类别名称
```

训练的 `.py` 文件就写：

```python
from ultralytics import YOLO

model = YOLO('yolo11.pt')
results = model.train(
    data='train.yaml',
    device='cpu',
    epochs=500,
    patience=50,
    imgsz=640,
    iou=0.55,
)
```

其中 `device` 表示使用什么设备，你只有 CPU 就写 `cpu`，你有 GPU 就写对应的数字。`epochs` 表示下降多少次，`patience` 表示早停，就是说下降 50 次后没什么进步就不下降了，`imgsz` 一般 640，`iou` 就是交并比的阈值。

其实还有很多参数，比如数据增强——可以查看官方的文档。

`labels` 是与图片文件同名的 `.txt` 文件，格式为：

```text
class_id cx cy w h
```

每行一个目标，坐标均为相对宽高的归一化值（0~1）。`class_id` 就是 `.yaml` 文件里 `names` 列表的索引，比如：

```yaml
names: ['egg', 'apple', 'pig']
```

`class_id = 2` 就表示 `pig`。

标注工具：最常用的就是 labelImg。这个工具有一个老 bug，好像是要输入整数，但是你画矩形时第一个点传过去就是浮点数，也没有报错把错误写给你，但是有修复方法，可以去查。我用的是我自己写的 <https://github.com/evilmordy/yolotxt_maker>。

# 注意力机制

注意力机制常用的有 SE、CBAM，21 年出的 GAM 号称除了速度都更优。这些东西就经常用来水论文。

注意力机制（Attention Mechanism）旨在模仿人类视觉和认知系统，它允许神经网络在处理数据时集中注意力于相关的部分，也就是动态地分配权重使得模型能提取到更重要和更小的特征。通过引入注意力机制，神经网络能够自动地学习并选择性地关注输入中的重要信息，提高模型对小目标的特征提取能力和泛化能力。它的出现引起了全世界的震撼，甚至论文标题大胆地豪言："Attention is all you need"。

起初的注意力机制将注意力汇聚的输出计算成为值的加权和。举一个机器翻译的例子，给定一个 Query（比如待翻译的字符"矩阵"），计算 Query 与 Key 的相关性，然后再通过 softmax 函数得到注意力分数，使用 softmax 函数是为了使得所有的注意力分数在 [0, 1] 之间，并且和为 1。Query、Key 的相关性公式一般表示如下：

$$
\text{score}(q, k_i) = \text{softmax}(\alpha(q, k_i)) = \frac{\exp(\alpha(q, k_i))}{\sum_{j} \exp(\alpha(q, k_j))}
$$

其中 $\alpha(q, k_i)$ 常见形式如下：

| 注意力类型 | $\alpha(q, k_i)$ |
|------------|-------------------|
| 加性注意力 | $w_v^T \tanh(W_q q + W_k k)$ |
| 缩放点积注意力 | $\dfrac{QK^T}{\sqrt{d}}$ |

然后根据注意力分数进行加权求和，求出带注意力分数的 Value。上一步得到了 Query、Key 的相关性，如果相关性越大，注意力分数就越高，反之越低；然后将注意力分数乘以对应的 Value，再进行加权求和；就比如："矩阵"和 "matrix" 的相关性较大，注意力分数就会越高；这样可以让下游任务理解 "矩阵" 和 "matrix" 是匹配程度高。

如果直接将不带注意力分数的 V 进行输入到下游任务，下游会认为所有单词的重要性程度都是一样的，随机将单词与 Query 匹配。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/4d3888f9a8f8ac6481f990e17cadf08ad31fc58187a4a1e260cfa6096bcc6c27.jpg)

## 其他注意力机制

除了上述的注意力机制，还有自注意力机制（Self-Attention Mechanism）、多头注意力机制（Multi-head Self-Attention Mechanism）和通道注意力机制。本文使用的 SE 注意力机制，就是一种最经典的通道注意力机制。

# 在 YOLO 里插入注意力机制

前往你环境里的 ultralytics 安装包，一般位于 `.venv/Lib/site-packages/ultralytics`（Windows）或 `.venv/lib/python3.x/site-packages/ultralytics`（Linux/macOS）。

在 GitHub 或者博客里找到对应注意力机制的 PyTorch 代码复制下来，这里为大家准备一个文件，包含四个主流模块：

```python
import torch
import torch.nn as nn
import math
import torch.nn.functional as F
from torch.nn.parameter import Parameter


# GAM
class GAM(nn.Module):
    def __init__(self, in_channels, rate=4):
        super().__init__()
        out_channels = in_channels
        in_channels = int(in_channels)
        out_channels = int(out_channels)
        inchannel_rate = int(in_channels / rate)

        self.linear1 = nn.Linear(in_channels, inchannel_rate)
        self.relu = nn.ReLU(inplace=True)
        self.linear2 = nn.Linear(inchannel_rate, in_channels)

        self.conv1 = nn.Conv2d(in_channels, inchannel_rate, kernel_size=7, padding=3, padding_mode='replicate')
        self.conv2 = nn.Conv2d(inchannel_rate, out_channels, kernel_size=7, padding=3, padding_mode='replicate')

        self.norm1 = nn.BatchNorm2d(inchannel_rate)
        self.norm2 = nn.BatchNorm2d(out_channels)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        b, c, h, w = x.shape
        # B,C,H,W ==> B,H*W,C
        x_permute = x.permute(0, 2, 3, 1).view(b, -1, c)
        # B,H*W,C ==> B,H,W,C
        x_att_permute = self.linear2(self.relu(self.linear1(x_permute))).view(b, h, w, c)
        # B,H,W,C ==> B,C,H,W
        x_channel_att = x_att_permute.permute(0, 3, 1, 2)

        x = x * x_channel_att

        x_spatial_att = self.relu(self.norm1(self.conv1(x)))
        x_spatial_att = self.sigmoid(self.norm2(self.conv2(x_spatial_att)))

        out = x * x_spatial_att

        return out


if __name__ == '__main__':
    img = torch.rand(1, 64, 32, 48)
    b, c, h, w = img.shape
    net = GAM(in_channels=c)
    output = net(img)
    print(output.shape)


# CBAM
class ChannelAttention(nn.Module):
    """Channel-attention module https://github.com/open-mmlab/mmdetection/tree/v3.0.0rc1/configs/rtmdet."""

    def __init__(self, channels: int) -> None:
        """Initializes the class and sets the basic configurations and instance variables required."""
        super().__init__()
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Conv2d(channels, channels, 1, 1, 0, bias=True)
        self.act = nn.Sigmoid()

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Applies forward pass using activation on convolutions of the input, optionally using batch normalization."""
        return x * self.act(self.fc(self.pool(x)))


class SpatialAttention(nn.Module):
    """Spatial-attention module."""

    def __init__(self, kernel_size=7):
        """Initialize Spatial-attention module with kernel size argument."""
        super().__init__()
        assert kernel_size in (3, 7), "kernel size must be 3 or 7"
        padding = 3 if kernel_size == 7 else 1
        self.cv1 = nn.Conv2d(2, 1, kernel_size, padding=padding, bias=False)
        self.act = nn.Sigmoid()

    def forward(self, x):
        """Apply channel and spatial attention on input for feature recalibration."""
        return x * self.act(
            self.cv1(torch.cat([torch.mean(x, 1, keepdim=True), torch.max(x, 1, keepdim=True)[0]], 1))
        )


class CBAM(nn.Module):
    """Convolutional Block Attention Module."""

    def __init__(self, c1, kernel_size=7):
        """Initialize CBAM with given input channel (c1) and kernel size."""
        super().__init__()
        self.channel_attention = ChannelAttention(c1)
        self.spatial_attention = SpatialAttention(kernel_size)

    def forward(self, x):
        """Applies the forward pass through C1 module."""
        return self.spatial_attention(self.channel_attention(x))


# CA
class h_sigmoid(nn.Module):
    def __init__(self, inplace=True):
        super(h_sigmoid, self).__init__()
        self.relu = nn.ReLU6(inplace=inplace)

    def forward(self, x):
        return self.relu(x + 3) / 6


class h_swish(nn.Module):
    def __init__(self, inplace=True):
        super(h_swish, self).__init__()
        self.sigmoid = h_sigmoid(inplace=inplace)

    def forward(self, x):
        return x * self.sigmoid(x)


class CoordAtt(nn.Module):
    def __init__(self, inp, reduction=32):
        super(CoordAtt, self).__init__()
        oup = inp
        self.pool_h = nn.AdaptiveAvgPool2d((None, 1))
        self.pool_w = nn.AdaptiveAvgPool2d((1, None))

        mip = max(8, inp // reduction)
        self.conv1 = nn.Conv2d(inp, mip, kernel_size=1, stride=1, padding=0)
        self.bn1 = nn.BatchNorm2d(mip)
        self.act = h_swish()

        self.conv_h = nn.Conv2d(mip, oup, kernel_size=1, stride=1, padding=0)
        self.conv_w = nn.Conv2d(mip, oup, kernel_size=1, stride=1, padding=0)

    def forward(self, x):
        identity = x

        n, c, h, w = x.size()
        x_h = self.pool_h(x)
        x_w = self.pool_w(x).permute(0, 1, 3, 2)

        y = torch.cat([x_h, x_w], dim=2)
        y = self.conv1(y)
        y = self.bn1(y)
        y = self.act(y)

        x_h, x_w = torch.split(y, [h, w], dim=2)
        x_w = x_w.permute(0, 1, 3, 2)

        a_h = self.conv_h(x_h).sigmoid()
        a_w = self.conv_w(x_w).sigmoid()

        out = identity * a_w * a_h

        return out


# ECA
class ECA(nn.Module):
    """Constructs an ECA module.

    Args:
        channel: Number of channels of the input feature map
        k_size: Adaptive selection of kernel size
    """

    def __init__(self, channel, k_size=3):
        super(ECA, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.conv = nn.Conv1d(1, 1, kernel_size=k_size, padding=(k_size - 1) // 2, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # feature descriptor on the global spatial information
        y = self.avg_pool(x)

        # Two different branches of ECA module
        y = self.conv(y.squeeze(-1).transpose(-1, -2)).transpose(-1, -2).unsqueeze(-1)

        # Multi-scale information fusion
        y = self.sigmoid(y)

        return x * y.expand_as(x)
```

在 `nn` 下面新建文件夹 `Attention_m`，再新建一个 `__init__.py` 和一个 `Attention.py`。

`Attention.py` 里放置你复制的代码，这些代码都是一个 class（类），然后在 `__init__.py` 里写：

```python
from .Attention import *
```

然后在 `nn/tasks.py` 里加上：

```python
from .Attention_m import *
```

然后在 `tasks.py` 里找到这个函数，好像在 1575 行左右：

```python
def parse_model(d, ch, verbose=True):
```

再找到这行：

```python
elif m is AIFI:
```

这里就是很多个条件判断了，在前面添加一个同缩进的条件判断：

```python
elif m in {GAM, CBAM, CoordAtt, ECA}:
    c2 = ch[f]
    args = [c2, *args]
```

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/7551a78ea1b8742b275becdd9932549b9f33ac352be970fc80763ba8541fe21a.jpg)

如果你想要插入模块，就去找这个模块的 PyTorch 实现，然后把那个类加到 `Attention.py` 里（你完全可以换个名字，比如文件包叫 `Add`，下面有 `Attention.py` 和其它文件，只是别忘了在 `__init__.py` 里面全导入），最后在 `tasks.py` 里修改就行。

然后就是 `.yaml` 文件，比如你要插入 CBAM 在某个位置：

```yaml
# Ultralytics YOLO 📂, AGPL-3.0 license
# YOLO11 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect

# Parameters
nc: 80  # number of classes
scales:  # model compound scaling constants, i.e. 'model=yolo11n.yaml' will call yolo11.yaml with scale 'n'
  # [depth, width, max_channels]
  n: [0.50, 0.25, 1024]  # summary: 319 layers, 2624080 parameters, 2624064 gradients, 6.6 GFLOPs
  s: [0.50, 0.50, 1024]  # summary: 319 layers, 9458752 parameters, 9458736 gradients, 21.7 GFLOPs
  m: [0.50, 1.00, 512]   # summary: 409 layers, 20114688 parameters, 20114672 gradients, 68.5 GFLOPs
  l: [1.00, 1.00, 512]   # summary: 631 layers, 25372160 parameters, 25372144 gradients, 87.6 GFLOPs
  x: [1.00, 1.50, 512]   # summary: 631 layers, 56966176 parameters, 56966160 gradients, 196.0 GFLOPs

# YOLO11n backbone
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]]       # 0-P1/2
  - [-1, 1, Conv, [128, 3, 2]]      # 1-P2/4
  - [-1, 2, C3k2, [256, False, 0.25]]
  - [-1, 1, Conv, [256, 3, 2]]      # 3-P3/8
  - [-1, 2, C3k2, [512, False, 0.25]]
  - [-1, 1, Conv, [512, 3, 2]]      # 5-P4/16
  - [-1, 2, C3k2, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]     # 7-P5/32
  - [-1, 2, C3k2, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]        # 9
  - [-1, 2, C2PSA, [1024]]          # 10

# YOLO11n head
head:
  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 6], 1, Concat, [1]]       # cat backbone P4
  - [-1, 2, C3k2, [512, False]]     # 13
  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 4], 1, Concat, [1]]       # cat backbone P3
  - [-1, 2, C3k2, [256, False]]     # 16 (P3/8-small)
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 13], 1, Concat, [1]]      # cat head P4
  - [-1, 2, C3k2, [512, False]]     # 19 (P4/16-medium)
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 10], 1, Concat, [1]]      # cat head P5
  - [-1, 2, C3k2, [1024, True]]     # 22 (P5/32-large)
  - [-1, 1, CBAM, []]               # 23 这里是在大目标检测层输出位置添加一个注意力机制
  # - [-1, 1, ECA, []]              # 23
  # - [-1, 1, GAM, []]              # 23
  # - [-1, 1, CoordAtt, []]         # 23
  - [[16, 19, 23], 1, Detect, [nc]] # Detect(P3, P4, P5)
```

这个作为 `cfg` 参数可以直接传给 model：

```python
model = YOLO("cfg/models/yolo_CBAM.yaml")
```

准备好你自己的 `data.yaml`，此处是一个已经设置了数据增强的代码：

```python
from ultralytics import YOLO
import warnings

warnings.filterwarnings('ignore')
from pathlib import Path

if __name__ == '__main__':
    # 加载模型
    model = YOLO("cfg/models/yolo_SE.yaml")  # 你要选择的模型 yaml 文件地址
    # Use the model
    results = model.train(
        data=r"F:\pycharm\machine_learning\train.yaml",
        device='0',  # 没有 GPU 写 'cpu'
        epochs=500,
        patience=50,
        imgsz=640,
        iou=0.5,
        lr0=0.005,
        lrf=0.009,
        degrees=30,
        hsv_s=0.75,
        hsv_h=0.020,
    )  # 训练模型
```

在你运行前真心建议你把其它能结束的任务全结束了，尤其是 Edge 什么的。

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/8b42e12d9df0190b7e0a407989d4efc04b09bc26b0491bb4c48a2f4a724d15a7.jpg)

结果将保存到 `runs\detect\train`，其实名字是可以指定的，有个 `name` 参数。

# 查看运行结果

进入 `runs\detect\train`：

![image](https://cdn-mineru.openxlab.org.cn/result/2026-05-23/fda4a640-59f0-41bf-a51e-97b01d23af28/78900d0a2acfd362be5dde9c04e6ef1f6d1e7531f746bcda808131b924f37c42.jpg)

`weights` 里有两个模型：

- `best.pt` —— 表现最好的
- `last.pt` —— 最后一轮的

`args.yaml` 保存了这次的训练配置信息。然后就是评估指标（mAP、P、R 等），还有 `results.csv` 保存了每一轮的结果。`results.png` 就是随着训练轮数的增加，各个参数的变化线。后面的就是验证集上的结果。
