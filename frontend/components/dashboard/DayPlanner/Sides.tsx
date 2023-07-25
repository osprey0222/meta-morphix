import { Box, Chip, Typography } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";

const Sides = (props: SidesProps) => {
  const { data: initData } = props;

  const [data, setData] = useState<string[]>();

  useEffect(() => {
    setData(initData);
  }, []);

  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <Chip
        size="small"
        label="Sides"
        sx={{ bgcolor: "success.main", color: "white", mb: 1 }}
      />
      {(data || []).map((value: string, index: number) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          gap={1}
          py={0.3}
        >
          <Typography>{index + 1}.</Typography>
          <TextFieldBorderless
            value={value}
            onChange={(p) => {
              let newData = [...data];
              newData[index] = p;
              setData(newData);
            }}
            placeholder={`S${index + 1}`}
          />
        </Box>
      ))}
    </Box>
  );
};

interface SidesProps {
  data: string[];
}

export default Sides;
