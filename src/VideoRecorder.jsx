import React, { useState, useRef } from 'react';

const VideoRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const mediaRecorder = useRef(null);
  const videoRef = useRef(null);
  const videoBlob = useRef(null);
  const audioBlob = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoName, setVideoName] = useState('recorded_video');

  const getScreenSharePermission = async () => {
    try {
      const streamData = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setPermission(true);
      setStream(streamData);
      videoRef.current.srcObject = streamData;
    } catch (err) {
      alert(err.message);
    }
  };

  const startRecording = () => {
    mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        videoBlob.current = new Blob([e.data], { type: 'video/webm' });
        setVideoUrl(URL.createObjectURL(videoBlob.current));
      }
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
    openModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSaveVideo = () => {
    handleDownload(videoUrl, `${videoName}.mp4`);
    closeModal();
  };

  const handleDownload = (url, fileName) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>Video Yozuvchi</h2>
      <main>
        <div className="video-controls">
          {!permission ? (
            <button onClick={getScreenSharePermission} type="button">
              Ekran Bo'yicha Yozishni Boshlash
            </button>
          ) : null}
          {permission && !recording ? (
            <button onClick={startRecording} type="button">
              Yozishni Boshlash
            </button>
          ) : null}
          {permission && recording ? (
            <button onClick={stopRecording} type="button">
              Yozishni To'xtatish
            </button>
          ) : null}
          {videoUrl && (
            <button onClick={openModal} type="button">
              Videoni Yuklab Olish
            </button>
          )}
        </div>
        <video ref={videoRef} className="live-player" muted autoPlay controls />
      </main>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Videoga nom bering</h3>
            <input
              type="text"
              placeholder="Videonig nomi"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
            />
            <button onClick={closeModal}>Bekor qilish</button>
            <button onClick={handleSaveVideo}>Saqlash</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
