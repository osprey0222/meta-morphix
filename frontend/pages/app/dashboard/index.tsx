import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DayPlanner from "../../../components/dashboard/DayPlanner";
import TopBarComponent from "../../../components/dashboard/TopBarComponent";
import BottomBarComponent from "../../../components/dashboard/BottomBarComponent";
import QuoteComponent from "../../../components/dashboard/QuoteComponent";
import { QuickNoteComponent } from "../../../components/dashboard/QuickNoteComponent";
import Streak from "../../../components/dashboard/Streak";
import { GratefulComponent } from "../../../components/dashboard/GratefulComponent";

const dashboard = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <TopBarComponent />
      <Box
        width="98%"
        display="flex"
        alignItems="start"
        justifyContent="space-between"
      >
        <DayPlanner />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          gap={2}
        >
          <QuickNoteComponent />
        </Box>
        <QuoteComponent />
        <Streak />
      </Box>
      <BottomBarComponent />
    </Box>
  );
};

export default dashboard;
