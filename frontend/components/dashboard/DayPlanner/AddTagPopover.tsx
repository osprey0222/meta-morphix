import { TextFieldBorderless } from "../../fields/TextField";
import { Box, Chip, Divider, Popover, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { colors, tags } from "../../../utils/sampleData";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import DotIcon from "@mui/icons-material/FiberManualRecordRounded";

const AddTagPopover = (props: AddTagPopoverProps) => {
  const { selectedTag, anchorEl, setAnchorEl } = props;
  const [newTag, setNewTag] = useState(
    selectedTag || { label: "", color: "success.light" }
  );
  const [anchorElColors, setAnchorElColors] = useState(null);

  const [data, setData] = useState<{ color: string; label: string }[]>();

  const divRef = useRef(null);

  useEffect(() => {
    setData(tags);
  }, []);

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // scrollToBottom();
  }, [data]);

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {selectedTag ? (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={0.5}
            border="1px solid"
            borderColor="grey.100"
          >
            <Chip
              size="medium"
              sx={{
                my: 0.5,
                fontWeight: "bold",
                bgcolor: selectedTag.color,
                color: "white",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onDelete={() => setNewTag(null)}
              label={selectedTag.label}
            />
          </Box>
        ) : (
          <></>
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          maxHeight={200}
          overflow="scroll"
          px={3}
          m={1}
        >
          {(data || []).map(({ color, label }, index) => {
            return (
              <Chip
                size="medium"
                sx={{
                  my: 0.5,
                  // fontSize: "12px",
                  fontWeight: "bold",
                  bgcolor: color,
                  color: "white",
                  borderRadius: 5,
                  cursor: "pointer",
                  maxWidth: 150,
                }}
                label={Number(index) + 1 + " - " + label}
              />
            );
          })}
          <div ref={divRef} />
        </Box>

        <Box
          my={1}
          px={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TextFieldBorderless
            sx={{
              mx: 0.5,
              my: 1,
              p: 1,
              border: "1px  solid",
              borderColor: "grey.300",
              borderRadius: 3,
              bgcolor: newTag?.color || "success.light",
              input: {
                p: 0,
                m: 0,
                textAlign: "center",
                fontSize: 15,
                fontWeight: 500,
                color: "white",
              },
            }}
            value={newTag?.label || ""}
            onChange={(p) => setNewTag({ ...newTag, label: p })}
            placeholder="Add new tag..."
          />
          <DotIcon
            onClick={(e) => setAnchorElColors(e.currentTarget)}
            sx={{ color: newTag.color, cursor: "pointer", mx: 0.5 }}
          />
          <AddIcon
            onClick={
              newTag.label
                ? () => {
                    setData([...data, newTag]);
                    setNewTag({ ...newTag, label: "" });
                  }
                : null
            }
            sx={{
              cursor: "pointer",
              mx: 0.5,
              color: newTag.label ? "grey.600" : "grey.300",
            }}
          />
        </Box>
      </Popover>

      <Popover
        open={Boolean(anchorElColors)}
        anchorEl={anchorElColors}
        onClose={() => setAnchorElColors(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" p={1}>
          {colors.map((color: string) => (
            <DotIcon
              onClick={() => setNewTag({ ...newTag, color })}
              sx={{ color: color, cursor: "pointer", mx: 0.5 }}
            />
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default AddTagPopover;

interface AddTagPopoverProps {
  selectedTag: { label: string; color: string };
  anchorEl: any;
  setAnchorEl: (p: any) => void;
}
