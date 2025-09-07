


type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImportantNoteModal = ({isOpen, setIsOpen, setIsPaymentModalOpen}: Props) => {
    if (!isOpen) return null;
    
    return (
        <div
        className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-brightness-75"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div
          className="flex flex-col items-center justify-center space-y-3 mt-4 bg-white lg:w-[50%] w-[90%] py-6 lg:py-12 px-6 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
            <h1 className="font-bold text-xl">Important Note</h1>
            <p className="text-base text-neutral-500 text-center">
                Please come before 15 minutes of the showtime. And if you are late, or show time is over, then it is not our responsibility and the ticket will not be refunded.
            </p>
            <button
            onClick={() => {
                setIsPaymentModalOpen(true);
                setIsOpen(false);
            }}
            className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold text-xs shadow hover:opacity-90 transition cursor-pointer"
            >
                Proceed
            </button>
            </div>
        </div>
    );
};

export default ImportantNoteModal;
