import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Profile from "../../assets/Profile.png";
import { useEffect, useState } from "react";
import {
  ContactListJson,
  DeleteContactJson,
} from "../../services/ContactServices";
import CustomButton from "../../components/Button";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import CustomSnackBar from "../../components/SnackBar";

interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function CardDetail() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ContactToEdit, setContactToEdit] = useState<Contacts | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState(false);
  const [ContactToDelete, setContactToDelete] = useState<Contacts | null>(null);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getAllContacts();
  }, []);

  function getAllContacts() {
    ContactListJson()
      .then((response) => {
        const dataWithId = response.data.map((contact: any) => ({
          id: contact._id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        }));
        setContacts(dataWithId);
      })
      .catch((error) => {
        console.error("There was an error fetching the contacts:", error);
        // You can also display an error message to the user if needed
      });
  }

  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find((contact) => contact.id === id);
    if (contactToDelete) {
      setContactToDelete(contactToDelete);
      setisConfirmPopupOpen(true);
    }
  };

  const ConfirmDeleteContact = () => {
    if (ContactToDelete) {
      DeleteContactJson(ContactToDelete.id).then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== ContactToDelete!.id)
        );
        setisConfirmPopupOpen(false);
        setContactToDelete(null);
        setSnackbarMessage("Successfully Deleted");
        setSnackbarOpen(true);
      });
    }
  };

  const handleEditContact = (contact: Contacts) => {
    setContactToEdit(contact);
    setIsPopupOpen(true);
  };

  const handleUpdateContact = (updateContact: Contacts) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updateContact.id ? updateContact : contact
      )
    );
    setIsPopupOpen(false);
    setContactToEdit(null);
    setSnackbarMessage("Contacts Successfully Updated");
    setSnackbarOpen(true);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCloseConfirmPopup = () => {
    setisConfirmPopupOpen(false);
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {contacts.map((contact) => (
        <Grid item xs={12} sm={6} md={3} key={contact.id}>
          {" "}
          {/* 4 cards per row (md = 3, meaning 12/3 = 4 columns) */}
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              image={Profile}
              alt="Contact Image"
              sx={{ height: 140 }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {contact.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {contact.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {contact.email}
              </Typography>
            </CardContent>
            <CustomButton
              variant={"text"}
              buttonText={"Edit"}
              buttonClick={() => handleEditContact(contact)} // Pass the contact object when the button is clicked
            />
            <CustomButton
              variant={"text"}
              buttonText={"Delete"}
              buttonClick={() => handleDeleteContact(contact.id)} // Pass the contact object when the button is clicked
            />
          </Card>
        </Grid>
      ))}
      {isPopupOpen && (
        <Popup
          open={isPopupOpen}
          onClose={handleClosePopup}
          title={ContactToEdit ? "Update Contact" : "Add Contact"}
          customWidth={700}
        >
          <ContactForm
            onClose={handleClosePopup}
            onUpdate={handleUpdateContact}
            contact={ContactToEdit}
            onAdd={function (contact: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Popup>
      )}
      {isConfirmPopupOpen && (
        <Popup
          open={isConfirmPopupOpen}
          onClose={handleCloseConfirmPopup}
          title={`Delete Contact ${
            ContactToDelete ? ContactToDelete.name : ""
          }?`}
          customWidth={400}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant={"outlined"}
                style={{
                  fontSize: "medium",
                  borderRadius: "20px",
                  color: "white",
                  backgroundColor: "blue",
                  width: "100%",
                }}
                onClick={ConfirmDeleteContact}
              >
                Yes
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant={"outlined"}
                style={{
                  fontSize: "medium",
                  borderRadius: "20px",
                  width: "100%",
                }}
                onClick={handleCloseConfirmPopup}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Popup>
      )}
      <CustomSnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        duration={3000}
        position={{ vertical: "top", horizontal: "right" }}
      />
    </Grid>
  );
}

export default CardDetail;
