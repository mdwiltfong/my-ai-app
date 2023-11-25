'use client';
import { useState, useContext, useEffect } from 'react';
import { useFetch } from '@gadgetinc/react';
import { Button } from '@mui/material';
import { AppContext } from '../contexts/appDetails';

export default function CreateAssistant() {

  const { assistant, setAssistant, thread, setThread, file } = useContext(AppContext);

  const [instructions, setInstructions] = useState(
    `"You are a helpful, friendly assistant.  With the document provided ${`with the filename ${file.pdf}` || ''}, you will help humans answer their questions about this document. You will not stray from the information in this document. If you do not know the answer, you will say so. If there is a request that is outside the context of this document you will inform the human that you can not answer the question. The only exception to this rule, is that the human may ask you fill in a template ${`following the format in the file ${file.pdf}` || ''} with some of the information from the document. You will not stray from the format of this template. If you can't find the information for the template, you will leave the area of the template blank.";`
    //`You are a helpful, friendly assistant. With the document provided ${`with the filename ${file.pdf}` || ''}, you will help humans answer their questions about this document. You will not stray from the information in this document. If you do not know the answer, you will say so. If there is a request that is outside the context of this document you will inform the human that you can not answer the question.`
  );


  const [{ asstData, asstError, asstFetching }, addAssistant] = useFetch(
    '/assistants',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      json: true,
    }
  );

  const [{ threadData, threadError, threadFetching }, addThread] = useFetch(
    `/threads/${assistant?.assistant?.id || ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: assistant?.assistant?.id,
      }),
      method: 'POST',
      json: true,
    }
  );

  const createAssistant = async () => {
    try {
      const response = await addAssistant({
        body: JSON.stringify({
          instructions: instructions,
        }),
      });
      console.log(response);
      setAssistant(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createThread = async () => {
    try {
      const response = await addThread();
      console.log(response);
      setThread(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='grid sm:grid-rows-2 gap-4'>
      <div className='flex flex-row gap-4 justify-between items-center'>
        <Button variant='outlined' onClick={createAssistant}>
          Create an Assistant
        </Button>
        {assistant.assistant && (
          <p>{`Assistant ${assistant.assistant.id} created.`}</p>
        )}
      </div>
      {assistant.assistant && (
        <div className='flex flex-row gap-4 justify-between items-center'>
          <Button variant='outlined' onClick={createThread}>
            Create a Thread
          </Button>
          {thread.thread && <p>{`Thread ${thread.thread.id} created.`}</p>}
        </div>
      )}
    </div>
  );
}
