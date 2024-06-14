import { useState } from "react";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";
import { AddIcCallOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

function ContactsList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
