import React, { PropsWithChildren, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "@/store/actions/home";
import HomeHeader from "./components/HomeHeader";
import { CombinedState } from "@/store/reducers";
import { HomeState } from "@/store/reducers/home";
import HomeSliders from "./components/HomeSliders";
import "./index.less";
import LessonList from "./components/LessonList";
import { loadMore, downRefresh, store, debounce, throttle } from "@/utils";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params {}
type Props = PropsWithChildren<
  RouteComponentProps<Params> & StateProps & DispatchProps
>;
function Home(props: Props) {
  const homeContainerRef = useRef(null);
  const lessonListRef = useRef(null);
  useEffect(() => {
    loadMore(homeContainerRef.current, props.getLessons);
    downRefresh(homeContainerRef.current, props.refreshLessons);
    homeContainerRef.current.addEventListener("scroll", () =>
      lessonListRef.current()
    );
    if (props.lessons) {
      homeContainerRef.current.scrollTop = store.get("homeScrollTop");
    }
    return () => {
      store.set("homeScrollTop", homeContainerRef.current.scrollTop);
    };
  }, []);
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      />
      <div className="home-container" ref={homeContainerRef}>
        <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
        <LessonList
          ref={lessonListRef}
          container={homeContainerRef}
          lessons={props.lessons}
          getLessons={props.getLessons}
          currentCategory={ props.currentCategory }
        />
      </div>
    </>
  );
}
let mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(mapStateToProps, actions)(Home);