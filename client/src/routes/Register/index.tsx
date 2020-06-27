import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/profile';
import NavHeader from '@/components/NavHeader';
import { RouteComponentProps } from 'react-router-dom';
import { message, Form, Input, Button } from 'antd';
import { CombinedState } from '../../store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import { UserAddOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './index.less';

type StateProps = ReturnType<typeof mapStateProps>;
type DispatchProps = typeof actions;
interface Params {}
type Props = RouteComponentProps<Params> & StateProps & DispatchProps;

function Register(props: Props) {
  const onFinish = (values: any) => {
    props.register(values);
  };
  const onFinishedFailed = (errorInfo: any) => {
    message.error('Information invalid!' + errorInfo);
  }
  return (
    <>
      <NavHeader history={ props.history }>
        Register
      </NavHeader>
      <Form
          onFinish={ onFinish }
          onFinishFailed={ onFinishedFailed }
          className='login-form'
        >
          <Form.Item 
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Input your name please' }]}
          >
            <Input prefix={<UserAddOutlined className='site-form-item-icon'/>} placeholder='username' />
          </Form.Item>
          <Form.Item 
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Input your password please' }]}
          >
             <Input prefix={<LockOutlined className='site-form-item-icon'/>} placeholder='password' type='password'/>
          </Form.Item>
          <Form.Item 
            label='Confirm password'
            name='confirmPassword'
            rules={[{ required: true, message: 'Confirm your password please' }]}
          >
             <Input prefix={<LockOutlined className='site-form-item-icon'/>} placeholder='confirm password' type='password' />
          </Form.Item>
          <Form.Item 
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Input your email please' }]}
          >
             <Input prefix={<MailOutlined className='site-form-item-icon'/>} placeholder='email' type='email' />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Button type='primary' htmlType='submit' className='form-button'>
                Register
              </Button>
              <Button type='primary' className='form-button-circle' onClick={ () => props.history.push('/login') }>
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
    </>
  )
}

const mapStateProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateProps, actions)(Register);