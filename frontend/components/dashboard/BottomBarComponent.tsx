import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";

const BottomBarComponent = () => {
  let cal: CalHeatmap;
  useEffect(() => {
    cal = new CalHeatmap();

    cal?.paint({
      data: {
        source:
          "https://raw.githubusercontent.com/vega/vega/main/docs/data/seattle-weather.csv",
        type: "csv",
        x: "date",
        y: (d) => +d["temp_max"],
        groupY: "max",
      },
      date: { start: new Date("2012-01-01") },
      range: 12,
      scale: {
        color: {
          type: "threshold",
          range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
          domain: [10, 20, 30],
        },
      },
      domain: {
        type: "month",
        gutter: 4,
        label: { text: "MMM", textAlign: "start", position: "top" },
      },
      subDomain: { type: "ghDay", radius: 2, width: 11, height: 11, gutter: 4 },
    });
  }, [cal]);

  return (
    <Box
      bottom={0}
      width="98%"
      border="0.5px gray solid"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={2}
      p={1}
      borderRadius={5}
      minHeight={180}
      borderColor="grey.300"
    >
      <div id="cal-heatmap"></div>
    </Box>
  );
};

export default BottomBarComponent;
