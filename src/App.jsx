// App.jsx
import React, { useState } from 'react';
import './App.css';
import VideoRecorder from './VideoRecorder';

const App = () => {
  const [recordOption, setRecordOption] = useState('video');

  const toggleRecordOption = (type) => {
    setRecordOption(type);
  };

  return (
    <div className='container'>
      <h1>React Media Recorder</h1>
      <VideoRecorder />
    </div>
  );
};

export default App;
