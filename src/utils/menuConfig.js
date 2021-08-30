const menuConfig = [
    {
        key: '/home',
        title: '首页',
        icon: 'el-icon-s-home',
    },
    {
        key: '/products',
        title: '商品总览',
        icon: 'el-icon-menu',
        children: [
            {
                key: '/category',
                title: '品类管理',
                icon: 'el-icon-finished'
            },
            {
                key: '/product',
                title: '商品管理',
                icon: 'el-icon-turn-off'
            }
        ]
    },
    {
        key: '/role',
        title: '角色管理',
        icon: 'el-icon-more-outline'
    },
    {
        key: '/user',
        title: '用户管理',
        icon: 'el-icon-user'
    },
    {
        key: '/chart',
        title: '图形图表',
        icon: 'el-icon-data-board',
        children: [
            {
                key: '/chart/bar',
                title: '柱状图',
                icon: 'el-icon-data-analysis'
            },
            {
                key: '/chart/line',
                title: '线形图',
                icon: 'el-icon-data-line'
            },
            {
                key: '/chart/pie',
                title: '饼状图',
                icon: 'el-icon-pie-chart'
            }
        ]
    }
]

export default menuConfig