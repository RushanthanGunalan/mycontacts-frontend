import axios from "axios";

const Customer_URL = "http://localhost:5001/api/contacts";

export const ContactListJson = () => axios.get(Customer_URL);
