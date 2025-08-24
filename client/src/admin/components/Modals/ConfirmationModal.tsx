const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  actionFunc,
  text,
  btnText,
  actionType="negative"
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionFunc: Function;
  text: string;
  btnText: string;
  actionType?: "negative" | "positive";
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center backdrop-brightness-75">
      <div className="w-fit h-fit flex flex-col items-center justify-center bg-white px-16 py-20 rounded-lg space-y-7">
        <p>{text}</p>
        <div className="flex items-center space-x-7">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg text-xs bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              actionFunc();
              setIsOpen(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs ${actionType === "negative" ? "bg-red-500" : "bg-gradient-to-b from-fuchsia-500 to-blue-600"} text-white transition`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
