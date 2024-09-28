let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

//search form
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchBox = document.getElementById("search-box");
  const courseBoxes = document.querySelectorAll(".courses .box");

  // Listen for the form submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const searchTerm = searchBox.value.toLowerCase().trim();

    // Filter course boxes
    let foundMatch = false; // Flag to check if any course matches
    courseBoxes.forEach((box) => {
      const courseTitle = box.querySelector(".title").textContent.toLowerCase();
      const keywords = box.getAttribute("data-keywords")
        ? box.getAttribute("data-keywords").toLowerCase()
        : "";

      // Check if the search term matches the course title or keywords
      if (courseTitle.includes(searchTerm) || keywords.includes(searchTerm)) {
        box.style.display = "block"; // Show matching course
        foundMatch = true; // Set flag to true
      } else {
        box.style.display = "none"; // Hide non-matching course
      }
    });

    // If no matches are found, display a message
    if (!foundMatch) {
      alert(`No courses found for "${searchTerm}"`);
    }
  });
});

//Teachers form
document.addEventListener("DOMContentLoaded", () => {
  const teacherBoxes = document.querySelectorAll(".teachers .box");
  const searchInput = document.querySelector(".search-tutor input");

  // Event listener for search input
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    teacherBoxes.forEach((box) => {
      // Get the teacher's name and keywords
      const teacherName = box.querySelector("h3").textContent.toLowerCase();
      const keywords = box.getAttribute("data-keywords").toLowerCase();

      // Check if the search term matches the teacher's name or keywords
      if (teacherName.includes(searchTerm) || keywords.includes(searchTerm)) {
        box.style.display = "block"; // Show the box
      } else {
        box.style.display = "none"; // Hide the box
      }
    });
  });
});

//Fnction for name updation of teachers from teachers to teacher_profile
// Function to get query parameters
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Update the profile details dynamically on teacher_profile.html
document.addEventListener("DOMContentLoaded", () => {
  // Check if this is the teacher profile page
  if (document.querySelector(".teacher-profile")) {
    const teacherName = getQueryParameter("name");
    const nameElement = document.querySelector(
      ".teacher-profile .details .tutor h3"
    );

    if (teacherName && nameElement) {
      nameElement.textContent = teacherName;
    }
  }
});

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDp0HiJP6LEDu5_avmIYVYyKuCwQVZf8cY",
  authDomain: "learningmanagementsystem-423f0.firebaseapp.com",
  projectId: "learningmanagementsystem-423f0",
  storageBucket: "learningmanagementsystem-423f0.appspot.com",
  messagingSenderId: "27805455426",
  appId: "1:27805455426:web:f03674d4f958f1cf1909db",
  measurementId: "G-RKCNM4CBPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload a video file
const uploadFile = async (file) => {
  const storageRef = ref(storage, `videos/${file.name}`); // Store videos in a 'videos' folder

  try {
    await uploadBytes(storageRef, file);
    console.log("File uploaded successfully!");

    // Optional: Get the download URL and log it
    const url = await getDownloadURL(storageRef);
    console.log("File available at", url);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// Function to handle video upload
const handleVideoUpload = async () => {
  const videoInput = document.getElementById("videoInput");
  const uploadStatus = document.getElementById("uploadStatus");

  // Get the selected file
  const file = videoInput.files[0];
  if (!file) {
    uploadStatus.innerText = "Please select a video file.";
    return;
  }

  // Call the uploadFile function and update the UI accordingly
  try {
    await uploadFile(file);
    uploadStatus.innerText = "Video uploaded successfully!";
  } catch (error) {
    uploadStatus.innerText = "Error uploading video: " + error.message;
  }
};

// Attach event listener to the upload button
document
  .getElementById("uploadButton")
  .addEventListener("click", handleVideoUpload);
