import React, { useState, useEffect, PropsWithChildren } from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import NavHeader from "@/components/NavHeader";
import { getLesson } from "@/api/home";
import { RouteComponentProps } from "react-router";
import Lesson from "@/typings/lesson";
import { StaticContext } from "react-router";
import { LessonResult } from "@/typings/lesson";
import actions from "@/store/actions/cart";
import { CombinedState } from "@/store/reducers";
import "./index.less";
const { Meta } = Card;
interface Params {
  id: string;
}
type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>;
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = PropsWithChildren<RouteProps & StateProps & DispatchProps>;

function Detail(props: Props) {
  let [lesson, setLesson] = useState<Lesson>({} as Lesson);
  useEffect(() => {
    (async () => {
      let lesson: Lesson = props.location.state;
      if (!lesson) {
        let id = props.match.params.id;
        let result: LessonResult = await getLesson<LessonResult>(id);
        if (result.success) lesson = result.data;
      }
      setLesson(lesson);
    })();
  }, []);
  const addCartItem = (lesson: Lesson) => {
    let video: HTMLVideoElement = document.querySelector("#lesson-video");

    let cart: HTMLSpanElement = document.querySelector(
      ".anticon.anticon-shopping-cart"
    );
    let clonedVideo: HTMLVideoElement = video.cloneNode(
      true
    ) as HTMLVideoElement;
    let videoWith = video.offsetWidth;
    let videoHeight = video.offsetHeight;
    let cartWith = cart.offsetWidth;
    let cartHeight = cart.offsetHeight;
    let videoLeft = video.getBoundingClientRect().left;
    let videoTop = video.getBoundingClientRect().top;
    let cartRight = cart.getBoundingClientRect().right;
    let cartBottom = cart.getBoundingClientRect().bottom;
    clonedVideo.style.cssText = `
          z-index: 1000;
          opacity:0.8;
          position:fixed;
          width:${videoWith}px;
          height:${videoHeight}px;
          top:${videoTop}px;
          left:${videoLeft}px;
          transition: all 2s ease-in-out;
        `;
    document.body.appendChild(clonedVideo);
    setTimeout(function () {
      clonedVideo.style.left = cartRight - cartWith / 2  + "px";
      clonedVideo.style.top = cartBottom - cartHeight / 2 + "px";
      clonedVideo.style.width = `0px`;
      clonedVideo.style.height = `0px`;
      clonedVideo.style.opacity = "50";
    }, 0);
    props.addCartItem(lesson);
  };
  return (
    <>
      <NavHeader history={props.history}>课程详情</NavHeader>
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={<img id="lesson-video" src={lesson.poster} />}
      >
        <Meta
          title={lesson.title}
          description={
            <>
              <p>价格: ¥{lesson.price}元</p>
              <p>
                <Button
                  className="add-cart"
                  onClick={() => addCartItem(lesson)}
                >
                  加入购物车
                </Button>
              </p>
            </>
          }
        />
      </Card>
    </>
  );
}

let mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(mapStateToProps, actions)(Detail);