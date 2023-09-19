import React, { ChangeEvent, useRef } from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dropzone: {
    display: 'none',
  },
  uploadButton: {
    cursor: 'pointer',
  },
}));

type FileUploadZoneProps = {
  onFileUpload: (file: File) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = (props) => {
  const { onFileUpload } = props;
  const classes = useStyles();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={classes.dropzone}
        />
        <Button
          variant="outlined"
          onClick={handleButtonClick}
          className={classes.uploadButton}
        >
          Upload File
        </Button>
      </Grid>
    </Grid>
  );
};

export default FileUploadZone;
