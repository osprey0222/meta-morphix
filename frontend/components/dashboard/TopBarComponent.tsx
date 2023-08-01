import {
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import LeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import DoubleLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import DoubleRightIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import RightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { generateUrl } from "../../utils/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { getFormattedDate } from "../../utils/features";
import { TooltipComp } from "../common/ToolTipWrapper";

const DateLabel = (props: {
  dateISO: string;
  openDt: boolean;
  setOpenDt: (p: boolean) => void;
  inputRef: any;
  InputProps: any;
  setDateChange: (d: string) => void;
}) => {
  const {
    dateISO,
    openDt,
    setOpenDt,
    InputProps: { ref } = {},
    setDateChange,
  } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={900}
      sx={{ cursor: "pointer" }}
      onClick={() => setOpenDt(!openDt)}
      onDoubleClick={() => setDateChange(getFormattedDate(new Date()))}
    >
      <Typography mx={4} variant="h2" ref={ref} sx={{ userSelect: "none" }}>
        {moment(dateISO).format("Do MMMM, dddd")}
      </Typography>
    </Box>
  );
};

const DatePickerCustom = (props: any) => {
  const inputRef = useRef(null);
  const { dateISO, openDt, setOpenDt, dateChange, setDateChange } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{ field: DateLabel as any, ...props.slots }}
        slotProps={{
          field: {
            dateISO,
            openDt,
            setOpenDt,
            setDateChange,
          } as any,
        }}
        ref={inputRef}
        {...props}
        value={dayjs(dateChange as string)}
        onChange={(value) =>
          setDateChange(getFormattedDate(new Date(value as any)))
        }
        open={openDt}
        onClose={() => setOpenDt(false)}
        onOpen={() => setOpenDt(true)}
      />
    </LocalizationProvider>
  );
};

const TopBarComponent = () => {
  const router = useRouter();
  const { dateISO } = router.query;
  const [dateChange, setDateChange] = useState(dateISO);

  const [openDt, setOpenDt] = useState(false);
  const [inputRef, setInputRef] = useState(null);

  console.log(openDt);

  useEffect(() => {
    router.push(
      generateUrl(ROUTES.dashboard, { dateISO: dateChange as string })
    );
  }, [dateChange]);

  return (
    <>
      <Grid
        width="98%"
        border="0.5px gray solid"
        borderColor="grey.300"
        container
        spacing={2}
        m={2}
        p={1}
        borderRadius={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={1}></Grid>
        <Grid xs={10}>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <DoubleLeftIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={() =>
                setDateChange(
                  moment(dateISO).add(-1, "months").format("YYYY-MM-DD")
                )
              }
            />
            <LeftIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={() =>
                setDateChange(
                  moment(dateISO).add(-1, "days").format("YYYY-MM-DD")
                )
              }
            />

            <DatePickerCustom
              dateISO={dateISO}
              openDt={openDt}
              setOpenDt={setOpenDt}
              dateChange={dateChange}
              setDateChange={(p) => setDateChange(p)}
            />

            <RightIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={() =>
                setDateChange(
                  moment(dateISO).add(1, "days").format("YYYY-MM-DD")
                )
              }
            />
            <DoubleRightIcon
              sx={{ fontSize: 50, cursor: "pointer" }}
              onClick={() =>
                setDateChange(
                  moment(dateISO).add(1, "months").format("YYYY-MM-DD")
                )
              }
            />
          </Box>
        </Grid>
        <Grid display="flex" alignItems="center" justifyContent="center" xs={1}>
          <TooltipComp label={"Exit"}>
            <LogoutIcon
              onClick={() => {
                localStorage.setItem("access_token", "");
                router.push(ROUTES.login);
              }}
              sx={{ cursor: "pointer" }}
            />
          </TooltipComp>
        </Grid>
      </Grid>
    </>
  );
};

export default TopBarComponent;
