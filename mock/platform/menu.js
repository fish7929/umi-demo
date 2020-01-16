import { delay } from 'roadhog-api-doc';
import loginErrorInfo from './util/loginErrorInfo';

const jsonData = {
  'result': [
    {
      'name': '首页',
      'path': '/',
      'icon': 'home',
      'children': null,
    },
    {
      'name': '角色管理',
      'path': null,
      'icon': 'star',
      'children': [
        {
          'name': '角色列表',
          'path': '/role',
          'icon': null,
          'children': null,
        },
      ],
    },
    {
      'name': 'antV图表',
      'path': null,
      'icon': 'line-chart',
      'children': [
        {
          'name': '柱状图',
          'path': '/charts/bar',
          'icon': null,
          'children': null,
        },
        {
          'name': '饼状图',
          'path': '/charts/pie',
          'icon': null,
          'children': null,
        },
        {
          'name': '折线图',
          'path': '/charts/line',
          'icon': null,
          'children': null,
        },
      ],
    },
    {
      'name': '权限管理',
      'path': '/right',
      'icon': 'setting',
      'children': null,
    },
  ],
  'error_info': null,
  'is_success': true,
};

const Api = {
  'GET /platform/menu/list': (req, res) => {
    const { platform_token } = req.headers;

    if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    } else {
      const loginErrorInfoValue = loginErrorInfo();
      res.send(JSON.stringify(loginErrorInfoValue));
    }
  },
};

export default delay(Api, 200);
