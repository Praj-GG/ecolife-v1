// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVOP9aNlz-XUw5zGd6bklKjckQLafCjo4",
  authDomain: "db-for-gic.firebaseapp.com",
  databaseURL: "https://db-for-gic-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "db-for-gic",
  storageBucket: "db-for-gic.firebasestorage.app",
  messagingSenderId: "241516079038",
  appId: "1:241516079038:web:7a73409907809bf30ebbef",
  measurementId: "G-GP44DK06BL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const errorDiv = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorDiv.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    errorDiv.textContent = "Please enter both email and password.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } catch (error) {
    const code = error.code;

    if (code === "auth/wrong-password" || code === "auth/user-not-found") {
      errorDiv.textContent = "Incorrect email or password.";
    } else if (code === "auth/too-many-requests") {
      errorDiv.textContent = "Too many attempts. Please try again later.";
    } else {
      errorDiv.textContent = error.message.replace("Firebase:", "").trim();
    }
  }
});
