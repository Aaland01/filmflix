import { useEffect, useState } from "react";
import axiosInstance from "../services/auth.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/Carousel";
import { Movie } from "../App";
import { Link } from "react-router-dom";

const RecommendationCarousel: React.FC = () => {
  const [genreMovies, setMovies] = useState<Movie[]>([]);
  const movieAPI = "http://localhost:8000";

  const getMovies = async (): Promise<Movie[]> => {
    try {
      const { data } = await axiosInstance.get<Movie[]>(
        movieAPI.concat("/api/recommended-movies")
      );
      setMovies(data as Movie[]);
      return data;
    } catch (error) {
      console.error("error fetching rated movies by genre", error);
      return [];
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <CarouselContent className="h-5/6">
        {genreMovies.map((object) => {
          return (
            <CarouselItem
              key={object.id}
              className="md:basis-full lg:basis-1/3 "
            >
              <Link
                className="overflow-hidden w-full h-full 
                transition-opacity duration-500 ease-in-out hover:opacity-50 active:opacity-25"
                to={`/save_movie/${object.id}`}
                key={object.id}
              >
                <img
                  className="block w-full h-full object-cover rounded-lg"
                  src={object.poster}
                  alt={object.title}
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
      <CarouselNext className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
    </div>
  );
};
export default RecommendationCarousel;
