const MovieCard = ({
  width = "220px",
  height = "300px",
  titleSize="0.8rem"
}: {
  width?: string;
  height?: string;
  titleSize?:string;
}) => {
  return (
    <div
      className=" bg-slate-400 rounded-lg shrink-0 bg-cover cursor-pointer transition-all hover:scale-105 relative"
      style={{
        width,
        height,
        backgroundImage: `url(https://images.filmibeat.com/ph-big/2025/07/mahavatar-narsimha1752149125_0.jpeg)`,
      }}
    >
      <div className="absolute bottom-0 w-full right-0 py-3 px-3 text-start backdrop-blur-xs space-y-1 rounded-b-lg">
        <h2 className="text-white font-bold" style={{
            fontSize: titleSize,
        }}>Mahavatar Narsimha</h2>
        <p className="text-[0.6rem] text-white">2h 10m</p>
      </div>
    </div>
  );
};

export default MovieCard;
