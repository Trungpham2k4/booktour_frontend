import "./About.css";
import { motion } from "framer-motion";
import { FaMountain, FaUsers, FaAward, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Về Chúng Tôi</h1>
          <p className="description">
            Khám phá câu chuyện và giá trị đằng sau hành trình của chúng tôi
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <h2>Câu Chuyện Của Chúng Tôi</h2>
            <p>
              Được thành lập từ năm 2010, chúng tôi bắt đầu với một niềm đam mê
              du lịch và mong muốn mang đến những trải nghiệm đáng nhớ cho du
              khách. Từ một công ty nhỏ với chỉ 5 nhân viên, chúng tôi đã phát
              triển thành một trong những đơn vị lữ hành hàng đầu tại Việt Nam.
            </p>
            <p>
              Sứ mệnh của chúng tôi là kết nối mọi người với những điểm đến
              tuyệt vời, đồng thời góp phần phát triển du lịch bền vững và bảo
              tồn các giá trị văn hóa địa phương.
            </p>
          </div>
          <div className="story-image">
            <img
              src="https://www.internationalinsurance.com/wp-content/uploads/2023/01/group-of-business-people-scaled.jpg"
              alt="Team working together"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <h2>Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaMountain className="value-icon" />
              <h3>Trải Nghiệm Độc Đáo</h3>
              <p>
                Chúng tôi thiết kế những hành trình khác biệt, mang đến góc nhìn
                mới về điểm đến
              </p>
            </div>
            <div className="value-card">
              <FaUsers className="value-icon" />
              <h3>Chuyên Nghiệp</h3>
              <p>
                Đội ngũ hướng dẫn viên giàu kinh nghiệm, am hiểu văn hóa địa
                phương
              </p>
            </div>
            <div className="value-card">
              <FaHeart className="value-icon" />
              <h3>Tận Tâm</h3>
              <p>
                Luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng với sự
                nhiệt thành
              </p>
            </div>
            <div className="value-card">
              <FaAward className="value-icon" />
              <h3>Chất Lượng</h3>
              <p>Cam kết chất lượng dịch vụ tốt nhất với giá cả hợp lý</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements">
        <div className="container">
          <h2>Thành Tựu</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Khách hàng hài lòng</p>
            </div>
            <div className="stat-item">
              <h3>200+</h3>
              <p>Tour độc đáo</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Đối tác quốc tế</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Giải thưởng du lịch</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Sẵn sàng cho hành trình tiếp theo?</h2>
          <p>Hãy để chúng tôi giúp bạn khám phá những điểm đến tuyệt vời</p>
          <button className="cta-button">
            <Link to="/">Khám phá các tour ngay</Link>
          </button>
        </div>
      </section>
    </motion.div>
  );
}

export default About;
