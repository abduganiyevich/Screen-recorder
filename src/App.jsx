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
    <div>
      <h1>React Media Recorder</h1>
      <div className="button-flex">
        <button onClick={() => toggleRecordOption('video')}>
          Video Yozish
        </button>
      </div>
      <div>
        {recordOption === 'video' ? <VideoRecorder /> : <AudioRecorder />}
      </div>
    </div>
  );
};

export default App;
