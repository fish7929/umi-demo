/**
 * @component UserEditModal.js
 * @description 用户编辑浮层页面
 * @time 2020-01-15 15:23
 * @author fishYu
 */

import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {
    /**
    * 构建函数
    * @param {Object} props 属性对象
    */
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    /**
    * 显示模态
    * @param {Object} e 事件对象
    */
    showModalHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };
    /**
    * 隐藏模态
    */
    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };
    /**
    * 确认按钮点击操作
    */
    okHandler = () => {
        const { onOk } = this.props;
        //antd 自带的form校验函数
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values);
                this.hideModelHandler();
            }
        });
    };
    /**
    * 渲染
    */
    render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, email, website } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <span>
                <span onClick={this.showModalHandler}>
                    {children}
                </span>
                <Modal
                    title="Edit User"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                >
                    <Form horizontal="true" onSubmit={this.okHandler}>
                        <FormItem
                            {...formItemLayout}
                            label="Name"
                        >
                            {
                                getFieldDecorator('name', {
                                    initialValue: name,
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Email"
                        >
                            {
                                getFieldDecorator('email', {
                                    initialValue: email,
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Website"
                        >
                            {
                                getFieldDecorator('website', {
                                    initialValue: website,
                                })(<Input />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        );
    }
}
//导出封装
export default Form.create()(UserEditModal);