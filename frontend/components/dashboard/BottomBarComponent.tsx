import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import CalHeatmap from "cal-heatmap";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "cal-heatmap/cal-heatmap.css";

const Icon = ({ children }) => {
  return <Box>{children}</Box>;
};

const BottomBarComponent = () => {
  const cal = new CalHeatmap();
  cal.paint({
    domain: { type: "month", padding: [0, 7, 0, 0] },
    subDomain: { type: "day", width: 13, height: 13, radius: 1 },
  });

  return (
    <Box
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
      borderColor="grey.300"
    >
      <div id="cal-heatmap"></div>
    </Box>
  );
};

export default BottomBarComponent;
