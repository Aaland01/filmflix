import { MovieRatingWidget } from "./components/MovieRatingWidget/MovieRatingWidget";
import { useEffect, useState } from "react";
import axios from "axios";
import Heart from "react-heart";
import { Movie } from "./App";
import { useNavigate } from "react-router-dom";

export const SaveAMovie: React.FC = () => {
  const currentLocation = window.location.href;
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [sumbitState, setSubmitState] = useState<string>("");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const handleRatingChange = (currentRating: number) => {
    setRating(currentRating);
  };

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [movie, setMovie] = useState<Movie>({
    id: 0,
    title: "",
    genre: "",
    year: 0,
    description: "",
    poster: "",
  });

  const getMovie = async (id: number): Promise<Movie | null> => {
    try {
      const { data, status } = await axios.get<Movie>(
        `http://localhost:8000/api/movies/${id}`
      );
      if (status === 200) {
        return data;
      }
      return null;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const movieId = Number(currentLocation.split("/").pop());
    getMovie(movieId).then((movie) => {
      if (movie) {
        setMovie(movie);
      }
    });
  }, []);

  const saveRating = async () => {
    try {const response = await axiosInstance.post(`/api/save-rating/`, {
      movie: movie.id,
      rating: rating,
      description: comment,
      favorite: favorite,
    });
    if (response.status === 200 || response.status === 201) {
      setSubmitState("");
      navigate("/library");
      return response;
    }} catch (error: any) {
      if (error.response.status === 401) {
        setSubmitState("You are not logged in");
    } else if (error.response.status === 400) {
        if (error.response.data.description && error.response.data.description[0] === "This field may not be blank.") {
          setSubmitState("Please enter a comment and a rating");
        } else {
          setSubmitState("You have already rated this movie");
        }
      }
    }
  };

  return (
    <form
      className="flex"
      onSubmit={(event) => {
        event.preventDefault();
        saveRating();
      }}
    >
      <div className="flex flex-col pt-28 mx-20 text-black-600 items-center justify-center">
        <img src={movie.poster} alt="Movie poster" className="w-80"></img>
        <div className="m-4">
          <input
            className="p-2 w-80 border border-black rounded"
            type="text"
            placeholder="Comment..."
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
        </div>
        <div className="mb-2 flex flex-row justify-center items-center">
          <MovieRatingWidget onRatingChange={handleRatingChange} />
          <div className="ml-4 transform transition duration-300 ease-in-out hover:scale-110">
            <Heart className="h-10" inactiveColor="red" isActive={favorite} onClick={() => setFavorite(!favorite)} />
          </div>
        </div>
        <div className="m-2">
          <button
            type="submit"
            className="bg-filmflix-main hover:bg-filmflix-hover active:bg-filmflix-contrast text-white font-bold py-2 px-4 rounded"
          >
            Add Rating
          </button>
        </div>
        <div className="mb-4">
          <div className="text-red-600 h-4">{sumbitState}</div>
        </div>
      </div>
      <div className="flex flex-col pt-28 m-0 mt-10 ">
        <h2 className="text-4xl font-bold left-0 top-0">{movie.title} ({movie.year})</h2>
        <p className="text-lg">{movie.genre}</p>
        <p className="text-xl mt-10 mr-14 p-5 bg-slate-100">{movie.description}</p>
      </div>
    </form>
  );
};
