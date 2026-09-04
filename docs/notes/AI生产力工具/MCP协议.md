# MCP协议

MCP(Model Context Protocol,模型上下文协议)协议是AI大模型与软件等外部工程交互信息的**传输协议**，在AI时代它就像HTTP，HTTPS一样成为必备的传输协议。

## 可以干什么

MCP现在已经被广泛接入各种软件里。比如，Matlab，blender等带有GUI，需要开发者和3D艺术家手动操作的软件，可以实现自动化——Matlab接入了AI，就可以自动化地完成你的科研任务。blender接入了AI，可以实现物体和场景的建模甚至动画设置。

所有东西都是终端命令和脚本！让我们开始吧。

## 配置MCP

MCP的配置，最好的方式是**去看官方文档**，比如搞科研的小伙伴就去看Claude和Matlab的文档

这里以blender的MCP配置为例——在cursor和opencode上配置MCP

### 安装blender插件：
前往[Github仓库](https://github.com/ahujasid/blender-mcp),找到`addon.py`,只需要下载它就可以了。然后打开Blender，依次点击
 ```bash
编辑 > 偏好设置 > 插件 > 从磁盘安装(向下的箭头)
```
选择插件中的addon.py文件

###  cursor配置blender MCP：
```bash
设置(齿轮图标) > Tools & MCPs > New MCP Server  
```
将建立一个`mcp.json`,MCP的配置都在这里

```json
{
  "mcpServers": {
    "blender": {
      "command": "uvx blender-mcp",
      "env": {},
      "args": []
    }
  }
}
```

### opencode MCP:

所有 MCP 服务器配置写在`~/.config/opencode/opencode.json` 的 mcp 字段下，可以用vim或其它文本编辑器找到。每个服务器需要一个唯一的名称作为键名，该名称也可以在提示词中用来指定调用哪个 MCP：

```json
{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["blender-mcp"]
    }
  }
}
```
然后在聊天框里输入/mcp,选择mcp激活

### 在blender里建立链接

打开blender,英文输入法下按`n`,可以发现多了一个叫做BlenderMCP的选项，点击`Connect to MCP Server`，则MCP运行在9876端口

这个时候就可以用AI做blender了！配置SKILLS规范AI能让AI的行为更好哦～

点击`Disconnect from MCP Server`，即可断开链接。

## Context7

Context7是基于MCP的“文档拉取”服务。注入从源头获取的、与你所用库版本完全对应的官方文档和代码示例，从而避免：

- 过时的示例、基于老旧训练数据的答案
- 大模型幻觉（hallucination）出不存在的 API
- 能跑但是版本不符合的code

### 下载
[官网](https://context7.com/install)
按照官网的提示，也就是：
```bash
npx ctx7 setup
```
然后会让你选择选项，选择MCP Server回车

就会看到让你选择要安装的地方，比如Claude Code,cursor,opencode,codex,Antigravity

选择你使用的安装即可，要登陆授权的步骤也很简单，授权就可以了

### 使用

在prompt末尾加上 use context7，例如：

```txt
Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7
```

### 计费

[官网计费介绍页面](https://context7.com/plans)

有Free Plan 但是有限制，限制频率和次数（好像是每月1000次）

## MCP投毒

事实上AI投毒无处不在，很多文件在人类眼里就是配置文件，但在Agent那里，配置文件几乎就是可执行文件，一旦从别的地方下载的MCP包含恶意攻击内容，Agent不会主动判断是否有害(至少现在是这样)而会直接执行。