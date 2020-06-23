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
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入你的用户名！' }]}
        >
          <Input prefix={ < UserAddOutlined/> } placeholder='用户名'></Input>
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入你的用户名！' }]}
        >
          <Input prefix={ < UserAddOutlined/> } placeholder='用户名' type='password'></Input>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>login</Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = (state: CombinedState): ProfileState =>state.profile;
export default connect(mapStateToProps, actions)(Login);