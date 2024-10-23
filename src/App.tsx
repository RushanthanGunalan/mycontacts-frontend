import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ContactsList from "./pages/Contacts/ContactsList";

function App() {
  return (
    <Router>
      <div className="app">
        <aside className="sidebar">
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/contactsDetail">Contacts Details</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/contactsDetail" element={<ContactDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Dummy Home component for the default route
const Home = () => <h1>Home page Content</h1>;
const ContactDetail = () => <h1>Contact Detail Page Content</h1>;

export default App;
