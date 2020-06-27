import React, { useState, CSSProperties } from 'react';
import {BarsOutlined} from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import logo from '@/assets/images/logo.png';
import './index.less';
const duration = 1000;
//默认样式
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
interface TransitionStyles {
    entering: CSSProperties;
    entered: CSSProperties;
    exiting: CSSProperties;
    exited: CSSProperties;
}
const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: 'none' },
};


interface Props {
    currentCategory: string;
    setCurrentCategory: (currentCategory: string) => any;
    refreshLessons: any;
}
function HomeHeader(props: Props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
        let target: HTMLUListElement = event.target as HTMLUListElement;
        let category = target.dataset.category;
        props.setCurrentCategory(category as string);
        props.refreshLessons();
        setIsMenuVisible(false);
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state: keyof TransitionStyles) => (
                        <ul
                            className="category"
                            onClick={setCurrentCategory}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>All Lessons</li>
                            <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React Lessons</li>
                            <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue Lessons</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;