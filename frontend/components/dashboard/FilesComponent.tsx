import { Box, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const FilesComponent = () => {
  const [quote, setQuote] = useState();
  useEffect(() => {
    axios
      .get("https://api.quotable.io/random")
      .then(({ data: { content } }: any) => setQuote(content));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="0.5px gray solid"
      borderColor="#e0e0e0"
      borderRadius={2}
      p={2}
      width={"100%"}
      height={250}
      bgcolor="#e1f1fd"
    >
      <Typography color="gray">Drag & Drop</Typography>
    </Box>
  );
};

export default FilesComponent;
