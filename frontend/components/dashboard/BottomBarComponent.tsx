import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

import LeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import DoubleLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import DoubleRightIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import RightIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Icon = ({ children }) => {
  return <Box>{children}</Box>;
};

const BottomBarComponent = () => {
  return (
    <Box
      position="absolute"
      bottom={0}
      width="98%"
      border="0.5px gray solid"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={2}
      p={1}
      borderRadius={5}
      minHeight={180}
    >
      {/* <Typography variant="h1">heat map</Typography> */}
    </Box>
  );
};

export default BottomBarComponent;
