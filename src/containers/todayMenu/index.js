import React, {Component} from 'react'
import Header from '../../common/header'
import { Table, Icon, Divider,Pagination,Button,Input,Radio,Modal,Form,Select } from 'antd';
import './index.css'
import {dispatch_func} from "../../modules/todayMenu";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {dispatch_common_func} from "../../modules/common";


const Search = Input.Search;
const Option = Select.Option;
const confirm = Modal.confirm;

// rowSelection object indicates the need for row selection

class TodayMenu extends Component{
    constructor(props){
        super(props);
        this.state ={
            mealStatus: "morning"
        }

        //请求今日菜单
        var option ={
            mealStatus: "morning",
            mealValue: "1",
            pn: 1
        };
        console.log(option)
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

    handleChange(e) {
        this.setState({
            mealStatus:e
        })
        this.props.mealStatusFunc(e);

        //请求今日菜单
        var option ={
            mealStatus: e,
            mealValue: "1",
            pn: 1
        };
        console.log(option);
        this.handleAjax("dishes/manageMenu.do",option,(result) => {
            console.log(result);
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

    //下架菜品
    unshelve(id){
        console.log(id);
        console.log(this.props.mealStatus);

        var option ={
            mealStatus: this.props.mealStatus,
            mealValue: 1,
            dishesList:[
                {id: id}
            ]
        }
        ;
        this.handleAjax("/dishes/manageMenu.do",option,(result) => {
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

    }

    //批量下架
    batchUnshelve(){
        let that = this;
        confirm({
            title: "确定下架所选菜品吗？",
            onOk() {
                var option ={
                        mealStatus: that.props.mealStatus,
                        mealValue: 1,
                        dishesList: that.props.batchUnshelve
                    };
                that.handleAjax("dishes/editMealStatus.do",option,(result) => {
                    if(result.result === true){
                        console.log(result);
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

    //翻页
    onChangePage(page){
        console.log(page);
        //请求今日菜单
        var option ={
            mealStatus: this.props.mealStatus,
            mealValue: "1",
            pn: page
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

    render(){
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //保存选中的id
                let batchUnshelve = [];
                for(let i = 0;i < selectedRows.length; i++){
                    console.log(selectedRows[i].id);
                    let id ={
                        id : selectedRows[i].id
                    }
                    batchUnshelve.push(id);
                }
                console.log(batchUnshelve);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const columns = [
            {
                title: '图片',
                dataIndex: 'sImg',
                render:(text,record) => (
                    <img src={record.sImg} alt="" height="40"/>
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
              <a id={record.id} onClick={() => this.unshelve(record.id)}>下架</a>
            </span>
                )
            },
        ];
        return(
            <div>
                <Header />
                <div className="todayMune-wrapper">
                    <div className="condition-wrapper">
                        <Select value={this.state.mealStatus} style={{ width: 120 }} onChange={(e) => this.handleChange(e)}>
                            <Option value="morning">早餐</Option>
                            <Option value="noon">午餐</Option>
                            <Option value="night">晚餐</Option>
                        </Select>
                        <div className="unshelve-wrapper">
                            <Button type="primary" onClick={() => this.batchUnshelve()}>下架</Button>
                        </div>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.todayMenuList} pagination={false}/>
                    <Pagination
                        showQuickJumper
                        defaultPageSize={this.props.pageData.pageSize}
                        defaultCurrent={this.props.pageData.pageNow}
                        total={this.props.pageData.totalCount}
                        onChange={(value)=> this.onChangePage(value)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ... state.todayMenu,
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
)(TodayMenu)
