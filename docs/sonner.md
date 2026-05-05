# 🔔 Custom Toast Alert

Utility untuk menampilkan toast alert yang clean, konsisten, dan fleksibel menggunakan sonner + TailwindCSS.

---

## ✨ Features

- 🎨 Style berbeda: success, info, warning, danger
- 🧩 Custom icon (JSX atau component)
- 📝 Support title, description, subDescription
- 🎯 Optional action button
- ⏱️ Custom duration & position
- 🎯 UI clean & modern

---

## 📦 Installation

Pastikan sudah install dependency:

npm install sonner lucide-react

---

## 🧩 Setup Toaster (WAJIB)

### Next.js (App Router)

// app/layout.jsx
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
return (

<html lang="en">
<body>
{children}
<Toaster richColors />
</body>
</html>
);
}

### React (Vite / CRA)

// main.jsx / App.jsx
import { Toaster } from "sonner";

function App() {
return (
<>
<Toaster richColors />
{/_ your app _/}
</>
);
}

export default App;

---

## 📦 Import

import { showAlert } from "@/utils/showAlert";

---

## 🚀 Basic Usage

showAlert("info", {
description: "Ini notifikasi biasa",
});

---

## ✅ Success

showAlert("success", {
title: "Berhasil",
description: "Data berhasil disimpan",
});

---

## ⚠️ Warning

showAlert("warning", {
title: "Peringatan",
description: "Kuota hampir habis",
subDescription: "Sisa 10%",
});

---

## ❌ Error / Danger

showAlert("danger", {
title: "Gagal",
description: "Terjadi kesalahan",
});

---

## 🎯 With Action Button

showAlert("danger", {
title: "Gagal",
description: "Terjadi kesalahan",
actionLabel: "Coba Lagi",
onAction: () => {
console.log("Retry...");
},
});

---

## 🎨 Custom Icon

import { IoChatboxEllipses } from "react-icons/io5";

// JSX
showAlert("info", {
description: "Pesan baru",
icon: <IoChatboxEllipses className="h-5 w-5" />,
});

// Component
showAlert("info", {
description: "Pesan baru",
icon: IoChatboxEllipses,
});

---

## ⏱️ Custom Duration & Position

showAlert("success", {
description: "Disimpan",
duration: 6000,
position: "top-center",
});

---

## ⚙️ Available Options

title : string -> Judul kecil di atas
description : string -> Teks utama
subDescription : string -> Teks tambahan
icon : component / JSX -> Custom icon
actionLabel : string -> Label tombol aksi
onAction : function -> Callback saat tombol diklik
duration : number -> Durasi toast (ms)
position : string -> Posisi toast (top-right, dll)

---

## 📌 Example in Component

<button
onClick={() =>
showAlert("success", {
description: "Data berhasil disimpan",
})
}

> Save
> </button>

---

## 🧠 Notes

- Default duration: 4000ms
- Default position: top-right
- Mendukung custom icon dalam bentuk JSX maupun component
- Toaster wajib ada agar toast bisa muncul

---

## 🚀 Future Improvements

- Dark mode support
- Animation enhancement
- Toast queue / stacking control
