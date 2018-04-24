import React from 'react';
import { Route } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LoadableFunc from '../../common/loadable'
import './index.module.scss'

const Home = LoadableFunc(import('../home'));
const TodayMenu = LoadableFunc(import('../todayMenu'));
const SickbedManagement = LoadableFunc(import('../sickbedManagement'));
const AccountManagement = LoadableFunc(import('../accountManagement'));
const MenuManagement = LoadableFunc(import('../menuManagement'));
const OrderExport = LoadableFunc(import('../orderExport'));
const OrderPrint = LoadableFunc(import('../orderPrint'));

const App = () => (
    <LocaleProvider locale={zhCN}>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/todayMenu" component={TodayMenu}/>
            <Route exact path="/sickbedManagement" component={SickbedManagement}/>
            <Route exact path="/accountManagement" component={AccountManagement}/>
            <Route exact path="/menuManagement" component={MenuManagement}/>
            <Route exact path="/orderExport" component={OrderExport}/>
            <Route exact path="/orderPrint" component={OrderPrint}/>
        </div>
    </LocaleProvider>
);

export default App