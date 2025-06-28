import React from 'react';

export const MovieList = React.createContext(undefined);

export function withMovieList(Component) {
    return function ThemedComponent(props) {
        return (
            <MovieList.Consumer>
                {movieList => <Component movieList={movieList} {...props} />}
            </MovieList.Consumer>
        );
    };
}