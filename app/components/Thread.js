'use client';
import { useState, useEffect, useContext } from 'react';
import { useFetch } from '@gadgetinc/react';
import { AppContext } from '../contexts/appDetails';
import Message from './Message';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function Thread() {
  const { thread } = useContext(AppContext);
  const mockMessages = [
    { role: 'user', content: 'Hello from the user' },
    { role: 'assistant', content: 'Hello from the assistant' },
  ];
  const [messages, setMessages] = useState([]);
  const [runExternalId, setRunExternalId] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => setInput(e.target.value);

  const [{ messageData }, addMessage] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      json: true,
      sendImmediately: false,
    }
  );

  const [{ runData }, getRunStatus] = useFetch(
    `/openAiRuns?runId=${runExternalId}&threadId=${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      sendImmediately: false,
      json: true,
    }
  );

  const [{ threadData }, updateThread] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      json: true,
    }
  );

  useEffect(() => {
    const checkRunStatus = async () => {
      let updatedStatus = await getRunStatus();
      let attempts = 0;
      while (updatedStatus?.runStatus !== 'completed' && attempts < 50) {
        console.log('Checking run status...');
        console.log(updatedStatus);
        updatedStatus = await getRunStatus();
        attempts++;
      }
      console.log(`Made ${attempts} attempts to check run status`);
      if (updatedStatus?.runStatus === 'completed') {
        console.log('Looking for new messages...');
        try {
          const newThread = await updateThread();
          console.log('New thread');
          console.log(newThread);
          if (newThread?.messages?.body?.data) {
            const newMessages = newThread.messages.body.data.map((item) => ({
              role: item.role,
              content: item.content[0].text.value,
            }));
            console.log('New messages found:');
            console.log(newMessages);
            setMessages(newMessages);
          }
        } catch (error) {
          console.error('Failed to update thread:', error);
        }
      }
    };
    if (runExternalId) {
      checkRunStatus();
    }
  }, [runExternalId, getRunStatus, updateThread]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    setMessages([{ role: 'user', content: input }, ...messages]);
    try {
      const response = await addMessage({
        body: JSON.stringify({ message: input }),
      });
      setInput('');
      setRunExternalId(response?.run?.externalId);
    } catch (error) {
      console.error(error);
    }
    setWaiting(false);
  };

const tailwind = ' my-4 content-end align-bottom grow flex flex-col-reverse justify-end gap-2 w-full overflow-auto h-96 bg-gray-100 rounded-lg p-4 border border-gray-300'

  return (
    <>
      <div className='flex flex-col-reverse overflow-scroll h-96 whitespace-pre-wrap bg-gray-100 rounded-lg p-4 border border-gray-300 w-full'>
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
        className='w-full flex justify-center items-center gap-4'
      >
        <input
          className='w-full max-w-md border border-gray-300 rounded shadow-xl p-2 dark:text-black'
          value={input}
          placeholder='Ask a question...'
          onChange={handleInputChange}
        />
        {waiting ? (
          <LoadingButton loading variant='outlined' />
        ) : (
          <Button
            component='label'
            variant='contained'
            disabled={waiting}
            onClick={handleSubmit}
          >
            Send
          </Button>
        )}
      </form>
    </>
  );
}
