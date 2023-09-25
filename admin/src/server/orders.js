import axios from "./axios";

const OrderService = {
   order(order) {
      return axios.post("/orders", order);
   },
   getOrders() {
      return axios.get("/orders");
   },
   getOrdersByUserId(userid) {
      return axios.get(`/orders/get/userorders/${userid}`);
   },
   postReservation(data) {
      return axios.post("/reservations", data);
   },
};

export default OrderService;
