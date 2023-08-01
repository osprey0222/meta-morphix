import { Box, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const QuoteComponent = () => {
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
      maxWidth={200}
    >
      <Chip size="small" label="Daily Quote" sx={{ mb: 1 }} />
      <Typography
        fontStyle="italic"
        letterSpacing="0.5px"
        variant="body1"
        align="center"
        sx={{ maxHeight: 293, overflow: "scroll" }}
      >
        {quote || "Honesty is the best policy!"}
      </Typography>
    </Box>
  );
};

export default QuoteComponent;
