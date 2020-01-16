/**
 * @component Users.js
 * @description 用户组件
 * @time 2020-01-15 15:16
 * @author fishYu
 */

import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva';
import styles from './Users.css';
import { PAGE_SIZE } from '../../../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
    /**
     * 删除用户
     * @param {number} id 需要删除的id
     */
    function deleteHandler(id) {
        dispatch({
            type: 'users/remove',
            payload: id,
        })
    }
    /**
     * 切换页查询函数
     * @param {number} page 跳转的页码
     */
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }))
    }
    /**
     * 编辑用户
     * @param {number} id 对应条目的 id
     * @param {Object} values 需要编辑的用户信息对象
     */
    function editHandler(id, values) {
        dispatch({
            type: 'users/patch',
            payload: { id, values },
        })
    }
    /**
     * 创建用户
     * @param {Object} values 需要编辑的用户信息对象
     */
    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        })
    }
    /**
     * 配置表格的列
     */
    const columns = [
        {
            title: 'Name',  //表头
            dataIndex: 'name',  //对应的数据库字段
            key: 'name',
            render: text => <span className={styles['operation-span']}>{text}</span>,   //自定义内容
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Websit',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Operation',   //自定义操作列
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
                        <span className={styles['operation-span']}>Edit</span>
                    </UserModal>
                    <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
                        <span className={styles['operation-span']}>Delete</span>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <UserModal record={{}} onOk={createHandler}>
                        <Button type="primary">Create User</Button>
                    </UserModal>
                </div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    )
}
/**
 * 把store绑定到对应的组件属性上
 * @param {Object} state 全局的数据对象
 */
function mapStateToProps(state) {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
        loading: state.loading.models.users,
    }
}

export default connect(mapStateToProps)(Users);