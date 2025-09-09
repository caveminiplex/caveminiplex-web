import { FiCheckCircle } from "react-icons/fi";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const decorations = [
  {
    id: 1,
    title: "Royal Celebration Package",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Transform your auditorium into a royal celebration with our premium decoration package. Features elegant draping, crystal centerpieces, and custom lighting to create a majestic atmosphere.",
    price: "₹1200",
    bestFor: ["Wedding Receptions", "Gala Dinners", "Corporate Events"],
    includes: [
      "Elegant ceiling draping",
      "Crystal centerpieces",
      "Custom lighting setup",
      "Stage decoration",
      "Entrance arrangement",
    ],
  },

  {
    id: 2,
    title: "Corporate Elegance",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Professional and sophisticated decoration package designed for corporate events, conferences, and formal gatherings. Clean lines, modern aesthetics, and a touch of elegance.",
    price: "₹1800",
    bestFor: ["Conferences", "Seminars", "Award Ceremonies"],
    includes: [
      "Minimalist stage setup",
      "Branded backdrops",
      "LED screen framing",
      "Corporate centerpieces",
      "Registration desk decor",
    ],
  },
  {
    id: 3,
    title: "Fairy Tale Wedding",
    images: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Create a magical atmosphere with our fairy tale wedding package. Soft lighting, floral arrangements, and dreamy drapery will make your special day unforgettable.",
    price: "₹1500",
    bestFor: ["Wedding Ceremonies", "Receptions", "Engagement Parties"],
    includes: [
      "Floral arch installation",
      "Aisle decoration",
      "Candle centerpieces",
      "Ceiling draping",
      "Sweetheart table decor",
    ],
  },
];

const Decorations = () => {
  const navigate = useNavigate();

  const slideProperties = {
    autoplay: true,
    transitionDuration: 2000,
    duration: 5000,
    infinite: true,
  };

  return (
    <div className="h-full overflow-y-scroll custom-scrollbar">
      <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Auditorium Decoration Packages
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your event space with our exquisite decoration packages
              tailored for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {decorations.map((deco) => (
              <div
                key={deco.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image Slider */}
                <div className="relative h-64 overflow-hidden">
                  <Slide {...slideProperties} indicators={true}>
                    {deco.images.map((image, index) => (
                      <div key={index} className="each-slide">
                        <div
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "16rem",
                          }}
                        ></div>
                      </div>
                    ))}
                  </Slide>

                  <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    {deco.price}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {deco.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {deco.description}
                  </p>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Best for:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {deco.bestFor.map((item, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Includes:
                    </h3>
                    <ul className="flex space-x-3 flex-wrap">
                      {deco.includes.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600 text-xs"
                        >
                          <FiCheckCircle className="text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 cursor-pointer">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We understand every event is unique. Contact us to create a custom
              decoration package tailored to your specific needs and budget.
            </p>
            <button
              onClick={() => {
                navigate("/contact");
              }}
              className="bg-white border-2 border-fuchsia-500 text-fuchsia-600 font-medium py-2 px-6 rounded-lg hover:bg-fuchsia-50 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Decorations;
