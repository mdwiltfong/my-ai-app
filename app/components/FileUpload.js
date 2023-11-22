'use client';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/appDetails';
import { useAction, useFetch } from '@gadgetinc/react';
import { api } from '../../api';
import { Button, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { OpenAi } from 'openai';

export default function FileUpload({ type }) {
  const { file, setFile, assistant } = useContext(AppContext);
  const [newUpload, setNewUpload] = useState(true);
  const [{ data, error, fetching }, create] = useAction(api.document.create);

  const filetype = `.${type}`;
  const role = type === 'md' ? 'template' : 'resource';

  // useEffect(() => {
  //   console.log(file[type])
  //   console.log('File changed:');
  //   console.log(file);
  // }, [file]);

  const handleFileChange = (e) => {
    const singleFile = e.target.files[0];
    if (singleFile) {
      console.log(singleFile);
      setFile({ ...file, [type]: singleFile });
    }
    if (type === 'md') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setFile({ ...file, template: e.target.result });
        console.log(file.template);
      };
      reader.readAsText(singleFile);
    }
  };

  // Trying useFetch instead of useAction to upload document
  // const [{ data, error, fetching }, create] = useFetch('/document', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  //   json: true,
  // });

  const handleUploadClick = async () => {
    if (!file[type]) {
      return;
    }

    try {
      setNewUpload(false);
      console.log(`Uploading ${type} file with role ${role} and assistant ${assistant.id}`);
      await create({
        file: { file: file[type] },
        role: role,
        assistant: {
          _link: assistant.assistant.id,
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
        {file[type] === '' ? 'Upload' : 'Change'} file
        <VisuallyHiddenInput
          type='file'
          accept={filetype}
          onChange={handleFileChange}
          onClick={() => {
            // setFile({ ...file, [type]: '' });
            setNewUpload(true);
          }}
        />
      </Button>

      {/* File name - only show before uploading */}
      <div className='flex flex-row flex-nowrap my-2 w-full justify-center items-center'>
        <p>
          {file[type] && !fetching && newUpload === true && file[type].name}
        </p>{' '}
        {file[type] && !fetching && newUpload === true && (
          <a
            className='cursor-pointer font-bold text-red-800 py-1 px-2 ml-2'
            onClick={() => {
              setFile({ ...file, [type]: '' });
            }}
          >
            X
          </a>
        )}
      </div>

      {/* Upload button - only show when there is a file to be uploaded */}
      {file[type] ? (
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
              disabled={file[type] === ''}
              className='bg-green-700 hover:bg-green-800'
              onClick={handleUploadClick}
            >
              Upload
            </Button>
          )
        )
      ) : null}

      {/* Uploaded file name - only show after uploading */}
      {data && !fetching && newUpload === false && (
        <p className='my-2'>Uploaded: {file[type].name}</p>
      )}
    </div>
  );
}
