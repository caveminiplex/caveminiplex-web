import { Slide } from "react-slideshow-image";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import movieTheatreLottie from "../assets/lottie/movieTheatre.json";

const Slideshow = () => {
  const slides = [
    {
      url: "https://musewithmeblog.com/wp-content/uploads/2018/05/infinitywarfeatured.jpg",
      title: "Avengers: Infinity War"
    },
    {
      url: "https://i0.wp.com/conciliarpost.com/wp-content/uploads/2014/09/breaking_bad_fb_banner_by_cartoonperson-d5628z3.png?fit=851%2C314&ssl=1",
      title: "Breaking Bad"
    },
    {
      url: "https://w0.peakpx.com/wallpaper/380/356/HD-wallpaper-pk-movie-motion-poster.jpg",
      title: "PK"
    },
  ];

  return (
    <section className="slide-container">
      <Slide infinite autoplay transitionDuration={2000} duration={5000}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div
              style={{ backgroundImage: `url(${slide.url})` }}
              className="flex items-center justify-center bg-cover h-[500px] brightness-[55%]"
            ></div>

            <div className="absolute bottom-4 right-4 z-20 px-11 py-8">
                <h3 className="text-7xl text-white font-bold">{slide.title}</h3>
            </div>
          </div>
        ))}
      </Slide>
    </section>
  );
};

const Home = () => {
  return (
    <div className="w-full h-full overflow-y-scroll custom-scrollbar">
      <div className="relative h-[500px] w-full">
        <Slideshow />

        <div className="w-[40%] h-full bg-gradient-to-r from-[#ffffffe4] from-30% to-transparent z-10 absolute top-0 left-0 p-5 flex items-center backdrop-blur-xs">
          <div className=" flex flex-col items-start space-y-14">
            <p className="text-5xl font-medium leading-snug">
              Watch movies of your choice with the close one's 🍿🎬
            </p>

            <div className="flex space-x-4">
              <button className="px-14 py-2 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-lg focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                Book now
              </button>

              <button className="px-14 py-2 rounded-lg border-2 border-black text-black font-medium hover:shadow-xl transition duration-200">
                View Movies
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full px-6 py-10">
        <h2 className="text-2xl font-medium">Currently Showing</h2>

        <div className="pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
          <div className=" flex items-center space-x-7">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-10">
        <h2 className="text-2xl font-medium">Upcoming Screenings</h2>

        <div className="pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
          <div className=" flex items-center space-x-7">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </section>

      <section className="w-full px-16 py-20  h-[500px] flex flex-1 items-center">
        <div className="flex-[0.5]">
          <h2 className="text-5xl">Why Watch With Us?</h2>

          <ul className="list-disc text-3xl pl-6 pt-8 leading-16 font-extralight">
            <li>Big Screen Nostalgia 🎥</li>
            <li>Affordable Pricing 💰</li>
            <li>Community Vibe 🤝</li>
          </ul>
        </div>

        <div className="flex-[0.5] flex justify-end">
          <Lottie animationData={movieTheatreLottie} className="w-[400px]" />
        </div>
      </section>

      {/* Book tickets now footer banner */}
      <section className="w-full h-60 mt-20 bg-gradient-to-b from-transparent to-blue-300">

      </section>
      <Footer />
    </div>
  );
};

export default Home;
