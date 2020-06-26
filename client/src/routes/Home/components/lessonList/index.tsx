import React, { useEffect, forwardRef, useState } from "react";
import "./index.less";
import { Card, Skeleton, Button, Alert, Menu } from "antd";
import { Link } from "react-router-dom";
import Lesson from "@/typings/lesson";
import { MenuOutlined } from "@ant-design/icons";
interface Props {
  children?: any;
  lessons?: any;
  getLessons?: any;
  container?: any;
}

function LessonList(props: Props, lessonListRef: any) {
  const [_, forceUpdate] = useState(0);
  useEffect(() => {
    if (props.lessons.list.length == 0) {
      props.getLessons();
    }
    lessonListRef.current = () => forceUpdate((x) => x + 1);
  }, []);

  let start = 0;
  let rem = parseInt(document.documentElement.style.fontSize);
  if (props.container.current) {
    let scrollTop = props.container.current.scrollTop;
    if (scrollTop - 7 * rem > 0) {
      start = Math.floor((scrollTop - 7 * rem) / (8.67 * rem));
    }
  }
  return (
    <section className="lesson-list">
      <h2>
        <MenuOutlined /> 全部课程
      </h2>
      <Skeleton
        loading={props.lessons.list.length == 0 && props.lessons.loading}
        active
        paragraph={{ rows: 8 }}
      >
        {props.lessons.list.map((lesson: Lesson, index: number) =>
          (start < 5 && index <= 5) || (index >= start && index < start + 5) ? (
            <Link
              key={lesson._id}
              to={{ pathname: `/detail/${lesson._id}`, state: lesson }}
            >
              <Card
                hoverable={true}
                style={{ width: "100%" }}
                cover={<img alt={lesson.title} src={lesson.poster} />}
              >
                <Card.Meta
                  title={lesson.title}
                  description={`价格: ¥${lesson.price}元`}
                />
              </Card>
            </Link>
          ) : (
            <div key={index} style={{ height: `${8.6666667 * rem}px` }}></div>
          )
        )}
        {props.lessons.hasMore ? (
          <Button
            onClick={props.getLessons}
            loading={props.lessons.loading}
            type="primary"
            block
          >
            {props.lessons.loading ? "" : "加载更多"}
          </Button>
        ) : (
          <Alert
            style={{ textAlign: "center" }}
            message="到底了"
            type="warning"
          />
        )}
      </Skeleton>
    </section>
  );
}
export default forwardRef(LessonList);