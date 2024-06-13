import React, { useState } from "react";
import TextBox from "../../components/Textbox";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form>
        <div>
          <TextBox
            style={{
              width: "300px",
              backgroundColor: "#f0f0f0",
              marginBottom: "20px",
            }}
            variant={"outlined"}
            value={name}
            type={"text"}
            label={"Name"}
            onChangeFunction={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextBox
            style={{
              width: "300px",
              backgroundColor: "#f0f0f0",
              marginBottom: "20px",
            }}
            variant={"outlined"}
            value={email}
            type={"email"}
            label={"Email"}
            onChangeFunction={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextBox
            style={{
              width: "300px",
              backgroundColor: "#f0f0f0",
              marginBottom: "20px",
            }}
            variant={"outlined"}
            value={phone}
            type={"tel"}
            onChangeFunction={(e) => setPhone(e.target.value)}
            label={"Phone Number"}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
