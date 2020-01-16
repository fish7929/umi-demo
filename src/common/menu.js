/** 
 * @component menu.js
 * @description 获取菜单按钮
 * @time 2020-01-16 16:00
 * @author fishYu
 */

import request from '../utils/request';
import api from "../utils/api";

/**
 * 获取菜单列表
 */
export function getMenu() {
    return request(api.platformMenuList);
}