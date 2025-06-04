import "./Searchpage.css";
import { motion } from "framer-motion";
import { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaBus,
  FaTrain,
  FaPlane,
} from "react-icons/fa";

import searchService from "../../services/api/SearchPageService";

import heritageData from "../../data/heritageData";
const places = Object.values(heritageData);

function MainContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    const query = document.getElementById("searchInput").value;
    const category = document.getElementById("category").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const tourType = document.getElementById("tourType").value;
    const transport = document.getElementById("transport").value;

    // const filtered = places.filter((place) => {
    //   const matchesName = place.name.toLowerCase().includes(query);
    //   const matchesCategory = !category || place.category === category;
    //   const matchesDestination = !destination || place.location === destination;

    //   return matchesName && matchesCategory && matchesDestination;
    // });
    const filtered = await searchService.searchTour(query, tourType);
    setSearchResults(filtered);
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <motion.div
      className="search-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-hero">
        <div className="hero-content">
          <h1>Khám phá Di sản Việt Nam</h1>
          <p>Tìm kiếm và đặt tour đến các địa điểm di sản nổi tiếng</p>
        </div>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-box">
          <div className="search-filters">
            <div className="filter-group">
              <label htmlFor="searchInput">
                <FaSearch className="filter-icon" /> Tìm kiếm
              </label>
              <input
                type="text"
                id="searchInput"
                placeholder="Nhập tên địa điểm, di sản..."
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="category">
                <FaStar className="filter-icon" /> Danh mục
              </label>
              <select id="category" className="filter-select">
                <option value="">Tất cả danh mục</option>
                <option value="unesco">Di sản UNESCO</option>
                <option value="cultural">Di sản văn hóa</option>
                <option value="natural">Di sản thiên nhiên</option>
                <option value="historical">Di tích lịch sử</option>
              </select>
            </div>

            {/* <div className="filter-group">
              <label htmlFor="departure">
                <FaMapMarkerAlt className="filter-icon" /> Điểm khởi hành
              </label>
              <select id="departure" className="filter-select">
                <option value="">Chọn điểm đi</option>
                <option value="hanoi">Hà Nội</option>
                <option value="danang">Đà Nẵng</option>
                <option value="hochiminh">TP.Hồ Chí Minh</option>
              </select>
            </div> */}

            <div className="filter-group">
              <label htmlFor="destination">
                <FaMapMarkerAlt className="filter-icon" /> Điểm đến
              </label>
              <select id="destination" className="filter-select">
                <option value="">Chọn điểm đến</option>
                <option value="hanoi">Hà Nội</option>
                <option value="halong">Hạ Long</option>
                <option value="ninhbinh">Ninh Bình</option>
                <option value="hue">Huế</option>
                <option value="danang">Đà Nẵng</option>
                <option value="hoian">Hội An</option>
                <option value="dalat">Đà Lạt</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="date">
                <FaCalendarAlt className="filter-icon" /> Ngày khởi hành
              </label>
              <input type="date" id="date" className="filter-select" />
            </div>

            <div className="filter-group">
              <label htmlFor="tourType">
                <FaStar className="filter-icon" /> Loại tour
              </label>
              <select id="tourType" className="filter-select">
                <option value="">Tất cả loại tour</option>
                <option value="luxury">Cao cấp</option>
                <option value="standard">Tiêu chuẩn</option>
                <option value="budget">Tiết kiệm</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="transport">
                <FaBus className="filter-icon" /> Phương tiện
              </label>
              <select id="transport" className="filter-select">
                <option value="">Tất cả</option>
                <option value="bus">Xe khách</option>
                <option value="train">Tàu hỏa</option>
                <option value="plane">Máy bay</option>
              </select>
            </div>

            <button
              type="submit"
              className="search-button"
              disabled={isSearching}
            >
              {isSearching ? "Đang tìm kiếm..." : "Tìm kiếm"}
            </button>
          </div>
        </form>

        <div className="search-results">
          {searchResults.length > 0 ? (
            <div className="results-grid">
              {searchResults.map((heritage) => (
                <Link
                  to={`/tour_detail/${heritage.tour_id}`}
                  key={heritage.tour_id}
                >
                  <motion.div
                    className="heritage-card"
                    whileHover={{ scale: 1.02 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="card-image">
                      <img src={heritage.image} alt={heritage.tour_name} />
                      {/* <div className="card-badge">{heritage.category}</div> */}
                    </div>
                    <div className="card-content">
                      <h3>{heritage.tour_name}</h3>
                      <p className="location">
                        <FaMapMarkerAlt /> Việt Nam
                      </p>
                      <p className="description">
                        {heritage.description.substring(0, 100)}...
                      </p>
                      <div className="card-footer">
                        <span className="price">{heritage.price} VND</span>
                        <button className="view-detail">Xem chi tiết</button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results">
              {isSearching ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <img src="/images/no-results.png" alt="No results" />
                  <p>Không tìm thấy kết quả phù hợp</p>
                  <p>Hãy thử thay đổi tiêu chí tìm kiếm của bạn</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SearchPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MainContent />
    </motion.div>
  );
}

export default SearchPage;
