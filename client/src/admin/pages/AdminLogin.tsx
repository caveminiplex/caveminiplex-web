const AdminLogin = () => {
  return (
    <div className="w-full h-screen flex-1 flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Login to Admin Account
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
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
