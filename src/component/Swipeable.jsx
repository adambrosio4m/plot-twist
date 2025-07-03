import { useState } from "react"

export default function Swipeable({ children, className, onLeftSwipe, onRightSwipe, onUpSwipe, onDownSwipe, ...props }) {
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    function onTouchStart(e) {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
        console.log("start", touchStart);

    }

    function onTouchMove(e) {
        setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
        console.log("move", touchEnd);
    }

    function onTouchEnd(e) {
        if (!touchStart || !touchEnd) return

        console.log("end", touchEnd);

        const delta = {
            x: touchEnd.x - touchStart.x,
            y: touchEnd.y - touchStart.y,
        }

        // console.log("delta", delta);

        const isLeftSwipe = delta.x > minSwipeDistance
        const isRightSwipe = delta.x < -minSwipeDistance
        const isUpSwipe = delta.y > minSwipeDistance
        const isDownSwipe = delta.y < -minSwipeDistance

        if (isLeftSwipe) {
            console.log("swipe left");
            typeof onLeftSwipe === 'function' && onLeftSwipe(e);
        }
        else if (isRightSwipe) {
            console.log("swipe right", typeof onRightSwipe);
            if (typeof onRightSwipe === 'function') onRightSwipe(e);
        }

        if (isUpSwipe) {
            console.log("swipe up");
            typeof onUpSwipe === 'function' && onUpSwipe(e);
        }
        else if (isDownSwipe) {
            console.log("swipe down");
            typeof onDownSwipe === 'function' && onDownSwipe(e);
        }
        // add your conditional logic here
    }

    return <div
        className={className}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        {...props}>
        {children}
    </div>
}