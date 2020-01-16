/** 
 * @component config.staging.js
 * @description staging环境的配置文件
 * @time 2020-01-16 14:45
 * @author fishYu
 */
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
        "process.env.apiUrl": 'https://www.staging.com'   //后端请求接口
    },
};