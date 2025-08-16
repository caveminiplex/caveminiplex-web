import { useState } from "react";
import qrCode from "../../assets/images/qr.png";

const PaymentModal = ({
  isOpen,
  setIsOpen,
  amount,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
}) => {
  const [transactionId, setTransactionId] = useState<string>("");

  if (isOpen) {
    return (
      <div
        className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-brightness-75"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-3 mt-4 bg-white w-[50%] py-12 px-6 rounded-lg" onClick={(e) => {
            e.stopPropagation()
        }}>
          <div></div>

          <h1 className="font-bold">Pay ₹{amount}</h1>
          <img src={qrCode} width={130} className="object-contain" />

          <p className="text-[8px] text-neutral-400 text-center">
            * After paying the amount, fill the transaction ID and click on the
            Book Now button to book the show*
          </p>

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
              transactionId ? "brightness-100" : "brightness-50"
            }`}
          >
            Book Now
          </button>
        </div>
      </div>
    );
  }
};

export default PaymentModal;
