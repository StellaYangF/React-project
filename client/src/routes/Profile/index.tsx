import React, {PropsWithChildren, useEffect} from 'react';
import {connect} from 'react-redux';
import { CombinedState } from '../../store/reducers';
import { ProfileState } from '../../store/reducers/profile';
import actions from '../../store/actions/profile'
import LOGIN_TYPES from '../../typings/login-types';
import {RouteComponentProps} from 'react-router-dom';
import { Descriptions, Button, Alert, message } from 'antd';
import NavHeader from '../../components/NavHeader';
import { AxiosError } from 'axios';
import './index.less';

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params {}
type RouteProps = RouteComponentProps<Params>
type Props = PropsWithChildren<StateProps & DispatchProps & RouteProps>

function Profile(props: Props) {
    useEffect(() => {
        props.validate().catch((error: AxiosError) => message.error(error.message));
    }, []);
    let content;
    if (props.loginState == LOGIN_TYPES.UN_VALIDATE) {
        content = null;
    } else if (props.loginState == LOGIN_TYPES.LOGINED) {
        content = (
            <div className='user-info'>
                <Descriptions title='Current User'>
                    <Descriptions.Item label='User'>Stella</Descriptions.Item>
                    <Descriptions.Item label='Tel'>15827059667</Descriptions.Item>
                    <Descriptions.Item label='Email'>stella@qq.com</Descriptions.Item>
                </Descriptions>
                <Button type='primary'>退出登录</Button>
            </div>
        )
    } else {
        content = (
            <>
                <Alert
                    type='warning'
                    message='当前未登录'
                    description='亲爱的用户你好，你当前尚未登陆，请你选择注册或者登陆'
                >
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <Button type='dashed' onClick={ () => props.history.push('/login') }>Login</Button>
                        <Button type='dashed' style={{ marginLeft: '50px' }} onClick={()=> props.history.push('/register')}>Register</Button>
                    </div>
                </Alert>
            </>
        )
    }
    return (
        <section>
            <NavHeader history={ props.history }>个人中心</NavHeader>
            {content}
        </section>
    )
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect()(Profile);