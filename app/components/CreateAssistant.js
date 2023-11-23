'use client';
import { useState, useContext, useEffect } from 'react';
import { useFetch } from '@gadgetinc/react';
import { Button } from '@mui/material';
import { AppContext } from '../contexts/appDetails';

export default function CreateAssistant() {

  const [instructions, setInstructions] = useState(
    'Test create Assistant from FE'
  );

  const { assistant, setAssistant, thread, setThread } = useContext(AppContext);

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
      const response = await addThread({
        body: JSON.stringify({
          instructions: instructions,
        }),
      });
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
