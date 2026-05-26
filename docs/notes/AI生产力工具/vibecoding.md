# vibecoding

这玩意怎么说呢，不好评价

## 分清几个概念

AI的很多概念其实都挺简单：

### Prompt(提示词)

就是你给AI发的文字，可以去看吴恩达的prompt课程

### 大模型

大模型就是直接和你对话，读取prompt，从prompt生成回答的东西，比如ChatGPT

高质量编程建议使用`opus4.6`,`gpt5.5`

简单任务(比如不涉及特别重要的业务)：`Kimi2.5`,`Composer2.5`,`Deepseek-v4-flash`,`Deepseek-v4-pro`,`GLM5.1`等，反正你刷多了，推特首页全你妈是老登的测评和资本家的吹嘘。

我做blender和正经任务肯定是opus,网页小游戏，纯前端用的是Composer2.5和Deepseek

老马要推出Grok了，高低得尝尝咸淡～

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

- Claude Code(最常用)
- Codex
- cursor
- opencode

我用的是cursor,因为支持银联和支付宝，也用opencode，但是通常处理小任务

Codex十分强大，我在等它出Linux版本，其它操作系统的用户可以去体验一下

## 注意

没有基础不建议vibecoding,别变成拿着localhost在社交平台上发疯的沙毕。

基础教程：[链接](https://datawhalechina.github.io/easy-vibe/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack.html)

最最起码的：知道每个文件分别负责什么，如果这个都判断不出就别做了。