# Icons

Project ini menggunakan **react-icons** untuk kebutuhan icon.

---

## Instalasi

```bash
npm install react-icons
```

---

## Cara Pakai

Import icon dari library:

```jsx
import { MdInsertChart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
```

Gunakan sebagai component:

```jsx
<MdInsertChart />
```

---

## Penggunaan di Sidebar

Icon digunakan di `handle` pada route:

```jsx
handle: {
  sidebarName: "Dashboard",
  Icon: MdInsertChart,
  visible: true,
}
```

Render di component:

```jsx
<Icon className="text-inherit" />
```

---

## Tips

- Gunakan icon untuk menu utama (parent)
- Gunakan ukuran konsisten (misal `w-5 h-5`)
- Gunakan `text-inherit` agar mengikuti warna active
