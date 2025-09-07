import { useState } from "react";
import type { Movie } from "../types/movie.type";
import PickingSection, {
  type SlotType,
} from "../components/booking/PickingSection";
import MoviesListing from "../components/booking/MoviesListing";
import PriceSection, {
  PriceSectionMobile,
} from "../components/booking/PriceSection";
import PaymentModal from "../components/Modals/PaymentModal";
import { calculatePrice, roundOffCost } from "../util/time.util";
import ImportantNoteModal from "../components/Modals/ImportantNoteModal";

const BookingPage = () => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  const [slotInfo, setSlotInfo] = useState<SlotType | null>(null);

  const [totalTime, setTotalTime] = useState<string>("");

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const [isImportantNoteModalOpen, setIsImportantNoteModalOpen] = useState<boolean>(false);

  return (
    <>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
        amount={roundOffCost(
          calculatePrice(totalTime, slotInfo ? slotInfo.noOfPerons : 0)
        )}
        slotInfo={slotInfo}
        movieIds={selectedMovies.map((movie) => movie.id)}
      />

      <ImportantNoteModal isOpen={isImportantNoteModalOpen} setIsOpen={setIsImportantNoteModalOpen} setIsPaymentModalOpen={setIsPaymentModalOpen}/>

      
      {/* <AddOnModal isOpen={isAddOnModalOpen} setIsOpen={setAddOnModalOpen}/> */}

      <div className="w-full h-full flex flex-1 flex-col lg:flex-row">
        {/* MoviesListing */}
        <section className="flex-[0.2] lg:flex-[0.25] w-full h-full px-1 lg:px-3 py-1 lg:py-5 relative overflow-y-hidden">
          <div className="absolute top-0 left-0 z-10  w-full hidden lg:flex justify-center">
            <div className=" w-[95%] h-[50px] blur-md   bg-gradient-to-b from-[#d5c3e7ee] from-30% to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 z-10  w-full hidden lg:flex justify-center">
            <div className=" w-[95%] h-[50px] blur-md   bg-gradient-to-b from-[#d5c3e7ee] from-30% to-transparent"></div>
          </div>

          <MoviesListing
            setTotalTime={setTotalTime}
            selectedMovies={selectedMovies}
            setSelectedMovies={setSelectedMovies}
            ownDuration={slotInfo ? slotInfo.own_duration : null}
          />
        </section>

        {/* date and time selectors */}
        <section className="flex-[0.7] lg:flex-[0.4] w-full h-full px-2 lg:px-0 py-1 lg:py-5 overflow-hidden">
          <PickingSection setSlotInfo={setSlotInfo} totalTime={totalTime} />
        </section>

        {/* Price calculation */}
        <section className="flex-[0.1] lg:flex-[0.35] w-full h-full py-1 px-1 lg:px-5 relative bg-white  rounded-t-lg">
          {innerWidth < 1024 ? (
            <PriceSectionMobile
              isMovieSlotSelected={
                selectedMovies.length != 0 &&
                slotInfo?.date != null &&
                slotInfo.audi != null
              }
              totalTime={totalTime}
              selectedMovies={selectedMovies}
              setIsImportantNoteModalOpen={setIsImportantNoteModalOpen}
              noOfPersons={slotInfo ? slotInfo.noOfPerons : 2}
              ownDuration={slotInfo ? slotInfo.own_duration : null}
            />
          ) : (
            <PriceSection
              isMovieSlotSelected={ 
                selectedMovies.length != 0 &&
                slotInfo?.date != null &&
                slotInfo.audi != null
              }
              startTime={slotInfo?.startTime!}
              totalTime={totalTime}
              selectedMovies={selectedMovies}
              setIsImportantNoteModalOpen={setIsImportantNoteModalOpen}
              noOfPersons={slotInfo ? slotInfo.noOfPerons : 2}
              ownDuration={slotInfo ? slotInfo.own_duration : null}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default BookingPage;
