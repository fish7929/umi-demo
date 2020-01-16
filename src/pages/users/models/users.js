/**
 * @component users.js
 * @description users的数据业务操作层
 * @time 2020-01-15 14:46
 * @author fishYu
 */

import * as usersService from "../services/users";


/**
 * 建议最多一层嵌套，以保持 state 的扁平化，深层嵌套会让 reducer 很难写和难以维护。
 */

export default {
    namesapce: 'users',
    state: {
        list: [],
        total: null,
        page: null,
    },
    reducers: {
        //纯函数, 只修改state
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page };
        }
    },
    effects: {
        /**
        * dva 里，effects 和 subscriptions 的抛错全部会走 onError hook，所以可以在 onError 里统一处理错误。
        */

        //获取数据
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(usersService.fetch, { page });
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        //删除数据
        *remove({ payload: id }, { call, put, select }) {   //put用于触发 action 。  call 用于调用异步逻辑，支持 promise 。 select 用于从 state 里获取数据。
            yield call(usersService.remove, id);
            const page = yield select(state => state.uses.page);  //查询当前的页码
            yield put({
                type: 'fetch',
                payload: { page },
            });
        },
        //修改数据
        *patch({ payload: { id, values } }, { call, put, select }) {
            yield call(usersService.patch, id, values);
            const page = yield select(state => state.uses.page);  //查询当前的页码
            yield put({
                type: 'fetch',
                payload: { page },
            });
        },
        //创建数据
        *create({ payload: values }, { call, put, select }) {
            yield call(usersService.create, values);
            const page = yield select(state => state.uses.page);  //查询当前的页码
            yield put({
                type: 'fetch',
                payload: { page },
            });
        }
    },
    //试试监听
    subscriptions: {
        /**
         * subscriptions 是订阅，用于订阅一个数据源，然后根据需要 dispatch 相应的 action。
         * 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
         * 格式为 ({ dispatch, history }) => unsubscribe 。
         * 
         * path-to-regexp Package
         * 如果 url 规则比较复杂，比如 /users/:userId/search，那么匹配和 userId 的获取都会比较麻烦。这是推荐用 path-to-regexp 简化这部分逻辑。
         * import pathToRegexp from 'path-to-regexp';
         * in subscription
         * const match = pathToRegexp('/users/:userId/search').exec(pathname);
         * if (match) {
         *    const userId = match[1];
         *  // dispatch action with userId
         * }
         */

        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/users') {
                    dispatch({ type: 'fetch', payload: query });
                }
            })
        }
    }
};