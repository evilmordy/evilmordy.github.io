---
date: '2026-08-20'
---

# 传递函数

## 问题描述

在写ROS2的时候要传递回调函数,比如我们创建一个简单的定时器：
```c++
const auto period = std::chrono::milliseconds(1000/fps_);
timer_ = this->create_wall_timer(period,this->timer_callback)
```

这种写法是错误的，因为ROS2的`create_wall_timer` 希望的第二个参数是：
```c++
std::function<void()>  // 普通函数对象，无参数
```

而如果你在类里定义这个函数，那么这个函数是成员函数，会隐含一个this参数：

```c++
void (YourClass::*)(void)  // 成员函数指针，含隐式this参数
```

导致函数指针类型不匹配

## 解决方案

我们无非就是希望搞一个新的函数，它包含回调函数的功能但是一个全新的函数，不具备隐含的参数

1. 使用lambda表达式：
```c++
const auto period = std::chrono::milliseconds(1000 / fps_);
timer_ = this->create_wall_timer(period,[this](){timer_callback();});
```

2. std::bind
```c++
const auto period = std::chrono::milliseconds(1000 / fps_);
timer_ = this->create_wall_timer(
    period, 
    std::bind(&YourClass::timer_callback, this)
);
```

## 类似情形

在React里，你总能看到函数里套函数，常常是箭头函数套功能函数：
```tsx
 useEffect(()=>{
    const fetchPosts = async()=>{
        try{
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/posts?published=true');
  
            if(!response.ok){
                throw new Error(`HTTP error. status:${response.status}`);
                 }
 
                const data = await response.json();
                 setPosts(data.items);
                 setTotal(data.total);
                 setError(null);
            }catch(err){
                 setError(err instanceof Error ? err.message:'获取数据失败');
                 console.error('Fetch error:',err);
            }finally{
                 setLoading(false);
            }
         };
 
         fetchPosts(); //为什么要再套一个箭头函数？因为useEffect希望一个没有返回值的函数而async函数总返回一个Promise
     },[]);
```

和lambda的思路一样，搞个新函数去运行功能函数

还有：
```tsx
// 删除列表项
const handleDelete = (id: number) => {
  setItems(items.filter(item => item.id !== id));
};

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        {item.name}
        <button onClick={() => handleDelete(item.id)}>删除</button>
      </li>
    ))}
  </ul>
);
```
这里套箭头函数是因为要传参，而传参就会带来括号，有括号就不是传递函数了而是执行函数
如果没有参数，完全可以
```tsx
<button onClick={the_func_without_params}>button</button>
```