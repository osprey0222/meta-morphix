import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import { TextFieldBorderless } from "../../fields/TextField";
import { Box, Chip, Divider, Popover, Typography } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import AddTagPopover from "./AddTagPopover";

const Time = () => {
  const [time, setTime] = useState<Dayjs | null>(dayjs("2022-04-17T15:30"));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        format="HH:mm"
        variant="standard"
        size="small"
        style={{ width: "auto" }}
        InputProps={{
          style: { width: "100%", padding: 0 },
          disableUnderline: true,
        }}
        sx={{
          maxWidth: 43,
          input: { letterSpacing: "0.5px", padding: 0 },
          fontSize: "10px",
          p: 0,
        }}
        value={time}
        onChange={(p) => setTime(p)}
      />
    </LocalizationProvider>
  );
};

const Tag = (props: { tag: { color: string; label: string } }) => {
  const {
    tag: { color: tagColor, label: tagLabel },
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
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
          maxWidth: 63,
          cursor: "pointer",
        }}
        label={tagLabel}
        clickable={true}
        onClick={(e) => {
          setAnchorEl(anchorEl ? null : e.currentTarget);
        }}
      />
      <AddTagPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

const TimeTable = ({ data: timeTableData }: { data: TimeTable[] }) => {
  const [data, setData] = useState<TimeTable[]>([]);
  useEffect(() => {
    setData(timeTableData || []);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={1}
      py={1}
      overflow="scroll"
    >
      {(data || []).map(({ from, to, info, tag, complete }, index) => (
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
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="start"
            width="100%"
            gap={1.5}
          >
            <Divider
              sx={{
                mx: 3,
                ...(!Boolean(complete) && { display: "none" }),
                position: "absolute",
                width: "67%",
                background: "gray",
              }}
            />
            <DoneIcon
              onClick={() => {
                timeTableData[index] = {
                  ...timeTableData[index],
                  complete: !complete,
                };
                setData([...timeTableData]);
              }}
              sx={{ fontSize: 15, cursor: "pointer", color: "green" }}
            />
            <Time /> {"-"} <Time />
            <RightArrowIcon sx={{ color: "grey.700" }} />
            <TextFieldBorderless
              value={info}
              onChange={(p: string) => {
                timeTableData[index] = { ...timeTableData[index], info: p };
                setData([...timeTableData]);
              }}
            />
            <Tag tag={tag} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

interface TimeTable {
  info: string;
  to: Date;
  from: Date;
  tag: { color: string; label: string };
  complete: boolean;
}

export interface TimeTableProps {
  data: TimeTable[];
}

export default TimeTable;
