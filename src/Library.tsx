import { useState } from "react";
import { Movie } from "./App";
import LibraryFilter from "./components/LibraryFilter";
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { Toggle } from "./components/ui/Toggle";
import FavoriteCarousel from "./components/FavoriteCarousel";
import { Carousel } from "./components/ui/Carousel";

export interface RatedMovie {
  movie: Movie;
  rating: number;
  description: string;
  favorite: boolean;
}

const Library: React.FC = () => {
  //const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [gridView, setGridView] = useState(false);
  const genres = [
    "ACTION", "COMEDY", "DRAMA", "SCIFI", "HORROR", "ROMANCE",
    "MUSICAL", "DOCUMENTARY", "ANIMATION", "THRILLER", "FANTASY"]
  const [selectedGenres, setGenres] = useState<string[]>([])

  const handleGridViewChange = () => {
    setGridView(!gridView);
  };

  const handleGenreSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    let genreClicked = event.currentTarget.value;
    if (selectedGenres.includes(genreClicked)) {
      setGenres(selectedGenres.filter(genre => genre !== genreClicked))
    } else {
      setGenres([...selectedGenres, genreClicked]);
    }
  }

  return (
    <div className="w-full">
      <div className="mt-40 flex flex-col">
        <div>
          <h1 className="text-4xl text-center font-bold">Your favorites</h1>
          <Carousel className="flex p-10 items-center w-3/5 mx-auto">
            <FavoriteCarousel />
          </Carousel>
        </div>
        <div className="self-center">

          {genres.map((genre) => (
            <Toggle key={genre.concat("Btn")} value={genre} onClick={handleGenreSelect} className="m-2 data-[state=on]:bg-filmflix-accent3 
              hover:bg-filmflix-accent4 active:bg-filmflix-accent3 rounded text-black">
              {genre}
            </Toggle>
          ))
          }
        </div>

        <div className="flex flex-row gap-4 justify-end mr-[13%] pb-10">
          <IoGrid
            data-testid="grid-icon"
            size={30}
            onClick={handleGridViewChange}
          />
          <FaList
            data-testid="list-icon"
            size={30}
            onClick={handleGridViewChange}
          />
        </div>

        {selectedGenres.length == 0 ? (
          <LibraryFilter key={"AllGenres"} genres={[]} />
        ) : (
          selectedGenres.map((selectedGenre) => (
            <LibraryFilter key={selectedGenre} genres={selectedGenres} />))
        )
        }
      </div>
    </div>
  );
};

export default Library;
