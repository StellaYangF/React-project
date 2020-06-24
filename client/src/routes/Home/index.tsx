import React, { PropsWithChildren, useRef } from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import actions from '@/store/actions/home';
import HomeHeader from './components/homeHeader/index';
import HomeSliders from './components/homeSliders/index';
import { CombinedState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import './index.less';

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params> & StateProps & DispatchProps>;

function Home(props: Props) {
  const homeContainerRef = useRef(null);
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
            <div className='home-container' ref={ homeContainerRef }>
              <HomeSliders sliders={ props.sliders } getSliders={ props.getSliders }></HomeSliders>
            </div>
        </>
    )
}

let mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(
    mapStateToProps,
    actions,
)(Home);