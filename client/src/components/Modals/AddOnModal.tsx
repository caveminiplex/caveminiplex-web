const AddOnModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (isOpen) {
    return (
      <div
        className="absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center backdrop-brightness-75"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div
          className="flex flex-col space-y-3 mt-4 bg-white w-[65%] h-[70%] py-6 px-6 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              🍿 Movie Snacks
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Choose your add-ons to enjoy during the movie!
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default AddOnModal;
