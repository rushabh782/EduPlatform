// storageConfig.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// firebase/storageConfig.js
import { getStorage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

// Upload Video File Function
export const uploadVideoFile = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    // Create a storage reference
    const storageRef = ref(storage, `videos/${file.name}`);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor progress and handle completion or failure
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        // Handle upload errors
        reject(error);
      },
      async () => {
        // Handle successful uploads and get download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Initialize Firebase
const storage = getStorage(app);

export { storage };
