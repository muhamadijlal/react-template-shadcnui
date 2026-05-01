# Components (shadcn/ui)

Dokumentasi penggunaan component UI berbasis **shadcn/ui** pada project ini.

---

## Konsep

Project ini menggunakan **shadcn/ui** sebagai dasar component UI.

shadcn/ui adalah kumpulan component yang:

- berbasis **Radix UI**
- menggunakan **Tailwind CSS**
- bisa dikustomisasi langsung (bukan library black-box)

---

## Lokasi Component

Semua component UI berada di:

```
src/components/ui/
```

Contoh:

```
button.jsx
dialog/
sidebar/
input.jsx
```

---

## Cara Menggunakan

Import component langsung dari folder `ui`.

Contoh:

```jsx
import { Button } from "@components/ui/button";
```

Gunakan di component:

```jsx
<Button>Click Me</Button>
```

---

## Contoh Component

### Button

```jsx
<Button variant="default">Submit</Button>
<Button variant="outline">Cancel</Button>
```

### Dialog

```jsx
import { AlertDialog } from "@components/ui/dialog/alert-dialog";
```

Digunakan melalui `DialogProvider`.

---

## Styling

Component menggunakan Tailwind, sehingga bisa langsung dikustom:

```jsx
<Button className="w-full bg-blue-500">Custom Button</Button>
```

---

## Variant & Utility

Project ini menggunakan:

- **class-variance-authority (CVA)** → untuk variant component
- **tailwind-merge** → untuk merge class Tailwind

---

## Menambahkan Component Baru

Gunakan CLI shadcn:

```bash
npx shadcn@latest add button
```

Atau copy manual dari shadcn docs:
https://ui.shadcn.com

---

## Best Practice

- Simpan semua UI component di `src/components/ui`
- Jangan ubah API component terlalu jauh dari shadcn
- Gunakan `variant` daripada hardcode class
- Gunakan Tailwind untuk styling tambahan

---

## Catatan

- Component bisa dimodifikasi bebas
- Tidak ada dependency runtime tambahan
- Lebih fleksibel dibanding UI library seperti MUI / Ant Design
