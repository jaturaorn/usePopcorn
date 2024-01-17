"use client";

import { useState } from "react";

import { useMovies } from "./utils/useMovies";
import { useLocalStorageState } from "./utils/useLocalStorageState";

import { Loader } from "./component/Loader";
import { ErrorMessage } from "./component/ErrorMessage";
import { NavBar } from "./component/NavBar";
import { Search } from "./component/Search";
import { NumResults } from "./component/NumResults";
import { Main } from "./component/Main";
import { Box } from "./component/Box";
import { MovieList } from "./component/MovieList";
import { MovieDetails } from "./component/MovieDetails";
import { WatchedSummary } from "./component/WatchedSummary";
import { WatchedMoviesList } from "./component/WatchedMoviesList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
