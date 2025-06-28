import { useEffect, useState } from "react";
import useFetch from "@/hook/useFetch";
import Spinner from "./Spinner"
import Refresh from "./Refresh";

function Title({ onClick, text }) {

    return <div className="max-w-md w-full p-4 card rounded-lg shadow-md" onClick={onClick}>
        <h2 className="text-xl font-semibold">Soluzione</h2>
        <p className="mt-2">
            {text}
        </p>
    </div>
}

function Description({ onClick, text }) {

    return <div className="max-w-md w-full p-4 card rounded-lg shadow-md" onClick={onClick}>
        <h2 className="text-xl font-semibold">Descrizione</h2>
        <p className="mt-2">
            {text}
        </p>
    </div>
}

function Controller({ movie }) {
    const [showSolution, setShowSolution] = useState(false);

    function toggle() {
        setShowSolution(!showSolution);
    }

    return <>
        {showSolution ? <Title onClick={toggle} text={movie.title} /> : <Description onClick={toggle} text={movie.description} />}
    </>
}
export default function Game() {
    const [movie, setMovie] = useState(undefined);
    const [showSolution, setShowSolution] = useState(false);
    const { data } = useFetch("movies.json");

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

    useEffect(getFirstMovie, [data])

    return <div className="min-h-screen flex flex-col items-center justify-center">
        <header className="mb-4">
            <h1 className="text-3xl font-bold">Plot Twist</h1>
        </header>
        {movie ? showSolution ? <Title onClick={toggle} text={movie.title} /> : <Description onClick={toggle} text={movie.description} /> : <Spinner />}

        <Refresh onClick={getMovie} />
    </div>
}