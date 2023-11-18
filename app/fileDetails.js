import { useState, createContext, useMemo } from 'react';

const FileContext = createContext();

const FileProvider = (props) => {
  const [file, setFile] = useState({ pdf: '', md: '' });

  const value = useMemo(() => ({ file, setFile }), [file]);

  return (
    <FileContext.Provider value={value}>{props.children}</FileContext.Provider>
  );
};
export { FileContext, FileProvider };
