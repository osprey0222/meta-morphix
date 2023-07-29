import { Box, Chip } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";

const ImportantNote = () => {
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote("");
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m={1}
      p={1}
      py={1.5}
      bgcolor="#fad1d0"
      borderRadius={3}
    >
      <Chip
        size="small"
        label="Important!"
        sx={{ fontWeight: 900, bgcolor: "error.light", color: "white", mx: 2 }}
      />
      <TextFieldBorderless
        value={note}
        onChange={(p) => setNote(p)}
        rows={2}
        placeholder="Deadlines, messages, urgent-stuff.."
      />
    </Box>
  );
};

interface ImportantNoteProps {
  note: string;
}

export default ImportantNote;
