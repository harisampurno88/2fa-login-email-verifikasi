import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("message");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  msg.style.color = "#1565c0";
  msg.textContent = "🔐 Memeriksa kredensial...";

  if (!email || !password) {
    msg.style.color = "red";
    msg.textContent = "Email dan password wajib diisi!";
    return;
  }

  try {
    // Login ke Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate OTP acak
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Simpan OTP ke Firestore
    await setDoc(doc(db, "otpCodes", user.uid), {
      otp: otp,
      createdAt: serverTimestamp(),
      validUntil: Date.now() + 60000 // berlaku 1 menit
    });

    // Kirim OTP lewat email (EmailJS)
    const templateParams = {
      to_name: email.split("@")[0], // ambil nama dari email
      otp_code: otp,
      to_email: email
    };

    msg.textContent = "📧 Mengirim kode OTP ke email...";

    emailjs.send("service_cu4lk9l", "template_o65hrc7", templateParams)
      .then(() => {
        msg.style.color = "green";
        msg.textContent = "✅ OTP telah dikirim ke email kamu!";
        localStorage.setItem("uid", user.uid);

        setTimeout(() => {
          window.location.href = "otp.html";
        }, 3000);
      })
      .catch((err) => {
        console.error("Gagal mengirim email:", err);
        msg.style.color = "red";
        msg.textContent = "Gagal mengirim OTP ke email.";
      });

  } catch (error) {
    console.error(error);
    msg.style.color = "red";
    msg.textContent = "Login gagal: " + error.message;
  }
});
