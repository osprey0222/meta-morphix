import { Box, Chip, Typography } from "@mui/material";
import moment from "moment";
import TextFieldComp from "../fields/TextField";

export const GratefulComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      alignSelf="end"
      justifyContent="center"
      border="0.5px gray solid"
      borderColor="#e0e0e0"
      borderRadius={2}
      width={250}
    >
      <Chip
        size="small"
        label="3 things I'm grateful for today"
        sx={{ bgcolor: "warning.light", color: "white", my: 2 }}
      />
      <TextFieldComp
        value=""
        label=""
        onChange={() => {}}
        sx={{ m: 0, border: "none" }}
      />
      <TextFieldComp
        value=""
        label=""
        onChange={() => {}}
        sx={{ m: 0, border: "none" }}
      />
      <TextFieldComp
        value=""
        label=""
        onChange={() => {}}
        sx={{ m: 0, border: "none" }}
      />
    </Box>
  );
};
