export default {
    treeShaking: true,
    routes: [
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                {
                    path: '/users',
                    component: './users/page',
                },
                {
                    path: '/',
                    component: '../pages/index',
                },
            ],
        },
    ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true,
                dynamicImport: false,
                title: 'umi-demo',
                dll: false,
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//,
                    ],
                },
            },
        ],
    ],
    define: {
        "process.env.apiUrl": ''   //后端请求的接口参数
    },
    proxy: {
        '/api': {   //接口转发代理
            target: 'http://jsonplaceholder.typicode.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        },
    },
};