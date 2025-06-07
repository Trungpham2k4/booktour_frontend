import http from "../http";

const PaymentPageService = {
    async getBookedTourById(bookingId) {
        try {
            const response = await http.post("api/getBookedTourById", { bookingId });
            console.log("Booked tour data:", response);
            return response;
        } catch (e) {
            console.error("Error fetching booked tour by ID:", e);
            throw e; // Re-throw the error for handling in the component
        }
    },
    async processPayment(bookingId, paymentMethod, totalPrice) {
        try {
            const response = await http.post("api/processPayment", {
                bookingId,
                paymentMethod,
                totalPrice
            });
            console.log("Payment processed:", response);
            return response;
        } catch (e) {
            console.error("Error processing payment:", e);
            throw e; // Re-throw the error for handling in the component
        }
    }
}

export default PaymentPageService;