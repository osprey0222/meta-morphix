import { Box, Chip, Divider, Typography } from "@mui/material";
import React from "react";
import TimeTable from "./TimeTable";
import { timeTable } from "../../../utils/sampleData";
import { TextFieldBorderless } from "../../fields/TextField";
import Sides from "./Sides";
import Priorities from "./Priorities";
import ImportantNote from "./ImportantNode";

const DayPlanner = () => {
  return (
    <Box height={650}>
      <Box
        display="inline-flex"
        flexDirection="column"
        border="0.5px gray solid"
        borderRadius={5}
        py={2}
        height="100%"
        maxWidth={550}
        borderColor="#e0e0e0"
        bgcolor="#ffffff"
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-evenly"
          m={1}
        >
          <Priorities data={["LeetCode", "Algorithms", "Co-op Course"]} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Sides data={["Water", "Project", "Something"]} />
        </Box>
        <Divider variant="middle" sx={{ my: 1 }} />
        <ImportantNote note="Co-op course Deadline Due in two weeks, do not forget to complete it before the month end" />
        <Divider flexItem variant="middle" sx={{ my: 1 }}>
          <Typography fontSize="small" color="GrayText">
            Time Table
          </Typography>
        </Divider>
        <TimeTable data={timeTable} />
      </Box>
    </Box>
  );
};

export default DayPlanner;
