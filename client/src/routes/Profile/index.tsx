import React, {PropsWithChildren, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { CombinedState } from '../../store/reducers';
import { ProfileState } from '../../store/reducers/profile';
import actions from '../../store/actions/profile'
import LOGIN_TYPES from '../../typings/login-types';
import {RouteComponentProps} from 'react-router-dom';
import { Descriptions, Button, Alert, message, Upload } from 'antd';
import NavHeader from '../../components/NavHeader';
import { AxiosError } from 'axios';
import './index.less';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params {}
type RouteProps = RouteComponentProps<Params>
type Props = PropsWithChildren<StateProps & DispatchProps & RouteProps>

function Profile(props: Props) {
  let [ loading, setLoading ] = useState(false);

  useEffect(() => {
      props.validate().catch((error: AxiosError) => message.error(error.message));
  }, []);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      let { success, data, message } = info.file.response;
      if (success) {
        setLoading(false);
        props.changeAvatar(data);
      } else {
        message.error(message);
      }
    }
  }
  let content;
  if (props.loginState == LOGIN_TYPES.UN_VALIDATE) {
      content = null;
  } else if (props.loginState == LOGIN_TYPES.LOGINED) {
    const uploadButton = (
      <div>
        { loading? <LoadingOutlined /> : <UploadOutlined /> }
        <div className='ant-upload-text'>上传</div>
      </div>
    )
      content = (
          <div className='user-info'>
              <Descriptions title='Current User'>
                  <Descriptions.Item label='Username'>{ props.user.username }</Descriptions.Item>
                  <Descriptions.Item label='Email'>{ props.user.email }</Descriptions.Item>
                  <Descriptions.Item label='Avatar'>
                    <Upload
                      name='avatar'
                      listType='picture-card'
                      className='avatar-upload'
                      showUploadList={ false }
                      action='http://localhost:8000/user/uploadAvatar'
                      beforeUpload={ beforeUpload }
                      data={{ userId: props.user._id }}
                      onChange={ handleChange }
                    >
                      { props.user.avatar ? (
                        <img src={ props.user.avatar } alt='avatar' style={{ width: '100%' }} />
                      ) : (
                        uploadButton
                      ) }
                    </Upload>
                  </Descriptions.Item>
              </Descriptions>
              <Button 
                type='primary'
                onClick={ async () => {
                  await props.logout();
                  props.history.push('/login');
                } }
              >Logout</Button>
          </div>
      )
  } else {
      content = (
          <>
              <Alert
                  showIcon
                  type='info'
                  message="You haven't login."
                  description='Please login or register first.'
              >
              </Alert>
              <div style={{ textAlign: 'center', padding: '50px' }} className='profile-btns'>
                  <Button type='dashed' onClick={ () => props.history.push('/login') }>Login</Button>
                  <Button type='dashed' style={{ marginLeft: '50px' }} onClick={()=> props.history.push('/register')}>Register</Button>
              </div>
          </>
      )
  }
  return (
      <section>
          <NavHeader history={ props.history }>Profile</NavHeader>
          {content}
      </section>
  )
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(mapStateToProps, actions)(Profile);

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Picture file must be JPG/PNG!');
  }
  const isLessThan2M = file.size / 1024 / 1024 < 2;
  if (!isLessThan2M) {
    message.error('Picture must less than 2 MB!');
  }
  return isJpgOrPng && isLessThan2M;
}