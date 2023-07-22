import { Box, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import { CheckBox } from "@mui/icons-material";
import axios from "axios";

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

const TimeTable = () => {
  const timeTable = [
    {
      tag: { label: "Other", color: "grey.400" },
      from: "05:00",
      to: "06:00",
      info: "Get Up + walkGet Up + walkGet Up + walkGet Up + walkGet Up + walkGet Up + walk",
    },
    {
      tag: { label: "Other", color: "grey.400" },
      from: "06:00",
      to: "07:00",
      info: "Breakfast + Bath",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "07:00",
      to: "08:00",
      info: "LeetCode",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "08:00",
      to: "09:00",
      info: "LeetCode",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "09:00",
      to: "10:00",
      info: "LeetCode",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "10:00",
      to: "11:00",
      info: "LeetCode",
    },
    {
      tag: { label: "Office Hours", color: "info.light" },
      from: "11:00",
      to: "12:30",
      info: "OH",
    },
    {
      tag: { label: "Other", color: "grey.400" },
      from: "12:30",
      to: "14:00",
      info: "Break + Lunch",
    },
    {
      tag: { label: "Other", color: "grey.400" },
      from: "05:00",
      to: "06:00",
      info: "Get Up + walk",
    },
    {
      tag: { label: "Other", color: "grey.400" },
      from: "06:00",
      to: "07:00",
      info: "Breakfast + Bath",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "07:00",
      to: "08:00",
      info: "LeetCode",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "08:00",
      to: "09:00",
      info: "LeetCode",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "09:00",
      to: "10:00",
      info: "LeetCode",
    },
    {
      tag: { label: "LeetCode", color: "warning.light" },
      from: "10:00",
      to: "11:00",
      info: "LeetCode",
    },
    {
      tag: { label: "Other", color: "grey.400" },
      from: "11:00",
      to: "12:30",
      info: "OH",
    },
    {
      tag: { label: "Other", color: "grey.400" },
      from: "12:30",
      to: "14:00",
      info: "Break + Lunch",
    },
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
      {timeTable.map(
        ({ from, to, info, tag: { color: tagColor, label: tagLabel } }) => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border="0.1px gray solid"
            borderColor={"grey.300"}
            width="98%"
            mx={0.5}
            my={0.5}
            p={0.5}
            px={1.5}
            borderRadius={1}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="start"
              width="100%"
              gap={1.5}
            >
              <DoneIcon
                sx={{ fontSize: 15, cursor: "pointer", color: "green" }}
              />
              {/* <CheckBox fontSize="small" /> */}
              <Typography sx={{ letterSpacing: "0.5px" }}>
                {from} - {to}
              </Typography>
              <RightArrowIcon sx={{ color: "grey.700" }} />
              {/* <Typography noWrap textOverflow="ellipsis" maxWidth={240}>
                {info}
              </Typography> */}
              <TextField
                variant="standard"
                size="small"
                InputProps={{ style: { padding: 0 }, disableUnderline: true }}
                sx={{ input: { padding: 0 }, fontSize: "10px", p: 0 }}
                value={info}
                placeholder="start typing..."
              />
            </Box>
            <Chip
              size="small"
              sx={{
                p: 0,
                fontSize: "10px",
                fontWeight: "bold",
                bgcolor: tagColor,
                color: "white",
                height: 16,
                borderRadius: 5,
              }}
              label={tagLabel}
            />
          </Box>
        )
      )}
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
        <TimeTable />
      </Box>
    </Box>
  );
};

export default DayPlanner;
