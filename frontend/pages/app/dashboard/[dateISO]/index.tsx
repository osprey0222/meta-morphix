import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DayPlanner from "../../../../components/dashboard/DayPlanner";
import TopBarComponent from "../../../../components/dashboard/TopBarComponent";
import BottomBarComponent from "../../../../components/dashboard/BottomBarComponent";
import QuoteComponent from "../../../../components/dashboard/QuoteComponent";
import { QuickNoteComponent } from "../../../../components/dashboard/QuickNoteComponent";
import Streak from "../../../../components/dashboard/Streak";
import FilesComponent from "../../../../components/dashboard/FilesComponent";
import { isDateValid } from "../../../../utils/validations";
import { useRouter } from "next/router";
import moment from "moment";
import { ROUTES } from "../../../../constants/routes";
import { generateUrl } from "../../../../utils/common";
import { toast } from "react-toastify";

const dashboard = () => {
  const router = useRouter();
  const { dateISO } = router.query;

  useEffect(() => {
    if (dateISO && !isDateValid(dateISO)) {
      toast.error(
        `Invalid Date. Redirected to ${moment().format("DD MMMM, YYYY")}`
      );
      router.push(
        generateUrl(ROUTES.dashboard, {
          dateISO: moment().format("YYYY-MM-DD"),
        })
      );
    }
  }, [dateISO]);

  return (
    isDateValid(dateISO) && (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TopBarComponent />
        <Box
          width="98%"
          display="flex"
          alignItems="start"
          justifyContent="space-between"
        >
          <DayPlanner />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            gap={5}
          >
            <Box
              display="flex"
              alignItems="start"
              justifyContent="space-around"
              gap={5}
            >
              <QuickNoteComponent />
              <QuoteComponent />
            </Box>
            <FilesComponent />
          </Box>
          <Streak />
        </Box>
        <BottomBarComponent />
      </Box>
    )
  );
};

export default dashboard;
