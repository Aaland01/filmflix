import { useEffect, useState } from "react";
import RecommendationCarousel from "./components/RecommendationCarousel";
import { Carousel } from "./components/ui/Carousel";
import { Movie } from "./App";
import axiosInstance from "./services/auth.service";
import { Link } from "react-router-dom";

const Recommendations: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const generateRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomIndex(randomIndex);
  };

  const getMovies = async (): Promise<Movie[]> => {
    const movieAPI = "http://localhost:8000/api/other-movies";
    try {
      const { data } = await axiosInstance.get<Movie[]>(movieAPI);
      setMovies(data as Movie[]);
      return data;
    } catch (error) {
      console.error("error", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      await getMovies();
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      generateRandomIndex();
    }
  }, [movies]);

  return (
    <div>
      <div className="flex flex-col gap-12 pt-32 px-64 text-black-600 items-center text-center justify-center w-4/5 mx-auto">
        <h1 className="text-4xl font-bold">Recommended movies</h1>
        <Carousel>
          <RecommendationCarousel />
        </Carousel>
      </div>

      <div className="flex flex-col lg:flex-row mt-16 mx-32 pb-32 border-t-2 border-filmflix-accent4">
        <div className="flex flex-col justify-center items-center min-w-96">
          <h1 className="text-4xl font-bold py-10">Not satisfied?</h1>
          <button
            className="bg-filmflix-main hover:bg-filmflix-hover active:bg-filmflix-contrast text-white font-bold py-6 px-12 text-2xl rounded"
            onClick={generateRandomIndex}
          >
            Get a random movie
          </button>
        </div>
        <div className="flex flex-row py-8 px-10">
          {randomIndex !== null && movies.length > 0 && (
            <div className="flex flex-row">
              <Link
                className="flex flex-col w-2/5 
                            transition-opacity duration-500 ease-in-out hover:opacity-50 active:opacity-25"
                to={`/save_movie/${movies[randomIndex].id}`}
                key={randomIndex}
              >
                <img
                  src={movies[randomIndex].poster}
                  alt={movies[randomIndex].title}
                  className="w-64 h-96"
                />
              </Link>
              <div className="flex flex-col w-3/5 justify-start items-start ps-5 ">
                <h2 className="text-3xl font-bold">
                  {movies[randomIndex].title} ({movies[randomIndex].year})
                </h2>
                <p className="text-xl mt-4 p-3 bg-slate-100 text-left">
                  {movies[randomIndex].description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
