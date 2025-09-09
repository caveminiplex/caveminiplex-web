import { Slide } from "react-slideshow-image";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import movieTheatreLottie from "../assets/lottie/movieTheatre.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie.type";
import moviePosters from "../assets/images/movie-posters.png";
import { useLoading } from "../LoadingContext";
import userApi from "../apis/userApi";
import movieBanner from "../assets/images/movie-banner.png";

const Slideshow = () => {
  const slides = [
    {
      url: "https://musewithmeblog.com/wp-content/uploads/2018/05/infinitywarfeatured.jpg",
      title: "Avengers: Infinity War",
      position: "top-left",
    },
    {
      url: "https://www.bollywoodhungama.com/wp-content/uploads/2018/04/Kabir-Singh.jpg",
      title: "Kabir Singh",
      position: "top-center",
    },
    {
      url:"https://i.ytimg.com/vi/sL35JEzGcRc/maxresdefault.jpg",
      title:"Bramayugam",
      position:"bottom-center"
    },
    {
      url: "https://w0.peakpx.com/wallpaper/380/356/HD-wallpaper-pk-movie-motion-poster.jpg",
      title: "PK",
      position: "top-left",
    },

    {
      url: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2022/11/avatar-the-way-of-water-poster.jpg",
      title: "Avatar: The Way of Water",
      position: "top-right",
    },

   
  ];

  return (
    <section className="slide-container">
      <Slide infinite autoplay transitionDuration={2000} duration={5000}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div
              style={{ backgroundImage: `url(${slide.url})` }}
              className={`bg-cover w-full  h-[500px] brightness-[55%] ${slide.position && `bg-${slide.position}`}`}
            ></div>

            <div className="absolute bottom-4 right-4 z-20 px-11 py-8 hidden md:block">
              <h3 className="text-7xl text-white font-bold">{slide.title}</h3>
            </div>
          </div>
        ))}
      </Slide>
    </section>
  );
};

export const fetchMovies = async (state: string, duration?: string) => {
  const res = await userApi.get(
    `/movies?state=${state}${duration ? `&duration=${duration}` : ""}`
  );
  const data = res.data.data;
  return data;
};

