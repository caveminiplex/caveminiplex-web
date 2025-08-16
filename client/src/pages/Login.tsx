const Login = () => {
    return (
         <div className="min-h-screen flex">
      {/* Left side with image */}
      <div className="hidden md:flex w-2/5 relative">
        <img
          src="https://source.unsplash.com/800x1000/?technology,office"
          alt="Login background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Welcome Back! <br /> Watch movies with us.
          </h1>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Login to Your Account
          </h2>
          <form className="space-y-5">
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 font-medium hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
    )
}

export default Login;