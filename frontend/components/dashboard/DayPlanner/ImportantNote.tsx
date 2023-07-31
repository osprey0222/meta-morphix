import { Box, Chip } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";
import { useUpdateImpNote } from "../../../hooks/dayPlanner.hooks";
import { useDebounce } from "../../../services/apis/debounce";

const ImportantNote = (props: ImportantNoteProps) => {
  const { note: initData } = props;
  const [note, setNote] = useState<string>(initData);

  useEffect(() => {
    setNote(initData);
  }, [initData]);

  const { mutate: updateImpNote } = useUpdateImpNote();
  const debounced = useDebounce(() =>
    updateImpNote({
      payload: { data: { importantNote: note } },
      dayPlanId: "64c6b90092b3cfaada5287e3",
    })
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m={1}
      p={1}
      py={1.5}
      bgcolor="#fad1d0"
      borderRadius={3}
    >
      <Chip
        size="small"
        label="Important!"
        sx={{ fontWeight: 900, bgcolor: "error.light", color: "white", mx: 2 }}
      />
      <TextFieldBorderless
        value={note}
        onChange={(p) => {
          setNote(p);
          debounced();
        }}
        rows={2}
        placeholder="Deadlines, messages, urgent-stuff.."
      />
    </Box>
  );
};

interface ImportantNoteProps {
  note: string;
}

export default ImportantNote;
