const Movies = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Movies</h1>

        <button className="w-fit px-4 py-2 rounded-lg text-xs bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition">
          Add Movie
        </button>
      </div>

      <div className="mt-10"></div>
    </div>
  );
};

export default Movies;
