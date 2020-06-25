export function loadMore(element: any, callback: any) {
    function _loadMore() {
        let clientHeight = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
            callback();
        };
    }
    element.addEventListener('scroll', debounce(_loadMore, 300));
}
// 下拉刷新
export function downRefresh(element: any, callback: Function) {
    let startY:number;
    let distance:number;
    let originalTop = element.offsetTop;
    let startTop: number;
    let $timer: any = null;
    element.addEventListener('touchstart', function(event:TouchEvent) {
        if ($timer) clearInterval($timer);
        let touchMove = throttle(_touchMove, 30);
        // 下拉条件：原始位置 & 上卷高度 0
        if　(element.scrollTop === 0) {
            startTop = element.offsetTop;
            startY = event.touches[0].pageY; // 当前点击纵坐标
            element.addEventListener('touchmove', touchMove);
            element.addEventListener('touchend', touchEnd);
        };
        function _touchMove(event: TouchEvent) {
            let pageY = event.touches[0].pageY;
            if (pageY > startY) {
                distance = pageY - startY;
                element.style.top = startTop　+　distance + 'px';
            } else {
                element.removeEventListener('touchmove', touchMove);
                element.removeEventListener('touchend', touchEnd);
            }
        };
        function touchEnd(_event: TouchEvent) {
            element.removeEventListener('touchmove', touchMove);
            element.removeEventListener('touchend', touchEnd);
            if (distance > 30) {
                callback();
            };
            $timer = setInterval(() => {
                let currentTop = element.offsetTop;
                if (currentTop - originalTop > 1) {
                    element.style.top = currentTop - 1 +'px';
                } else {
                    element.style.top = originalTop + 'px';
                }
            }, 13);
        }
    })
}
export function debounce(fn:any, delay:number) {
    let timer:any = null;

    return function() {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
}

export function throttle(fn: any, delay: number) {
    let timer:any = null;
    
    return function() {
        if (!timer) {
            timer = setTimeout(fn, delay);
            timer = null;
        }
    }
};

export const store = {
    set(key:string, value: string) {
        sessionStorage.setItem(key, value);
    },
    get(key:string) {
        return sessionStorage.getItem(key);
    }
}