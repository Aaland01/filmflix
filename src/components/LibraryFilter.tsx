import { useEffect, useState } from "react";
import { RatedMovie } from "../Library";
import axiosInstance from "../services/auth.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LibraryStars from "./LibraryStars";

const LibraryFilter: React.FC<{ genres: string[] }> = ({ genres }) => {
    const [genreMovies, setMovies] = useState<RatedMovie[]>([]);
    const movieAPI = "http://localhost:8000"

    const getMovies = async (): Promise<RatedMovie[]> => {
        try {
            const { data } = await axiosInstance.get<RatedMovie[]>(
                movieAPI.concat("/api/rated-movies")
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
    function filterRatedMovies(ratedMovie: RatedMovie) {
        if (genres.length === 0) return true;
        return genres.includes(ratedMovie.movie.genre)
    }
    return (
        <div className="w-full ">
            <div className="mt-0 ml-10 flex flex-col ">
                <div className=" w-9/12 grid grid-cols-4 flex-row m-auto gap-7 ">
                {genreMovies.filter((ratedMovie) => filterRatedMovies(ratedMovie)).map((ratedMovie, index) => {
                    return (
                    <div key={index} className="md:basis-full lg:basis-1/3 border-2 m-auto pb-4 w-full h-full rounded-xl bg-slate-50">
                        
                        <div className="pt-4 mx-4 text-center">
                            <h1 className="text-lg font-semibold h-16">
                                {ratedMovie.movie.title} ({ratedMovie.movie.year})
                            </h1>
                            <h2 className="text-lg h-8">
                                {ratedMovie.movie.genre}
                            </h2>
                            <img
                                className="w-full h-full block m-auto mt-0 pb-5 h-50 border-b-2 border-slate-300"
                                src={movieAPI.concat(ratedMovie.movie.poster)}
                                alt={ratedMovie.movie.title + " poster"}
                            />
                        </div>

                        <div className="h-auto gap-5 m-2 text-left justify-center ">
                                
                            <LibraryStars rating={ratedMovie.rating} />
                            <p className="mx-2 mt-1">
                                {ratedMovie.description}
                            </p>
                            
                        </div>
                    </div>
                    )
                    })
                    }
                </div>
            </div>
        </div>
    );

};
export default LibraryFilter;