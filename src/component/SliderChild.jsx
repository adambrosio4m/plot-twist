import { useEffect, useRef } from "react";
import useIsInViewport from "@/hook/useIsInViewport";

export default function SliderChild({
    index,
    totalElements,
    extraElements,
    getElements,
    children
}) {
    const elementRef = useRef(null);
    const isInViewport = useIsInViewport(elementRef);

    function loadElementsEffect() {
        if (isInViewport && index + extraElements === totalElements) {
            getElements(extraElements, totalElements);
        }
    }

    useEffect(loadElementsEffect, [isInViewport])

    return (
        <div
            ref={elementRef}
            className='h-lvh snap-start snap-always'
        >
            <div className='h-lvh flex flex-col justify-center items-center'>
                {children}
            </div>
        </div>
    )
}