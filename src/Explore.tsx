import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GenreFilter from "./components/GenreFilter";
import SatireCarousel from "./components/SatireCarousel";
import axios from "axios";
import { Movie } from "./App";
import { Link } from "react-router-dom";

export const Explore: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const getMovies = async (): Promise<Movie[]> => {
    try {
      const { data } = await axios.get<Movie[]>(
        "http://localhost:8000/api/movies"
      );
      setMovies(data);
      return data;
    } catch (error) {
      console.error("error", error);
      return [];
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const [inpMovie, setinpMovie] = useState<string>("");
  function filterMovies(movie: Movie) {
    return movie.title.toLowerCase().startsWith(inpMovie.toLowerCase());
  }
  function addMovie(e: React.ChangeEvent<HTMLInputElement>) {
    setinpMovie(e.target.value);
  }
  return (
    <div className="flex flex-col gap-12 size-200 pt-32 px-64 text-black-600 items-center text-center justify-center w-4/5 mx-auto">
      <h1 className="text-4xl font-bold">So Bad It's Good</h1>
      <Carousel>
        <SatireCarousel />
      </Carousel>

      <h1 className="text-4xl font-bold">Action</h1>
      <Carousel>
        <GenreFilter genre={"action"} />
      </Carousel>
      <h1 className="text-4xl font-bold">Horror</h1>
      <Carousel>
        <GenreFilter genre={"horror"} />
      </Carousel>
      <h1 className="text-4xl font-bold">Animation</h1>
      <Carousel>
        <GenreFilter genre={"animation"} />
      </Carousel>
      <div className="mt-40 flex flex-col">
        <input
          onChange={addMovie}
          type="text"
          className="w-52 p-2 border-2 m-auto"
          placeholder="Search by title..."
        />
        <div className="flex flex-row gap-4 justify-end mr-[13%] pb-10"></div>
        <div className=" w-9/12 grid grid-cols-4 flex-row m-auto gap-7"></div>
        <Carousel>
          <CarouselContent className="pb-20 h-5/6 w-[900px]">
            {movies
              .filter((movie) => {
                return filterMovies(movie);
              })
              .map((object) => {
                return (
                  <CarouselItem
                    key={object.id}
                    className="md:basis-full lg:basis-1/3"
                  >
                    <Link
                      className="overflow-hidden transition-opacity duration-500 ease-in-out hover:opacity-50 active:opacity-25"
                      to={`/save_movie/${object.id}`}
                      key={object.id}
                    >
                      <img
                        className="block w-full h-full object-cover rounded-lg"
                        src={object.poster}
                        alt=""
                      />
                    </Link>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
          <CarouselNext className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
        </Carousel>
      </div>
    </div>
  );
};