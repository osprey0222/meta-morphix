import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";

const SmallHeading = ({
  bgcolor,
  color,
  value,
}: {
  bgcolor: string;
  color: string;
  value: string;
}) => {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      mx={1}
      px={2}
      bgcolor={bgcolor}
      borderRadius={1}
    >
      <Typography fontWeight="500" color={color} align="center">
        {value}
      </Typography>
    </Box>
  );
};

const PrioritiesBlock = () => {
  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <SmallHeading value="Priorities" color="white" bgcolor="info.main" />
      <Typography mt={2}>1. LeetCode</Typography>
      <Typography>2. Algorithms</Typography>
      <Typography>3. Co-op Course Canvas</Typography>
    </Box>
  );
};

const SidesBlock = () => {
  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <SmallHeading value="Sides" color="white" bgcolor="success.light" />
      <Typography mt={2}>1. Water</Typography>
      <Typography>2. Project</Typography>
    </Box>
  );
};

const TimeTable = () => {
  const timeTable = [
    {
      from: "05:00",
      to: "06:00",
      info: "Get Up + walkGet Up + walkGet Up + walkGet Up + walkGet Up + walkGet Up + walk",
    },
    { from: "06:00", to: "07:00", info: "Breakfast + Bath" },
    { from: "07:00", to: "08:00", info: "LeetCode" },
    { from: "08:00", to: "09:00", info: "LeetCode" },
    { from: "09:00", to: "10:00", info: "LeetCode" },
    { from: "10:00", to: "11:00", info: "LeetCode" },
    { from: "11:00", to: "12:30", info: "OH" },
    { from: "12:30", to: "14:00", info: "Break + Lunch" },
    { from: "05:00", to: "06:00", info: "Get Up + walk" },
    { from: "06:00", to: "07:00", info: "Breakfast + Bath" },
    { from: "07:00", to: "08:00", info: "LeetCode" },
    { from: "08:00", to: "09:00", info: "LeetCode" },
    { from: "09:00", to: "10:00", info: "LeetCode" },
    { from: "10:00", to: "11:00", info: "LeetCode" },
    { from: "11:00", to: "12:30", info: "OH" },
    { from: "12:30", to: "14:00", info: "Break + Lunch" },
  ];
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={1}
      py={1}
      overflow="scroll"
    >
      {timeTable.map(({ from, to, info }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          border="0.5px gray solid"
          width="95%"
          gap={1.5}
          mx={0.5}
          my={0.5}
          p={0.5}
          px={1.5}
          borderRadius={1}
        >
          <Typography>
            {from} - {to}
          </Typography>
          <RightArrowIcon />
          <Typography noWrap textOverflow="ellipsis" maxWidth={330}>
            {info}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const ImpNote = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" m={1}>
      <SmallHeading bgcolor="error.light" color="white" value="Important:" />
      <Typography mx={1} align="left">
        {
          "Co-op course Deadline Due in two weeks, do not forget to complete it before the month end"
        }
      </Typography>
    </Box>
  );
};

const DayPlanner = () => {
  return (
    <Box width="98%" height={650}>
      <Box
        display="inline-flex"
        flexDirection="column"
        border="0.5px gray solid"
        borderRadius={5}
        py={2}
        height="100%"
        maxWidth={550}
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
        <TimeTable />
      </Box>
    </Box>
  );
};

export default DayPlanner;
