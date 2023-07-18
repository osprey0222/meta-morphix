import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // <Box>
    <>
      <h1>Heading</h1>
      <p>This is the main page!</p>
    </>
    // </Box>
  );
};

export default dashboard;
