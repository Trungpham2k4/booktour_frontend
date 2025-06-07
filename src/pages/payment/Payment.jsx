import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import paymentService from "../../services/api/PaymentPageService";
import "./Payment.css";

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await paymentService.getBookedTourById(id);
        setBooking(bookingData);
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handlePayment = async () => {
    try {
      await paymentService.processPayment(id, paymentMethod, booking.total_price);
      alert("Thanh toán thành công!");
      navigate("/");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Thanh toán thất bại, vui lòng thử lại!");
    }
  };

  if (isLoading) {
    return <div className="payment-container">Đang tải thông tin...</div>;
  }

  if (!booking) {
    return <div className="payment-container">Không tìm thấy thông tin đặt tour</div>;
  }

  return (
    <div className="payment-container">
      <h2>Thanh toán Tour</h2>
      <div className="payment-details">
        <h3>{booking.tour_name}</h3>
        <p>Số người: {booking.num_guests}</p>
        <p>Tổng tiền: {booking.total_price} VND</p>
        
        <div className="payment-method">
        <h3>Chọn phương thức thanh toán</h3>
        <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="payment-select"
        >
            <option value="credit_card">Thẻ tín dụng</option>
            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
            <option value="momo">Ví điện tử Momo</option>
        </select>
        </div>

        <button onClick={handlePayment} className="confirm-payment">
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;