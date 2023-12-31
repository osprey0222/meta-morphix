import { Box, Chip, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import TimeTable from "./TimeTable";
import Sides from "./Sides";
import Priorities from "./Priorities";
import ImportantNote from "./ImportantNote";
import { useRouter } from "next/router";
import { useGetDayPlanner } from "../../../hooks/dayPlanner.hooks";
import LinkIcon from "@mui/icons-material/Link";

const DayPlanner = () => {
  const router = useRouter();
  const { dateISO } = router.query;
  const { data } = useGetDayPlanner(dateISO as string);

  const { timeTable = [], importantNote, priorities, sides } = data;

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
          <Priorities data={priorities} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Sides data={sides} />
        </Box>
        <Divider variant="middle" sx={{ my: 1 }} />
        <ImportantNote note={importantNote} />
        <Divider flexItem variant="middle" sx={{ my: 1 }}>
          <Typography
            display="flex"
            alignItems="center"
            fontSize="small"
            color="GrayText"
            gap={0.5}
          >
            Time Table
            <Tooltip title="Copy Sharable Link" enterDelay={1000}>
              <LinkIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Typography>
        </Divider>
        <TimeTable data={timeTable} />
      </Box>
    </Box>
  );
};

export default DayPlanner;
