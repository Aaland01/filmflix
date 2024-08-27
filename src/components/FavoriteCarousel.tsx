import { useEffect, useState } from "react";
import { RatedMovie } from "../Library";
import axiosInstance from "../services/auth.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/Carousel";

const LibraryFilter: React.FC = () => {
    const [genreMovies, setMovies] = useState<RatedMovie[]>([]);
    const movieAPI = "http://localhost:8000"

    const getMovies = async (): Promise<RatedMovie[]> => {
        try {
        const { data } = await axiosInstance.get<RatedMovie[]>(
            movieAPI.concat("/api/favorite-movies")
        );  
            setMovies(data as RatedMovie[])
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
        <div className="">
          <CarouselContent className="h-5/6">
            {genreMovies
            .map((object) => {
              return (
                <CarouselItem key={object.movie.id} className="md:basis-full lg:basis-1/3  ">
                    <div className="overflow-hidden w-full h-full ">
                  <img
                    className="block w-full h-full object-cover rounded-lg"
                    src={movieAPI + object.movie.poster}
                    alt=""
                    />
                    </div>
            </CarouselItem>
              );
            })}
            </CarouselContent>
            <CarouselPrevious className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400"  />
            <CarouselNext className="bg-filmflix-accent4 hover:bg-filmflix-accent3 hover:text-gray-500 active:bg-filmflix-accent2 text-gray-400" />
        </div>
        );

};
export default LibraryFilter;