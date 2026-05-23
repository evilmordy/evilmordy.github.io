import { DefaultTheme } from "vitepress";

export const nav:DefaultTheme.NavItem=[
    {
        text:'首页',
        link:'/'
    },
    {
        text:'关于我',
        items:[
            {
                text:'我的社交账号',
                link:'/column/media/'
            },
            {
                text:'个人简介',
                link:'/column/personal'
            }
        ]
    },
    {
        text:'知识库',
        link:'/notes/'
    }
]

