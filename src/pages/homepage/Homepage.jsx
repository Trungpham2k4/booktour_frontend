import "./Homepage.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import heritageData from "../../data/heritageData";
import { Link, Route, Routes } from "react-router-dom";
import Tour from "../../pages/tour_detail/Tour";
import HomepageService from "../../services/api/HomepageService";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
  FaFire,
  FaPercent,
} from "react-icons/fa";

// const places = Object.values(HomepageService.getAllHeritage());
// console.log(places);
function MainContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const categories = [
    "Tất cả",
    "Miền Bắc",
    "Miền Trung",
    "Miền Nam",
    "Tour quốc tế",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const heritage = await HomepageService.getAllHeritage();
      setFilteredPlaces(heritage);
    };
    fetchData(); // Gọi hàm async nội bộ
  }, []);

  // Thêm trường discount vào dữ liệu nếu chưa có
  // const placesWithDiscount = places.map((place) => ({
  //   ...place,
  //   discount:
  //     place.discount || Math.random() > 0.7
  //       ? Math.floor(Math.random() * 30) + 10
  //       : 0,
  // }));

  // console.log(placesWithDiscount);

  // useEffect(() => {
  //   let results = placesWithDiscount;

  //   // Lọc theo danh mục
  //   if (selectedCategory !== "Tất cả") {
  //     results = results.filter(
  //       (place) =>
  //         place.region === selectedCategory ||
  //         (selectedCategory === "Tour quốc tế" && place.isInternational)
  //     );
  //   }

  //   // Lọc theo từ khóa tìm kiếm
  //   if (searchTerm) {
  //     results = results.filter(
  //       (place) =>
  //         place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         place.intro.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   setFilteredPlaces(results);
  // }, [searchTerm, selectedCategory]);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Khám Phá Việt Nam Và Thế Giới</h1>
          <p>Hơn 1000+ tour du lịch chất lượng với giá tốt nhất</p>

          {/* Search Bar */}
          <div className="search-bar">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Bạn muốn đi đâu?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="search-button">Tìm kiếm</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <h2>Khám phá theo khu vực</h2>
        <div className="categories-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Tours */}
      {/* <div className="featured-tours">
        <h2>
          Tour Nổi Bật <FaFire className="fire-icon" />
        </h2>
        <div className="featured-list">
          {placesWithDiscount
            .filter((place) => place.isFeatured)
            .slice(0, 3)
            .map((heritage) => (
              <FeaturedTourCard key={heritage.id} heritage={heritage} />
            ))}
        </div>
      </div> */}

      {/* Discount Tours */}
      {/* <div className="discount-tours">
        <h2>
          Ưu Đãi Đặc Biệt <FaPercent className="discount-icon" />
        </h2>
        <div className="discount-list">
          {placesWithDiscount
            .filter((place) => place.discount > 0)
            .slice(0, 4)
            .map((heritage) => (
              <DiscountTourCard key={heritage.id} heritage={heritage} />
            ))}
        </div>
      </div> */}

      {/* All Tours */}
      <div className="all-tours-section">
        <div className="section-header">
          <h2>ĐỊA ĐIỂM DU LỊCH</h2>
          {/* <div className="sort-options">
            <span>Sắp xếp theo:</span>
            <select>
              <option>Phổ biến nhất</option>
              <option>Giá thấp nhất</option>
              <option>Giá cao nhất</option>
              <option>Đánh giá cao nhất</option>
            </select>
          </div> */}
        </div>

        <div className="heritage-list">
          {filteredPlaces.map((heritage) => (
            <TourCard key={heritage.id} heritage={heritage} />
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="no-results">
            <p>
              Không tìm thấy tour phù hợp. Vui lòng thử lại với từ khóa hoặc
              danh mục khác.
            </p>
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Tại Sao Chọn Chúng Tôi?</h2>
        <div className="reasons">
          <div className="reason">
            <div className="reason-icon">✓</div>
            <h3>Giá Tốt Nhất</h3>
            <p>
              Cam kết giá tốt nhất thị trường với chất lượng dịch vụ hàng đầu
            </p>
          </div>
          <div className="reason">
            <div className="reason-icon">✓</div>
            <h3>Hỗ Trợ 24/7</h3>
            <p>Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn mọi lúc</p>
          </div>
          <div className="reason">
            <div className="reason-icon">✓</div>
            <h3>Đặt Tour Dễ Dàng</h3>
            <p>
              Quy trình đặt tour đơn giản, thanh toán an toàn và nhanh chóng
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>Khách Hàng Nói Về Chúng Tôi</h2>
        <div className="testimonial-list">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình, chương trình
                đúng như mô tả. Sẽ quay lại đặt tour ở đây!"
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">T</div>
              <div className="author-info">
                <strong>Trần Văn An</strong>
                <div className="rating">
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Dịch vụ tốt, giá cả hợp lý. Đặc biệt rất hài lòng với khách sạn
                4 sao trong tour."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">N</div>
              <div className="author-info">
                <strong>Nguyễn Thị Ly</strong>
                <div className="rating">
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star filled" />
                  <FaStar className="star" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Component cho thẻ tour thông thường
function TourCard({ heritage }) {
  return (
    <Link to={`/tour_detail/${heritage.location_id}`}>
      <motion.div
        className="heritage-card"
        whileHover={{ scale: 1.03 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {heritage.discount > 0 && (
          <div className="discount-badge">-{heritage.discount}%</div>
        )}
        <img
          src={heritage.image}
          alt={heritage.location_name}
          className="heritage-image"
        />
        <div className="card-content">
          <h3>{heritage.location_name}</h3>
          <div className="location">
            <FaMapMarkerAlt className="location-icon" />
            <span>{heritage.location || "Việt Nam"}</span>
          </div>
          <p className="intro">{heritage.description}</p>
          <div className="tour-duration">
            <FaCalendarAlt className="calendar-icon" />
            <span>{heritage.duration || "3 ngày 2 đêm"}</span>
          </div>
          <div className="price-section">
            {heritage.discount > 0 ? (
              <>
                <span className="original-price">{heritage.price}</span>
                <span className="discounted-price">
                  {calculateDiscount(heritage.price, heritage.discount)}
                </span>
              </>
            ) : (
              <span className="normal-price">{heritage.price}</span>
            )}
          </div>
          <div className="rating">
            <FaStar className="star filled" />
            <FaStar className="star filled" />
            <FaStar className="star filled" />
            <FaStar className="star filled" />
            <FaStar className="star" />
            <span className="rating-text">({heritage.rating || "4.0"})</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Component cho thẻ tour nổi bật
function FeaturedTourCard({ heritage }) {
  return (
    <Link to={`/tour_detail/${heritage.id}`}>
      <motion.div className="featured-card" whileHover={{ scale: 1.02 }}>
        <img src={heritage.image} alt={heritage.name} />
        <div className="featured-content">
          <div className="featured-badge">NỔI BẬT</div>
          <h3>{heritage.name}</h3>
          <div className="featured-price">
            {heritage.discount > 0 ? (
              <>
                <span className="original-price">{heritage.price}</span>
                <span className="discounted-price">
                  {calculateDiscount(heritage.price, heritage.discount)}
                </span>
              </>
            ) : (
              <span className="normal-price">{heritage.price}</span>
            )}
          </div>
          <button className="book-now-btn">Đặt ngay</button>
        </div>
      </motion.div>
    </Link>
  );
}

// Component cho thẻ tour giảm giá
function DiscountTourCard({ heritage }) {
  return (
    <Link to={`/tour_detail/${heritage.id}`}>
      <motion.div className="discount-card" whileHover={{ scale: 1.05 }}>
        <div className="discount-ribbon">-{heritage.discount}%</div>
        <img src={heritage.image} alt={heritage.name} />
        <div className="discount-content">
          <h3>{heritage.name}</h3>
          <div className="price-section">
            <span className="original-price">{heritage.price}</span>
            <span className="discounted-price">
              {calculateDiscount(heritage.price, heritage.discount)}
            </span>
          </div>
          <div className="time-left">Còn 2 ngày</div>
        </div>
      </motion.div>
    </Link>
  );
}

// Hàm tính giá sau giảm giá
function calculateDiscount(priceStr, discount) {
  const price = parseInt(priceStr.replace(/\D/g, ""), 0);
  const discountedPrice = price * (1 - discount / 100);
  return formatPrice(discountedPrice);
}

// Hàm định dạng giá
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function Homepage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <NavBar /> */}
      <MainContent />
      {/* <Footer /> */}
    </motion.div>
  );
}

export default Homepage;
