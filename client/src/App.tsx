import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signu";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
