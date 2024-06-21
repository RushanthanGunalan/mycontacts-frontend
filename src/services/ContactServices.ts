import axios from "axios";

const Contact_URL = "http://localhost:5001/api/contacts";

export const ContactListJson = () => axios.get(Contact_URL);

export const AddContactJson = (contact: any) =>
  axios.post(Contact_URL, contact);

export const DeleteContactJson = (id: any) =>
  axios.delete(`${Contact_URL}/${id}`);

export const UpdateContactJson = (id: any, contact: any) =>
  axios.put(`${Contact_URL}/${id}`, contact);
