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

const TopBarComponent = () => {
  return (
    <Box
      width="98%"
      border="0.5px gray solid"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={2}
      p={1}
      borderRadius={5}
    >
      <LeftIcon sx={{ fontSize: 50, cursor: "pointer" }} />
      <DoubleLeftIcon sx={{ fontSize: 50, cursor: "pointer" }} />
      <Typography mx={4} variant="h2">
        {moment().format("Do MMMM, dddd")}
      </Typography>
      <DoubleRightIcon sx={{ fontSize: 50, cursor: "pointer" }} />
      <RightIcon sx={{ fontSize: 50, cursor: "pointer" }} />
    </Box>
  );
};

export default TopBarComponent;
