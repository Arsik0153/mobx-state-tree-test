import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, IconButton } from '@mui/material';

const WebcamRecorder = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [replaying, setReplaying] = useState(false);

  const constraints: MediaStreamConstraints = { video: true, audio: true };

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const options = { mimeType: 'video/webm' };
        mediaRecorderRef.current = new MediaRecorder(stream, options);

        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();

        setRecording(true);
        setRecordedChunks([]);
        setRecordedVideoUrl(null);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }, []);

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const playRecordedVideo = () => {
    if (recordedChunks.length === 0) return;
    setReplaying(true);

    const blob = new Blob(recordedChunks, {
      type: 'video/webm',
    });

    const url = window.URL.createObjectURL(blob);
    setRecordedVideoUrl(url);
  };

  const retakeVideo = () => {
    setReplaying(false);
    setRecordedVideoUrl(null);
    setRecordedChunks([]);
    handleStartRecording();
  };

  return (
    <div>
      {recordedVideoUrl && (
        <div>
          <video controls src={recordedVideoUrl} style={{ width: 500 }} />
          {replaying && (
            <Button onClick={retakeVideo}>Retake</Button>
          )}
        </div>
      )}
      {!recordedVideoUrl && (
        <video ref={videoRef} autoPlay playsInline style={{ width: 500 }} />
      )}
      {!recording && !recordedVideoUrl && !replaying && (
        <Button onClick={handleStartRecording}>Start Recording</Button>
      )}
      {recording && (
        <Button onClick={stopRecording}>Stop Recording</Button>
      )}
      {!recording && recordedChunks.length > 0 && !replaying && (
        <Button onClick={playRecordedVideo}>
          Play
        </Button>
      )}
    </div>
  );
};

export default WebcamRecorder;
