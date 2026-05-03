# Navbar

Dokumentasi penggunaan Navbar dan cara menampilkan title halaman secara dinamis.

---

## Konsep

Navbar menampilkan **judul halaman (title)** yang diambil dari konfigurasi route (`handle.title`).

Data diambil menggunakan hook `useTitlePage()` yang membaca route aktif dari React Router.

---

## Sumber Data Title

Title berasal dari properti `handle` di route.

Contoh:

```jsx
{
  path: "dashboard",
  element: <DashboardPage />,
  handle: {
    title: "Dashboard",
    description: "Halaman utama",
  },
}
```

---

## Hook: useTitlePage

Hook ini digunakan untuk mengambil title dari route aktif.

```jsx
import { useMatches } from "react-router-dom";

export function useTitlePage() {
  const matches = useMatches();

  const currentMatch = [...matches]
    .reverse()
    .find((match) => match.handle?.title);

  return {
    titlePage: currentMatch?.handle?.title || "Unknown Page",
    description: currentMatch?.handle?.description || "Unknown",
  };
}
```

### Cara Kerja

- `useMatches()` mengambil semua route yang cocok
- Dibalik (`reverse`) untuk ambil route paling dalam
- Mencari route yang punya `handle.title`
- Jika tidak ada, fallback ke `"Unknown Page"`

---

## Komponen Navbar

```jsx
import { GrRefresh } from "react-icons/gr";
import { PiBell } from "react-icons/pi";
import { Button } from "@src/components/ui/button";
import { useTitlePage } from "@src/context/use-title-page";

function Navbar() {
  const { titlePage } = useTitlePage();

  return (
    <div className="bg-card flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
      <h1 className="truncate text-xl font-bold">{titlePage}</h1>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        <Button
          variant="outline"
          size="lg"
          className="bg-primary-foreground hover:text-primary-foreground hover:bg-primary border-primary text-primary cursor-pointer"
        >
          <GrRefresh className="-rotate-90" />
          <span className="hidden sm:block">Refresh (30s)</span>
        </Button>

        <Button variant="outline" size="lg" className="bg-card cursor-pointer">
          <PiBell />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
```

---

## Cara Menggunakan

1. Pastikan setiap route memiliki `handle.title`

```jsx
handle: {
  title: "Dashboard";
}
```

2. Gunakan `<Navbar />` di layout utama

```jsx
<Navbar />
<Outlet />
```

---

## Fitur Navbar

- Menampilkan title halaman secara dinamis
- Mendukung nested route
- Tombol aksi (refresh & notifikasi)
- Responsive (text disembunyikan di layar kecil)

---

## Catatan

- `handle.title` wajib diisi agar title tampil
- `useMatches()` mengambil semua route aktif (nested support)
- Gunakan `truncate` untuk handle text panjang
- Icon menggunakan `react-icons`
