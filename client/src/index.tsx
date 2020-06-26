import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import { store, persistor } from './store';
import {ConfigProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './assets/css/common.less';
import Tabs from './components/Tabs';
import Home from './routes/Home';
import Mine from './routes/Mine';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Login from './routes/Login';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import {ConnectedRouter} from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import history from './store/history';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={ null } persistor={ persistor }>
        <ConnectedRouter history={history}>
            <ConfigProvider locale={zh_CN}>
                <main className='main-container'>
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/mine' component={Mine}></Route>
                        <Route path='/profile' component={Profile}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/detail/:id' component={Detail}></Route>
                        <Route path='/cart' component={Cart}></Route>
                        <Redirect to='/'></Redirect>
                    </Switch>
                </main>
                <Tabs/>
            </ConfigProvider>
        </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)