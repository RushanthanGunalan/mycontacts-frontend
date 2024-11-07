import axios, { AxiosRequestConfig } from "axios";

const Contact_URL = "http://localhost:5001/api/contacts";

export const ContactListJson = () => axios.get(Contact_URL);

export const AddContactJson = (contact: any) =>
  axios.post(Contact_URL, contact);

export const DeleteContactJson = (id: any) =>
  axios.delete(`${Contact_URL}/${id}`);

export const UpdateContactJson = (id: any, contact: any) =>
  axios.put(`${Contact_URL}/${id}`, contact);

// Fetch favorite contacts
export const FavoriteContactJson = () => axios.get(`${Contact_URL}/favorites`);

// New function to toggle favorite status
export const ToggleFavoriteContactJson = (contactId: string) =>
  axios
    .put(`${Contact_URL}/${contactId}/favorite`)
    .then((response) => response.data);
