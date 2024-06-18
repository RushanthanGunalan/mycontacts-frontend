import { ReactNode } from "react";
import { Modal, Grid, Typography } from "@mui/material";

const Popup = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  title: string;
  children?: ReactNode;
}) => {
  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          width: 800,
          backgroundColor: "#fff",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
        }}
      >
        <Grid item>
          <div
            style={{
              padding: 10,
              paddingLeft: 20,
              color: "black",
              textAlign: "left",
              borderBottom: "1px solid #ccc",
              transition: "border-bottom 0.3s ease-in-out",
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </div>
        </Grid>

        <Grid item style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {children}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Popup;
