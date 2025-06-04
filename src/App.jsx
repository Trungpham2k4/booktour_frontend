import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/about/About";
import Booking from "./pages/booking/Booking";
import Comment from "./pages/comment/Comment";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import SearchPage from "./pages/searchPage/Searchpage";
import Tour from "./pages/tour_detail/Tour";

import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tour_detail/:id" element={<Tour />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
