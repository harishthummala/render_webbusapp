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
  private_key_id: "21937e3f81ea0a702d687e3349d80c44480b5f7f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtQOLLGsmjDiA8\nnjvyLg3QrRSt+F14jjEmEw30lImkOEBFbMgOK4CxaU9zK+6KKqJOma5QR4ppx/Q7\nh1T34CvMbUiZD3LgMx2GHFttMKtO1lpTErgKyq+zaSac8IY0aDU66Fi2Nepn5Zf+\nh9hojJ88qR+3860I+VXiiul1l6VCOYLGdfxC7RIA9xvP9umVgT3LPWGBOL/BeZtf\nj9I+gBpvmuosQ3w17ENTmX1CKT94t6rVbIEcChG8WwWqjifs7/9FB1JIFV+h3tq7\nuvpU8HuqGUTTR0OIDi1S9JCEgAwc2qJCgXOR8yEXCAe9Mpsy32Y5cDubxUH/P0hh\nM2ZM4EqfAgMBAAECggEACZpyd8ZGWE7CJAS0Ae/iPXzlNozGcZZAIdd7NeFojRJp\nIvACrsu5Lcb5QRhgTTGhHtuPOU1IiNCCjdd/MuDZd1K0wXcvwOmpwJ31xg76j+Yl\nyjuxY+JplszvTP0FaLDrXRaKmZ78x+wxXp8dCb6HB7pq0wF4x+nk2X0lr6pLiL4b\n7+3AEXiXtzq+dS2DJJuho2Y8KV9x/1PYXL/94TFfx26w2YqIQiye8CqtowK8155R\nky1dTEy++7ZmLj295TQny5VatBNNmbyRJfpUGx+ntalHse8ewZWRhLuzVYRKJG9y\nPYo9vxXxsyYx2X2PySk7w3jozrgbzGjYpGTVqqOe0QKBgQDh753+hm7JhpBBn+/E\n6P4MoYTYCeeVMPJa/AzCVQKWejLAYoI5OUuVAaV7ot+in0WnmfpeRDnD9IbUm/h9\ntSt8gLbFij/UYBp5oPZY8WBP96YmKtJc2oU3JixR5t7U3KyPnG0fPPDMlHY3brYw\njwZQQefFn7FY0T7W8HkS7XtSuwKBgQDETqrjt3d7LurwLiaZFaYI3+AgQY0olXjx\ns07SYJfNqX/SYw0CYo/Ihu2Ja2TfQW06/MD731PavREWL4Yaw9CPwIWqSS38OFvs\nybcwG+8PjnyDrQDbKjMwvTXMveKjNYtUZlbPnGUrgzAR0gcP0lWdURQdr7dGToOi\nWq7/vIOjbQKBgQDKNCZFbdDnAUxHvzjaFN+RNFjs9GhTSFwOe7d7kJNhUvnq3f7H\n8fQn5jJRJWJaa4ruRcsh5JOCQW0OCIzrDGJf6d4piuI3Us8+/YSb82KMDwqe7AIa\n4eMJiVtu7V2OSfUSDiBHLcYggdoPIEFj0g0HdQRWBOa2o4ZG3S6uduXBEwKBgEg5\naUY+ygbYTDfxwuGvxVaeh6dWdsjntYe3oNhmEXPpWM3fA3pNKPluKxbUHFjHiZia\nRaZllER2K0MuWPif8qvw+Tydj/2r/qYv0OYyYNIoakdH73izHgJgmtqpQikqGgkD\nXg0kTVSk/5qO22pGyJkIq44AiD2lxWiGVLxib0xBAoGAGLnfRf2XeH2lpfkUJ5jV\nth19rZQZlEYoJAJcQ7P1Xc2BY3vrUTcJ5d+aVdTU2pHzmo7k/PNB7bMKbv9KZWOx\nkJ/+p8eKfnINgjDVZRh2r02f+nQmSaOgAIpPaDHlZIGSYP60QssdwYjtJu6BVujK\nq755WE1CgGA2GjPQEtVyQa8=\n-----END PRIVATE KEY-----\n",
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

  console.log(`📥 Received RFID: ${rfid}`);

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
