'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { useContext } from 'react';
import { AppContext } from '../contexts/appDetails';
import markdownToJSX from '../utils/markdownToJSX';

export default function PDFdownload() {
  const { file } = useContext(AppContext);

  const JSX = () => markdownToJSX(file.template);
  console.log(file.template);
  console.log(JSX());

  return (
    <>
      {file.template && (
        <>
          <p className='pt-4'>Document:</p>
          <PDFViewer width='300' height='300'>
            <Document>
              <Page>
              <View>
                  {JSX().map((component, index) => {
                    if (component.type === 'TEXT') {
                      component.type = Text;
                    }
                    return <React.Fragment key={index}>{component}</React.Fragment>;
                  })}
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </>
      )}
    </>
  );
}
