import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Booking.css";
import bookingService from "../../services/api/BookingPageService";
import { useNavigate } from "react-router-dom";
function Booking() {
  const { id } = useParams();
  const [tour, setTourInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [transportList, setTransportList] = useState([]);
  const [tourGuideList, setTourGuideList] = useState([]);
  const [tourTypeList, setTourTypeList] = useState([]);
  const [formData, setFormData] = useState({
    transport: "",
    people: 1,
    guide: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  console.log(user);

  // Fetch all necessary data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tourData, transports, guides, types, userBookings] =
          await Promise.all([
            bookingService.searchTourById(id),
            bookingService.getTransport(),
            bookingService.getTourGuide(),
            bookingService.getTourType(),
            bookingService.getAllBookedTours(user.id), // Assuming user ID 1 for demo
          ]);

        // console.log(tourData);
        setTourInfo(tourData);
        setTransportList(transports);
        setTourGuideList(guides);
        setTourTypeList(types);
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    console.log(user.id, tour.tour_id, formData.people, tour.price);

    try {
      await bookingService.saveBooking(
        user.id, // user ID
        tour.tour_id,
        formData.people,
        tour.price
      );

      // Refresh bookings after successful submission
      const updatedBookings = await bookingService.getAllBookedTours(user.id);
      setBookings(updatedBookings);

      alert("Bạn đã đặt tour thành công!");
      setFormData({
        transport: "",
        people: 1,
        guide: "",
      });
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Đặt tour thất bại, vui lòng thử lại!");
    }
  };

  const validateForm = () => {
    if (!formData.transport) {
      alert("Vui lòng chọn phương tiện");
      return false;
    }
    if (!formData.guide) {
      alert("Vui lòng chọn người hướng dẫn tour");
      return false;
    }
    return true;
  };

  if (isLoading) {
    return (
      <div className="booking-container">
        <h2 className="booking-title">Đang tải thông tin tour...</h2>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="booking-container">
        <h2 className="booking-title">Không tìm thấy thông tin tour</h2>
      </div>
    );
  }

  return (
    <main className="booking-container">
      <section className="booking-section">
        <h2 className="booking-title">Đặt Tour: {tour.name}</h2>
        <img
          src={tour.image}
          alt={tour.name}
          className="booking-image"
          loading="lazy"
        />

        <form className="booking-form">
          <FormField
            label="Loại tour"
            type="select"
            value={tour.tour_type_name}
            disabled
            options={tourTypeList}
          />

          <FormField
            label="Phương tiện"
            type="select"
            value={formData.transport}
            onChange={(e) => handleChange("transport", e.target.value)}
            options={transportList}
            required
          />

          <FormField
            label="Số người"
            type="number"
            value={formData.people}
            onChange={(e) => handleChange("people", e.target.value)}
            min="1"
          />

          <FormField
            label="Hướng dẫn viên"
            type="select"
            value={formData.guide}
            onChange={(e) => handleChange("guide", e.target.value)}
            options={tourGuideList}
            required
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="booking-button"
            aria-label="Xác nhận đặt tour"
          >
            Xác nhận đặt tour
          </button>
        </form>
      </section>

      <section className="bookings-history">
        <h3 className="history-title">Tour bạn đã đặt</h3>
        {bookings.length === 0 ? (
          <p className="no-bookings">Bạn chưa đặt tour nào</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.booking_id} className="booking-card">
                <div className="booking-header">
                  <h4>{booking.tour_name}</h4>
                  {/* <span className="booking-date">
                    {new Date(booking.booking_date).toLocaleDateString()}
                  </span> */}
                </div>
                <div className="booking-details">
                  <p>
                    <strong>Số người:</strong> {booking.num_guests}
                  </p>
                  <p>
                    <strong>Phương tiện:</strong>{" "}
                    {booking.transport_name || "Bus"}
                  </p>
                  <p>
                    <strong>Hướng dẫn viên:</strong> {booking.guide_name || "A"}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong> {booking.total_price} VND
                  </p>
                </div>
                <div
                  className={`booking-status ${booking.payment_status.toLowerCase()}`}
                >
                  {booking.payment_status}
                </div>
                {booking.payment_status === "Chờ xử lý" && (
                  <button 
                    onClick={() => navigate(`/payment/${booking.booking_id}`)}
                    className="payment-button"
                  >
                    Thanh toán
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const FormField = ({
  label,
  type,
  value,
  onChange,
  options,
  min,
  required,
  disabled,
}) => (
  <div className="form-field">
    <label>
      {label}
      {required && <span className="required">*</span>}
    </label>
    {type === "select" ? (
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="">--Chọn--</option>
        {options.map((option) => (
          <option
            key={option.id || option.name}
            value={option.id || option.name}
          >
            {option.name}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        required={required}
        disabled={disabled}
      />
    )}
  </div>
);

export default Booking;
