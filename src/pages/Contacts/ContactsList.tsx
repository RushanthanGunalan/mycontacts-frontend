import { useState } from "react";
import Popup from "../../components/Popup";
import ContactForm from "./AddContact";

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
      <button onClick={handleOpenPopup}>Add Contact</button>
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
