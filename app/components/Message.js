import { Paper, Typography } from '@mui/material';

export default function Message({ role, content }) {
  const bgColour = role === 'user' ? '#f5f5f5' : '#e0e0e0';
  return (
    <Paper sx={{ px: 4, py: 2, backgroundColor: bgColour }}>
      <Typography>{content}</Typography>
    </Paper>
  );
}
