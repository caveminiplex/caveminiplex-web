const Signup = () => {
    return (
         <div className="min-h-screen flex">
      {/* Left side with image */}
      <div className="hidden md:flex w-2/5 relative">
        <img
          src="https://source.unsplash.com/800x1000/?startup,teamwork"
          alt="Signup background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Join Us Today <br /> and watch movies with us.
          </h1>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Create an Account
          </h2>
          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
    )
}

export default Signup;