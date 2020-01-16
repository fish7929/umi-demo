/**
 * @component example.js
 * @description 数据模型demo模板
 * @time 2020-01-15 16:34
 * @author fishYu
 */

export default {

    namespace: 'example',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};