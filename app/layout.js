'use client';
import { Provider } from '@gadgetinc/react';
import { api } from '../api';
import { ContextProvider } from './contexts/appDetails';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
export const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
})

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Doc Inspector',
//   description: 'Query documents & generate templated reports',
// }

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${inter.variable} ${oswald.variable}`}>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        name='description'
        content='Query documents & generate templated reports'
      />
      <title>Doc Inspector</title>
      <body className={inter.className}>
        <ContextProvider>
          <Provider api={api}>{children}</Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
