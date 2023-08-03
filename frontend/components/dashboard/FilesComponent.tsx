import { Box, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TextFieldBorderless } from "../fields/TextField";
import DeleteIcon from "@mui/icons-material/RemoveCircleRounded";
import {
  useDeleteFile,
  useGetAllFiles,
  useUploadFile,
} from "../../hooks/files.hooks";
import { FileDB, FileDB_ } from "../../types/files.types";
import { toast } from "react-toastify";
import { handleDownload } from "../../services/files.services";

const File = (props: FileProps) => {
  const {
    index,
    removeFile,
    file: { id: fileId, name, downloadURL } = {},
  } = props;
  const [showDelete, setShowDelete] = useState(false);

  const { mutate: deleteFile } = useDeleteFile();

  return (
    <Box
      sx={{
        position: "relative",
        color: "white",
        bgcolor: "#002D62 ",
        borderRadius: 2,
        cursor: "pointer",
      }}
      boxShadow={4}
      onPointerEnter={() => setShowDelete(true)}
      onPointerLeave={() => setShowDelete(false)}
      onClick={() => handleDownload(downloadURL)}
    >
      <Typography
        variant="subtitle1"
        textAlign="center"
        overflow="hidden"
        noWrap
        textOverflow="ellipsis"
        p={0.5}
        mx={1}
      >
        {name}
      </Typography>

      {showDelete && (
        <DeleteIcon
          sx={{
            position: "absolute",
            color: "error.dark",
            background: "white",
            fontSize: 14,
            top: -5,
            right: -5,
            cursor: "pointer",
            borderRadius: "100%",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            removeFile(index);
            deleteFile({ fileId });
          }}
        />
      )}
    </Box>
  );
};

interface FileProps {
  file: FileDB_;
  index: number;
  removeFile: (i: number) => void;
}

const Files = (props: FilesProps) => {
  const { files, removeFile } = props;
  return (
    <Grid container spacing={2}>
      <Grid container item spacing={1.5}>
        {files.map((file, index) => (
          <Grid item xs={4}>
            <File file={file} index={index} removeFile={removeFile} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

interface FilesProps {
  isLoading: boolean;
  files: FileDB_[];
  removeFile: (index: number) => void;
}

const FilesComponent = () => {
  const [entered, setEntered] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  // Upload File
  const { mutate: upload } = useUploadFile();

  // Fetch Files
  const { data } = useGetAllFiles();

  useEffect(() => {
    setFiles(data);
  }, [data]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEntered(false);

    if (e.dataTransfer.files?.length > 10) {
      toast.error("Woah! Slow down. Max 10 files at a time.");
      return;
    }

    const files_temp = [...files];
    if (e.dataTransfer.files) {
      // set files: seperately
      const files = e.dataTransfer.files;
      for (let index = 0; index < files.length; index++) {
        files_temp.push(files[index] as any);
      }
      setFiles(files_temp);

      // hit apis: seperately
      for (let index = 0; index < files.length; index++) {
        const data = new FormData();
        data.append("file", files[index] as Blob);
        upload({ payload: data });
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setEntered(true);
    } else if (e.type === "dragleave") {
      setEntered(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="0.5px gray solid"
      borderColor="#e0e0e0"
      borderRadius={2}
      p={2}
      width={740}
      height={250}
      bgcolor="#e1f1fd"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        pb={1}
      >
        <Grid
          container
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={4}>
            <TextFieldBorderless
              value=""
              onChange={() => {}}
              placeholder="Search..."
              sx={{ bgColor: "white" }}
              underline
            />
          </Grid>
          <Grid xs={4} display="flex" justifyContent="center">
            <Chip
              size="small"
              label={entered ? "Drop it!" : "Drop Zone"}
              sx={{
                color: "white",
                bgcolor: "grey.700",
              }}
            />
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        height="95%"
        width={"100%"}
        border={entered && "4px dashed"}
        borderColor={entered && "grey.500"}
        borderRadius={5}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onPointerLeave={() => setEntered(false)}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
        overflow="scroll"
        p={1}
      >
        {files.length ? (
          <Files isLoading files={files || []} removeFile={handleDelete} />
        ) : (
          <Typography
            justifyContent="center"
            alignSelf="center"
            textAlign="center"
            color="grey.600"
            variant="caption"
          >
            Why so empty?
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FilesComponent;
