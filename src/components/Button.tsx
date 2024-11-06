import { Button } from "@mui/material";

const CustomButton = ({
  variant,
  buttonText,
  style,
  iconStart,
  iconEnd,
  type,
  buttonClick,
}: {
  variant: "text" | "contained" | "outlined";
  style?: any;
  buttonText?: any;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  type?: any;

  buttonClick: (e?: any) => void;
}) => {
  return (
    <>
      <Button
        variant={variant}
        style={style}
        startIcon={iconStart}
        endIcon={iconEnd}
        type={type}
        onClick={buttonClick}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default CustomButton;
