'use client';
import { useState, useEffect, useContext } from 'react';
import { useFetch } from '@gadgetinc/react';
import { AppContext } from '../contexts/appDetails';
import Message from './Message';

export default function Thread() {

  const { thread } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);

  /* Copilot suggested:
  const sendMessage = async (userMessage) => {
    // Add user message to state
    setMessages([...messages, { role: 'user', content: userMessage }]);
    
    // Send message to your server or directly to OpenAI (not recommended)
    const response = await axios.post('/api/message', { message: userMessage });
    
    // Add OpenAI response to state
    setMessages(prev => [...prev, { role: 'assistant', content: response.data }]);
  };
  */

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
