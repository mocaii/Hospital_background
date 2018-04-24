import React, {Component} from 'react'
import Header from '../../common/header'
import { Table, Icon, Divider,Pagination,Button,Input,Modal,Form,Select,Upload,Checkbox, Row, Col} from 'antd';
import './index.css'
import {dispatch_func} from "../../modules/todayMenu";
import {dispatch_common_func} from "../../modules/common";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

const columns = [
    {
    title: '序号',
    dataIndex: 'id',
    },
    {
    title: '图片',
    dataIndex: 'sImg',
    render:(text,record) => (
        <img src="/static/image/dishes.jpg" alt="" height="40"/>
    )
    },
    {
    title: '名称',
    dataIndex: 'name',
    },
    {
        title: '价格',
        dataIndex: 'price',
    },
    {
        title: '操作',
        key: 'action',
        render:(text,record) => (
            <span>
              <a href="#" onClick={this.showModal}>编辑</a>
              <Divider type="vertical" />
              <a href="#">上架</a>
              <Divider type="vertical" />
              <a href="#">删除</a>
            </span>
        )
    },
];
const data = [{
    key: '1',
    id: '1',
    sImg: '',
    name: '鲜虾',
    price: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    id: '2',
    sImg: '',
    name: '鲜虾',
    price: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    id: '3',
    sImg: '',
    name: '鲜虾',
    price: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    id: '4',
    sImg: '',
    name: '鲜虾',
    price: 99,
    address: 'Sidney No. 1 Lake Park',
}];

//弹窗表单
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        constructor(props){
            super(props);
            this.state ={
                fileList:[]
            }
        }
        changePic(pic){
            console.log(pic.fileList[0].thumbUrl)
            this.setState({
                fileList: pic.fileList[0].thumbUrl
            })
        }

        onChangebox(checkedValues) {
            console.log('checked = ', checkedValues);
        }

        render() {
            let option = {
                sImg:this.state.fileList,
                bImg: ''
            }
            const props = {
                action: 'dishes/uploadImg.do',
                listType: 'picture',
                option: option
            };
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="添加新菜品"
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="菜品名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入菜品名称' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="菜品价格">
                            {getFieldDecorator('price', {
                                rules: [{ required: true, message: '请输入菜品价格' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="菜品描述">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </FormItem>
                        <FormItem label="推荐病区">
                            {getFieldDecorator('districts')(
                                <Checkbox.Group style={{ width: '100%' }} onChange={(value) => this.onChangebox(value)}>
                                    <Row>
                                        <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                                        <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                                        <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                                        <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                                        <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                                    </Row>
                                </Checkbox.Group>
                            )}
                        </FormItem>
                        <FormItem
                            label="上传小图"
                        >
                            <Upload {...props} onChange={(value) => this.changePic(value)}>
                                <Button>
                                    <Icon type="upload" /> upload
                                </Button>
                            </Upload>

                        </FormItem>
                        <FormItem
                            label="上传大图"
                        >
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>
                                </Upload>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

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


class MenuManagement extends Component{
    constructor(props){
        super(props);

        //请求菜单列表
        var option ={
            mealStatus: "morning",
            mealValue: "1",
            pn: 1
        };
        this.handleAjax("dishes/manageMenu.do",option,(result) => {
            console.log(result)
            if(result.result === true){
                this.props.getTodayMenuList(result.data.dishesList);
                this.props.getPageData(result.data.page);
            }else{
                Modal.error({
                    title: result.msg
                });
            }
        },"post")
    }

    componentDidMount(){
        //加载病区
        this.handleAjax("ward/loadDistrict.do","",(result) => {
            console.log(result);
            if(result.result === true){
                this.props.getDistrictsFunc(result.data.districts);
            }else{
                Modal.error({
                    title: result.msg
                });
            }
        },"post")
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

    //提交新添加的菜品
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            let option = {
                "name": values.name,
                "price":values.price,
                "description":values.description,
                "sImg":"1",
                "bImg":"1",
                "district":values.districts
            };

            this.handleAjax("dishes/add.do",option,(result) => {
                console.log(result);
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


            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

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

    render(){
        return(
            <div>
                <Header />
                <div className="menuManagement-wrapper">
                    <div className="condition-wrapper">
                        <Select defaultValue="morning" style={{ width: 120 }} onChange={(value) => this.handleChangeMealStatus(value)}>
                            <Option value="morning">早餐</Option>
                            <Option value="noon">午餐</Option>
                            <Option value="night">午餐</Option>
                        </Select>
                        <Select defaultValue="1" style={{ width: 120 }} onChange={() => this.handleChange()}>
                            <Option value="1">已上架</Option>
                            <Option value="2">已下架</Option>
                        </Select>
                        <Button type="primary" icon="search">搜索</Button>
                        <div className="add-dishes-btn">
                            <Button type="primary" onClick={this.showModal}>添加</Button>
                        </div>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={()=> this.onChange} />
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        districts={this.props.districts}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        ... state.menuManagement,
        ...state.common
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...dispatch_func,
    ...dispatch_common_func
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuManagement)