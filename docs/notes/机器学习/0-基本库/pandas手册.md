"它和熊猫没有任何关系，不要对境外势力抱有幻想"

# 第一章：Pandas 入门基础

## 1.1 认识 Pandas

**Pandas 是什么？**

- Python 中最常用的数据分析工具
- 提供了类似 Excel 的数据处理功能
- 在数据科学和机器学习中必不可少

## 1.2 基本环境配置

```python
import pandas as pd
import numpy as np
```

# 第二章：文件读写操作（重点）

## 2.1 读取文件

```python
# 1. 读取 CSV 文件（最常用）
df = pd.read_csv('data.csv')  # 最基本的读取方式

# 带参数的读取（常用参数解释）
df = pd.read_csv(
    'data.csv',
    encoding='utf-8',       # 编码方式，中文文件常用
    index_col=0,            # 将第 1 列作为索引
    header=0,               # 将第 1 行作为列名
    na_values=['NA', '?'],  # 将 'NA' 和 '?' 视为缺失值
)

# 2. 读取 Excel 文件
df = pd.read_excel(
    'data.xlsx',
    sheet_name='Sheet1',  # 指定要读取的表单
    header=0,             # 第 1 行作为列名
)

# 3. 读取文本文件
df = pd.read_table(
    'data.txt',
    sep='\t',           # 分隔符，制表符分隔的文件
    encoding='utf-8',   # 编码方式
)

# 查看读取的数据基本信息
print("数据的基本信息：")
print(df.info())  # 显示数据类型和缺失值信息
print("\n前 5 行数据：")
print(df.head())  # 查看前 5 行
```

## 2.2 保存文件

```python
# 1. 保存为 CSV 文件（最常用）
df.to_csv(
    'output.csv',
    index=False,    # 不保存索引
    encoding='utf-8',  # 使用 utf-8 编码（支持中文）
)

# 2. 保存为 Excel 文件
df.to_excel(
    'output.xlsx',
    sheet_name='Sheet1',  # 指定表单名
    index=False,          # 不保存索引
)
```

# 第三章：数据查看与选择（核心基础）

## 3.1 基本查看操作

```python
# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '年龄': [25, 30, 22, 28, 35],
    '成绩': [85, 92, 78, 95, 88],
    '城市': ['北京', '上海', '广州', '深圳', '杭州']
}
df = pd.DataFrame(data)

# 1. 查看数据基本信息
print("数据形状（行数，列数）：", df.shape)
print("\n列名列表：", df.columns.tolist())
print("\n数据类型：\n", df.dtypes)

# 2. 查看数据内容
print("\n前 3 行数据：")
print(df.head(3))    # 查看前 3 行
print("\n后 2 行数据：")
print(df.tail(2))    # 查看后 2 行

# 3. 查看统计信息
print("\n数值列统计信息：")
print(df.describe())    # 只会统计数值列
```

## 3.2 数据选择

DataFrame 的每一行都是 Series。

```python
# 1. 选择单列
print("选择年龄这一列：")
print(df['年龄'])  # 返回 Series

# 2. 选择多列
print("\n选择多列：")
print(df[['姓名', '年龄', '成绩']])

# 3. loc 方法
# 使用标签（列名和索引）进行选择
print("\n使用 loc 选择数据：")
print("选择第 0 行：")
print(df.loc[0])    # 选择第 0 行，如果规定了 index 的标签也可以用 index 的标签
print("\n选择第 0 行的 '姓名' 和 '年龄'：")
print(df.loc[0, ['姓名', '年龄']])    # 选择第 0 行的指定列
print("\n选择第 0 行到第 2 行的 '姓名' 和 '年龄'：")
print(df.loc[0:2, ['姓名', '年龄']])    # 选择多行多列

# 4. iloc 方法（重点）
# 使用整数位置进行选择
print("\n使用 iloc 选择数据：")
print("选择第 0 行：")
print(df.iloc[0])    # 选择第 0 行
print("\n选择第 0 行的第 0、1 列：")
print(df.iloc[0, [0, 1]])    # 选择第 0 行的第 0、1 列
print("\n选择第 0-2 行的第 0、1 列：")
print(df.iloc[0:3, 0:2])    # 选择多行多列

# 5. 条件选择（筛选满足某一条件的行）
print("\n条件选择：")
print("年龄大于 25 的：")
print(df[df['年龄'] > 25])

# 多条件选择
print("\n年龄大于 25 且成绩大于 90 的：")
print(df[(df['年龄'] > 25) & (df['成绩'] > 90)])

# 6. isin 方法（锁定满足具体值的行）
print("\n城市在北京或上海的：")
print(df[df['城市'].isin(['北京', '上海'])])
```

## 3.3 数据修改和插入（重点）

上面数据筛选的方法返回的都是视图而不是拷贝，所以可以直接用来修改 DataFrame 的值。

