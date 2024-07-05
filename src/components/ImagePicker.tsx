import { useCallback, useEffect, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { Accept, useDropzone } from "react-dropzone";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const ImagePicker = ({
  onImageUpload,
  initialImage,
}: {
  onImageUpload: (file: File | null) => void;
  initialImage?: string;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage);
    }
  }, [initialImage]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const accept: Accept = { "image/*": [] };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  const handleDeleteImage = () => {
    setImagePreview(null);
    onImageUpload(null);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.dropzoneContainer}>
        <IconButton onClick={handleDeleteImage} sx={styles.deleteButton}>
          <DeleteIcon />
        </IconButton>
        {!imagePreview ? (
          <Box {...getRootProps()} sx={styles.dropzone}>
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 50 }} />
            <Typography>
              Drag & drop an image here, or click to select one
            </Typography>
          </Box>
        ) : (
          <img
            src={imagePreview}
            alt="Image Preview"
            style={styles.imagePreview}
          />
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dropzoneContainer: {
    position: "relative",
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "500px",
    height: "300px",
  },
  dropzone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "4px",
  },
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
};

export default ImagePicker;
