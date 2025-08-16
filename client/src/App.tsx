import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrowseMovies from "./pages/BrowseMovies";
import AllMovies from "./pages/AllMovies";
import Admin from "./admin/pages/Admin";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import Loading from "./Loading";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Loading />} />


        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/browse" element={<BrowseMovies />} />
          <Route path="/movies" element={<AllMovies />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin/control/v1/login" element={<AdminLogin />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin/control/v1" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
