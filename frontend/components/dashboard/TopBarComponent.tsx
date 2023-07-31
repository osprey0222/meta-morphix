import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

import LeftIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import DoubleLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import DoubleRightIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import RightIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { generateUrl } from "../../utils/common";

const TopBarComponent = () => {
  const router = useRouter();
  const { dateISO } = router.query;
  const [dateChange, setDateChange] = useState(dateISO);

  useEffect(() => {
    router.push(
      generateUrl(ROUTES.dashboard, { dateISO: dateChange as string })
    );
  }, [dateChange]);

  return (
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
          <DoubleLeftIcon sx={{ fontSize: 50, cursor: "pointer" }} />
          <LeftIcon
            sx={{ fontSize: 50, cursor: "pointer" }}
            onClick={() =>
              setDateChange(
                moment(dateISO).add(-1, "days").format("YYYY-MM-DD")
              )
            }
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={900}
          >
            <Typography mx={4} variant="h2">
              {moment(dateISO).format("Do MMMM, dddd")}
            </Typography>
          </Box>
          <RightIcon
            sx={{ fontSize: 50, cursor: "pointer" }}
            onClick={() =>
              setDateChange(moment(dateISO).add(1, "days").format("YYYY-MM-DD"))
            }
          />
          <DoubleRightIcon sx={{ fontSize: 50, cursor: "pointer" }} />
        </Box>
      </Grid>
      <Grid display="flex" alignItems="center" justifyContent="center" xs={1}>
        <div
          onClick={() => {
            localStorage.setItem("access_token", "");
            router.push(ROUTES.login);
          }}
        >
          <LogoutIcon sx={{ cursor: "pointer" }} />
        </div>
      </Grid>
    </Grid>
  );
};

export default TopBarComponent;
