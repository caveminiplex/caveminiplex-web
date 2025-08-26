import { useState } from "react";
import qrCode from "../../assets/images/qr.png";
import userApi from "../../apis/userApi";
import type { SlotType } from "../booking/PickingSection";
import { formatDate } from "../../util/date.util";
import toast from "react-hot-toast";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({
  isOpen,
  setIsOpen,
  amount,
  slotInfo,
  movieIds,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
  slotInfo: SlotType | null;
  movieIds: number[];
}) => {
  const [transactionId, setTransactionId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!transactionId || !name || !email || !phoneNumber) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    const res = await userApi.post("/book", {
      transactionId,
      movieIds,
      userId: "gaeahaeha",
      auditorium: slotInfo?.audi,
      date: slotInfo?.date ? formatDate(slotInfo.date) : "",
      noOfPersons: slotInfo?.noOfPerons,
      location: "Sadar Bazar, Agra",
      amountPaid: amount,
      slot: {
        startTime: slotInfo?.startTime,
        endTime: slotInfo?.endTime,
      },
    });

    if (res.status === 200) {
      toast.success("Booking successful");
      setIsOpen(false);
      setLoading(false);

      navigate(`/ticket/${res.data.bookingId}`);
    } else {
      toast.error("Booking failed. Please try again.");
      setLoading(false);
    }
  };

  if (isOpen) {
    return (
      <div
        className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-brightness-75"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div
          className="flex flex-col items-center justify-center space-y-3 mt-4 bg-white w-[50%] py-12 px-6 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >

          <h1 className="font-bold">Pay ₹{amount}</h1>
          <img src={qrCode} width={130} className="object-contain" />

          <p className="text-[8px] text-neutral-400 text-center">
            * After paying the amount, fill the transaction ID and click on the
            Book Now button to book the show*
          </p>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full border-b border-neutral-400 text-sm pb-3 outline-none mt-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            className="w-full border-b border-neutral-400 text-sm pb-3 outline-none mt-4"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border-b border-neutral-400 text-sm pb-3 outline-none mt-4"
          />

          <input
            type="text"
            placeholder="Transaction ID"
            required
            value={transactionId}
            onChange={(e) => {
              setTransactionId(e.target.value);
            }}
            className="w-full border-b border-neutral-400 text-sm pb-3 outline-none mt-4"
          />

          <button
            className={`w-fit px-10 py-2 text-sm mt-10 text-center rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 ${
              transactionId && name && email && phoneNumber
                ? "brightness-100"
                : "brightness-50"
            }`}
            onClick={handleBooking}
          >
            {loading ? <Loading /> : "Book Now"}
          </button>
        </div>
      </div>
    );
  }
};

export default PaymentModal;
