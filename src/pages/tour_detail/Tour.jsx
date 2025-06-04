import "./Tour.css";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import heritageData from "../../data/heritageData";
import { useState, useEffect } from "react";
import tourDetailService from "../../services/api/TourDetailPageService";

function Detail({ id }) {
  const [heritage, setHeritage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await tourDetailService.searchHeritageDetail(id);
      setHeritage(res);
    };

    fetchData();
  }, []);

  const data = heritage;
  if (!data) return <div>Không tìm thấy thông tin</div>;

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-cap">{data.location_name}</h2>
      <div className="product-image-container">
        <div className="image-container">
          <img
            className="image-detail"
            src={data.image}
            alt={data.location_name}
          />
        </div>
        <div className="name-price-container">
          <div className="product-description">
            <h2>Description</h2>
            <p>Giới thiệu: {data.description}</p>
            <p>Lịch sử: {data.history}</p>
            <p>Lễ hội: {data.festival}</p>
            <p>Ẩm thực: {data.food}</p>
          </div>
          <strong>Giá tour:</strong> {data.price || "100000"}
          <div className="order-purchase-container">
            <div className="order-button-container">
              <Link to={`/booking/${id}`}>
                <p className="order-button">Đặt tour ngay</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tour() {
  const { id } = useParams(); // lấy từ đường dẫn

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <NavBar /> */}
      <Detail id={id} />
      {/* <Footer /> */}
    </motion.div>
  );
}

export default Tour;
