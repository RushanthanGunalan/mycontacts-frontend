import TextField from "@mui/material/TextField";

const TextBox = ({
  variant,
  style,
  value,
  type,
  label,
  onChangeFunction,
}: {
  variant: "outlined" | "filled" | "standard";
  placeHolderText?: string;
  style?: any;
  value?: any;
  type?: any;
  label?: any;
  onChangeFunction?: (e: any) => void;
}) => {
  return (
    <TextField
      style={style}
      variant={variant}
      value={value}
      type={type}
      label={label}
      onChange={onChangeFunction}
    />
  );
};

export default TextBox;
