'use client';
import { Box, Typography } from '@mui/material';

export default function Message({ role, content }) {
  const bgColour = role === 'user' ? '#0B93F6' : '#E5E5EA';
  const color = role === 'user' ? 'white' : 'black';
  const align = role === 'user' ? 'right' : 'left';
  const justify = role === 'user' ? 'flex-end' : 'flex-start';
  return (
    <Box sx={{ py: 1, display: 'grid' }}>
      <Typography
        sx={{
          px: 4,
          py: 2,
          justifySelf: justify,
          backgroundColor: bgColour,
          display: 'inline',
          color: color,
          textAlign: align,
          borderRadius: '2rem',
          paddingInline: '20px',
          paddingBlock: '10px',
          fontWeight: 600,
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}
