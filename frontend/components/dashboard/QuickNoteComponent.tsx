import { Box, Chip, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useGetQN, useUpdateQN } from "../../hooks/quickNote.hooks";
import { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import NotesIcon from "@mui/icons-material/NotesRounded";
import { TooltipComp } from "../common/ToolTipWrapper";
import { useDebounce } from "../../services/apis/debounce";
import { DateISO } from "../../types/dayPlanner.types";

export const QuickNoteComponent = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [note, setNote] = useState("");

  const router = useRouter();
  const { dateISO } = router.query;

  const { data: history } = useGetQN();
  const { mutate: updateNote } = useUpdateQN();

  const debounce = useDebounce(() =>
    updateNote({
      dateISO: dateISO as DateISO,
      payload: { data: { quickNote: note } },
    })
  );

  const onChange = (note: string) => {
    setNote(note);
    debounce();
  };

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="0.5px gray solid"
      borderColor="#e0e0e0"
      borderRadius={2}
      width={500}
    >
      <Chip
        size="small"
        label={showHistory ? "Notes History" : "Quick Note"}
        sx={{
          color: "white",
          bgcolor: showHistory ? "warning.light" : "secondary.light",
          my: 2,
        }}
      />

      <textarea
        style={{
          padding: 10,
          width: "100%",
          background: "#f5f5f5",
          border: "none",
          minHeight: 300,
          resize: "none",
        }}
        readOnly={showHistory}
        value={showHistory ? history : note}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={moment().format("MM/DD") + "\n\n"}
      />

      {showHistory ? (
        <TooltipComp label="Show Back">
          <NotesIcon
            sx={{ cursor: "pointer", position: "absolute", top: 16, right: 15 }}
            onClick={() => setShowHistory(!showHistory)}
          />
        </TooltipComp>
      ) : (
        <TooltipComp label="Show History">
          <HistoryIcon
            sx={{ cursor: "pointer", position: "absolute", top: 16, right: 15 }}
            onClick={() => setShowHistory(!showHistory)}
          />
        </TooltipComp>
      )}
    </Box>
  );
};
