/**
 * @component users.js
 * @description 数据请求层
 * @time 2020-01-15 14:47
 * @author fishYu
 */

import request from "../../../utils/request";
import { PAGE_SIZE } from "../../../constants";
/**
 * 请求用户数据
 * @param {Object} param0 请求后端数据参数
 */
export function fetch({ page = 1 }) {
    return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

/**
 * 删除用户数据
 * @param {Number} id 删除的对应数据id
 */
export function remove(id) {
    return request(`/api/users/${id}`, {
        method: "DELETE",
    });
}

/**
 * 修改用户数据
 * @param {Number} id 修改的对应数据id
 * @param {Object} values 修改的对应数据对象
 */
export function patch(id, values) {
    return request(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
    });
}

/**
 * 新增用户数据
 * @param {Object} values 修改的对应数据对象
 */
export function create(values) {
    return request(`/api/users`, {
        method: "POST",
        body: JSON.stringify(values),
    });
}