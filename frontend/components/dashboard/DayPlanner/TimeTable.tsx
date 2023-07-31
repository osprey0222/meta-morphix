import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import { TextFieldBorderless } from "../../fields/TextField";
import {
  Box,
  Chip,
  Divider,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import AddTagPopover from "./AddTagPopover";
import DeleteIcon from "@mui/icons-material/CancelRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { TimeTable } from "../../../types/dayPlanner.types";
import moment from "moment";
import { useDebounce } from "../../../services/apis/debounce";
import { useUpdateTT } from "../../../hooks/dayPlanner.hooks";

const Time = (props: {
  time: Dayjs | string;
  onChange: (p: Dayjs | string | null) => void;
}) => {
  const { time, onChange } = props;
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
        value={dayjs(time)}
        onChange={(p) => onChange(p)}
      />
    </LocalizationProvider>
  );
};

const Tag = (props: {
  TT_index: number;
  tag: { color: string; label: string };
}) => {
  const {
    TT_index,
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
        onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
      />
      <AddTagPopover
        TT_index={TT_index}
        tag={{ label: tagLabel, color: tagColor }}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

const TimeTable = ({ data: timeTableData }: { data: TimeTable[] }) => {
  const [data, setData] = useState<TimeTable[]>([]);
  const [pointerEntered, setPointerEntered] = useState<number>(-1);

  const divRef = useRef(null);

  useEffect(() => {
    setData(timeTableData || []);
  }, [timeTableData]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { mutate: updateTT } = useUpdateTT();
  const debounce = useDebounce(() =>
    updateTT({ payload: { data: { priorities: [] } }, dateISO: "12-32-43" })
  );

  const onTTChange = (index: number, field: { [key: string]: any }) => {
    timeTableData[index] = {
      ...timeTableData[index],
      ...field,
    };
    setData([...timeTableData]);
    debounce();
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mx={1}
        pt={1}
        overflow="scroll"
      >
        {(data || []).map(({ from, to, tag = null, info, complete }, index) => (
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
            onPointerEnter={() => setPointerEntered(index)}
            onPointerLeave={() => setPointerEntered(-1)}
          >
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="start"
              width="100%"
              gap={1.5}
            >
              <Divider // strike-through
                sx={{
                  mx: 3,
                  ...(!Boolean(complete) && { display: "none" }),
                  position: "absolute",
                  width: "81%",
                  bgcolor: "grey.200",
                }}
              />
              {pointerEntered === index && (
                <DeleteIcon
                  sx={{
                    position: "absolute",
                    color: "error.light",
                    fontSize: 14,
                    top: -10,
                    right: -18,
                    cursor: "pointer",
                  }}
                />
              )}
              <DoneIcon
                onClick={() => onTTChange(index, { complete: !complete })}
                sx={{ fontSize: 15, cursor: "pointer", color: "green" }}
              />
              <Time
                time={to as string}
                onChange={(to: string) =>
                  onTTChange(index, { to: new Date(to).toISOString() })
                }
              />
              {"-"}
              <Time
                time={from as string}
                onChange={(from: string) =>
                  onTTChange(index, { from: new Date(from).toISOString() })
                }
              />
              <RightArrowIcon sx={{ color: "grey.700" }} />
              <TextFieldBorderless
                value={info}
                onChange={(info: string) => onTTChange(index, { info })}
              />
              {tag && <Tag TT_index={index} tag={tag} />}
            </Box>
          </Box>
        ))}
        <AddIcon
          sx={{ my: 0.5, cursor: "pointer", color: "grey.600" }}
          onClick={() => {
            /** Hit post API  */
          }}
        />
        <div ref={divRef} />
      </Box>
    </>
  );
};

export interface TimeTableProps {
  data: TimeTable[];
}

export default TimeTable;
