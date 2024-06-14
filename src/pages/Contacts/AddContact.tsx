import { useState } from "react";
import TextBox from "../../components/Textbox";
import { Button, Grid } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        <form>
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
                Add Contact
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