const Home = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<{
    currentMovies: Movie[];
    upcomingMovies: Movie[];
    oneHourMovies: Movie[];
    twoHourMovies: Movie[];
    threeHourMovies: Movie[];
  }>({
    currentMovies: [],
    upcomingMovies: [],
    oneHourMovies: [],
    twoHourMovies: [],
    threeHourMovies: [],
  });

  const { setLoading } = useLoading();

  const fetchAllMovies = async () => {
    setLoading(true);
    const currentMovies = await fetchMovies("NOW_SHOWING");
    const upcomingMovies = await fetchMovies("COMING_SOON");
    const oneHourMovies = await fetchMovies("OTHER", "50m-1h 30m");
    const twoHourMovies = await fetchMovies("OTHER", "1h 45m-2h 30m");
    const threeHourMovies = await fetchMovies("OTHER", "2h 45m-3h 30m");

    setMovies({
      currentMovies,
      upcomingMovies,
      oneHourMovies,
      twoHourMovies: twoHourMovies,
      threeHourMovies: threeHourMovies,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll custom-scrollbar">
      <div className="relative h-[500px] w-full">
        <Slideshow />

        <div className="w-[100%] md:w-[50%] lg:w-[40%] h-full md:bg-gradient-to-r md:from-[#ffffffe4] md:from-30% md:to-transparent z-10 absolute top-0 left-0 p-5 flex items-center backdrop-blur-[1px] md:backdrop-blur-xs">
          <div className=" flex flex-col items-start space-y-14">
            <p className="text-4xl md:text-5xl font-medium leading-snug text-center md:text-left text-white md:text-black">
              Watch movies of your choice with the close one's 🍿🎬
            </p>

            <div className="flex space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:w-fit w-full  flex-col">
              <button
                onClick={() => {
                  navigate("/book");
                }}
                className="px-8 lg:px-14 py-2 text-sm lg:text-base rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer"
              >
                Book now
              </button>

              <button className="px-8 lg:px-14 py-2 text-sm lg:text-base rounded-lg border-2 border-white md:border-black text-white md:text-black font-medium hover:shadow-xl transition duration-200 cursor-pointer">
                View Movies
              </button>
            </div>
          </div>
        </div>
      </div>

      {movies.currentMovies.length > 0 && (
        <section className="w-full px-4 md:px-6 py-10">
          <h2 className="text-lg md:text-2xl font-medium text-center md:text-left">Currently Showing</h2>

          <div className="pt-4 md:pt-8 pb-3 w-full flex items-center justify-center md:justify-start  md:gap-6 gap-4 flex-wrap">
            {movies.currentMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/book");
                }}
              >
                <MovieCard movieInfo={movie} width={innerWidth < 640 ? "150px" : "200px"} height={innerWidth < 640 ? "220px" : "280px"} titleSize={innerWidth < 640 ? "0.6rem" : "0.8rem"}/>
              </div>
            ))}
          </div>
        </section>
      )}

      {movies.oneHourMovies.length > 0 && (
        <section className="w-full px-4 md:px-6 py-10">
          <h2 className="text-lg md:text-2xl font-medium">One Hour Movies</h2>

          <div className="pt-4 md:pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
            <div className=" flex items-center space-x-7">
              {movies.oneHourMovies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movieInfo={movie} width={innerWidth < 640 ? "150px" : "200px"} height={innerWidth < 640 ? "220px" : "280px"} titleSize={innerWidth < 640 ? "0.6rem" : "0.8rem"}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {movies.twoHourMovies.length > 0 && (
        <section className="w-full px-4 md:px-6 py-10">
          <h2 className="text-lg md:text-2xl font-medium">Two Hour Movies</h2>

          <div className="pt-4 md:pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
            <div className=" flex items-center space-x-7">
              {movies.twoHourMovies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movieInfo={movie} width={innerWidth < 640 ? "150px" : "200px"} height={innerWidth < 640 ? "220px" : "280px"} titleSize={innerWidth < 640 ? "0.6rem" : "0.8rem"}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {movies.threeHourMovies.length > 0 && (
        <section className="w-full px-4 md:px-6 py-10">
          <h2 className="text-lg md:text-2xl font-medium">Three Hour Movies</h2>

          <div className="pt-4 md:pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
            <div className=" flex items-center space-x-7">
              {movies.threeHourMovies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movieInfo={movie} width={innerWidth < 640 ? "150px" : "200px"} height={innerWidth < 640 ? "220px" : "280px"} titleSize={innerWidth < 640 ? "0.6rem" : "0.8rem"}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {movies.upcomingMovies.length > 0 && (
        <section className="w-full px-4 md:px-6 py-10">
          <h2 className="text-lg md:text-2xl font-medium">Upcoming Screenings</h2>

          <div className="pt-4 md:pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
            <div className=" flex items-center space-x-7">
              {movies.upcomingMovies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movieInfo={movie} width={innerWidth < 640 ? "150px" : "200px"} height={innerWidth < 640 ? "220px" : "280px"} titleSize={innerWidth < 640 ? "0.6rem" : "0.8rem"}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-10 md:px-16 py-14 md:py-20  h-fit lg:h-[500px] flex flex-col lg:flex-row lg:flex-1 items-center justify-center lg:justify-start space-y-7 lg:space-y-0">
        <div className="lg:flex-[0.5] text-center lg:text-start">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">Why watch with us?</h2>

          <ul className="list-none lg:list-disc text-xl md:text-2xl lg:text-3xl lg:pl-6 pt-8 leading-16 font-extralight">
            <li>Big Screen Nostalgia 🎥</li>
            <li>Affordable Pricing 💰</li>
            <li>Community Vibe 🤝</li>
          </ul>
        </div>

        <div className="lg:flex-[0.5] lg:flex lg:justify-end">
          <Lottie animationData={movieTheatreLottie} className="w-[250px] sm:w-[400px]" />
        </div>
      </section>

      <section className="w-full px-10 md:px-20 py-24 md:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: "🎬",
                title: "Choose a Movie",
                desc: "Select your favorite classic or cult film.",
              },
              {
                icon: "📅",
                title: "Pick Date & Theatre",
                desc: "Book a private theatre for up to 5 friends.",
              },
              {
                icon: "🍿",
                title: "Add Snacks",
                desc: "Popcorn, drinks & munchies delivered inside.",
              },
              {
                icon: "🎉",
                title: "Enjoy Together",
                desc: "Your private cinema, your rules.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 rounded-3xl shadow-xl p-8 hover:scale-105 transition-transform"
              >
                <div className="text-3xl lg:text-5xl mb-6">{step.icon}</div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-base lg:text-xl text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-10 md:px-20 py-14 md:py-24 flex items-center lg:flex-row flex-col lg:space-y-0 space-y-10">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight lg:pr-10">
            Your Own Cinema, Your Rules 🍿
          </h2>
          <p className="mt-6 text-lg md:text-2xl lg:text-2xl text-neutral-700 max-w-xl">
            No strangers, no interruptions. Just you, your chosen movie, and
            your favorite people in a cozy private theatre.
          </p>
          <button
            onClick={() => {
              navigate("/browse");
            }}
            className="mt-10 px-7 md:px-10 py-3 md:py-4 lg:px-14 lg:py-6  rounded-lg  bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-xs lg:text-xl font-bold hover:bg-yellow-300 transition cursor-pointer"
          >
            Select Your Movie Now
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={moviePosters}
            alt="Movie Posters"
            className="mix-blend-multiply"
          />
        </div>
      </section>

      {/* Custom Movie Experience Section */}
      <section className="w-full px-10 md:px-20 py-14 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Create Your Own Movie Experience
            </h2>
            <p className="text-xs md:text-base lg:text-lg text-gray-700 mb-8">
              Not finding what you're looking for? Host a private screening with
              your favorite films and enjoy a personalized cinema experience!
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="mt-1 lg:w-8 lg:h-8 h-6 w-6 lg:text-base text-xs rounded-full bg-gradient-to-r from-fuchsia-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                    Choose Your Movies
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Select from our library
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 lg:w-8 lg:h-8 h-6 w-6 lg:text-base text-xs rounded-full bg-gradient-to-r from-fuchsia-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                    Pick Your Time
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Available 7 days a week, morning to midnight
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 lg:w-8 lg:h-8 h-6 w-6 lg:text-base text-xs rounded-full bg-gradient-to-r from-fuchsia-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                    Enjoy with Friends
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Cozy private theatre, your rules
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/book?custom=true");
              }}
              className="mt-8 px-6 lg:px-8 py-2 lg:py-3 text-xs md:text-sm lg:text-base rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Plan Your Private Screening
            </button>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-500/20 to-blue-500/20 rounded-2xl rotate-1"></div>
              <img
                src="https://bnbtplstorageaccount.blob.core.windows.net/homepage/theater1.jpg"
                alt="Private movie theater"
                className="relative rounded-xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[500px] my-24 relative">
        <img src={movieBanner} className="w-full h-full object-cover brightness-50" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center space-y-6">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-white">Movies of Every Genre</h1>
          <p className="text-base md:text-2xl lg:text-3xl text-white">Choose from our library of classic and cult films.</p>
          <button onClick={() => navigate("/browse")} className="mt-10 px-10 py-3 rounded-lg  bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-xs  md:text-sm font-bold transition cursor-pointer">Browse Movies</button>
        </div>
      </section>

      {/* Book tickets now footer banner */}
      <section className="w-full h-60 mt-20 bg-gradient-to-b from-transparent to-blue-300 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900">
            Don’t Miss Out on the Big Screen!
          </h2>
          <p className="text-xs md:text-base text-gray-700">
            Grab your seats now and enjoy the best cinematic experience.
          </p>
          <button
            onClick={() => {
              navigate("\book");
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-xs md:text-sm font-semibold shadow-lg transition cursor-pointer"
          >
            🎟️ Buy Tickets Now
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
