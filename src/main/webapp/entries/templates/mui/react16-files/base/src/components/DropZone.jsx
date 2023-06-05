import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Divider } from "@mui/material";
import { H5, Small } from "./Typography";

// ========================================================

// ========================================================

const DropZone = ({
  onChange,
  title = "Drag & drop product image here",
  imageSize = "Upload 280*280 image",
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => onChange(acceptedFiles),
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    multiple: true,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });
  return (
    <Box
      py={4}
      px={{
        md: 10,
        xs: 4,
      }}
      display="flex"
      minHeight="200px"
      alignItems="center"
      borderRadius="10px"
      border="1.5px dashed"
      flexDirection="column"
      borderColor="grey.300"
      justifyContent="center"
      textAlign="center"
      bgcolor={isDragActive ? "grey.200" : "grey.100"}
      sx={{
        transition: "all 250ms ease-in-out",
        outline: "none",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <H5 mb={1} color="grey.600">
        {title}
      </H5>

      <Divider
        sx={{
          "::before, ::after": {
            borderColor: "grey.300",
            width: 70,
          },
        }}
      >
        <Small color="text.disabled" px={1}>
          OR
        </Small>
      </Divider>

      <Button
        type="button"
        variant="outlined"
        color="info"
        sx={{
          px: 4,
          my: 4,
        }}
      >
        Select files
      </Button>

      <Small color="grey.600">{imageSize}</Small>
    </Box>
  );
};
export default DropZone;
