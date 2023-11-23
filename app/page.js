import CreateAssistant from './components/CreateAssistant';
import FileUpload from './components/FileUpload';
import Template from './components/Template';
import Thread from './components/Thread';

export default function App() {
  return (
    <>
      <div className='flex flex-row justify-center gap-4'>
        <div className='flex flex-col stretch items-center w-[80%] min-h-screen py-24 gap-4'>
          <CreateAssistant />
          <div className='grid sm:grid-cols-2 gap-4 w-full'>
            <FileUpload type='pdf' key='pdf' />
            <FileUpload type='md' key='md' />
          </div>
          <Thread />
        </div>
      </div>
      <div className='flex flex-col items-center md:w-[75%] pb-24 mx-auto'>
        <Template />
      </div>
    </>
  );
}
