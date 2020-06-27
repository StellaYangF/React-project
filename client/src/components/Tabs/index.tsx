import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import './index.less';

function Tabs() {
    return <footer>
        <NavLink exact to='/'><HomeOutlined/><span>Home</span></NavLink>
        <NavLink to='/cart'><ShoppingCartOutlined/><span>Order</span></NavLink>
        <NavLink to='/profile'><UserOutlined/><span>Profile</span></NavLink>
    </footer>
}

export default withRouter(Tabs);