```python
# 1. 修改单个值
df.loc[0, '成绩'] = 87
print("修改后的数据：")
print(df)

# 2. 修改整列
df['年龄'] = df['年龄'] + 1  # 所有人年龄加 1
print("\n年龄加 1 后的数据：")
print(df)

# 3. 插入新列（重点）
# insert 方法
df.insert(
    loc=2,              # 插入位置（列索引）
    column='性别',       # 列名
    value=['男', '女', '男', '女', '男'],  # 数据，可以不是列表，单输入一个 1 会把那一列全部插入 1
)
print("\n插入性别列后的数据：")
print(df)

# 直接赋值添加新列
df['是否及格'] = df['成绩'] >= 60
print("\n添加是否及格列后的数据：")
print(df)

# 4. 删除列
# drop 方法
df_new = df.drop('是否及格', axis=1)  # axis=1 表示删除列
print("\n删除是否及格列后的数据：")
print(df_new)

# 5. 重命名列
df = df.rename(columns={'成绩': '期末成绩'})
print("\n重命名后的数据：")
print(df)
```

# 第四章：数据清洗基础

## 4.1 处理缺失值

```python
# 创建包含缺失值的数据
df_missing = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', None, '钱七'],
    '年龄': [25, None, 22, 28, 35],
    '成绩': [85, 92, None, 95, 88]
})

# 1. 检查缺失值
print("检查缺失值：")
print(df_missing.isnull().sum())  # 每列缺失值数量
print("\n具体缺失值位置：")
print(df_missing.isnull())  # 显示具体哪些位置是缺失值

# 2. 处理缺失值
# 删除法
df_drop = df_missing.dropna()  # 删除含有缺失值的行
print("\n删除缺失值后：")
print(df_drop)

# 填充法（多种方式）
# 用固定值填充
df_fill1 = df_missing.fillna(0)
print("\n用 0 填充缺失值：")
print(df_fill1)

# 用平均值填充（数值列）
df_fill2 = df_missing.copy()
df_fill2['年龄'] = df_fill2['年龄'].fillna(df_fill2['年龄'].mean())
df_fill2['成绩'] = df_fill2['成绩'].fillna(df_fill2['成绩'].mean())
print("\n用平均值填充数值列：")
print(df_fill2)
```

## 4.2 处理重复值

```python
# 创建包含重复行的数据
df_dup = pd.DataFrame({
    '姓名': ['张三', '李四', '张三', '王五', '李四'],
    '年龄': [25, 30, 25, 22, 30],
    '成绩': [85, 92, 85, 78, 92]
})

# 1. 检查重复值
print("重复行数量：", df_dup.duplicated().sum())
print("\n显示重复行：")
print(df_dup[df_dup.duplicated()])

# 2. 删除重复值
df_unique = df_dup.drop_duplicates()
print("\n删除重复行后：")
print(df_unique)

# 3. 基于特定列删除重复值
df_unique_name = df_dup.drop_duplicates(subset=['姓名'])
print("\n基于姓名列删除重复行：")
print(df_unique_name)
```

# 第五章：基础统计分析

## 5.1 描述性统计

```python
# 创建示例数据
df = pd.DataFrame({
    '年龄': [25, 30, 22, 28, 35, 27, 29, 32, 26, 31],
    '工资': [8000, 12000, 7000, 10000, 15000, 9000, 11000, 13000, 8500, 12500],
    '工龄': [1, 5, 0.5, 3, 8, 2, 4, 6, 2, 5]
})

# 1. 基本统计量
print("基本统计信息：")
print(df.describe())

# 2. 单列统计
print("\n年龄的基本统计：")
print("平均值：", df['年龄'].mean())
print("中位数：", df['年龄'].median())
print("标准差：", df['年龄'].std())
print("最小值：", df['年龄'].min())
print("最大值：", df['年龄'].max())
```

## 5.2 分组统计（初步）

```python
df['年龄段'] = pd.cut(
    df['年龄'],
    bins=[20, 25, 30, 35, 40],
    labels=['20-25岁', '26-30岁', '31-35岁', '36-40岁'],
)
print("\n按年龄段统计平均工资：")
print(df.groupby('年龄段')['工资'].mean())
```

# 第六章：数据合并（基础操作）

## 6.1 简单数据合并

```python
# 创建两个数据框
df1 = pd.DataFrame({
    '学号': ['001', '002', '003', '004'],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '成绩': [85, 92, 78, 95]
})
df2 = pd.DataFrame({
    '学号': ['001', '002', '003', '004'],
    '城市': ['北京', '上海', '广州', '深圳'],
    '专业': ['计算机', '数学', '物理', '化学']
})

# 1. 简单合并（基于相同的列）
result = pd.merge(df1, df2, on='学号')
print("基于学号合并两个表：")
print(result)

# 2. 连接操作（添加行）
df3 = pd.DataFrame({
    '学号': ['005', '006'],
    '姓名': ['钱七', '孙八'],
    '成绩': [88, 91]
})
# 竖向合并（添加行）
result_concat = pd.concat([df1, df3])
print("\n竖向合并结果：")
print(result_concat)
```
