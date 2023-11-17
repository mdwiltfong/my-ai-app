'use client';
import { useState } from 'react';
import { useAction } from '@gadgetinc/react';
import { api } from '../../api';
import { Button, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function FileUpload({ type }) {
  const [file, setFile] = useState('');
  const [newUpload, setNewUpload] = useState(true);
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
      setNewUpload(false);
      await create({
        file: {
          file: file,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className='flex flex-col gap-2 mb-4 items-center'>
      <Typography>Upload a {type} file</Typography>

      {/* Upload button */}
      <Button
        component='label'
        variant='contained'
        startIcon={<CloudUploadIcon />}
      >
        {file === '' ? 'Upload' : 'Change'} file
        <VisuallyHiddenInput
          type='file'
          accept={filetype}
          onChange={handleFileChange}
          onClick={() => {
            setFile('');
            setNewUpload(true);
          }}
        />
      </Button>

      {/* File name - only show before uploading */}
      <div className='flex flex-row flex-nowrap my-2 w-full justify-between items-center'>
        <p>{file && !fetching && newUpload === true && file.name}</p>{' '}
        {file && !fetching && newUpload === true && (
          <a
            className='cursor-pointer font-bold text-red-800 py-1 px-2 mx-2'
            onClick={() => {
              setFile('');
            }}
          >
            X
          </a>
        )}
      </div>

      {/* Upload button - only show when there is a file to be uploaded */}
      {file ? (
        fetching ? (
          <LoadingButton
            loading
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='outlined'
          >
            Uploading
          </LoadingButton>
        ) : (
          newUpload === true && (
            <Button
              component='label'
              variant='contained'
              disabled={file === ''}
              className='bg-indigo-900 hover:bg-indigo-800'
              onClick={handleUploadClick}
            >
              Upload
            </Button>
          )
        )
      ) : null}

      {/* Uploaded file name - only show after uploading */}
      {(data && !fetching && newUpload === false) && <p className='my-2'>Uploaded: {file.name}</p>}
    </div>
  );
}

export default FileUpload;
