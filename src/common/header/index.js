import React, { Component } from 'react'
import  './index.css'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends Component{

    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }


    render() {
        return (
            <div className="header_wrapper">
                <div className="icon_wrapper">
                    <img src="/static/image/hospital_logo.png" alt="" height="40"/>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <SubMenu title={<span><Icon type="coffee" />菜品管理</span>}>
                        <Menu.Item key="setting:1">
                            <Link to="/todayMenu">
                                今日菜单
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="setting:2">
                            <Link to="/menuManagement">
                                菜单管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title={<span><Icon type="profile" />订单管理</span>}>
                        <Menu.Item key="setting:3">
                            <Link to="/orderExport">
                                订单导出
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="setting:4">
                            <Link to="/orderPrint">
                                打印订单
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="setting:5"><Icon type="form" />
                        <Link to="/sickbedManagement">
                            病床管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:6"><Icon type="solution" />
                        <Link to="/accountManagement">
                            子账号管理
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header