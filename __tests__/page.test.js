import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '@/app/components/FileUpload';
import CreateAssistant from '@/app/components/CreateAssistant';
import Thread from '@/app/components/Thread';
import Message from '@/app/components/Message';
import { Provider } from '@gadgetinc/react';
import { api } from '../api';
import { ContextProvider } from '@/app/contexts/appDetails';
import 'openai/shims/node';

describe('App', () => {
  
  describe('CreateAssistant', () => {
    it('renders a button', () => {
      render(
        <ContextProvider>
          <Provider api={api}>
            <CreateAssistant />
          </Provider>
        </ContextProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('File Uploader', () => {
    it('renders a button', () => {
      render(
        <ContextProvider>
          <Provider api={api}>
            <FileUpload />
          </Provider>
        </ContextProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
  
  describe('Chat component', () => {
    it('renders an input', () => {
      render(
        <ContextProvider>
          <Provider api={api}>
            <Thread />
          </Provider>
        </ContextProvider>
      );
      expect(screen.getByLabelText('Interact-with-AI')).toBeInTheDocument();
    });
  });

  describe('Message bubble', () => {
    it('contains text', () => {
      render(
        <ContextProvider>
          <Provider api={api}>
            <Message content="Some text" />
          </Provider>
        </ContextProvider>
      );
      expect(screen.getByText('Some text')).toBeInTheDocument();
    });
  });

});
