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
    message.error('表单验证失败！' + errorInfo);
  }
  return (
    <>
      <NavHeader history={ props.history }>
        <Form
          onFinish={ onFinish }
          onFinishFailed={ onFinishedFailed }
          className='login-form'
        >
          <Form.Item 
            label='用户名'
            name='username'
            rules={[{ required: true, message: '请输入你的用户名' }]}
          >
            <Input prefix={<UserAddOutlined/>} placeholder='用户名' />
          </Form.Item>
          <Form.Item 
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入你的密码' }]}
          >
             <Input prefix={<LockOutlined/>} placeholder='密码' type='password'/>
          </Form.Item>
          <Form.Item 
            label='确认密码'
            name='confirmPassword'
            rules={[{ required: true, message: '请输入你的确认密码' }]}
          >
             <Input prefix={<LockOutlined/>} placeholder='确认密码' type='password' />
          </Form.Item>
          <Form.Item 
            label='邮箱'
            name='email'
            rules={[{ required: true, message: '请输入你的邮箱' }]}
          >
             <Input prefix={<MailOutlined/>} placeholder='邮箱' type='email' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              注册
            </Button>
          </Form.Item>
        </Form>
      </NavHeader>
    </>
  )
}

const mapStateProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateProps, actions)(Register);