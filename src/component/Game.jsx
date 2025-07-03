import { Suspense, useEffect, useRef, useState } from "react";
import useFetch from "@/hook/useFetch";
import Spinner from "./Spinner"
import Refresh from "./Refresh";
import Swipeable from "./Swipeable";
import debounce from "../util/debounce";

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
    const [enable, setEnable] = useState(true);

    const scrollRef = useRef(null);
    const { data } = useFetch("movies.json");


    function onToggle() {
        if (!movie) return;

        if (showSolution) {
            setTitle("Titolo");
            setText(movie.title);
        }
        else {
            setTitle("Trama");
            setText(movie.description);
        }
    }

    function toggle() {
        setShowSolution(!showSolution);
    }

    function getMovie() {
        console.log("loading");
        
        setMovie(data[Math.floor(Math.random() * data.length)]);
        setShowSolution(false);
    }

    function getFirstMovie() {
        if (!data) return;

        if (!Array.isArray(data)) return;

        getMovie();
    }

    function loadNewCard() {
        console.log("carico nuova scheda")
    }

    // const debouncedLoad = debounce(loadNewCard, 500);

    function scrollAndLoad(e) {

        console.log("scroll end");
        
        if (e.target.scrollTop !== 0)
            scrollRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });

        if (e.target.scrollTop === 0) // e.target.scrollTopMax*0.2)
            setEnable(true)
        
        if (enable && e.target.scrollTop > e.target.scrollTopMax*0.7) {
            getMovie();
            setEnable(false);
        }
    }

    const handleScrollEnd = debounce(scrollAndLoad, 0);

    function handleScrollCapture(e){
        console.log("scroll");
        
        if(!enable){
            e.preventDefault();
        }
    }
    // function scrollEffect() {
    //     // Aggiungi l'event listener per lo scroll
    //     window.addEventListener('scroll', handleScrollEnd);

    //     // Rimuovi l'event listener al momento della pulizia
    //     return () => {
    //         window.removeEventListener('scroll', handleScrollEnd);
    //     };
    // }

    useEffect(onToggle, [showSolution, movie]);
    useEffect(getFirstMovie, [data]);

    // useEffect(scrollEffect, []);

    return <div ref={scrollRef} onScrollEnd={handleScrollEnd} style={{ scrollbarWidth: 'none' }} className="h-screen overflow-auto">
        <div className="min-h-screen flex flex-col justify-between">

            <header className="w-full text-center py-4">
                <h1 className="text-3xl font-bold">Plot Twist</h1>
            </header>
            <Suspense fallback={<Spinner />}>
                <main className="flex flex-grow items-center justify-center"
                    // onDownSwipe={getMovie}
                    onClick={toggle} >
                    <div >
                        <Card title={title} > {text} </Card>
                    </div>
                </main>
            </Suspense>

            <footer className="text-center py-4"> Scorri verso il basso per caricare una nuova scheda</footer>
        </div>
        <div style={{ height: '50px' }}></div>
    </div>
}