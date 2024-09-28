// import { uploadVideoFile } from "./storageConfig";

// const uploadVideo = () => {
//   // Get file input and upload status elements from the DOM
//   const courseVideosInput = document.getElementById("course-videos");
//   const uploadStatus = document.getElementById("uploadStatus");
//   const uploadButton = document.getElementById("uploadButton");

//   // Event listener for upload button
//   uploadButton.addEventListener("click", async () => {
//     const courseVideos = courseVideosInput.files;

//     // Check if any video files are selected
//     if (courseVideos.length === 0) {
//       uploadStatus.innerText = "Please select a video to upload.";
//       return;
//     }

//     uploadStatus.innerText = "Uploading...";

//     try {
//       // Iterate over each selected video file and upload them
//       for (const videoFile of courseVideos) {
//         await uploadVideoFile(videoFile, (progress) => {
//           // Update the progress for each video upload
//           uploadStatus.innerText = `Upload is ${progress.toFixed(2)}% done`;
//         });
//       }

//       // Once all videos are uploaded successfully
//       uploadStatus.innerText = "Upload successful!";
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       uploadStatus.innerText = "Upload failed. Please try again.";
//     }
//   });
// };

// export default uploadVideo;

// // Function to handle form submission
// document.getElementById("uploadButton").addEventListener("click", async () => {
//   // Get input values
//   const courseName = document.getElementById("course-name").value;
//   const courseDescription = document.getElementById("course-description").value;
//   const courseCategory = document.getElementById("course-category").value;
//   const courseThumbnail = document.getElementById("course-thumbnail").files[0]; // We will not upload this to Firestore but need to keep the reference

//   if (
//     !courseName ||
//     !courseDescription ||
//     !courseCategory ||
//     !courseThumbnail
//   ) {
//     alert("Please fill all fields.");
//     return;
//   }

//   try {
//     // Reference to Firestore collection
//     const coursesRef = collection(db, "courses");

//     // Add course data to Firestore
//     const docRef = await addDoc(coursesRef, {
//       course_name: courseName,
//       course_description: courseDescription,
//       course_thumbnail: courseThumbnail.name, // You might want to upload this to storage and save the URL
//       course_category: courseCategory,
//     });

//     // Show success message
//     document.getElementById("uploadStatus").innerText =
//       "Course uploaded successfully!";
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//     document.getElementById("uploadStatus").innerText =
//       "Error uploading course.";
//   }
// });
// uploadVideo.js
import { db } from "./firebase/firebaseConfig.js";
import { storage } from "./firebase/storageConfig.js"; // If you have a separate storage config
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

document.getElementById("uploadButton").addEventListener("click", async () => {
  const courseName = document.getElementById("course-name").value;
  const courseDescription = document.getElementById("course-description").value;
  const courseCategory = document.getElementById("course-category").value;

  const thumbnailFile = document.getElementById("course-thumbnail").files[0];
  const videoFiles = document.getElementById("course-videos").files;

  if (!thumbnailFile || videoFiles.length === 0) {
    document.getElementById("uploadStatus").innerText =
      "Please select a thumbnail and at least one video.";
    return;
  }

  try {
    // Upload Thumbnail
    const thumbnailRef = ref(storage, "thumbnails/" + thumbnailFile.name);
    await uploadBytes(thumbnailRef, thumbnailFile);
    const thumbnailUrl = await getDownloadURL(thumbnailRef);

    // Upload Videos
    const videoUrls = [];
    for (const videoFile of videoFiles) {
      const videoRef = ref(storage, "videos/" + videoFile.name);
      await uploadBytes(videoRef, videoFile);
      const videoUrl = await getDownloadURL(videoRef);
      videoUrls.push(videoUrl);
    }

    // Prepare data for Firestore
    const courseData = {
      courseName,
      courseDescription,
      courseCategory,
      courseThumbnail: thumbnailUrl,
      courseVideos: videoUrls,
    };

    // Add data to Firestore
    await addDoc(collection(db, "courses"), courseData);
    document.getElementById("uploadStatus").innerText =
      "Course uploaded successfully!";
  } catch (error) {
    console.error("Error uploading course: ", error);
    document.getElementById("uploadStatus").innerText =
      "Error uploading course.";
  }
});
