// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import "./App.css";
import ContactsList from "./pages/Contacts/ContactsList";
import CardDetail from "./pages/Contacts/CardDetails";
import FavContact from "./pages/Contacts/FavouriteContacts";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactPageIcon from "@mui/icons-material/ContactPage";

// Dummy Home component for the default route
const Home = () => <h1>Home Page Content</h1>;

function App() {
  const [value, setValue] = useState(0); // Track the selected tab

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="app">
        <div className="tabs-container">
          <Tabs
            className="tabs-slices"
            orientation="vertical" // Set the orientation to vertical
            value={value}
            onChange={handleChange}
            aria-label="vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              icon={<HomeIcon />}
              iconPosition="end"
              label="Home"
              component={Link}
              to="/"
            />
            <Tab
              icon={<ContactsIcon />}
              iconPosition="end"
              label="Contacts"
              component={Link}
              to="/contacts"
            />
            <Tab
              icon={<ContactPageIcon />}
              iconPosition="end"
              label="Contacts Details"
              component={Link}
              to="/contactsDetail"
            />
            <Tab
              icon={<FavoriteIcon />}
              iconPosition="end"
              label="Favourites"
              component={Link}
              to="/favContact"
            />
          </Tabs>
        </div>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/contactsDetail" element={<CardDetail />} />
            <Route path="/favContact" element={<FavContact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
