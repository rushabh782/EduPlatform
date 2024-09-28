// index.js or App.js (for React)
import { uploadVideoFile } from "./storageConfig"; // Adjust the import path as needed

document.getElementById("uploadButton").addEventListener("click", async () => {
  const videoFile = document.getElementById("videoFileInput").files[0];

  if (!videoFile) {
    document.getElementById("uploadStatus").innerText =
      "Please select a video.";
    return;
  }

  try {
    const videoURL = await uploadVideoFile(videoFile);
    document.getElementById("uploadStatus").innerText =
      "Upload successful! Video URL: " + videoURL;
  } catch (error) {
    document.getElementById("uploadStatus").innerText =
      "Upload failed: " + error.message;
  }
});
