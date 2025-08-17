import type { Snack } from "../../types/snack.type";
import SnackCard from "../SnackCard";



const SNACKS: Snack[] = [
    {
        id:"1",
        name:'Popcorn',
        img_url:'https://cdn.britannica.com/61/118661-050-6CAD9A11/Popcorn.jpg',
        price:180
    },
    {
        id:"2",
        name: "Margherita Pizza",
        img_url: 'https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg',
        price: 400
    }
]
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
            <p className="text-gray-500 text-sm">
              Choose your add-ons to enjoy during the movie!
            </p>
          </div>

          <div className="h-full overflow-y-scroll custom-scrollbar py-5">
            <div className=" w-full flex gap-7 flex-wrap">

                {
                    SNACKS.map((snack) => (
                        <SnackCard key={snack.id} snackInfo={snack}/>
                    ))
                }

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AddOnModal;
