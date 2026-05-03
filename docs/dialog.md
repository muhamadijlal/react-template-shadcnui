# Dialog

Dokumentasi penggunaan dialog global pada project ini.

---

## Lokasi File

- Provider: `DialogProvider`
- UI dialog: `src/components/ui/dialog/alert-dialog.jsx`

---

## Konsep

Dialog pada project ini menggunakan **context provider** agar bisa dipanggil dari component mana pun dengan `useDialog()`.

Tersedia 2 jenis dialog:

- `openStatus()` → dialog informasi / sukses / warning / error
- `openConfirm()` → dialog konfirmasi dengan tombol batal dan lanjut

---

## Setup Provider

Pastikan aplikasi dibungkus dengan `DialogProvider`.

Contoh di `MainLayout`:

```jsx
import Navbar from "@components/navbar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@components/app-sidebar";
import { SidebarLayout, SidebarProvider } from "@components/ui/sidebar";
import { DialogProvider } from "@src/providers/dialog-provider";

function MainLayout() {
  return (
    <DialogProvider>
      <SidebarProvider>
        <SidebarLayout>
          <AppSidebar />

          <main className="w-full space-y-5 overflow-y-auto py-4 pr-4 pl-2">
            <Navbar />
            <Outlet />
          </main>
        </SidebarLayout>
      </SidebarProvider>
    </DialogProvider>
  );
}

export default MainLayout;
```

> `useDialog()` hanya bisa dipakai di dalam `DialogProvider`.

---

## Cara Menggunakan

Import hook:

```jsx
import { useDialog } from "@src/providers/dialog-provider";
```

Panggil di component:

```jsx
const { openStatus, openConfirm, closeDialog, setDialogLoading } = useDialog();
```

---

## Dialog Status

Digunakan untuk menampilkan informasi umum.

```jsx
openStatus("info-dialog", {
  variant: "info",
  title: "Informasi",
  description: "Data berhasil dimuat.",
  confirmText: "Oke",
});
```

### Variant yang tersedia

- `info`
- `success`
- `warning`
- `error`

Contoh:

```jsx
openStatus("success-dialog", {
  variant: "success",
  title: "Berhasil",
  description: "Data berhasil disimpan.",
});
```

---

## Dialog Confirm

Digunakan untuk aksi yang membutuhkan konfirmasi user.

```jsx
openConfirm("delete-dialog", {
  variant: "warning",
  title: "Hapus Data",
  description: "Apakah Anda yakin ingin menghapus data ini?",
  confirmText: "Ya, Hapus",
  cancelText: "Batal",
  onConfirm: async () => {
    console.log("data dihapus");
  },
});
```

---

## Loading State

Jika proses konfirmasi membutuhkan request async, tombol confirm akan otomatis berubah menjadi `Memproses...`.

Contoh:

```jsx
openConfirm("submit-dialog", {
  title: "Simpan Perubahan",
  description: "Lanjutkan menyimpan data?",
  confirmText: "Simpan",
  onConfirm: async () => {
    await submitData();
  },
});
```

Jika ingin mengatur loading manual:

```jsx
setDialogLoading(true);
```

---

## Menutup Dialog

Untuk menutup dialog secara manual:

```jsx
closeDialog();
```

---

## Contoh Penggunaan Lengkap

```jsx
import { useDialog } from "@src/providers/dialog-provider";

function ExampleButton() {
  const { openConfirm } = useDialog();

  const handleDelete = () => {
    openConfirm("delete-item", {
      variant: "warning",
      title: "Hapus Item",
      description: "Data yang dihapus tidak dapat dikembalikan.",
      confirmText: "Hapus",
      cancelText: "Batal",
      onConfirm: async () => {
        await Promise.resolve();
      },
    });
  };

  return <button onClick={handleDelete}>Hapus</button>;
}
```

---

## Catatan

- Gunakan `openStatus()` untuk notifikasi status
- Gunakan `openConfirm()` untuk aksi konfirmasi
- Gunakan `key` yang unik untuk setiap dialog
- `onConfirm` dan `onCancel` mendukung async function
- Dialog akan otomatis close setelah `onConfirm` selesai, kecuali ada error
