import { Box, Chip, Typography } from "@mui/material";
import moment from "moment";

export const QuickNoteComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="0.5px gray solid"
      borderColor="#e0e0e0"
      borderRadius={2}
      width={500}
    >
      <Chip
        size="small"
        label="Quick Note"
        sx={{ color: "white", bgcolor: "secondary.light", my: 2 }}
      />

      <textarea
        style={{
          padding: 10,
          width: "100%",
          background: "#f5f5f5",
          border: "none",
          minHeight: 300,
          resize: "none",
        }}
        defaultValue={moment().format("Do MMMM, HH:mm:ss") + "\n\n"}
      ></textarea>
    </Box>
  );
};
