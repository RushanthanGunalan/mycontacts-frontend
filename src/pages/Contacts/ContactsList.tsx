import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import {
  AddIcCallOutlined,
  Delete,
  DeleteOutline,
  Edit,
  Visibility,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  AddContactJson,
  ContactListJson,
  DeleteContactJson,
} from "../../services/ContactServices";
import { nanoid } from "nanoid/non-secure";
import CustomSnackBar from "../../components/SnackBar";
import Profile from "../../assets/Profile.png";

interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

function ContactsList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState(false);
  const [ContactToDelete, setContactToDelete] = useState<Contacts | null>(null);
  const [ContactToEdit, setContactToEdit] = useState<Contacts | null>(null);

  const [nameQuery, setNameQuery] = useState<string>("");
  const [emailQuery, setEmailQuery] = useState<string>("");

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [contactDetails, SetContactDetails] = useState<Contacts | null>(null);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false); //Temporary

  // Filtered contacts based on both queries
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      contact.email.toLowerCase().includes(emailQuery.toLowerCase())
  );

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
          image: contact.image
            ? `http://localhost:5001/${contact.image.replace(/\\/g, "/")}`
            : null, // Handle path conversion and URL construction
        }));
        setContacts(dataWithId);
      })
      .catch((error) => {
        console.error("There was an error fetching the contacts:", error);
        // You can also display an error message to the user if needed
      });
  }

  const handleAddContact = (newContact: Contacts) => {
    newContact.id = nanoid(); // Generate a unique ID
    AddContactJson(newContact)
      .then(() => {
        setContacts((prevContacts) => [...prevContacts, newContact]);
        setSnackbarOpen(true);
        setSnackbarMessage("Contact Successfully Added");
        // Optionally, fetch all contacts again to ensure consistency
      })
      .catch((error) => {
        console.error("Error adding contact:", error);

        // Handle error appropriately (e.g., show error message)
      });
    getAllContacts();
  };

  const DeleteMultiContacts = () => {
    if (selectedContacts.length > 0) {
      Promise.all(selectedContacts.map((id) => DeleteContactJson(id)))
        .then(() => {
          setContacts((prevContacts) =>
            prevContacts.filter(
              (contact) => !selectedContacts.includes(contact.id)
            )
          );
          setSelectedContacts([]);
          setSnackbarOpen(true);
          setSnackbarMessage("Contacts Successfully Deleted");
        })
        .catch((error) => {
          console.error("Error deleting contacts:", error);
          setSnackbarMessage("Error Deleting Contacts");
          setSnackbarOpen(true);
          // Show error message to user
        });
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

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCloseConfirmPopup = () => {
    setisConfirmPopupOpen(false);
  };

  const viewSingleContact = (contact: Contacts) => {
    SetContactDetails(contact);
    setIsDetailPopupOpen(true); // Open the detail popup
  };

  //Temporary

  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
    SetContactDetails(null);
  };
  //Temporary

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 210 },
    { field: "phone", headerName: "Phone Number", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton disabled={selectedContacts.length > 0}>
            <Visibility onClick={() => viewSingleContact(params.row)} />
          </IconButton>
          <IconButton disabled={selectedContacts.length > 0}>
            <Edit onClick={() => handleEditContact(params.row)} />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteContact(params.row.id)}
            disabled={selectedContacts.length > 0}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  //temp
  // const rows = [
  //   {
  //     id: "46476nb473",
  //     name: "Rushanthan",
  //     email: "rushanthan@gmail.com",
  //     phone: "0767114320",
  //   },
  //   {
  //     id: "35346bv535357",
  //     name: "Thenujan",
  //     email: "thenujan@gmail.com",
  //     phone: "0767114320",
  //   },
  //   {
  //     id: "34536357cv3636",
  //     name: "Sujanthan",
  //     email: "sujanthan@gmail.com",
  //     phone: "0767114320",
  //   },
  // ];
  //temp

  //temp
  // useEffect(() => {
  //   setContacts(rows); // Initialize contacts with dummy data
  // }, []);
  //temp

  return (
    <>
      {/* //Container and Text Field */}
      <Grid
        container
        style={{
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Grid item xs={5}>
          <Stack sx={{ width: 300, padding: "10px" }}>
            <Autocomplete
              freeSolo
              options={contacts.map((contact) => contact.name)}
              onInputChange={(_event, newValue) => {
                setNameQuery(newValue ?? "");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search by Name" />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack sx={{ width: 300, padding: "10px" }}>
            <Autocomplete
              freeSolo
              options={contacts.map((contact) => contact.email)}
              onInputChange={(_event, newValue) => {
                setEmailQuery(newValue ?? "");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search By Email" />
              )}
            />
          </Stack>
        </Grid>

        <Grid
          item
          xs={1}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button
            variant={"outlined"}
            startIcon={<AddIcCallOutlined />}
            style={{ fontSize: "large", borderRadius: "20px" }}
            onClick={handleOpenPopup}
          />
        </Grid>
        {selectedContacts.length > 0 ? (
          <Grid item xs={1}>
            <Button
              variant={"outlined"}
              style={{ fontSize: "medium", borderRadius: "20px" }}
              onClick={DeleteMultiContacts}
              startIcon={<DeleteOutline />}
            />
          </Grid>
        ) : (
          <Grid item xs={1}>
            <Button
              variant={"outlined"}
              style={{
                fontSize: "medium",
                borderRadius: "20px",
                pointerEvents: "none", // Disable pointer events
                opacity: 0.9, // Reduce opacity for disabled look
              }}
              startIcon={<DeleteOutline />}
              disabled
            />
          </Grid>
        )}
      </Grid>
      {/* // */}
      <DataGrid
        columns={columns}
        rows={filteredContacts}
        getRowId={(row) => row.id}
        autoHeight
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          setSelectedContacts(ids as string[]);
        }}
      />
      {isPopupOpen && (
        <Popup
          open={isPopupOpen}
          onClose={handleClosePopup}
          title={ContactToEdit ? "Update Contact" : "Add Contact"}
          customWidth={700}
        >
          <ContactForm
            onAdd={handleAddContact}
            onClose={handleClosePopup}
            onUpdate={handleUpdateContact}
            contact={ContactToEdit}
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
      {/* //Temporary */}
      {isDetailPopupOpen && (
        <Popup
          open={isDetailPopupOpen}
          onClose={handleCloseDetailPopup}
          title="Contact Details"
          customWidth={500}
        >
          <Card>
            <CardMedia
              component="img"
              image={contactDetails?.image ? contactDetails.image : Profile} // If profileImage exists, use it; otherwise use Profile.png
              alt="Contact Image"
              sx={{ height: 140 }}
            />

            <CardContent>
              <Typography variant="h5">{contactDetails?.name}</Typography>
              <Typography variant="subtitle1">
                {contactDetails?.email}
              </Typography>
              <Typography variant="body1">{contactDetails?.phone}</Typography>
            </CardContent>
          </Card>
        </Popup>
      )}
      {/* //Temporary */}
      <CustomSnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        duration={3000}
        position={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
}

export default ContactsList;
