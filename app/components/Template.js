import Markdown from 'react-markdown';
import { Paper } from '@mui/material';
import './Template.css';

export default function Template({ file }) {
  return (
    <>
      {file && (
        <>
          <p>Template</p>
          <Paper sx={{ px: 4, py: 2 }}>
            <Markdown>{file}</Markdown>
          </Paper>
        </>
      )}
    </>
  );
}
