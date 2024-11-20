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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData for handling image uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    if (image && image instanceof File) {
      formData.append("image", image); // Append only if there's a new image
    }

    try {
      if (contact) {
        // Updating an existing contact
        await UpdateContactJson(contact.id, formData); // Backend should accept FormData
        onUpdate({ ...contact, name, email, phone, image }); // Update local state
      } else {
        // Adding a new contact
        const addedContact = await AddContactJson(formData); // Handle new contact creation
        onAdd(addedContact); // Pass the new contact back to the parent component
      }

      onClose(); // Close the form modal
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
