/**
 * @component request.js
 * @description 请求api封装工具
 * @time 2020-01-15 11:23
 * @author fishYu
 */

import { fetch } from 'dva';
import { message } from 'antd';
import { router } from 'umi';
import { codeMessage, isSuccess, platformToken } from '../common/constants'

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        switch (response.status) {
            case 500:
                router.push('/500');
                message.error(codeMessage[response.status]);
                break;
            case 403:
                router.push('/403');
                message.error(codeMessage[response.status]);
                break;
            case 404:
                router.push('/404');
                message.error(codeMessage[response.status]);
                break;
            default:
                message.error('发生未知错误！！！');
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

/**
* Requests a URL, returning a promise.
*
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
*/
export default async function request(url, options) {
    const preFix = process.env.apiUrl;   //环境变量定义值
    //把请求头中传入参数
    const objHead = {
        platform_token: sessionStorage.getItem(platformToken)
    }
    const headers = Object.assign({}, options.headers, objHead)
    options.headers = headers;

    const response = await fetch(preFix + url, options);
    checkStatus(response);

    const data = await response.json();
    const ret = {
        data,
        headers: {},
    };
    //没登录的情况下 去登录页面
    if (data && data[isSuccess] === false && data.error_info.code === 401) {
        router.push('/login');
    }
    if (response.headers.get('x-total-count')) {
        ret.headers['x-total-count'] = response.headers.get('x-total-count');
    }

    return ret;
}