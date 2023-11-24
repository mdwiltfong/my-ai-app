'use client';
import { useState, useEffect, useContext } from 'react';
import { useFetch } from '@gadgetinc/react';
import { AppContext } from '../contexts/appDetails';
import Message from './Message';

export default function Thread() {
  const { thread } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [run, setRun] = useState(null);
  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);

  const [{ messageData, messageError, messageFetching }, addMessage] = useFetch(
    `/messages/${thread?.thread?.id}`,
    {
      body: JSON.stringify({ message: input }),
      method: 'POST',
      // json: true,
    }
  );

  const [{ threadData, threadError, threadFetching }, updateThread] = useFetch(
    `/openAiRuns`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        runId: run,
        threadId: thread?.thread?.id,
      }),
      method: 'GET',
      json: true,
    }
  );

  const getMessages = async () => {
    try {
      const response = await fetch(`/threads/${thread?.thread?.id}`);
      const data = await response.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { role: 'user', content: input }]);
    try {
      const response = await addMessage({
        body: JSON.stringify({
          runId: run,
          threadId: thread?.thread?.id,
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
    </>
  );
}
