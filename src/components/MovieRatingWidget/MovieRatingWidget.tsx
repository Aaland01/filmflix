import { useState } from "react";
import star_full from "../../assets/star_full.svg";
import star from "../../assets/star.svg";

interface MovieRatingWidgetProps {
  onRatingChange: (rating: number) => void;
}

export const MovieRatingWidget = ({ onRatingChange }: MovieRatingWidgetProps): JSX.Element => {
  const [currentRating, setRating] = useState(0);
  const [hoverAmount, setHoverAmount] = useState(currentRating);

  const handleRatingChange = (rating: number) => { // This function was generated
    setRating(rating);                             // by a machine learnig tool
    setHoverAmount(rating);                        // (GitHub Copilot) */
    onRatingChange(rating);                        // and was not modified
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= hoverAmount) {
      stars.push(
        <div
          className="w-10 p-1"
          onClick={() => {
            setRating(i);
            setHoverAmount(i);
            handleRatingChange(i);
          }}
          onMouseEnter={() => currentRating === 0 && setHoverAmount(i)}
          onMouseLeave={() => currentRating === 0 && setHoverAmount(0)}
        >
          <img key={i} src={star_full} alt="filled star" />
        </div>
      );
    } else {
      stars.push(
        <div
          className="w-10 p-1"
          onClick={() => {
            setRating(i);
            setHoverAmount(i);
            handleRatingChange(i);
          }}
          onMouseEnter={() => currentRating === 0 && setHoverAmount(i)}
          onMouseLeave={() => currentRating === 0 && setHoverAmount(0)}
        >
          <img key={i} src={star} alt="empty star" />
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col" data-testid="movie-rating-widget">
      <div className="flex flex-row bg-slate-700 w-fit p-2 rounded-full">
        {stars.map((star) => star)}
      </div>
    </div>
  );
};

