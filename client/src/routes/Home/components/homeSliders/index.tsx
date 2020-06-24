import React, { PropsWithChildren, useEffect } from 'react';
import { Carousel } from 'antd';
import './index.less';
import { Slider } from '@/typings/slider';

type Props = PropsWithChildren<{
  children?: any;
  sliders: Slider[];
  getSliders?: any;
}>;

function HomeSliders(props: Props) {
  useEffect(() => {
    if (!props.sliders.length) {
      props.getSliders();
    }
  }, []);
  return (
    <Carousel effect='scrollx' autoplay>
      {
        props.sliders.map((item: Slider, index: number) => (
          <img src={ item.url } key={ item._id }></img>
        ))
      }
    </Carousel>
  )
}

export default HomeSliders;