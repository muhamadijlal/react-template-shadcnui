# Path Alias (Vite)

Dokumentasi konfigurasi path alias pada project menggunakan Vite.

---

## Konsep

Path alias digunakan untuk mempermudah import file tanpa harus menggunakan relative path panjang seperti:

```js
import Button from "../../../components/ui/button";
```

Diganti menjadi:

```js
import Button from "@components/ui/button";
```

---

## Konfigurasi

File: `vite.config.js`

```js
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
```

---

## Daftar Alias

| Alias         | Path              |
| ------------- | ----------------- |
| `@src`        | `src/`            |
| `@components` | `src/components/` |
| `@layouts`    | `src/layouts/`    |
| `@assets`     | `src/assets/`     |
| `@utils`      | `src/utils/`      |
| `@routes`     | `src/routes/`     |
| `@hooks`      | `src/hooks/`      |
| `@context`    | `src/context/`    |
| `@lib`        | `src/lib/`        |

---

## Contoh Penggunaan

```js
import Navbar from "@components/navbar";
import MainLayout from "@layouts/main-layout";
import routes from "@routes";
```

---

## Keuntungan

- Import lebih bersih dan mudah dibaca
- Tidak perlu relative path panjang (`../../../../`)
- Lebih mudah refactor struktur folder

---

## Catatan

- Pastikan restart dev server setelah mengubah config
- Gunakan alias secara konsisten di seluruh project
