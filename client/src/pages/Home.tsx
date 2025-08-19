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

const Slideshow = () => {
  const slides = [
    {
      url: "https://musewithmeblog.com/wp-content/uploads/2018/05/infinitywarfeatured.jpg",
      title: "Avengers: Infinity War",
    },
    {
      url: "https://i0.wp.com/conciliarpost.com/wp-content/uploads/2014/09/breaking_bad_fb_banner_by_cartoonperson-d5628z3.png?fit=851%2C314&ssl=1",
      title: "Breaking Bad",
    },
    {
      url: "https://w0.peakpx.com/wallpaper/380/356/HD-wallpaper-pk-movie-motion-poster.jpg",
      title: "PK",
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

export const fetchMovies = async (pageno: number): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageno}"`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const movies: Movie[] = [];

  await fetch(url, options)
    .then(async (r) => {
      const data = await r.json();

      for (let i = 0; i <= 10; i++) {
        movies.push({
          id: data.results[i].id,
          duration: "2h 4m",
          poster_url: `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`,
          state: "current",
          title: data.results[i].title,
        });
      }
    })
    .catch((err) => console.error(err));

  return movies;
};

const Home = () => {
  const navigate = useNavigate();

  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const { setLoading } = useLoading();

  const fetchCurrentMovies = async () => {
    const res = await userApi.get("/movies");
    const data = res.data.data;
    return data;
  };

  const fetchAllMovies = async () => {
    setLoading(true);
    const currentMovies = await fetchCurrentMovies();
    const upcomingMovies = await fetchMovies(2);

    setCurrentMovies(currentMovies);
    setUpcomingMovies(upcomingMovies);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

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
              <button
                onClick={() => {
                  navigate("/book");
                }}
                className="px-14 py-2 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-lg focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer"
              >
                Book now
              </button>

              <button className="px-14 py-2 rounded-lg border-2 border-black text-black font-medium hover:shadow-xl transition duration-200 cursor-pointer">
                View Movies
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full px-6 py-10">
        <h2 className="text-2xl font-medium">Currently Showing</h2>

        <div className="pt-8 pb-3 w-full flex items-center gap-6 flex-wrap">
          {currentMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate("/book");
              }}
            >
              <MovieCard movieInfo={movie} />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-10">
        <h2 className="text-2xl font-medium">Upcoming Screenings</h2>

        <div className="pt-8 pb-3 w-full overflow-x-scroll custom-scrollbar">
          <div className=" flex items-center space-x-7">
            {upcomingMovies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movieInfo={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-16 py-20  h-[500px] flex flex-1 items-center">
        <div className="flex-[0.5]">
          <h2 className="text-5xl">Why watch with us?</h2>

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

      <section className="w-full px-20 py-40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
                <div className="text-5xl mb-6">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-lg text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-20 py-24 flex items-center">
        <div className="flex-1">
          <h2 className="text-5xl leading-tight pr-10">
            Your Own Cinema, Your Rules 🍿
          </h2>
          <p className="mt-6 text-2xl text-neutral-700 max-w-xl">
            No strangers, no interruptions. Just you, your chosen movie, and
            your favorite people in a cozy private theatre.
          </p>
          <button
            onClick={() => {
              navigate("/browse");
            }}
            className="mt-10 px-10 py-4 rounded-2xl  bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-xl font-bold hover:bg-yellow-300 transition cursor-pointer"
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

      {/* Book tickets now footer banner */}
      <section className="w-full h-60 mt-20 bg-gradient-to-b from-transparent to-blue-300 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Don’t Miss Out on the Big Screen!
          </h2>
          <p className="text-gray-700">
            Grab your seats now and enjoy the best cinematic experience.
          </p>
          <button
            onClick={() => {
              navigate("\book");
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold shadow-lg transition cursor-pointer"
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
