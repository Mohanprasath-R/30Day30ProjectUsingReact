# 🔥 Firebase Integration

This project includes Firebase integration for using Firestore. A Firebase setup file has been added inside the `lib/` directory.

---

## 📁 File Structure

```
lib/
└── firebase.js
```

---

## 🛠️ Firebase Setup

### 1. Install Firebase

To install the Firebase SDK, run:

```bash
npm install firebase
```

---

### 2. Create the Firebase Configuration File

Create a file at `lib/firebase.js` and add the following code:

```js
// lib/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the Firestore instance
export { db };
```

> ⚠️ Replace the placeholder values with your actual Firebase config values from your Firebase Console.

---

### 3. Using Firestore in Your Project

You can now import the Firestore instance anywhere in your project:

```js
import { db } from '../lib/firebase';

// Use db to interact with Firestore
```

✅ **Done!**  
Your Firebase setup is ready! You can now use Firestore in your app.

---

## 🔐 Security Tip

Do not hard-code sensitive values like API keys in production. Use environment variables instead (e.g., with `.env.local` files in frameworks like Next.js).

---

> 💡 Let me know if you want a version for `firebase.ts` or with environment variable support included.
