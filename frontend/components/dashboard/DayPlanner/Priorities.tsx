import { Box, Chip, Typography } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";

const Priorities = (props: PrioritiesProps) => {
  const { data: initData } = props;

  const [data, setData] = useState<string[]>();

  useEffect(() => {
    setData(initData);
  }, []);

  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <Chip
        size="small"
        label="Priorities"
        sx={{ bgcolor: "info.main", color: "white", mb: 1 }}
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
              data[index] = p;
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

interface PrioritiesProps {
  data: string[];
}

export default Priorities;
