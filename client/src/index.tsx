import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import {ConfigProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './assets/css/common.less';
import Tabs from './components/Tabs';
import Home from './routes/Home';
import Mine from './routes/Mine';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Login from './routes/Login';
import {ConnectedRouter} from 'connected-react-router';
import history from './store/history';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConfigProvider locale={zh_CN}>
                <main className='main-container'>
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/mine' component={Mine}></Route>
                        <Route path='/profile' component={Profile}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Redirect to='/'></Redirect>
                    </Switch>
                </main>
                <Tabs/>
            </ConfigProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)