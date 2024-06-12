import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Contacts from "./pages/Contacts/ContactsList";
import ContactsList from "./pages/Contacts/ContactsList";

function App() {
  return (
    <>
      <ContactsList />
    </>
  );
}

export default App;
