---
date: '2026-08-22'
---

# ROS2：关掉 rqt_image_view，桌面直接崩溃

---

上午美化完linux桌面后，下午继续ROS2

结果关rqt窗口时，系统发生不可修复的错误，直接没了，要注销，重启

看图正常，`topic hz` 也有数。关窗口，桌面没了。重新登录，没保存的东西一起没。

第一反应会怪 `camera_node` 析构，或者重装 `rqt_image_view`。都不用。先看死掉的进程叫什么：

```bash
ls -lt /var/crash | head
```

这台机器上是 `_usr_bin_gnome-shell`。日志里一句 `Clutter:ERROR ... actor != NULL`，然后 `GNOME Shell crashed with signal 6`。壳自己 abort，所有窗口陪葬，所以看起来像系统坏了。

崩的时候，圆角扩展还在给这扇正在拆掉的窗口画阴影（`win is null` / `refreshShadow`）。Blur my Shell 再把自动恢复踩一脚，会话就救不回来。

**简单来说就是关窗口，结果扩展还在给窗口画阴影，扩展拿到的是野指针**

`rqt_image_view` ：大约 30fps 刷图，还按画面比例改窗口大小。这台 Legion 又是 RTX 4060 + 核显双卡、NVIDIA `on-demand`、Qt5。扩展对每个普通窗口都动手，所以 `rqt_plot`、`rviz2`、甚至在 `rqt` 里打开 Image View（窗口类是 `rqt`，不是 `rqt_image_view`）同一条路。只把看图工具加进黑名单盖不住。

2020 年官方合过「切换话题时段错误」，2021 年「关掉时回调还在飞」的 issue 到现在还开着。那些是 rqt **自己的进程** segfault，终端打 `Segmentation fault`，桌面还在。

把扩展关掉即可：

```bash
gnome-extensions disable rounded-window-corners@fxgn
```

