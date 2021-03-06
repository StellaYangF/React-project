import React from 'react';
import { message, Form, Input, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import NavHeader from '@/components/NavHeader';
import { CombinedState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import { UserAddOutlined } from '@ant-design/icons';
import './index.less';
import actions from '@/store/actions/profile';

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params {}
type Props = RouteComponentProps<Params> & StateProps & DispatchProps;

function Login(props: Props) {
  const onFinish = (values: any) => props.login(values);
  const onFinishFailed = (errorInfo: any) => message.error('表单验证失败！', + errorInfo);
  return (
    <>
      <NavHeader history={ props.history }>Login</NavHeader>
      <Form
        onFinish={ onFinish }
        onFinishFailed={ onFinishFailed }
        className='login-form'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Input your username please' }]}
        >
          <Input prefix={ < UserAddOutlined/> } placeholder='username'></Input>
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Input your password please' }]}
        >
          <Input prefix={ < UserAddOutlined/> } placeholder='password' type='password'></Input>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit' className='form-button'>Login</Button>
            <Button type='primary' className='form-button-circle' onClick={ () => props.history.push('/register') }>Register</Button>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = (state: CombinedState): ProfileState =>state.profile;
export default connect(mapStateToProps, actions)(Login);