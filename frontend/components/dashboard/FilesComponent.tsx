import { Box, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TextFieldBorderless } from "../fields/TextField";
// import DownloadIcon from "@mui/icons-material/CloudDownloadRounded";
import DownloadIcon from "@mui/icons-material/FileDownloadRounded";
import UploadingIcon from "@mui/icons-material/DownloadingRounded";
import { File as FileType } from "buffer";
import axios from "axios";

const File = (props: FileProps) => {
  const { name } = props;
  return (
    <Box
      sx={{ color: "white", bgcolor: "#002D62 ", borderRadius: 2 }}
      boxShadow={4}
    >
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Grid xs={2}></Grid>
        <Grid xs={8} display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="subtitle1"
            textAlign="center"
            overflow="hidden"
            noWrap
            textOverflow="ellipsis"
            p={0.5}
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          xs={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
        >
          <UploadingIcon
            sx={{
              transform: "rotate(360deg)",
              fontSize: 18,
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

interface FileProps {
  name: string;
}

const Files = (props: FilesProps) => {
  const { files } = props;
  return (
    <Grid container spacing={2}>
      <Grid container item spacing={1.5}>
        {files.map(({ name, type }) => (
          <Grid item xs={4}>
            <File name={name} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

interface FilesProps {
  isLoading: boolean;
  files: FileType[];
}

const FilesComponent = () => {
  const [entered, setEntered] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEntered(false);

    const data = new FormData();

    const files_temp = [...files];
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files: { [key: number]: Blob | FileType; length: number } =
        e.dataTransfer.files;

      for (let file_index = 0; file_index < files.length; file_index++) {
        files_temp.push(files[file_index] as FileType);

        // FormData
        data.append("file", files[file_index] as Blob, files[file_index].name);
      }
      axios.post("", data, {
        onUploadProgress: (ProgressEvent) => {
          console.log("Loading");
        },
      });
    }

    setFiles(files_temp);
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
          <Files isLoading files={files || []} />
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
