import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import { AddIcCallOutlined, Delete, Edit } from "@mui/icons-material";
import { Button, Container, Grid, IconButton, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  ContactListJson,
  DeleteContactJson,
} from "../../services/ContactServices";
import { nanoid } from "nanoid/non-secure";

interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function ContactsList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState(false);
  const [ContactToDelete, setContactToDelete] = useState<Contacts | null>(null);
  const [ContactToEdit, setContactToEdit] = useState<Contacts | null>(null);

  //temp
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<Contacts[]>([]);
  //temp

  //temp
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery)
      )
    );
  }, [searchQuery, contacts]);
  //temp

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

  const handleAddContact = (newContact: Contacts) => {
    newContact.id = nanoid(); // Generate a unique ID
    setContacts((prevContacts) => [...prevContacts, newContact]);
    getAllContacts();
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton>
            <Edit onClick={() => handleEditContact(params.row)} />
          </IconButton>
          <IconButton onClick={() => handleDeleteContact(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  //temp
  const rows = [
    {
      id: "46476nb473",
      name: "Rushanthan",
      email: "rushanthan@gmail.com",
      phone: "0767114320",
    },
    {
      id: "35346bv535357",
      name: "Thenujan",
      email: "thenujan@gmail.com",
      phone: "0767114320",
    },
    {
      id: "34536357cv3636",
      name: "Sujanthan",
      email: "sujanthan@gmail.com",
      phone: "0767114320",
    },
  ];
  //temp

  //temp
  useEffect(() => {
    setContacts(rows); // Initialize contacts with dummy data
  }, []);
  //temp

  return (
    <>
      {/* //Container and Text Field */}

      <Container style={{ marginBottom: "20px" }}>
        {/* temp */}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        {/* temp */}
        <Button
          variant={"outlined"}
          startIcon={<AddIcCallOutlined />}
          style={{ fontSize: "medium", borderRadius: "20px" }}
          onClick={handleOpenPopup}
        >
          Add Contact
        </Button>
      </Container>
      {/* // */}
      <DataGrid
        columns={columns}
        // rows={contacts}//Uncomment when dealing with actual data
        rows={filteredContacts}
        getRowId={(row) => row.id}
        autoHeight
        disableRowSelectionOnClick
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
    </>
  );
}

export default ContactsList;
