import { useState, createContext, useMemo } from 'react';

const AppContext = createContext();

const ContextProvider = (props) => {
  const [file, setFile] = useState({ pdf: '', md: '' });

  const mockAssistantState = {
    assistant: {
      createdAt: '2023-11-22T04:16:16.114Z',
      id: '1135',
      instructions: 'Test create Assistant from FE',
      name: 'DocInspector',
      openAiId: 'asst_VzXvKPd8PSTy3i8YMY8Muhw6',
      updatedAt: '2023-11-22T04:16:19.036Z',
    },
  };

  const mockThreadState = {
    thread: {
      __typename: 'Threads',
      createdAt: '2023-11-22T06:56:07.793Z',
      id: '25',
      openAiId: 'thread_M5jt883us5nxG1mH9c4ENwPo',
      updatedAt: '2023-11-22T06:56:09.567Z',
    },
  };

  const [assistant, setAssistant] = useState(mockAssistantState);
  const [thread, setThread] = useState(mockThreadState);

  const value = useMemo(
    () => ({ file, setFile, assistant, setAssistant, thread, setThread }),
    [file, assistant, thread]
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export { AppContext, ContextProvider };
