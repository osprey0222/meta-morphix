import { Box, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import { CheckBox } from "@mui/icons-material";
import axios from "axios";
import { TextFieldBorderless } from "../../fields/TextField";
import TimeTable from "./TimeTable";
import { timeTable } from "../../../utils/sampleData";

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

const PrioritiesBlock = () => {
  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <Chip
        size="small"
        label="Priorities"
        sx={{ bgcolor: "info.main", color: "white", mb: 1 }}
      />
      <Typography mt={2}>1. LeetCode</Typography>
      <Typography>2. Algorithms</Typography>
      <Typography>3. Co-op Course Canvas</Typography>
    </Box>
  );
};

const SidesBlock = () => {
  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <Chip
        size="small"
        label="Sides"
        sx={{ bgcolor: "success.main", color: "white", mb: 1 }}
      />
      <Typography mt={2}>1. Water</Typography>
      <Typography>2. Project</Typography>
    </Box>
  );
};

const ImpNote = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m={1}
      p={1}
      bgcolor="#fad1d0"
      borderRadius={3}
    >
      <SmallHeading bgcolor="error.light" color="white" value="Important:" />
      <Typography variant="subtitle2" mx={1} align="left">
        {
          "Co-op course Deadline Due in two weeks, do not forget to complete it before the month end"
        }
      </Typography>
    </Box>
  );
};

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
          <PrioritiesBlock />
          <Divider orientation="vertical" variant="middle" flexItem />
          <SidesBlock />
        </Box>
        <Divider variant="middle" sx={{ my: 1 }} />
        <ImpNote />
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
