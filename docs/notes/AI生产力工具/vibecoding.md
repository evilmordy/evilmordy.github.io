# vibecoding

这玩意怎么说呢，不好评价，因为模型能力提升了，但安全性却没有随之上升。

## 分清几个概念

AI的很多概念其实都挺简单：

### Prompt(提示词)

就是你给AI发的文字，可以去看吴恩达的prompt课程

### 大模型

大模型就是直接和你对话，读取prompt，从prompt生成回答的东西，比如ChatGPT

如果你是富哥：`opus`,`fable`,`gpt`,`grok` 御三家的模型(Gemini被踢了，悲),国内的Fable级模型是`Kimi K3`

其它选择：`Qwen`,`Composer`,`Deepseek-vxx-flash`,`Deepseek-vxx-pro`,`GLM5`,`Gemini`等，反正你刷多了，推特首页全你妈是老登的测评和资本家的吹嘘。


### Agent

AI一开始只能和我们对话，根据AI输出的答案操作电脑的就是Agent工具，比如读文件，写入文件，在终端输入命令并执行

一般的工具都有Agent模式和Plan模式，Plan就是先和AI商量好要干什么，确定计划后再执行，防止改烂了或AI没有理解我们的需求，在opencode里，对应`Build`和`Plan`模式


### SKILLS

以前我们只有通过prompt来规范AI的行为，为了规范，prompt往往很长，且有大量重复

何不放一个.md文件来规范它？让AI自己读取规范需求？

SKILL就这样诞生了——当然这只是简单的理解

SKILL是按需求加载的，它要求`SKILL.md`开头有`name`,`description`,一个告诉AI这个SKILL叫做什么名字，一个描述这个SKILL，比如：

```markdown
---
name: pdf-processing
description: 从 PDF 中提取文本和表格，填写表单，并合并文档
---

# PDF 处理

## 使用场景
当需要对 PDF 文件进行操作时使用，例如：

- 提取 PDF 文本或表格数据
- 填写 PDF 表单
- 合并多个 PDF 文件

## 提取文本
- 使用 `pdfplumber` 提取文本型 PDF 内容  
- 扫描版 PDF 需配合 OCR 工具  

## 填写表单
- 读取 PDF 表单字段  
- 按输入数据填充并生成新文件  
```

当你在做网站前端的vibecoding时，AI不会阅读你的pdf-processing，因为你的description告诉AI这个是做pdf处理的，与现在任务无关，这就节省了token和开发者的时间

## 常用的工具

- Claude Code
- Codex
- cursor
- opencode
- Grok Build
- Deepseek Harness

## MCP
一种通信协议，详细请看：[MCP协议](/notes/AI生产力工具/MCP协议)

## 配置API Key 使用AI模型
### 从官网开放平台获取API Key
例如[deepseek开放平台](https://platform.deepseek.com/usage),然后就充值，复制API Key.
注意API Key只能复制一次(通常)

### 其它AI平台获取API Key
常见的平台有OpenRouter,Ofox；ofox是没有地区限制的，用国外模型开个梯子就能连上
都是只能复制一次！请妥善保管您的API Key!只能在本地上，不能暴露给任何AI任何人！

备份好API Key，然后就按照各个平台的官方文档去配置，填写到相应的位置即可。

还有一些小网站用`sub2api`，这个可以自己去找

## 注意

AI会犯的错误都是人类不会犯的，它或许在其它方面表现得很好很安全，但是：
- 鉴权：由于训练数据里开源的demo和tutorial代码太多，闭源的生产环境代码微乎其微，AI很多时候不会给你写鉴权
- 不存在的包：AI毕竟还是概率模型，它觉得某个包存在就会给你`npm install`,如果有非白帽提前抢占了这个包名，那就完蛋了。
- 敏感信息不存`.env`:现在这个问题还好，因为prisma等ORM会给你自动生成`.env`,某种程度上引导AI把信息放这里。

基础教程：[链接](https://datawhalechina.github.io/easy-vibe/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack.html)