const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");
const serviceAccount = require("./rfid-9b396-firebase-adminsdk-fbsvc-21937e3f81.json");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin Init
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Root Route
app.get("/", (req, res) => {
  res.send("✅ RFID Attendance Server is Running!");
});

// Firebase Config (for optional frontend use)
app.get("/firebase-config", (req, res) => {
  res.json({
    apiKey: "AIzaSyBz7ljDQbR-TSyZ-UG7hcnkMKw9uyiuM_M",
    authDomain: "rfid-9b396.firebaseapp.com",
    projectId: "rfid-9b396",
    storageBucket: "rfid-9b396.appspot.com",
    messagingSenderId: "374473953420",
    appId: "1:374473953420:web:1a3461f4b2f7ba86316ba9",
    measurementId: "G-81VY03174R",
  });
});

// RFID Attendance Endpoint
app.post("/api/rfid", async (req, res) => {
  const { rfid } = req.body;

  if (!rfid) {
    return res.status(400).json({ success: false, message: "⚠️ RFID is required in the request body." });
  }

  console.log(`📥 Received RFID: ${rfid}`);

  try {
    const rfidRef = db.collection("RFIDTags").doc(rfid);
    const doc = await rfidRef.get();

    const currentDate = new Date().toLocaleDateString("en-US");
    const timestamp = admin.firestore.Timestamp.now();

    if (doc.exists) {
      const data = doc.data();
      let history = Array.isArray(data.history) ? [...data.history] : [];

      console.log("📜 Existing history:", JSON.stringify(history));

      const todayIndex = history.findIndex(entry => entry.date === currentDate);

      if (data.status === "LOGGED IN") {
        // Logging out
        if (todayIndex !== -1) {
          history[todayIndex].timeOut = timestamp;
          history[todayIndex].status = "LOGGED OUT";
        } else {
          history.push({
            date: currentDate,
            status: "LOGGED OUT",
            timeIn: null,
            timeOut: timestamp,
          });
        }

        await rfidRef.update({
          status: "LOGGED OUT",
          history,
        });

        console.log("✅ Logout recorded for:", rfid);
        return res.json({ success: true, message: "✅ Logout recorded." });
      } else {
        // Logging in
        if (todayIndex !== -1) {
          history[todayIndex].timeIn = timestamp;
          history[todayIndex].status = "LOGGED IN";
        } else {
          history.push({
            date: currentDate,
            status: "LOGGED IN",
            timeIn: timestamp,
            timeOut: null,
          });
        }

        await rfidRef.update({
          status: "LOGGED IN",
          history,
        });

        console.log("✅ Login recorded for:", rfid);
        return res.json({ success: true, message: "✅ Login recorded." });
      }
    } else {
      // New RFID tag registration and login
      const newHistory = [{
        date: currentDate,
        status: "LOGGED IN",
        timeIn: timestamp,
        timeOut: null,
      }];

      await rfidRef.set({
        tagID: rfid,
        status: "LOGGED IN",
        history: newHistory,
      });

      console.log("✅ New tag registered and login recorded for:", rfid);
      return res.json({ success: true, message: "✅ Login recorded (New tag)." });
    }
  } catch (error) {
    console.error("❌ Firestore Error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "❌ Internal server error. Check server logs." });
  }
});

// Server Listener
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://192.168.1.10:${PORT}`);
});
