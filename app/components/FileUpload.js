'use client';
import { useState } from 'react';
import { useAction } from '@gadgetinc/react';
import api from '../../api';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileUpload() {
  const [file, setFile] = useState('');
  const [{ data, error, fetching }, create] = useAction(api.document.create);

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
      <input type='file' accept='.pdf' onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <Button component="label" variant="contained" className="bg-indigo-900 hover:bg-indigo-800" startIcon={<CloudUploadIcon />} onClick={handleUploadClick}>Upload File</Button>
      {data && <p>Uploaded: {data.filename}</p>}
    </div>
  );
}

export default FileUpload;
