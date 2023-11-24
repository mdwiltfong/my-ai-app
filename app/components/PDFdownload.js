'use client';
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const markdownToJSX = (markdown) => {
  const lines = markdown.split('\n');
  let jsxContent = [];

  lines.forEach((line) => {
    if (line.startsWith('# ')) {
      jsxContent.push(<Text style={styles.h1}>{line.substring(2)}</Text>);
    } else if (line.startsWith('## ')) {
      jsxContent.push(<Text style={styles.h2}>{line.substring(3)}</Text>);
    } else if (line.trim() === '') {
      jsxContent.push(<Text style={styles.newLine}>{'\n'}</Text>);
    } else {
      let segments = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      let formattedLine = segments.map((segment) => {
        if (segment.startsWith('**')) {
          return <Text style={styles.bold}>{segment.slice(2, -2)}</Text>;
        } else if (segment.startsWith('*')) {
          return <Text style={styles.italic}>{segment.slice(1, -1)}</Text>;
        } else {
          return segment;
        }
      });
      jsxContent.push(<Text style={styles.p}>{formattedLine}</Text>);
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

  return (
    <>
      <MyDocument />
      <PDFDownloadLink document={<MyDocument />} fileName='document.pdf'>
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

const styles = StyleSheet.create({
  document: {
    display: 'flex',
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
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  h2: {
    fonntSize: '1.5rem',
    marginBottom: '1rem',
  },
  h3: {
    fontSize: '1.17rem',
    marginBottom: '1rem',
  },
  h4: {
    fontSize: '1rem',
    textDecoration: 'underline',
    marginBottom: '1rem',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  newLine: {
    height: '1rem',
  },
});

export default PDFdownload;
