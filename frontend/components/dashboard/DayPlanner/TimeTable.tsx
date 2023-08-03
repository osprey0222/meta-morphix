import RightArrowIcon from "@mui/icons-material/ArrowRightAltRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import { TextFieldBorderless } from "../../fields/TextField";
import { Box, Chip, Divider, Typography } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import AddTagPopover from "./AddTagPopover";
import DeleteIcon from "@mui/icons-material/CancelRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { DateISO, TimeTable } from "../../../types/dayPlanner.types";
import { useDebounce } from "../../../services/apis/debounce";
import { useUpdateTT } from "../../../hooks/dayPlanner.hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { TT } from "../../../constants/general";
import { tags } from "../../../utils/sampleData";
import { randomInt } from "crypto";

const Time = (props: {
  time: Dayjs | string;
  onChange: (p: Dayjs | string | null) => void;
  disabled?: boolean;
}) => {
  const { time, onChange, disabled = false } = props;
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
        disabled={disabled}
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
  const router = useRouter();
  const { dateISO } = router.query;

  useEffect(() => {
    setData(timeTableData || []);
  }, [timeTableData]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const { mutate: updateTT } = useUpdateTT();
  const debounce = useDebounce(
    () =>
      updateTT({
        payload: { data: { update: data } },
        dateISO: dateISO as DateISO,
      }),
    3000
  );

  const onTTEntryChange = (index: number, field: { [key: string]: any }) => {
    const updateData = [...data];
    updateData[index] = {
      ...updateData[index],
      ...field,
    };
    setData([...updateData]);
    debounce();
  };

  const onTTEntryCreate = () => {
    const updateData = [...data];
    updateData.push({
      _id: null,
      complete: false,
      from:
        data.length > 0
          ? moment(updateData[updateData.length - 1].to).toISOString()
          : moment(dateISO + " " + "06:00").toISOString(),
      to:
        data.length > 0
          ? moment(updateData[updateData.length - 1].to)
              .add(1, "hours")
              .toISOString()
          : moment(dateISO + " " + "07:00").toISOString(),
      info: "",
    });
    setData(updateData);
    debounce();
  };

  const onTTEntryDelete = (index: number) => {
    if (data.length === TT.LOWER_LIMIT) {
      toast.warning("Atleast 1 TT entry is required.");
      return;
    }
    const updateData = [...data];
    updateData.splice(index, 1);
    setData(updateData);
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
                  onClick={() => onTTEntryDelete(pointerEntered)}
                />
              )}
              <DoneIcon
                onClick={() => onTTEntryChange(index, { complete: !complete })}
                sx={{
                  fontSize: 15,
                  cursor: "pointer",
                  color: complete ? "success.main" : "grey.300",
                }}
              />
              <Time
                time={from as string}
                onChange={(from: Dayjs) =>
                  onTTEntryChange(index, {
                    from: from.isValid() ? from.toISOString() : "00",
                  })
                }
                disabled={complete}
              />
              {"-"}
              <Time
                time={to as string}
                onChange={(to: Dayjs) =>
                  onTTEntryChange(index, {
                    to: to.isValid() ? to.toISOString() : "00",
                  })
                }
                disabled={complete}
              />
              <RightArrowIcon sx={{ color: `grey.${complete ? 400 : 700}` }} />
              <TextFieldBorderless
                value={info}
                onChange={(info: string) => onTTEntryChange(index, { info })}
                onClick={() => {
                  if (index + 1 < TT.UPPER_LIMIT && index === data.length - 1)
                    onTTEntryCreate();
                }}
                disabled={complete}
              />
              {true && (
                <Tag
                  TT_index={index}
                  tag={tags[Math.floor(Math.random() * (tags.length - 1))]}
                />
              )}
            </Box>
          </Box>
        ))}
        {data.length < TT.UPPER_LIMIT ? (
          <AddIcon
            sx={{ my: 0.5, cursor: "pointer", color: "grey.600" }}
            onClick={onTTEntryCreate}
          />
        ) : (
          <Typography my={1} variant="caption" color="grey.600">
            Max entries reached.
          </Typography>
        )}
        <div ref={divRef} />
      </Box>
    </>
  );
};

export interface TimeTableProps {
  data: TimeTable[];
}

export default TimeTable;
