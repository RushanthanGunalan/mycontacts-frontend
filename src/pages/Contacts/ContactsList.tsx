import { useState } from "react";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import { AddIcCallOutlined, Phone } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function ContactsList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
  ];

  const rows = [
    {
      id: 1,
      name: "Rushanthan",
      email: "rushanthan@gmail.com",
      phone: "0767114320",
    },
    {
      id: 2,
      name: "Thenujan",
      email: "thenujan@gmail.com",
      phone: "0767114320",
    },
    {
      id: 3,
      name: "Sujanthan",
      email: "sujanthan@gmail.com",
      phone: "0767114320",
    },
  ];

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
      <DataGrid columns={columns} rows={rows} />
      {isPopupOpen && (
        <Popup
          open={isPopupOpen}
          onClose={handleClosePopup}
          title={"Add Contact"}
        >
          <ContactForm />
        </Popup>
      )}
    </>
  );
}

export default ContactsList;
