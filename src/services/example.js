/**
 * @component example.js
 * @description 数据请求demo模板
 * @time 2020-01-15 16:34
 * @author fishYu
 */

import request from "../utils/request";

export function query() {
    return request('/api/users');
}