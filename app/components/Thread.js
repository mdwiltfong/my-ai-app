'use client';
import { useState, useEffect, useContext } from 'react';
import { useFetch } from '@gadgetinc/react';
import { AppContext } from '../contexts/appDetails';
import Message from './Message';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function Thread() {
  const { thread } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [run, setRun] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);

  const [{ messageData, messageError, messageFetching }, addMessage] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      json: true,
    }
  );

  const [{ runData, runError, runFetching }, getRunStatus] = useFetch(
    `/openAiRuns?runId=${run?.externalId}&threadId=${thread?.thread?.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  );

  const [{ threadData, threadError, threadFetching }, updateThread] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  );

    useEffect(() => {
      runData && console.log(runData);
      threadData && console.log(threadData);
      messageData && console.log(messageData);
    }, [runData, threadData, messageData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    setMessages([...messages, { role: 'user', content: input }]);
    try {
      const response = await addMessage({
        body: JSON.stringify({ message: input }),
      });
      setInput('');
      console.log(response);
      setRun(response.run);
      let count = 1;
      while (run?.status !== 'completed' && count < 20) {
        const updatedStatus = await getRunStatus();
        console.log(updatedStatus);
        if (updatedStatus.run !== null) {
          setRun(updatedStatus.run);
        }
        console.log(`Checked ${count} times`);
        count++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (data.run !== null && data.run.status === 'completed') {
        const newThread = await updateThread();
        console.log('Updated thread', newThread);
        setMessages([...messages, newThread.messages.body.data.content.text.value]);
      } else {
        console.log(`Run check failed: Status: ${data.run.status}`);
      }
    } catch (error) {
      console.log(error);
    }
    setWaiting(false);
  };

  return (
    <>
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
        className='w-full flex justify-center items-center gap-4'
      >
        <input
          className='w-full max-w-md border border-gray-300 rounded shadow-xl p-2 dark:text-black'
          value={input}
          placeholder='Ask a question...'
          onChange={handleInputChange}
        />
        {waiting ? (
          <LoadingButton loading loadingPosition='start' variant='outlined' />
        ) : (
          <Button
            component='label'
            variant='contained'
            disabled={waiting}
            className='bg-green-700 hover:bg-green-800'
            onClick={handleSubmit}
          >
            Send
          </Button>
        )}
      </form>
    </>
  );
}
