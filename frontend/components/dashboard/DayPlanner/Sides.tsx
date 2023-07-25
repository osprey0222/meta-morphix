import { Box, Chip, Typography } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";

const Sides = (props: SidesProps) => {
  const { data } = props;
  return (
    <Box display="flex" flexDirection="column" mx={3}>
      <Chip
        size="small"
        label="Sides"
        sx={{ bgcolor: "success.main", color: "white", mb: 1 }}
      />
      {data.map((value: string, index: number) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          gap={1}
          py={0.3}
        >
          <Typography>{index + 1}.</Typography>
          <TextFieldBorderless value={value} onChange={() => {}} />
        </Box>
      ))}
    </Box>
  );
};

interface SidesProps {
  data: string[];
}

export default Sides;
