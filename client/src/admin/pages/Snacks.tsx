const Snacks = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Snacks</h1>

        <button className="w-fit px-4 py-2 rounded-lg text-xs bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition">
          Add Snack
        </button>
      </div>

      <div className="mt-10">
        <p className="text-neutral-500">Coming soon</p>
      </div>
    </div>
  );
};

export default Snacks;
