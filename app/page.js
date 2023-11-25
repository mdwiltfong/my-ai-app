'use client';
import CreateAssistant from './components/CreateAssistant';
import FileUpload from './components/FileUpload';
import Thread from './components/Thread';
import PDFdownload from './components/PDFdownload';
import { Paper } from '@mui/material';
import { AppContext } from './contexts/appDetails';
import { useContext } from 'react';

export default function App() {
  const { file } = useContext(AppContext);
  return (
    <>
      <div className='flex flex-row justify-center gap-4'>
        <div className='flex flex-col stretch items-center w-[80%] min-h-screen py-24 gap-4'>
          <CreateAssistant />
          <div className='grid sm:grid-cols-2 gap-4 w-full'>
            <FileUpload type='pdf' key='pdf' />
            <FileUpload type='md' key='md' />
          </div>
          <Thread />
        </div>
      </div>
      {file.md && (
        <div className='flex flex-col items-center md:w-[75%] pb-24 mx-auto'>
          <Paper className='p-4 my-4 w-full flex flex-col'>
            <PDFdownload />
          </Paper>
        </div>
      )}
    </>
  );
}
