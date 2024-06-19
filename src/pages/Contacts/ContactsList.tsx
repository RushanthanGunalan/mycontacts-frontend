import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import { AddIcCallOutlined, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
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

  useEffect(() => {
    getAllContacts();
  }, []);

  // function getAllContacts() {
  //   ContactListJson()
  //     .then((response) => {
  //       setContacts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the contacts:", error);
  //       // You can also display an error message to the user if needed
  //     });
  // }

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

  const handleDeleteContact = (id: any) => {
    DeleteContactJson(id)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an Error Deleting the Contact:", error);
      });
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteContact(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

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

  return (
    <>
      <Button
        variant={"outlined"}
        startIcon={<AddIcCallOutlined />}
        style={{ fontSize: "medium", borderRadius: "20px" }}
        onClick={handleOpenPopup}
      >
        Add Contact
      </Button>
      <DataGrid
        columns={columns}
        rows={contacts}
        getRowId={(row) => row.id}
        autoHeight
        disableRowSelectionOnClick
      />
      {isPopupOpen && (
        <Popup
          open={isPopupOpen}
          onClose={handleClosePopup}
          title={"Add Contact"}
          customWidth={700}
        >
          <ContactForm onAdd={handleAddContact} onClose={handleClosePopup} />
        </Popup>
      )}
    </>
  );
}

export default ContactsList;
