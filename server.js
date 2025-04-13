const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin Init
const serviceAccount = {
  type: "service_account",
  project_id: "rfid-9b396",
  private_key_id: "e65136acdbffb1bbfc445ba63b38314f783f7c4e",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD91nBBPMDuRkZx\nZgbduuEnQ2GdMrx5kD3Ga2SgpKFTMyyZzgHsnYc61ld7ZkWYzAEafFbq7/V57to4\niWe9vqLDIw464pjxxjB0z7sP8XBzp0+WaM2tJTfBj0yYHoNjE4YZ4m9lJ0j4D6Ay\nAgkEVvZqDr2s0pCQj+yyfOlil7ucDJ+/JcYhgKElaz0T2gHk3PilpfqQHZHqrG0I\nk2uEOILHO194sulIMd8aApqrpTZXKCIV/wZhVEksBp68WAJejiRM7G1kVnHVA2M1\n9vrPcMknYVag/cfJFHfCaBG3DA+MFW+2QShxZ1XPVxxvc/jcB/QD2XA6/jUJ0p2q\nLuLOeOGtAgMBAAECggEAPMQ+IU/y+9e0+2aqVCBt0CFwV9qShiOCtmJ1N4PR3wIM\nNlG74jIf8nTngnIMTTThOr7za9DAGk2Uzh4OyLy/aCmXOX+Pj6mbZgtow7tP6U/v\nXJmAS2fyfhLZCj2bxHcjDkVH15ZdAI11EyOrlu9elCstOxc5ZnId/uiqUmDyl7tv\n4WiESAGkPlNVrXravJ/liHW4v7hq5qeSDmcA7hTsyG6OKs+Fcfp7ywAR8axDSJbr\nhiMnoLtQjkIFi/MC9MPude5Z4wWWdJY+xPEnmC1uQQ/cE6yI1F49qVxqSOkC3f1Y\nsjeH4CiOitWzzC8ai+x85doXsF3Zf/G1bt2qoP+5IQKBgQD/ZYafiTTZV5EDgCMR\nOQsMoF9ykf+Z7v0DC65+pdV+cVFwrJY8kpbcsWZqVgZyUY+oomZ/rj4PHrge83PN\nMKzQqhOHTP+P6aPm9U/0QcZsRdgoQt8E0ystiJEnl/cu5lTMkC1BGky/zCpd4yJH\ndso6+N08y7jFU5BtxjBy/4ByhQKBgQD+b/g/X0TPGTIXwSphajsh6Q8ZMR8urVa8\nJS4q57j6XChimCFvYZ9JydBOhoDGhVKzS4KAd99t1VRPrqTyl665NnSVdkPQ9onv\n0u/jqW/XqN1PZrWW1y9Wy/Ew4ja05rD6WtPTHK5spFoL+ZSZBGXuZP2k8hfuE0/a\nzbP5NFffCQKBgQDLF131cXNAPf0IDpZUNMtPkBw2jFj4fO5fxKNO/OqH8O61LdkO\nc/dZqgxqFNxtfeRCUlo1wEaDWYdKvYfhrIpQKF79IcK8GywGFh8tejyijuv0IDEe\nshnMzKO5G4QpnGnkfeYutg5AGse5/0ucDp+EQ7ASj2HwMKJSWN7gI8NtzQKBgQDB\nAMyNvcWjVxhxfnyYco2ydmiWknV14dUGWSnBMA9YEmosB/xs0d+TiHvz5QFwFZgb\nG2895jBcz1LqMq86uia2pgEfkxt0Ol99xUNlLZUCQTzHS0D5z/c/3unxS9d1t/yN\nnDJMVNhW3wDTTpoSzIxJnt/srBvM42dSsXEQ20zAiQKBgQC8YHY4perf3X5Rs3af\nkL3hBOhalfy2fC+NhsrZ+wOT+s+5BNL8Y5NeZ8wvgD8qaL5Y7D2Mh4hLPA98Z2OC\nnOgfmIZDtUDerG1oPVB4lnQVVowkCUJz9Q/GU0EEg/O3mu32jB0BGcrZcZJxo1UM\noMoFk/+MMt29466NRIIVSsQS1A==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@rfid-9b396.iam.gserviceaccount.com",
  client_id: "103240838973168239723",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40rfid-9b396.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Routes
app.get("/", (req, res) => {
  res.send("✅ RFID Attendance Server is Running!");
});

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

  console.log(`📥 Received RFID: ${rfid}`);  // Corrected the template literal syntax

  try {
    const rfidRef = db.collection("RFIDTags").doc(rfid);
    const doc = await rfidRef.get();

    const currentDate = new Date().toLocaleDateString("en-US");
    const timestamp = admin.firestore.Timestamp.now();

    if (doc.exists) {
      const data = doc.data();
      let history = Array.isArray(data.history) ? [...data.history] : [];
      const todayIndex = history.findIndex(entry => entry.date === currentDate);

      if (data.status === "LOGGED IN") {
        if (todayIndex !== -1) {
          history[todayIndex].timeOut = timestamp;
          history[todayIndex].status = "LOGGED OUT";
        } else {
          history.push({ date: currentDate, status: "LOGGED OUT", timeIn: null, timeOut: timestamp });
        }
        await rfidRef.update({ status: "LOGGED OUT", history });
        console.log("✅ Logout recorded for:", rfid);
        return res.json({ success: true, message: "✅ Logout recorded." });
      } else {
        if (todayIndex !== -1) {
          history[todayIndex].timeIn = timestamp;
          history[todayIndex].status = "LOGGED IN";
        } else {
          history.push({ date: currentDate, status: "LOGGED IN", timeIn: timestamp, timeOut: null });
        }
        await rfidRef.update({ status: "LOGGED IN", history });
        console.log("✅ Login recorded for:", rfid);
        return res.json({ success: true, message: "✅ Login recorded." });
      }
    } else {
      const newHistory = [{ date: currentDate, status: "LOGGED IN", timeIn: timestamp, timeOut: null }];
      await rfidRef.set({ tagID: rfid, status: "LOGGED IN", history: newHistory });
      console.log("✅ New tag registered and login recorded for:", rfid);
      return res.json({ success: true, message: "✅ Login recorded (New tag)." });
    }
  } catch (error) {
    console.error("❌ Firestore Error:", error.message);
    return res.status(500).json({ success: false, message: "❌ Internal server error. Check server logs." });
  }
});

// Start Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://192.168.1.10:${PORT}`);
});
