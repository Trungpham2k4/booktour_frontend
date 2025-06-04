import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Booking from "./pages/booking/Booking";
import About from "./pages/about/About";
import SearchPage from "./pages/searchPage/Searchpage";
import Comment from "./pages/comment/Comment";
import Tour from "./pages/tour_detail/Tour";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/comment" element={<Comment />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/tour_detail/:id" element={<Tour />} />
    </Routes>
  );
}

export default Routing;
