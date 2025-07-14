Tentu! Aku bantu dari **nol sampai bisa** ya, karena kamu bilang pemula dan ingin menggunakan **Firebase Authentication + Firestore** di **React TypeScript**.

---

## ✅ Apa yang Akan Kamu Bangun

Kamu akan membuat website React + TypeScript yang:

1. Bisa **daftar & login pakai email + password** (Firebase Auth)
2. Simpan **data pengguna ke Firestore** (misalnya: username, age, dll)

---

## 🧩 Langkah 1: Siapkan Firebase Project

1. Buka [https://console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Add Project"**, beri nama misalnya `react-auth-app`
3. Setelah selesai, pilih **"Web App" icon (`</>`)** untuk register aplikasi web
4. Simpan **Firebase config-nya** (akan dipakai nanti)

---

## 🧩 Langkah 2: Install Firebase ke Project React

```bash
npm install firebase
```

Jika kamu belum punya project React TS:

```bash
npx create-react-app my-app --template typescript
cd my-app
npm install firebase
```

---

## 🧩 Langkah 3: Setup Firebase di Project

Buat file `firebase.ts` di folder `src`:

```ts
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ganti config ini dengan punyamu dari Firebase Console
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Inisialisasi
const app = initializeApp(firebaseConfig);

// Export instance Auth dan Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🧩 Langkah 4: Buat Halaman Register dan Login

Contoh `Register.tsx`:

```tsx
// src/pages/Register.tsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data tambahan ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        createdAt: new Date()
      });

      alert("Register berhasil!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Daftar</button>
    </div>
  );
};

export default Register;
```

---

Contoh `Login.tsx`:

```tsx
// src/pages/Login.tsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login berhasil!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
```

---

## 🧩 Langkah 5: Proteksi Halaman Setelah Login

Gunakan Firebase untuk mendeteksi user login:

```tsx
// src/App.tsx
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  if (!user) {
    return (
      <>
        <Register />
        <Login />
      </>
    );
  }

  return (
    <div>
      <h1>Halo {user.email}</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default App;
```

---

## 🔐 Optional: Tambahkan Validasi & Loading

Kamu bisa tambahkan:

* Loading saat login/register
* Validasi form kosong
* Navigasi pakai `react-router-dom` jika project sudah kompleks

---

## ✅ Penutup

Kamu sudah bisa:

* Setup Firebase Auth + Firestore
* Register & Login pengguna
* Simpan data pengguna ke database

Kalau kamu ingin lanjut ke fitur seperti:

* Google login
* Reset password
* Menampilkan data dari Firestore
  Tinggal lanjutkan saja, aku bisa bantu juga.

---

Mau aku bantu buat struktur folder-nya juga agar rapi?


Error `auth/configuration-not-found` biasanya muncul karena Firebase Authentication **belum diaktifkan** di Firebase Console.

---

## ✅ Cara Mengatasi `auth/configuration-not-found`

### 📌 Artinya:

Firebase tidak menemukan konfigurasi authentication method (misalnya Email/Password belum diaktifkan), sehingga tidak bisa melakukan login/register.

---

## 🔧 Solusi:

### ✅ 1. Aktifkan Authentication di Firebase Console

Ikuti langkah ini:

1. Masuk ke [https://console.firebase.google.com](https://console.firebase.google.com)
2. Pilih project-mu
3. Di sidebar kiri, klik **"Build" → "Authentication"**
4. Klik tab **"Sign-in method"**
5. Aktifkan **Email/Password** dengan:

   * Klik **Email/Password**
   * Klik **Enable**
   * Simpan

---

### ✅ 2. Pastikan Project Web Sudah Terdaftar

Kalau belum mendaftarkan aplikasi web:

1. Masuk ke Firebase Console
2. Pilih project → Klik ikon `</>` (Web)
3. Daftarkan aplikasi web kamu (beri nama bebas)
4. Salin **config Firebase** yang muncul, dan **tempel di `firebase.ts`**

Contoh:

```ts
// firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSy....",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  ...
};
```

---

### ✅ 3. Pastikan Sudah Import dan Gunakan `getAuth`

```ts
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
```

Dan digunakan dengan benar saat login atau register:

```ts
createUserWithEmailAndPassword(auth, email, password)
```

---

## ⚠️ Kalau Masih Error?

Berikan aku:

* Isi file `firebase.ts` (sensor API key boleh)
* Di mana error muncul? Saat `createUserWithEmailAndPassword()`?

Aku bantu debug langsung 🙌


Terima kasih sudah mengirim log detailnya. Error yang muncul:

```
400 (Bad Request) 
@firebase/firestore: Firestore WebChannelConnection RPC 'Write' stream transport errored.
```

Artinya: Firestore gagal menulis data karena **konfigurasi Firestore atau rules akses-nya tidak benar**.

---

## ✅ Penyebab Umum dan Solusi

---

### 🧩 1. **Firestore belum diaktifkan di Firebase Console**

> 🔥 **Ini penyebab paling umum!**

**Solusi:**

1. Masuk ke [https://console.firebase.google.com](https://console.firebase.google.com)
2. Pilih project kamu → Klik **"Build" → "Firestore Database"**
3. Klik **"Create Database"**
4. Pilih **"Start in test mode"** (untuk awal development)
5. Pilih lokasi → `asia-southeast1` (jika di Indonesia) → lanjutkan

📌 Setelah itu, Firebase akan membuat Firestore default database `databases/(default)` — yang dibutuhkan agar bisa `setDoc()` atau `addDoc()`.

---

### 🧩 2. **Rules Firestore kamu terlalu ketat**

**Solusi sementara:**
Gunakan rule **test mode (bebas akses)** saat development:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> 🛑 Jangan dipakai di produksi karena **tidak aman**! Ini hanya untuk sementara supaya kamu bisa testing.

---

### 🧩 3. **Salah Format/Request atau Data Kosong**

Pastikan kamu **tidak kirim data kosong ke Firestore**. Contoh salah:

```ts
await setDoc(doc(db, "users", user.uid), {});
```

Harus ada isi datanya, contoh:

```ts
await setDoc(doc(db, "users", user.uid), {
  email,
  username,
  createdAt: new Date()
});
```

---

### 🧩 4. **Project ID salah atau tidak cocok**

Cek di file `firebase.ts`:

```ts
const firebaseConfig = {
  ...
  projectId: "react-auth-app-dced5", // <--- HARUS COCOK DENGAN YANG DI FIREBASE CONSOLE
};
```

Kalau tidak cocok, kamu akan dapat error seperti:

> Firestore 400 Bad Request atau permission denied

---

## ✅ Kesimpulan Langkah-Langkah Solusi:

| Langkah                                    | Wajib? | Tujuan                      |
| ------------------------------------------ | ------ | --------------------------- |
| Aktifkan Firestore via Console             | ✅      | Supaya Firestore tersedia   |
| Ubah Rules ke test mode                    | ✅      | Supaya akses data diizinkan |
| Pastikan data tidak kosong saat `setDoc()` | ✅      | Supaya tidak error          |
| Periksa config `projectId`                 | ✅      | Supaya koneksi tidak gagal  |

---

Kalau kamu sudah coba semua tapi masih error, kamu bisa kirim:

* Potongan kode kamu (yang `setDoc` atau `addDoc`)
* Screenshot rules Firestore-mu
* Apakah Firestore sudah aktif di Console?

Aku bantu periksa bareng!
