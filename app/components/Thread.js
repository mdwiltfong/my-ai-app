import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';


export default function Thread() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userMessage) => {
    // Add user message to state
    setMessages([...messages, { role: 'user', content: userMessage }]);
    
    // Send message to your server or directly to OpenAI (not recommended)
    const response = await axios.post('/api/message', { message: userMessage });
    
    // Add OpenAI response to state
    setMessages(prev => [...prev, { role: 'assistant', content: response.data }]);
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <MessageComponent key={index} role={msg.role} content={msg.content} />
      ))}
      <InputComponent onSendMessage={sendMessage} />
    </div>
  );
};