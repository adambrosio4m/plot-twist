import { useEffect, useState } from "react";
import useFetch from "@/hook/useFetch";
import Spinner from "./Spinner"
import Refresh from "./Refresh";

function Swipeable({ children, className, onLeftSwipe, onRightSwipe, onUpSwipe, onDownSwipe, ...props }) {
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

    function onTouchEnd() {
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
            typeof onLeftSwipe === 'function' && onLeftSwipe();
        }
        else if (isRightSwipe) {
            console.log("swipe right", typeof onRightSwipe);
            if (typeof onRightSwipe === 'function') onRightSwipe();
        }

        if (isUpSwipe) {
            console.log("swipe up");
            typeof onUpSwipe === 'function' && onUpSwipe();
        }
        else if (isDownSwipe) {
            console.log("swipe down");
            typeof onDownSwipe === 'function' && onDownSwipe();
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


function Card({ title, children, className, onClick }) {
    return <>
        <div className={`max-w-md w-full p-4 card rounded-lg shadow-md ${className}`} onClick={onClick}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2">
                {children}
            </p>
        </div>
    </>
}

export default function Game() {
    const [movie, setMovie] = useState(undefined);
    const [showSolution, setShowSolution] = useState(undefined);
    const [title, setTitle] = useState("Descrizione");
    const [text, setText] = useState(undefined);
    const { data } = useFetch("movies.json");

    function onToggle() {
        if (!movie) return;

        if (showSolution) {
            setTitle("Titolo");
            setText(movie.title);
        }
        else {
            setTitle("Descrizione");
            setText(movie.description);
        }
    }

    function toggle() {
        setShowSolution(!showSolution);
    }

    function getMovie() {
        setMovie(data[Math.floor(Math.random() * data.length)]);
        setShowSolution(false);
    }

    function getFirstMovie() {
        if (!data) return;

        if (!Array.isArray(data)) return;

        getMovie();
    }

    useEffect(onToggle, [showSolution, movie]);
    useEffect(getFirstMovie, [data]);

    return <div className="min-h-screen flex flex-col">
        <header className="mb-4 w-full text-left">
            <h1 className="text-3xl font-bold">Plot Twist</h1>
        </header>
        <Swipeable className="flex flex-grow items-center justify-center"
            onRightSwipe={getMovie}
            onClick={toggle} >
            <div >
                {movie ?
                    <Card title={title} > {text} </Card>
                    : <Spinner />}

            </div>
        </Swipeable>

        {/* <Refresh onClick={} /> */}
    </div>
}