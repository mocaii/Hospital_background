import React, {Component} from 'react';
import Header from '../../common/header';
import { Select,DatePicker,Button,Radio  } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts.common';
// 引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import "./index.css";
const Option = Select.Option;
const { RangePicker} = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class OrderExport extends Component{

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: '菜品销量' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'pie',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChange(date, dateString) {
        console.log(date, dateString);
    }

    onChangeChart(e) {
        console.log(e);
    }

    render(){
        return(
            <div>
                <Header />
                <div className="orderExport-content-wrapper">
                    <div className="condition-wrapper">
                        <Select defaultValue="选择科室" style={{ width: 120 }} onChange={(value) => this.handleChange(value)}>
                            <Option value="1">口腔科</Option>
                            <Option value="2">神经科</Option>
                            <Option value="3">外科</Option>
                        </Select>
                        <Select defaultValue="选择三餐" style={{ width: 120 }} onChange={() => this.handleChange()}>
                            <Option value="1">早餐</Option>
                            <Option value="2">午餐</Option>
                            <Option value="3">午餐</Option>
                        </Select>
                        <RangePicker onChange={() => this.onChange()} />
                        <Button type="primary" icon="search">搜索</Button>
                    </div>
                    <div className="charts-wrapper">
                        <div>
                            <RadioGroup onChange={() => this.onChangeChart()} defaultValue="a">
                                <RadioButton value="a">饼状图</RadioButton>
                                <RadioButton value="b">柱状图</RadioButton>
                            </RadioGroup>
                        </div>
                        <div id="main" style={{ width: 400, height: 400 }}></div>
                    </div>

                </div>
            </div>
        )
    }
}

export default OrderExport