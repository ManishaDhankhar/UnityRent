import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useReactMediaRecorder } from "react-media-recorder";
import { Box, Button, Typography } from '@mui/material'; 

const RecordView = () => {
  const {id}=useParams();
  const { status, startRecording, stopRecording, mediaBlobUrl,previewStream } =
    useReactMediaRecorder({ video: true });

    const VideoPreview = ({ stream }) => {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    return <video ref={videoRef} autoPlay muted style={{ width: '100%', borderRadius: '8px' }} />;
  };

  const handleUpload = async () => {
  if (!mediaBlobUrl) return alert("Please record a video first!");

  try {
    // 1. Fetch the blob data from the temporary URL
    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();

    // 2. Prepare the FormData (The "Package")
    const formData = new FormData();
    const videoFile = new File([blob], "return_verification.webm", { type: 'video/webm' });
    
    // "video" MUST match your backend's upload.single("video")
    formData.append("video", videoFile);

    // 3. Send to your Backend
    // Replace 'BOOKING_ID_HERE' with your actual dynamic ID
    const res = await axios.post(
      `http://localhost:8080/item/verify-return/${id}`, 
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    if (res.data.success) {
      alert("Success! Video is now safe in AWS Mumbai.");
      console.log("Cloud URL:", res.data.videoUrl);
    }
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Error uploading to Cloud.");
  }
};

  return(
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
        Status: <strong>{status}</strong>
      </Typography>

     {/* 1. Show LIVE PREVIEW if recording OR just waiting to start */}
{(status === "recording" || status === "idle") && previewStream && (
  <VideoPreview stream={previewStream} />
)}

{/* 2. Show the PLAYBACK only after they have finished */}
{status === "stopped" && mediaBlobUrl && (
  <video src={mediaBlobUrl} controls style={{ width: '100%', borderRadius: '8px' }} />
)}

      <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
  {status !== "recording" ? (
    <Button variant="contained" color="primary" onClick={startRecording}>
      {status === "stopped" ? "Re-record" : "Start Recording"}
    </Button>
  ) : (
    <Button variant="contained" color="error" onClick={stopRecording}>
      Stop Recording
    </Button>
  )}

  {/* NEW: Upload Button appears only after recording stops */}
  {/* {status === "stopped" && mediaBlobUrl && (
    <Button variant="contained" color="success" onClick={handleUpload}>
      Upload to Cloud
    </Button>
  )} */}
</Box>
    </Box>
  ) 
};

export default RecordView;