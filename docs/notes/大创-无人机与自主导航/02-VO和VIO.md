# VO 和 VIO

## VO

视觉里程计（Visual Odometry，简称VO）是利用**连续图像序列** 估计 相机自身运动（位姿变化）的一种技术。

它的作用是拿到相机的相对位姿变化(平移和旋转)

与IMU和激光雷达相比，成本更低，但受限于光照和场景特征等因素。

### 基本原理

1. **特征匹配：**就是找出图片中的同一个物体。从连续帧中提取图像特征点，并在相邻帧之间进行匹配。然后跟踪这个特征点。

2. **几何约束与位姿解算：**利用特征点在不同时间(帧)下在画面里的位置，通过几何约束（如本质矩阵、基础矩阵或相机模型）解算摄像头的相对位姿变化。

举个例子：如果你的相机搭载在一台无人机上，而无人机在只有雪白的墙壁的室内飞，那么摄像机拍到的画面都是白花花一片，或者墙壁的纹理是整齐的，重复的，相机拍到的不同画面长得几乎一模一样——这个时候根本没有特征点，无法解算，我们称之为**低纹理环境**。但如果墙上有标记，比如一颗钉子，那么就能以钉子为特征点，用数学解算相机的位姿变化。

### 模块和步骤

- 图像采集和预处理模块
- 特征提取描述模块
- 特征匹配跟踪模块
- 运动解算模块
- 优化与滤波

1. 使用相机获得连续的图像序列
2. 预处理，滤波去噪，转为灰度图等操作
3. 特征点检测如Harris角点、FAST、SIFT、SURF等方法，在图像中检测高辨识度的特征点，当然也有论文研究特征线——PL VIO
4. 为每个特征点生成描述子(SIFT、SURF、ORB等)
5. 特征匹配，跟踪(Brute-Force,FLANN，Lucas-Kanade等)
6. 运动解算
7. 优化(最小二乘，Bundle Adjustment)和滤波(卡尔曼滤波EKF等)

### 限制和不足

- 相机的输出频率有限，一般不超过100Hz；

- 在基于单目的VO系统中，不能精准估计尺度信息
- 不适合低纹理（如白墙）
- 不适合高速运动或者高动态的场景（出现曝光过度或者不足）

## VIO

视觉惯性里程计(Visual-Inertial Odometry，VIO)，是一个使用一个或者多个相机、一个或者多个IMU进行传感器状态测量的技术(也就是解算位姿)

相机和IMU相比于其他传感器比较廉价，也比较轻便，因此在现代无人机上普遍配备了VIO

前面已经讲解了VO和IMU，而VIO设计理念就在于，将相机和IMU两种的传感器进行数据融合，达到“优势互补”。

- IMU弥补输VO出频率不高和过渡依赖光照和速度限制的不足
- VO弥补IMU存在漂移误差的不足

具体的原理涉及李代数和滤波的数学知识，这个我看以后有没有时间更吧...



### 数据融合的方式

#### 松耦合

IMU和相机分别解算完自身的运动估计，然后对结果进行数据融合，鲁棒性不如紧耦合

#### 紧耦合

先把IMU的状态和相机的状态合并在一起，共同构建运动方程和观测方程，然后进行位姿状态的解算。分为基于滤波(Filter)和基于优化(optimization)两个研究方向



### 常见算法

#### 基于滤波器

- MSCKF：为了解决EKF-SLAM需要一个初始深度和协方差，选择不正确后面就不会收敛的问题。原始的MSCKF算法提出了一个度量模型，该模型表达了观察特定图像特征的所有相机姿态之间的几何约束，而不需要在状态向量中维护3D路标点位置的估计。Alex Zihao Zhu等人实现了一个基于事件相机（Event-based Camera）输入的使用MSCKF后端的里程计，后面该实现被改造成可接收普通相机特征跟踪信息的版本
  仓库： https://github.com/daniilidis-group/msckf_mono
  论文：https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8100099
- ROVIO：计算量小，但是没有闭环会残留误差。
  仓库：https://github.com/ethz-asl/rovio
  论文：https://www.doc.ic.ac.uk/~sleutene/publications/ijrr2014_revision_1.pdf

#### 基于优化

- OKVIS：前端：多目+IMU 后端：ceres solver优化库，基于关键帧的滑动窗口

  仓库：https://github.com/ethz-asl/okvis 
  论文：https://www.doc.ic.ac.uk/~sleutene/publications/ijrr2014_revision_1.pdf

- VINS-Mono: 设备只要求单目，鲁棒性强，前端基于KLT跟踪算法， 后端基于滑动窗口的优化(采用ceres库)， DBoW的回环检测
  仓库：https://github.com/HKUST-Aerial-Robotics/VINS-Mono
  论文：https://ieeexplore.ieee.org/document/8421746

## 参考

https://zhuanlan.zhihu.com/p/148412316

https://blog.csdn.net/Night___Raid/article/details/108223615

https://www.cnblogs.com/hitcm/p/6327442.html





