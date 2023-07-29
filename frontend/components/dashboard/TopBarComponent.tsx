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

const TopBarComponent = () => {
  const router = useRouter();
  const { dateISO } = router.query;
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
          <LeftIcon sx={{ fontSize: 50, cursor: "pointer" }} />
          <DoubleLeftIcon sx={{ fontSize: 50, cursor: "pointer" }} />
          <Typography mx={4} variant="h2">
            {moment(dateISO).format("Do MMMM, dddd")}
          </Typography>
          <DoubleRightIcon sx={{ fontSize: 50, cursor: "pointer" }} />
          <RightIcon sx={{ fontSize: 50, cursor: "pointer" }} />
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
