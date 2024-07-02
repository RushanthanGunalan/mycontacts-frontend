import { Card, CardContent } from "@mui/material";

const CustomCard = ({ children }: { children?: any }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
