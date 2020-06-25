import React, { PropsWithChildren, useRef, useEffect } from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import actions from '@/store/actions/home';
import HomeHeader from './components/homeHeader/index';
import HomeSliders from './components/homeSliders/index';
import { CombinedState } from '@/store/reducers';
import home, { HomeState } from '@/store/reducers/home';
import './index.less';
import { loadMore, downRefresh, store } from '@/utils';
import LessonList from './components/lessonList';

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params> & StateProps & DispatchProps>;

function Home(props: Props) {
  const homeContainerRef = useRef(null);
  const lessonListRef = useRef(null);
  useEffect(() => {
      loadMore(homeContainerRef.current, props.getLessons);
      downRefresh(homeContainerRef.current, props.refreshLessons);
      homeContainerRef.current.addEventListener('scroll', () => lessonListRef.current());
      if (props.lessons) {
          homeContainerRef.current.scrollTop = store.get('homeScrollTop');
      };
  }, []);
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
                refreshLessons={ props.refreshLessons }
            />
            <div 
                className='home-container' 
                ref={ homeContainerRef }
            >
              <HomeSliders sliders={ props.sliders } getSliders={ props.getSliders }></HomeSliders>
              <LessonList
                ref={ lessonListRef }
                container={homeContainerRef}
                lessons={ props.lessons }
                getLessons={ props.getLessons }
              ></LessonList>
            </div>
        </>
    )
}

let mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(
    mapStateToProps,
    actions,
)(Home);