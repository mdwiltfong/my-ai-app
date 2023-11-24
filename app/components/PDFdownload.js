'use client';
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';
import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const markdownToJSX = (markdown) => {
  const lines = markdown.split('\n');
  let jsxContent = [];

  lines.forEach((line, index) => {
    if (line.startsWith('# ')) {
      jsxContent.push(<Text key={index} style={styles.h1}>{line.substring(2)}</Text>);
    } else if (line.startsWith('## ')) {
      jsxContent.push(<Text key={index} style={styles.h2}>{line.substring(3)}</Text>);
    } else if (line.trim() === '') {
      jsxContent.push(<Text key={index} style={styles.newLine}>{'\n'}</Text>);
    } else {
      let segments = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      let formattedLine = segments.map((segment, segmentIndex) => {
        if (segment.startsWith('**')) {
          return <Text key={segmentIndex} style={styles.bold}>{segment.slice(2, -2)}</Text>;
        } else if (segment.startsWith('*')) {
          return <Text key={segmentIndex} style={styles.italic}>{segment.slice(1, -1)}</Text>;
        } else {
          return segment;
        }
      });
      jsxContent.push(<Text key={index} style={styles.p}>{formattedLine}</Text>);
    }
  });

  return jsxContent;
};

const PDFdownload = () => {
  const { file } = useContext(AppContext);
  const markdownString = file.template;
  const jsxContent = markdownToJSX(markdownString);

  const MyDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>{jsxContent}</View>
      </Page>
    </Document>
  );

  const filename = file?.pdf?.name?.split('.')[0] || '';

  return (
    <>
      <MyDocument />

      <PDFDownloadLink document={<MyDocument />} fileName={`DocInspector_${filename}.pdf`}>
        {({ blob, url, loading, error }) =>
          loading ? (
            'Loading document...'
          ) : (
            <Button variant='contained' startIcon={<CloudDownloadIcon />}>
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </>
  );
};

Font.register({
  family: 'var(--font-oswald)',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  document: {
    // display: 'flex',
    flexDirection: 'column',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  h1: {
    fontSize: 56,
    fontFamily: 'var(--font-oswald)',
    marginBottom: 24,
  },
  h2: {
    fontSize: 24,
    marginBottom: 24,
  },
  h3: {
    fontSize: 20,
    marginBottom: 16,
  },
  h4: {
    fontSize: 18,
    textDecoration: 'underline',
    marginBottom: 16,
  },
  p: {
    fontSize: 16,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  italic: {
    fontStyle: 'italic',
    marginBottom: 16,
  },
  newLine: {
    height: '1rem',
  },
});

export default PDFdownload;
