'use client';

import { useCompletion } from 'ai/react';
import FileUpload from './components/FileUpload';
import { Card } from '@mui/material';

export default function DocInspector() {
  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  const FileCard = ({ type }) => (
    <Card sx={{ padding: 3, backgroundColor: '#DDD', flexGrow: 0 }}>
      <FileUpload type={type} />
    </Card>
  );

  return (
    <div className='mx-auto w-full max-w-3xl py-24 gap-4 flex flex-col stretch items-center'>
      <div className='flex flex-row flex-wrap gap-4 justify-center'>
        <FileCard type='pdf' />
        <FileCard type='md' />
      </div>
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <input
          className='fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black'
          value={input}
          placeholder='Describe your business...'
          onChange={handleInputChange}
        />
      </form>
      {completion ? (
        <div className='whitespace-pre-wrap my-4'>{completion}</div>
      ) : (
        <div>
          Enter a business description and click enter to generate slogans.
        </div>
      )}
    </div>
  );
}
