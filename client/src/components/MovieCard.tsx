import type { Movie } from "../types/movie.type";

const MovieCard = ({
  width = "200px",
  height = "280px",
  titleSize="0.8rem",
  movieInfo
}: {
  width?: string;
  height?: string;
  titleSize?:string;
  movieInfo:Movie
}) => {
  return (
    <div
      className=" bg-slate-400 rounded-lg shrink-0 bg-cover cursor-pointer transition-all hover:scale-105 relative"
      style={{
        width,
        height,
        backgroundImage: `url(${movieInfo.poster_url})`,
      }}
    >
      <div className="absolute bottom-0 w-full right-0 py-3 px-3 text-start backdrop-blur-xs space-y-1 rounded-b-lg">
        <h2 className="text-white font-bold" style={{
            fontSize: titleSize,
        }}>{movieInfo.title}</h2>
        <p className="text-[0.6rem] text-white">{movieInfo.duration}</p>
      </div>
    </div>
  );
};

export default MovieCard;
