import React, {Component} from 'react'
import Header from '../../common/header'
import { Table, Icon, Divider,Pagination,Button,Input,Radio,Modal,Form } from 'antd';
import './index.css'
import {dispatch_func} from '../../modules/accountManagement'
import {dispatch_common_func} from '../../modules/common'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;


// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

//弹窗表单，添加子账号弹窗
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="添加子账号"
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="账号名">
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '账号名称不能为空！' }],
                            })(
                                <Input placeholder="请输入账号名称"/>
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password',{
                                rules: [{ required: true, message: '密码不能为空！' }],
                            })(<Input placeholder="请输入密码"/>)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

//修改权限弹窗
const ChangePermissionForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="添加子账号"
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="账号名">
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '账号名称不能为空！' }],
                            })(
                                <Input placeholder="请输入账号名称"/>
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password',{
                                rules: [{ required: true, message: '密码不能为空！' }],
                            })(<Input placeholder="请输入密码"/>)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class AccountManagement extends Component{
    constructor(props){
        super(props);
        this.handleAjax.bind(this);

        let result = {
            "result": true,
            "msg": "获取数据成功",
            "data": {
                "account": {
                    "page": {
                        "pageNow": 1,
                        "pageSize": 12,
                        "totalCount": 36,
                        "totalPageCount": 3,
                        "startPos": 0,
                        "hasFirst": false,
                        "hasPre": false,
                        "hasNext": true,
                        "hasLast": true
                    },
                    "list": [
                        {
                            "id": "30a1e1b67b75427c97f8e67a15777a2e",
                            "account": "103"
                        },
                        {
                            "id": "",
                            "account": "111"
                        },
                        {
                            "id": "43da176638fe44b4b1e8d7b037d32c10",
                            "account": "112"
                        }
                    ]
                }
            }
        };

        this.props.getAccountData(result.data.account.list);
        this.props.getPageData(result.data.account.page);

        //请求子账号列表
        var option ={
            pn: 1
        }
        this.handleAjax("/account/show.do",option,(result) => {
            if(result.result === true){
                this.props.getAccountData(result.data.list);
                this.props.getPageData(result.data.page);
            }else{
                Modal.error({
                    title: result.msg
                });
            }
        },"post")
    }

    //ajax请求
    handleAjax(url, options, successHandle, requestType){
        requestType = requestType || "get";
        $.ajax({
            type:requestType,
            url: url,
            dataType:'json',
            data:options,
            cache: false,
            success: (result)=>{
                successHandle(result);
            }
        });
    }

    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    //提交新添加的子账号信息
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            this.handleAjax("/account/add.do",values,(result) => {
                if(result.result === true){
                    Modal.success({
                        title: result.msg
                    });
                }else{
                    Modal.error({
                        title: result.msg
                    });
                }
            },"post");

            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    //删除子账号提示框
    showDeleteConfirm(id,account) {
        let that = this;
        let title = '确定删除子账号（'+account+'）吗？';
        confirm({
            title: title,
            onOk() {
                let option ={
                    id: id
                };
                that.handleAjax("account/delete.do",option,(result) => {
                    if(result.result === true){
                        Modal.success({
                            title: result.msg
                        });
                    }else{
                        Modal.error({
                            title: result.msg
                        });
                    }
                },"post")
            },
            onCancel() {},
        });
    }

    //显示共多少页
    showTotal(totalPageCount){
        return `共 ${totalPageCount} 页`;
    }

    //翻页
    onChange = (page) => {
        console.log(page);

        //请求子账号列表
        var option ={
            pn: page
        }
        this.handleAjax("/account/show.do",option,(result) => {
            if(result.result === true){
                this.props.getAccountData(result.data.list);
                this.props.getPageData(result.data.page);
            }else{
                console.log("result.msg");
            }
        },"post")
    };

    render(){
        const columns = [
            {
                title: '账号名',
                key: 'account',
                dataIndex: 'account',
            },
            {
                title: '操作',
                key: 'action',
                render:(text,record) => (
                    <span id={record.id}>
              <a onClick={() => this.showDeleteConfirm(record.id,record.account)}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => this.showModal()}>更改权限</a>
              <Divider type="vertical" />
               <a>更改密码</a>
            </span>
                )
            },
        ];
        return(
            <div>
                <Header />
                <div className="accountManagement-wrapper">
                    <div className="condition-wrapper">
                        <div className="add-account">
                            <Button type="primary"  onClick={this.showModal}>添加子账号</Button>
                        </div>
                    </div>

                    <Table columns={columns} dataSource={this.props.accountData} pagination={false}/>
                    <Pagination
                        showQuickJumper
                        defaultPageSize={this.props.pageData.pageSize}
                        defaultCurrent={this.props.pageData.pageNow}
                        total={this.props.pageData.totalCount}
                        onChange={this.onChange}
                        showTotal={() => this.showTotal(this.props.pageData.totalPageCount)}
                    />
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                    <ChangePermissionForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </div>
            </div>
        )
    }

}


// const mapStateToProps = state => (state.accountManagement,state.common);
const mapStateToProps = state => {
    return{
        ... state.accountManagement,
        ...state.common
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
        ...dispatch_func,
        ...dispatch_common_func
}, dispatch);

// const mapDispatchToProps = dispatch => {
//     return{
//         ...bindActionCreators(dispatch_func,dispatch),
//         ...bindActionCreators(dispatch_common_func,dispatch),
//     }
// };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountManagement)
