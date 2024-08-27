import { useEffect, useState } from "react";
import { Movie } from "../App";
//import { Link } from "react-router-dom";
import axios from "axios";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const GenreFilter: React.FC<{ genre: string }> = ({ genre }) => {

    const [genreMovies, setMovies] = useState<Movie[]>([]);

    const getMovies = async (): Promise<Movie[]> => {
        const movieAPI = "http://localhost:8000/api/movies/?genre="
        try {
            const { data } = await axios.get<Movie[]>(
                movieAPI.concat(genre)
            );
            setMovies(data as Movie[])
            return data;
        } catch (error) {
            console.error("error", error);
            return [];
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
        <CarouselContent>
            {genreMovies.map((movie,index) => {
                return (
                    <CarouselItem key={index} className="md:basis-full lg:basis-1/3">
                    <div className="transition-opacity duration-500 ease-in-out w-full h-full hover:opacity-50 active:opacity-25">
                         {movie.title}
                         <Link className="overflow-hidden w-full h-full"
                  to={`/save_movie/${movie.id}`}
                  key={movie.id}
                >
                      <img
                      className="w-full h-full object-cover"
                        src={movie.poster}
                        alt="Description of image"
                        />
                        </Link>
                    </div>
                  </CarouselItem>
                )
            })}
        </CarouselContent>
        <CarouselPrevious className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
        <CarouselNext className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
        </div>
    );

};
export default GenreFilter;