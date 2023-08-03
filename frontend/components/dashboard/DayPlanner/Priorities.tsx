import { Box, Chip, Typography } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DateISO } from "../../../types/dayPlanner.types";
import { useDebounce } from "../../../services/apis/debounce";
import { useUpdatePriorities } from "../../../hooks/dayPlanner.hooks";

const Priorities = (props: PrioritiesProps) => {
  const { data: initData } = props;

  const router = useRouter();
  const dateISO = router.query.dateISO as DateISO;

  const [data, setData] = useState<string[]>();

  useEffect(() => {
    setData(initData);
  }, [initData]);

  const { mutate: updatePriorities } = useUpdatePriorities();
  const debounce = useDebounce(() => {
    updatePriorities({ dateISO, payload: { data: { priorities: data } } });
  });

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
              let newData = [...data];
              newData[index] = p;
              setData(newData);
              debounce();
            }}
            placeholder={`P${index + 1}`}
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
