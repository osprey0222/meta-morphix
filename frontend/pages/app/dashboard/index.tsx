import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DayPlanner from "../../../components/dashboard/DayPlanner";
import TopBarComponent from "../../../components/dashboard/TopBarComponent";
import BottomBarComponent from "../../../components/dashboard/BottomBarComponent";

const dashboard = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <TopBarComponent />
      <DayPlanner />
      <BottomBarComponent />
    </Box>
  );
};

export default dashboard;
