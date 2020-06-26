import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import './index.less';

function Tabs() {
    return <footer>
        <NavLink exact to='/'><HomeOutlined/><span>乐乡聚</span></NavLink>
        <NavLink to='/cart'><ShoppingCartOutlined/><span>订单</span></NavLink>
        <NavLink to='/profile'><UserOutlined/><span>我的</span></NavLink>
    </footer>
}

export default withRouter(Tabs);