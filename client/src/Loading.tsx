import Lottie from "lottie-react";
import loadingAnimJSON from "./assets/lottie/loadingAnim.json";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] h-screen w-full flex items-center justify-center bg-white">
      <Lottie animationData={loadingAnimJSON} className="w-[150px]" />
    </div>
  );
};

export default Loading;
