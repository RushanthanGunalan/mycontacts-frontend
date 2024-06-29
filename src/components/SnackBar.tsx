import { Snackbar } from "@mui/material";

const CustomSnackBar = ({
  open,
  message,
  duration = 3000,
  onClose,
  position,
}: {
  open: boolean;
  message: string;
  duration: number;
  onClose?: (e?: any) => void;
  position: any;
}) => {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
    />
  );
};

export default CustomSnackBar;
