import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import CrossIcon from "@mui/icons-material/CloseRounded";

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
    <>
      <Box
        // border="1px red solid"
        width="90%"
        display="flex"
        alignItems="end"
        alignSelf="end"
        justifyContent="center"
        px={1}
        py={2}
      >
        {[
          "Make Bed",
          "Drink Water",
          "Splash",
          "Stretch",
          "Run",
          "Breakfast",
        ].map((p) => (
          <Box
            display="flex"
            alignItems="start"
            justifyContent="space-evenly"
            width="15%"
          >
            <Typography
              display="flex"
              alignItems="center"
              justifyContent="center"
              variant="caption"
              sx={{ writingMode: "vertical-rl" }}
            >
              {p}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        m={1}
        overflow="scroll"
      >
        {timeTable.map(
          (
            { from, to, info, tag: { color: tagColor, label: tagLabel } },
            index
          ) => (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Typography mx={1} variant="caption">
                {index + 1}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                border="0.1px gray solid"
                borderColor={"grey.300"}
                width="98%"
                mx={0.5}
                my={0.5}
                p={0.5}
                px={1.5}
                borderRadius={1}
              >
                {[1, 2, 3, 4, 5, 6].map((_, index) =>
                  Math.random() < 0.8 ? (
                    <DoneIcon
                      sx={{
                        mx: 1,
                        // border: "1px red solid",
                        fontSize: 25,
                        cursor: "pointer",
                        color: "green",
                      }}
                    />
                  ) : (
                    <CrossIcon
                      sx={{
                        mx: 1,
                        // border: "1px red solid",
                        fontSize: 25,
                        cursor: "pointer",
                        color: "red",
                      }}
                    />
                  )
                )}
              </Box>
            </Box>
          )
        )}
      </Box>
    </>
  );
};

const Streak = () => {
  return (
    <Box height={650}>
      <Box
        display="inline-flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="0.5px gray solid"
        borderRadius={5}
        py={2}
        height="100%"
        maxWidth={500}
        borderColor="#e0e0e0"
        bgcolor="#ffffff"
      >
        <Chip
          size="small"
          label="Streak"
          sx={{ width: "30%", bgcolor: "warning.main", color: "white" }}
        />
        <TimeTable />
      </Box>
    </Box>
  );
};

export default Streak;
