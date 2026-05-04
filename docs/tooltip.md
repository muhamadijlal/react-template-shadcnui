## ℹ️ Information Tooltip

Component ini digunakan untuk menampilkan tooltip informasi dengan icon.

---

## 📦 Import

```jsx
import { Information } from "@components/ui/information";
```

---

## 🚀 Basic Usage

```jsx
<Information info="Ini adalah informasi tambahan" />
```

---

## 📍 Contoh di Form

```jsx
<div className="flex items-center gap-2">
  <label>Nomor Induk Kependudukan (NIK)</label>
  <Information info="NIK harus terdiri dari 16 digit sesuai KTP" />
</div>
```

---

## ⚙️ Props

| Prop | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| info | string | Text yang ditampilkan tooltip |

---

## 💡 Tips

- Gunakan untuk membantu user memahami field/form
- Cocok ditempatkan di samping label
- Bisa juga dipakai di button, icon, atau section lain

---

## ⚠️ Catatan

Pastikan `TooltipProvider` sudah ada di root app:

```jsx
import { TooltipProvider } from "@components/ui/tooltip";

<TooltipProvider>
  <App />
</TooltipProvider>;
```
