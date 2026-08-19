# Launch:节点启动与配置脚本

用`ros2 run`命令一个一个启动节点，显然太麻烦了，非我所求也

ROS2自然也考虑到了这一点，提供了`Launch`这一强大的配置脚本

ROS2支持三种格式：python,xml,yaml,但我们基本上只用python格式，因为它最灵活，最接近**基础设施代码**

---

## 最简单的Launch文件

我们以之前学习话题时的功能包为例，创建`learning_topic/launch/helloworld.launch.py`:
```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():  # 必须存在，ROS2 Launch会调用此函数
    return LaunchDescription([
        Node(
            package = 'learning_topic',     # 指定功能包
            executable = 'topic_hellowworld_pub',   # 节点的名称
            name = 'publisher_node'     # 重命名
        ),
        Node(
            package = 'learning_topic',
            executable = 'topic_hellowworld_sub',
            name = 'subscriber_node'
        )
    ])
```

重命名功能非常有用，当有两个相近的任务，需要复用代码时，你不需要在源码里修改节点名称，可以直接用launch重命名功能

还需要在`setup.py`里添加设置：
```python
from glob import glob
import os
from setuptools import setup

setup(
    name='learning_topic',
    # ... 其他配置
    data_files=[
        # ... 其他数据文件
        (os.path.join('share', 'learning_topic', 'launch'), 
         glob(os.path.join('launch', '*launch.[pxy][yma]*'))),
    ],
    entry_points={
        'console_scripts': [
            'topic_helloworld_pub = learning_topic.topic_helloworld_pub:main',
            'topic_helloworld_sub = learning_topic.topic_helloworld_sub:main',
            'topic_webcam_sub = learning_topic.topic_webcam_sub:main',
        ],
    },
)
```

运行：
```bash
ros2 launch learning_topic helloworld.launch.py
```

## 添加参数设置

我们先把`learning_topic`里的一个硬编码参数换成ROS2参数,此处修改`PublisherNode`代码：
```python
class PublisherNode(Node):
    def __init__(self, name):
        super().__init__(name)
        self.pub = self.create_publisher(String, "chatter", 10)
        
        # 声明参数并获取值
        self.declare_parameter('timer_period', 1)
        timer_period = self.get_parameter('timer_period').value
        
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.get_logger().info(f'Timer period set to {timer_period}s')
```

然后修改launch文件，让发布者的发布频率可调：
```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node

def generate_launch_description():
    # 声明参数timer_period，默认值1s
    timer_period_arg = DeclareLaunchArgument(
        'timer_period',
        default_value = '1',
        description = '发布周期(秒)'
    )
    timer_period = LaunchConfiguration('timer_period')

    return LauchDescription([
        timer_period_arg,
        Node(
            package = 'learning_topic',
            executable = 'topic_helloworld_pub',
            name = 'publisher_node',
            parameters = [{
                'timer_period':timer_period
            }]
        )
        Node(
            package='learning_topic',
            executable='topic_helloworld_sub',
            name='subscriber_node'
        )
    ])
```

重新编译后可以通过命令行调整参数：
```bash
ros2 launch learning_topic helloworld.launch.py timer_period:=2
```

也可以把参数写到yaml文件里：
创建`learning_topic/config/params.yaml`:
```yaml
publisher_node:
  ros__parameters:
    timer_period: 1

subscriber_node:
  ros__parameters:
    # 订阅者节点暂时没有需要配置的参数
```

launch文件这么写：
```python
from launch import LaunchDescription
from launch_ros.actions import Node
from launch_ros.substitutions import FindPackageShare
from launch.substitutions import PathJoinSubstitution

def generate_launch_description():
    # 获取功能包路径
    pkg_share = FindPackageShare('learning_topic')
    
    return LaunchDescription([
        Node(
            package='learning_topic',
            executable='topic_helloworld_pub',
            name='publisher_node',
            parameters=[
                PathJoinSubstitution([pkg_share, 'config', 'params.yaml'])
            ]
        ),
        Node(
            package='learning_topic',
            executable='topic_helloworld_sub',
            name='subscriber_node',
            parameters=[
                PathJoinSubstitution([pkg_share, 'config', 'params.yaml'])
            ]
        )
    ])
```

## 命名空间隔离

可能希望一个节点能同时多次运行，比如打开两个小海龟窗口什么的，也就是一个节点的代码，同时运行在不同任务上，这个时候就用到命名空间：

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        # 在命名空间 ns1 中运行
        Node(
            package='learning_topic',
            executable='topic_helloworld_pub',
            name='publisher_node',
            namespace='ns1'
        ),
        Node(
            package='learning_topic',
            executable='topic_helloworld_sub',
            name='subscriber_node',
            namespace='ns1'
        ),
        # 在命名空间 ns2 中运行同一组节点
        Node(
            package='learning_topic',
            executable='topic_helloworld_pub',
            name='publisher_node',
            namespace='ns2'
        ),
        Node(
            package='learning_topic',
            executable='topic_helloworld_sub',
            name='subscriber_node',
            namespace='ns2'
        )
    ])
```
这样，ns1和ns2中的话题完全隔离


## 重映射(remapping)

如果你的摄像头节点默认发布到`/image_raw`，但你的图像处理节点期望接收`/camera/image_raw`，不用修改源码，可以用重映射：

```python
Node(
    package='usb_cam',
    executable='usb_cam_node_exe',
    name='usb_cam',
    remappings=[
        ('/image_raw', '/camera/image_raw')
    ]
),
Node(
    package='learning_topic',
    executable='topic_webcam_sub',
    name='webcam_sub',
    remappings=[
        ('/image_raw', '/camera/image_raw')  # 订阅节点也需重映射
    ]
)
```

## 包含其它launch文件(套娃)

这个其实让AI写就可以，事实上launch都可以让AI做，现在哪怕最便宜的模型，改个launch还是可以的，但这玩意自己改是真让人头痛
`learning_topic/launch/camera_display.launch.py`:
```python
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.substitutions import FindPackageShare
from launch.substitutions import PathJoinSubstitution

def generate_launch_description():
    pkg_share = FindPackageShare('learning_topic')
    
    return LaunchDescription([
        # 启动USB相机
        IncludeLaunchDescription(
            PythonLaunchDescriptionSource(
                PathJoinSubstitution([
                    FindPackageShare('usb_cam'),
                    'launch',
                    'usb_cam_node.launch.py'
                ])
            )
        ),
        # 启动显示图像的订阅节点
        IncludeLaunchDescription(
            PythonLaunchDescriptionSource(
                PathJoinSubstitution([
                    pkg_share,
                    'launch',
                    'webcam_sub.launch.py'
                ])
            )
        )
    ])

```