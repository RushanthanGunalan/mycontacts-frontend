import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import Profile from "../../assets/Profile.png";
import { useEffect, useState } from "react";
import { ContactListJson } from "../../services/ContactServices";

interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function CardDetail() {
  const [contacts, setContacts] = useState<Contacts[]>([]);

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

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {contacts.map((contact) => (
        <Grid item xs={12} sm={6} md={3} key={contact.id}>
          {" "}
          {/* 4 cards per row (md = 3, meaning 12/3 = 4 columns) */}
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              image={Profile}
              alt="Contact Image"
              sx={{ height: 140 }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {contact.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {contact.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {contact.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CardDetail;
