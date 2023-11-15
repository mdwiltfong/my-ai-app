'use client';
import { useState } from 'react';
import { useAction } from '@gadgetinc/react';
import api from '../../api';
import { Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileUpload({type}) {
  const [file, setFile] = useState('');
  const [{ data, error, fetching }, create] = useAction(api.document.create);
  const filetype = type === 'pdf' ? '.pdf' : '.md';
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }

    try {
      await create({
        file: {
          file: file,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-2 mb-4'>
      <Typography>Upload a {type} file</Typography>
      <input type='file' accept={filetype} onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <Button component="label" variant="contained" className="bg-indigo-900 hover:bg-indigo-800" startIcon={<CloudUploadIcon />} onClick={handleUploadClick}>Upload File</Button>
      {data && <p>Uploaded: {data.filename}</p>}
    </div>
  );
}

export default FileUpload;
