import { Box, Chip } from "@mui/material";
import { TextFieldBorderless } from "../../fields/TextField";
import { useEffect, useState } from "react";
import { useUpdateImpNote } from "../../../hooks/dayPlanner.hooks";
import { useDebounce } from "../../../services/apis/debounce";
import { useRouter } from "next/router";
import { DateISO } from "../../../types/dayPlanner.types";

const ImportantNote = (props: ImportantNoteProps) => {
  const { note: initData } = props;
  const [note, setNote] = useState<string>(initData);

  const router = useRouter();
  const dateISO = router.query.dateISO as DateISO;

  useEffect(() => {
    setNote(initData);
  }, [initData]);

  const { mutate: updateImpNote } = useUpdateImpNote();
  const debounced = useDebounce(() =>
    updateImpNote({
      payload: { data: { importantNote: note } },
      dateISO,
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
