import { useState } from "react";
import type { Movie } from "../types/movie.type";
import PickingSection, { type SlotType } from "../components/booking/PickingSection";
import MoviesListing from "../components/booking/MoviesListing";
import PriceSection from "../components/booking/PriceSection";
import PaymentModal from "../components/PaymentModal";
import { calculatePrice } from "../util/time.util";




const BookingPage = () => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  const [slotInfo, setSlotInfo] = useState<SlotType | null>(null);

  const [totalTime, setTotalTime] = useState<string>("");

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false)

  return (
    <>
    <PaymentModal isOpen={isPaymentModalOpen} setIsOpen={setIsPaymentModalOpen} amount={calculatePrice(totalTime)}/>

     <div className="w-full h-full flex flex-1">
      {/* MoviesListing */}
      <section className="flex-[0.25] h-full px-3 py-5 relative">
        <div className="absolute top-0 left-0 z-10  w-full flex justify-center">
          <div className=" w-[95%] h-[50px] blur-md   bg-gradient-to-b from-[#d5c3e7ee] from-30% to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 z-10  w-full flex justify-center">
          <div className=" w-[95%] h-[50px] blur-md   bg-gradient-to-b from-[#d5c3e7ee] from-30% to-transparent"></div>
        </div>

        <MoviesListing
          setTotalTime={setTotalTime}
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
      </section>

      {/* date and time selectors */}
      <section className="flex-[0.4] h-full py-5 overflow-hidden ">
        <PickingSection  setSlotInfo={setSlotInfo}/>
      </section>

      {/* Price calculation */}
      <section className="flex-[0.35] h-full py-5 px-5">
        <PriceSection
          isMovieSlotSelected={selectedMovies.length != 0 && (slotInfo?.date != null && slotInfo.audi != null)}
          totalTime={totalTime}
          selectedMovies={selectedMovies}
          setIsPaymentModalOpen={setIsPaymentModalOpen}
        />
      </section>
    </div>
    </>
   
  );
};

export default BookingPage;
