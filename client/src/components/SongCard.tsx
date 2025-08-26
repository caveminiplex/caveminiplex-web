import songsImg from "../assets/images/songs.jpg"

const SongCard = ({
  width = "200px",
  height = "280px",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div
      className=" bg-slate-400 rounded-lg shrink-0 bg-cover cursor-pointer transition-all hover:scale-105 relative"
      style={{
        width,
        height,
        backgroundImage: `url(${songsImg})`,
      }}
    >
      <div className="absolute bottom-0 w-full right-0 py-3 px-3 text-start backdrop-blur-xs space-y-1 rounded-b-lg backdrop-brightness-30">
        <h2
          className="text-white font-bold"
          style={{
            fontSize: "0.8rem",
          }}
        >
          Songs
        </h2>
      </div>
    </div>
  );
};

export default SongCard;
