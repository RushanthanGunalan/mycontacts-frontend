import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import Profile from "../../assets/Profile.png";
import NoDataImage from "../../assets/NoDataImage.gif";
import { useEffect, useState } from "react";
import {
  DeleteContactJson,
  FavoriteContactJson,
  ToggleFavoriteContactJson,
} from "../../services/ContactServices";
import CustomButton from "../../components/Button";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import CustomSnackBar from "../../components/SnackBar";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  favorite?: boolean;
}

function FavContact() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ContactToEdit, setContactToEdit] = useState<Contacts | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState(false);
  const [ContactToDelete, setContactToDelete] = useState<Contacts | null>(null);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getFavoriteContacts();
  }, []);

  // Function to get only the favorite contacts
  function getFavoriteContacts() {
    FavoriteContactJson()
      .then((response) => {
        const favoriteContacts = response.data
          .filter((contact: any) => contact.isFavorite) // Keep only favorite contacts
          .map((contact: any) => ({
            id: contact._id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            favorite: contact.isFavorite,
          }));
        setContacts(favoriteContacts);
      })
      .catch((error) => {
        console.error("There was an error fetching favorite contacts:", error);
      });
  }

  // Toggle the favorite status of the contact
  const handleToggleFavorite = async (contactId: string) => {
    try {
      const updatedContact = await ToggleFavoriteContactJson(contactId);

      // Update local state with the updated contact
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContact._id
            ? { ...contact, favorite: updatedContact.isFavorite }
            : contact
        )
      );

      getFavoriteContacts();

      setSnackbarMessage(
        updatedContact.isFavorite
          ? "Added to Favorites"
          : "Removed from Favorites"
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setSnackbarMessage("Failed to update favorite status");
      setSnackbarOpen(true);
    }
  };

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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCloseConfirmPopup = () => {
    setisConfirmPopupOpen(false);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        padding: "20px",
        justifyContent: "center", // Center horizontally if no contacts
        alignItems: "center", // Center vertically if no contacts
        height: "100vh", // Full height when no contacts
        display: "flex", // Use flexbox to center when no contacts
      }}
    >
      {contacts.length === 0 ? (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={NoDataImage}
              alt="No Data Available"
              sx={{
                height: 300,
                width: 300,
              }}
            />
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                No Favourite Contacts Available
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        contacts.map((contact) => (
          <Grid item xs={12} sm={6} md={3} key={contact.id}>
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
              <Grid
                container
                item
                xs={12}
                padding={2}
                spacing={2}
                style={{ alignContent: "center" }}
              >
                <Grid item xs={6}>
                  <CustomButton
                    variant={"outlined"}
                    buttonText={"Edit"}
                    buttonClick={() => handleEditContact(contact)}
                    style={{
                      fontSize: "medium",
                      borderRadius: "20px",
                      color: "white",
                      backgroundColor: "blue",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomButton
                    variant={"outlined"}
                    buttonText={"Delete"}
                    buttonClick={() => handleDeleteContact(contact.id)}
                    style={{
                      fontSize: "medium",
                      borderRadius: "20px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton onClick={() => handleToggleFavorite(contact.id)}>
                    {contact.favorite ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))
      )}
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
            onAdd={function (): void {
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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

export default FavContact;
