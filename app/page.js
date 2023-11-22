'use client';
import { useState, useContext, useEffect } from 'react';
// import { useCompletion } from 'ai/react';
import CreateAssistant from './components/CreateAssistant';
import FileUpload from './components/FileUpload';
import { Card, Button } from '@mui/material';
import { AppContext } from './contexts/appDetails';
import { api } from '../api';
import { useUser, useSignOut, useFetch } from '@gadgetinc/react';
import Template from './components/Template';
import Message from './components/Message';

export default function App() {
  const [instructions, setInstructions] = useState(
    'Test create Assistant from FE'
  );

  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);

  const { file, assistant, thread } = useContext(AppContext);

  // const [thread, setThread] = useState({});

  const mockThreadState = {
    thread: {
      __typename: 'Threads',
      createdAt: '2023-11-22T06:56:07.793Z',
      id: '25',
      openAiId: 'thread_M5jt883us5nxG1mH9c4ENwPo',
      updatedAt: '2023-11-22T06:56:09.567Z',
    },
  };

  const [messages, setMessages] = useState([]);

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

  const [{ messageData, messageError, messageFetching }, addMessage] = useFetch(
    `/threads/message`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        thread_id: thread?.thread?.id,
        message: input,
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

  // useEffect(() => {
  //   asstData && console.log(asstData);
  //   threadData && console.log(threadData);
  // }, [asstData, threadData]);

  const FileCard = ({ type }) => (
    <Card sx={{ padding: 3, backgroundColor: '#FCFCFC', flexGrow: 0 }}>
      <FileUpload type={type} />
    </Card>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { role: 'user', content: input }]);

    try {
      const response = await addMessage({
        body: JSON.stringify({
          thread_id: thread?.thread?.id,
          message: input,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setInput('');
  };

  return (
    <>
      <div className='flex flex-row justify-center gap-4'>
        <div className='flex flex-col stretch items-center w-[80%] min-h-screen py-24 gap-4'>
          <CreateAssistant />
          {/* 
          // THIS IS NOW ISOLATED IN CreateAssistant COMPONENT
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
                {thread.thread && (
                  <p>{`Thread ${thread.thread.id} created.`}</p>
                )}
              </div>
            )}
          </div> */}
          <div className='grid sm:grid-cols-2 gap-4 w-full'>
            <FileCard type='pdf' key='pdf' />
            <FileCard type='md' key='md' />
          </div>
          <div className='whitespace-pre-wrap my-4 content-end align-bottom grow flex flex-col justify-end gap-2 align-start w-full bg-gray-100 rounded-lg p-4 border border-gray-300'>
            {messages ? (
              messages.map((msg, index) => (
                <Message key={index} role={msg.role} content={msg.content} />
              ))
            ) : (
              <p>Upload a PDF document & Markdown file to begin</p>
            )}
          </div>
          <form
            role='form'
            onSubmit={handleSubmit}
            className='w-full flex justify-center'
          >
            <input
              className='w-full max-w-md border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black'
              value={input}
              placeholder='Ask a question...'
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
      <div className='flex flex-col stretch items-center w-[40%] min-h-screen max-w-3xl py-24 gap-4'>
        <Template file={file.template} />
      </div>
    </>
  );
}
