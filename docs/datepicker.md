# 📅 Datepicker Usage Guide

## Overview

Datepicker ini menggunakan dua format tanggal:

- Display (UI / Placeholder) → 01 Juni 2026
- Value (Data yang disimpan/dikirim) → 01/06/2026

Tujuannya:

- User lebih mudah membaca tanggal
- Backend tetap konsisten dengan format standar (dd/MM/yyyy)

---

## 📦 Dependencies

Install date-fns:

npm install date-fns

---

## 🛠️ Helper Function

import { format } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(date, type = "value") {
if (!date) return "";

if (type === "display") {
return format(date, "dd MMMM yyyy", { locale: id });
// contoh: 01 Juni 2026
}

return format(date, "dd/MM/yyyy");
// contoh: 01/06/2026
}

---

## 🚀 Cara Penggunaan

1. Saat User Memilih Tanggal

const selectedDate = new Date();

// untuk dikirim ke backend
const value = formatDate(selectedDate);
// hasil: 01/06/2026

// untuk ditampilkan ke user
const display = formatDate(selectedDate, "display");
// hasil: 01 Juni 2026

---

2. Implementasi di Input

<input
type="text"
placeholder={formatDate(date, "display")}
value={formatDate(date)}
/>

---

3. Contoh Submit ke Backend

const handleSubmit = () => {
const payload = {
date: formatDate(selectedDate) // format dd/MM/yyyy
};

console.log(payload);
};

---

## 📌 Format yang Digunakan

Display → dd MMMM yyyy (01 Juni 2026)  
Value → dd/MM/yyyy (01/06/2026)

---

## ⚠️ Catatan

- Gunakan locale id agar bulan tampil dalam Bahasa Indonesia
- Jangan kirim format display ke backend
- Gunakan helper function agar konsisten

---

## ✅ Best Practice

- Pisahkan format display dan value
- Hindari hardcode format di banyak tempat
- Gunakan satu source of truth (formatDate)
