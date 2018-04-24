import React, {Component} from 'react';
import Header from '../../common/header';
import { Select,Table, Icon, Divider,Button} from 'antd';
import "./index.css";
const Option = Select.Option;


const columns = [
    {
    title: '病人姓名',
    dataIndex: 'patientName',
    key: 'patientName',
    },
    {
    title: '下单时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
    },
    {
    title: '三餐状态',
    dataIndex: 'mealStatus',
    key: 'mealStatus',
    },
    {
        title: '订单总价',
        dataIndex: 'totalPrices',
        key: 'totalPrices',
    },
    {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '病人手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '病区',
        dataIndex: 'district',
        key: 'district',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '病区',
        dataIndex: 'district',
        key: 'district',
    },
];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];



class OrderPrint extends Component{


    render(){
        return(
            <div>
                <Header />
                <div className="orderExport-content-wrapper">
                    <div className="condition-wrapper">
                        <Select defaultValue="选择三餐" style={{ width: 120 }} onChange={() => this.handleChange()}>
                            <Option value="1">早餐</Option>
                            <Option value="2">午餐</Option>
                            <Option value="3">午餐</Option>
                        </Select>
                        <Button type="primary">搜索</Button>
                    </div>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default OrderPrint