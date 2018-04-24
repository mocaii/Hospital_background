import React, {Component} from 'react'
import Header from '../../common/header'
import { Table, Icon, Divider,Pagination,Button,Input,Radio,Modal,Form,Cascader,Upload } from 'antd';
import './index.css'
const Search = Input.Search;
const FormItem = Form.Item;


const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        render: text => <a href="#">{text}</a>,
    },
    {
        title: '病区',
        dataIndex: 'district',
    },
    {
        title: '栋',
        dataIndex: 'building',
    },
    {
        title: '层',
        dataIndex: 'floor',
    },
    {
        title: '房',
        dataIndex: 'room',
    },
    {
        title: '操作',
        key: 'action',
        render:(text,record) => (
            <span>
              <a href="#">编辑</a>
              <Divider type="vertical" />
              <a href="#">删除</a>
            </span>
        )
    },
];
const data = [{
    key: '1',
    id: '1',
    district: '1区',
    building: '2栋',
    floor: '3层',
    room: '4房',
}, {
    key: '2',
    id: '1',
    district: '1区',
    building: '2栋',
    floor: '3层',
    room: '4房',
}, {
    key: '3',
    id: '1',
    district: '1区',
    building: '2栋',
    floor: '3层',
    room: '4房',
}, {
    key: '4',
    id: '1',
    district: '1区',
    building: '2栋',
    floor: '3层',
    room: '4房',
}];


const options = [
    {
    value: '1区',
    label: '1区',
    children: [{
        value: '1栋',
        label: '1栋',
        children: [{
            value: '1层',
            label: '1层',
            children: [{
                value: '1房',
                label: '1房',
            }]
        }],
    }],
    },
    {
    value: '2区',
    label: '2区',
    children: [{
        value: '2栋',
        label: '2栋',
        children: [{
            value: '2层',
            label: '2层',
            children: [{
                value: '2房',
                label: '2房',
            }]
        }],
    }],
}]

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


//弹窗表单
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="上传病床信息"
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem
                            label="上传病床信息excel表"
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


class SickbedManagement extends Component{
    onChange(){

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
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render(){
        return(
            <div>
                <Header />
                <div className="sickBed-wrapper">
                    <div className="condition-wrapper">
                        <Cascader options={options} onChange={this.onChange} placeholder="Please select" />
                        <Button type="primary">搜索</Button>
                        <div className="upload-excel">
                            <Button type="primary"  onClick={this.showModal}>上传病房信息</Button>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={()=> this.onChange} />
                    <CollectionCreateForm
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


export default SickbedManagement