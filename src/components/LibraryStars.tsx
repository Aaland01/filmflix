import star_full from "../assets/star_full.svg";
import star from "../assets/star.svg";

const LibraryStars: React.FC<{ rating: number }> = ({ rating }) => {

    const stars = []
    const remaining = []

    for (let i = 0; i < rating; i++) {
        stars.push(<img className="w-4" src={star_full} alt="filled star" />);
    }
    for (let j = rating; j < 5; j++) {
        remaining.push(<img className="w-4" src={star} alt="empty star" />);
    }
    
    return (
        <div className="flex flex-row bg-slate-700 w-fit p-2 rounded-full">
            {stars}
            {remaining}
        </div>
    );
};
export default LibraryStars;