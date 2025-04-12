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

// Home route
app.get("/", (req, res) => {
  res.send("✅ RFID Attendance Server is Running!");
});

// Firebase Config Endpoint (optional for frontend)
app.get("/firebase-config", (req, res) => {
  res.json({
    apiKey: "AIzaSyBz7ljDQbR-TSyZ-UG7hcnkMKw9uyiuM_M",
    authDomain: "rfid-9b396.firebaseapp.com",
    projectId: "rfid-9b396",
    storageBucket: "rfid-9b396.appspot.com",
    messagingSenderId: "374473953420",
    appId: "1:374473953420:web:1a3461f4b2f7ba86316ba9",
    measurementId: "G-81VY03174R"
  });
});

// RFID Attendance API
app.post("/api/rfid", async (req, res) => {
  const { rfid } = req.body;

  if (!rfid) {
    return res.status(400).json({ success: false, message: "RFID is required." });
  }

  console.log(`📥 Received RFID: ${rfid}`);

  try {
    const rfidRef = db.collection("RFIDTags").doc(rfid); // Use RFID as document ID
    const doc = await rfidRef.get();

    const currentDate = new Date().toLocaleDateString("en-US");

    const timestamp = admin.firestore.Timestamp.now();

    if (doc.exists) {
      const data = doc.data();
      let history = data.history || [];

      const todayIndex = history.findIndex((entry) => entry.date === currentDate);

      // If the tag is logged in, then log out
      if (data.status === "LOGGED IN") {
        if (todayIndex !== -1) {
          history[todayIndex].timeOut = timestamp;
          history[todayIndex].status = "LOGGED OUT";
        } else {
          history.push({
            date: currentDate,
            status: "LOGGED OUT",
            timeIn: null,
            timeOut: timestamp
          });
        }

        await rfidRef.update({
          status: "LOGGED OUT",
          history: history
        });

        console.log("✅ Logout recorded for:", rfid);
        return res.json({ success: true, message: "✅ Logout recorded." });
      }
    }

    // Login if new or previously logged out
    const newEntry = {
      date: currentDate,
      status: "LOGGED IN",
      timeIn: timestamp,
      timeOut: null
    };

    await rfidRef.set(
      {
        tagID: rfid,
        status: "LOGGED IN",
        history: admin.firestore.FieldValue.arrayUnion(newEntry)
      },
      { merge: true }
    );

    console.log("✅ Login recorded for:", rfid);
    return res.json({ success: true, message: "✅ Login recorded." });

  } catch (err) {
    console.error("❌ Firebase Error:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is live at http://192.168.1.10:${PORT}`);
});
