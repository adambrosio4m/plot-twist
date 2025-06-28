import { MovieList } from "@context/MovieListContext";
import useFetch from "@hook/useFetch";

export default function MovieListProvider({ children }) {
    const movieList = useFetch("movies.json");

    return <>
        {movieList && <MovieList.Context value={movieList}>
            {children}
        </MovieList.Context>
        }
    </>
}
