import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full px-6 md:px-10 lg:px-20 py-16 md:py-24 bg-gradient-to-br from-fuchsia-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">
            About Miniplex Booking
          </h1>
          <p className="mt-5 text-gray-700 text-lg md:text-xl">
            Miniplex lets you discover movies, book seats in seconds, and even host
            your own private screenings. A smooth, modern cinema experience—online and in theatre.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/browse"
              className="px-6 py-3 rounded-xl bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition cursor-pointer"
            >
              Browse Movies
            </Link>
            <Link
              to="/book"
              className="px-6 py-3 rounded-xl border border-blue-300 text-blue-700 font-semibold bg-white/70 backdrop-blur hover:bg-white transition cursor-pointer"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full px-6 md:px-10 lg:px-20 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
            <div className="text-3xl">🎬</div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">Curated Library</h3>
            <p className="mt-1 text-gray-600 text-sm">
              Explore classics, new releases, and cult favorites across genres.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
            <div className="text-3xl">⚡</div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">Fast Booking</h3>
            <p className="mt-1 text-gray-600 text-sm">
              Seamless seat selection, secure checkout, and instant confirmations.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
            <div className="text-3xl">👥</div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">Private Screenings</h3>
            <p className="mt-1 text-gray-600 text-sm">
              Host personalised shows with friends and family. Your time, your rules.
            </p>
          </div>
        </div>
      </section>

      {/* Mini-CTA band */}
      <section className="w-full px-6 md:px-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto rounded-2xl p-8 md:p-10 bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Ready for the Big Screen?</h2>
            <p className="mt-1 text-white/90">Grab your seats or plan a private show in minutes.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/book"
              className="px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              Book Tickets
            </Link>
            <Link
              to="/book?custom=true"
              className="px-5 py-3 rounded-xl border border-white/60 text-white font-semibold hover:bg-white/10 transition cursor-pointer"
            >
                Private Screening
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
