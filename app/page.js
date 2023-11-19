'use client';
import { useState, useContext, useEffect } from 'react';
import { useCompletion } from 'ai/react';
import FileUpload from './components/FileUpload';
import { Card, Button } from '@mui/material';
import { FileContext } from './fileDetails';
import { api } from '../api';
import { useUser, useSignOut, useFetch } from "@gadgetinc/react";


export default function App() {
  
  const [instructions, setInstructions] = useState('Test create Assistant from FE');
  const [model, setModel] = useState('gpt-3.5-turbo-1106');
  // This is a copy of the useFetch from doc-inspector front-end
  // Should be modified to correctly create an assistant
  const [{ data, error, fetching }, create] = useFetch("/assistants",
  {
    method: "POST",
  });

  useEffect(() => {
    data && console.log(`Data.message: ${data}`);
  }, [data]);

  const { file } = useContext(FileContext);

  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  const FileCard = ({ type }) => (
    <Card sx={{ padding: 3, backgroundColor: '#FCFCFC', flexGrow: 0 }}>
      <FileUpload type={type} />
    </Card>
  );

  return (
      <div className='flex flex-row'>
        <div className='flex flex-col stretch items-center mx-auto w-full min-h-screen max-w-3xl py-24 gap-4'>
          <div className="w-full">
            <Button variant="outlined" onClick={() => {create({body: JSON.stringify({ instructions: instructions, model: model })})}}>Create an Assistant</Button>
          </div>
          <div className='grid sm:grid-cols-2 gap-4 w-full'>
            <FileCard type='pdf' />
            <FileCard type='md' />
          </div>
          {completion ? (
            <div className='whitespace-pre-wrap my-4 content-end align-bottom grow flex flex-col justify-end align-start w-full bg-gray-100 rounded-lg p-4 border border-gray-300'>
              {completion}
            </div>
          ) : (
            <div className='whitespace-pre-wrap my-4 content-end align-bottom grow flex flex-col justify-end align-start w-full bg-gray-100 rounded-lg p-4 border border-gray-300'>
              <p>Upload a PDF document & Markdown file to begin</p>
            </div>
          )}
          <form
            role='form'
            onSubmit={handleSubmit}
            className='fixed bottom-0 w-full flex justify-center'
          >
            <input
              className='fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black'
              value={input}
              placeholder='Ask a question...'
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div>
          {/* <PDFparser file={file.pdf} /> */}
        </div>
      </div>
  );
}
