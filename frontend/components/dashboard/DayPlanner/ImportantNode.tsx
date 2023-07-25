import { Box, Typography } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";

const SmallHeading = ({
  sx,
  bgcolor,
  color,
  value,
  variant = "body1",
}: {
  sx?: any;
  bgcolor: string;
  color: string;
  value: string;
  variant?: any;
}) => {
  return (
    <Box
      sx={{ ...sx }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      mx={1}
      px={2}
      bgcolor={bgcolor}
      borderRadius={1}
    >
      <Typography
        variant={variant}
        fontWeight="500"
        color={color}
        align="center"
      >
        {value}
      </Typography>
    </Box>
  );
};

const ImportantNote = (props: ImportantNoteProps) => {
  const { note: initNote } = props;

  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(initNote);
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
      <SmallHeading bgcolor="error.light" color="white" value="Important:" />
      <textarea
        rows={3}
        style={{
          background: "transparent",
          resize: "none",
          width: "90%",
          border: "none",
          paddingLeft: 10,
          paddingRight: 10,
        }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </Box>
  );
};

interface ImportantNoteProps {
  note: string;
}

export default ImportantNote;
