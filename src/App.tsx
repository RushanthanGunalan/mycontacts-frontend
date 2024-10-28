// App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import "./App.css";
import ContactsList from "./pages/Contacts/ContactsList";
import CardDetail from "./pages/Contacts/CardDetails";

// Dummy Home component for the default route
const Home = () => <h1>Home Page Content</h1>;

function App() {
  const [value, setValue] = useState(0); // Track the selected tab

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="app">
        <div className="tabs-container">
          <Tabs
            orientation="vertical" // Set the orientation to vertical
            value={value}
            onChange={handleChange}
            aria-label="vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Contacts" component={Link} to="/contacts" />
            <Tab
              label="Contacts Details"
              component={Link}
              to="/contactsDetail"
            />
          </Tabs>
        </div>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/contactsDetail" element={<CardDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
