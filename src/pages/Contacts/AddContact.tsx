import { useState } from "react";
import TextBox from "../../components/Textbox";
import { Button, Grid } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";
import {
  AddContactJson,
  UpdateContactJson,
} from "../../services/ContactServices";
import ImagePicker from "../../components/ImagePicker";

const ContactForm = ({
  onAdd,
  onClose,
  onUpdate,
  contact,
}: {
  onAdd: (contact: any) => void;
  onClose: () => void;
  onUpdate: (contact: any) => void;
  contact: any;
}) => {
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phone, setPhone] = useState(contact ? contact.email : "");
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newContact = {
      name,
      email,
      phone,
      image,
    };

    try {
      if (contact) {
        await UpdateContactJson(contact.id, newContact);
        onUpdate({ ...newContact, id: contact.id });
      } else {
        const addedContact = await AddContactJson(newContact);
        onAdd(addedContact);
        onClose();
      }
    } catch (error) {
      console.error("Error Adding/Updating Contact", error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item xs={12}>
              <TextBox
                style={{
                  width: "100%", // Full width within the grid item
                  backgroundColor: "#f0f0f0",
                  marginBottom: "20px",
                }}
                variant={"outlined"}
                value={name}
                type={"text"}
                label={"Name"}
                onChangeFunction={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextBox
                style={{
                  width: "100%", // Full width within the grid item
                  backgroundColor: "#f0f0f0",
                  marginBottom: "20px",
                }}
                variant={"outlined"}
                value={email}
                type={"email"}
                label={"Email"}
                onChangeFunction={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextBox
                style={{
                  width: "100%", // Full width within the grid item
                  backgroundColor: "#f0f0f0",
                  marginBottom: "20px",
                }}
                variant={"outlined"}
                value={phone}
                type={"tel"}
                onChangeFunction={(e) => setPhone(e.target.value)}
                label={"Phone Number"}
              />
            </Grid>
            <Grid item xs={12}>
              <ImagePicker
                onImageUpload={handleImageUpload}
                initialImage={contact?.imageUrl}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type={"submit"}
                variant={"outlined"}
                startIcon={<AddIcCallOutlined />}
                sx={{ fontSize: "medium", borderRadius: "20px" }}
              >
                {contact ? "Update Contact" : "Add Contact"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
