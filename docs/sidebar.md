# Sidebar

Dokumentasi ini menjelaskan cara kerja sidebar, struktur route yang dibutuhkan, serta helper path yang digunakan.

---

## Lokasi File

- Helper path: `src/helpers/routes.js`
- Menu sidebar: `NavMain.jsx`

---

## Konsep Sidebar

Sidebar dibangun dari data `menus` yang berasal dari konfigurasi route.  
Setiap menu akan dibaca dari properti `handle`.

Properti yang digunakan untuk sidebar:

- `handle.visible` → menentukan apakah menu tampil di sidebar
- `handle.sidebarName` → nama menu yang ditampilkan
- `handle.Icon` → icon untuk menu utama

Jika sebuah route memiliki `children`, maka route tersebut akan dirender sebagai menu collapsible.

---

## Struktur Route untuk Sidebar

Contoh route yang tampil di sidebar:

```jsx
{
  path: "dashboard",
  element: <DashboardPage />,
  handle: {
    title: "Dashboard",
    sidebarName: "Dashboard",
    Icon: MdInsertChart,
    visible: true,
  },
}
```

Contoh route dengan submenu:

```jsx
{
  path: "management",
  element: <ManagementPage />,
  handle: {
    title: "Managemen",
    sidebarName: "Managemen",
    Icon: PiGearSixFill,
    visible: true,
  },
  children: [
    {
      path: "account/media",
      element: <AccountMediaPage />,
      handle: {
        title: "Akun Media",
        sidebarName: "Akun Media",
        visible: true,
      },
    },
  ],
}
```

---

## Helper Path

Sidebar menggunakan helper dari `src/helpers/routes.js`.

### `normalizePath`

Digunakan untuk memastikan path selalu diawali `/`.

```js
export const normalizePath = (path = "") => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};
```

Contoh:

- `dashboard` → `/dashboard`
- `/dashboard` → `/dashboard`

---

### `isPathActive`

Digunakan untuk mengecek apakah path sedang aktif.

```js
export const isPathActive = (targetPath, currentPath, options = {}) => {
  const { exact = false } = options;

  const normalizedTarget = normalizePath(targetPath).replace(/\/$/, "");
  const normalizedCurrent = normalizePath(currentPath).replace(/\/$/, "");

  if (exact) {
    return normalizedCurrent === normalizedTarget;
  }

  return (
    normalizedCurrent === normalizedTarget ||
    normalizedCurrent.startsWith(`${normalizedTarget}/`)
  );
};
```

#### Penjelasan

- `exact: false`  
  Digunakan untuk parent menu.  
  Parent dianggap aktif jika path sekarang sama atau merupakan turunan dari path target.

- `exact: true`  
  Digunakan untuk child menu.  
  Child hanya aktif jika path sekarang sama persis.

Contoh:

```js
isPathActive("/management", "/management/account/media");
// true

isPathActive("/management/account", "/management/account/media");
// true

isPathActive("/management/account", "/management/account/media", {
  exact: true,
});
// false

isPathActive("/management/account/media", "/management/account/media", {
  exact: true,
});
// true
```

---

### `joinPath`

Digunakan untuk menggabungkan parent path dan child path.

```js
export const joinPath = (parentPath = "", childPath = "") => {
  if (!childPath) return normalizePath(parentPath);
  if (childPath.startsWith("/")) return childPath;

  const parent = normalizePath(parentPath).replace(/\/$/, "");
  const child = childPath.replace(/^\//, "");
  return `${parent}/${child}`;
};
```

Contoh:

```js
joinPath("/management", "account/media");
// /management/account/media
```

---

## Cara Kerja `NavMain`

Sidebar utama dirender dari komponen `NavMain`.

### 1. Filter menu yang visible

Hanya route dengan `handle.visible === true` yang akan ditampilkan.

```jsx
const routes = useMemo(() => {
  return menus.filter((menu) => menu?.handle?.visible);
}, [menus]);
```

---

### 2. Menentukan parent yang harus terbuka

Saat URL berubah, sidebar akan mengecek apakah ada child yang aktif.  
Jika ada, parent akan otomatis terbuka.

```jsx
useEffect(() => {
  const activeParentIndex = routes.findIndex((menu) => {
    const routePath = normalizePath(menu.path);
    const visibleChildren =
      menu?.children?.filter((child) => child?.handle?.visible) || [];

    return visibleChildren.some((child) =>
      isPathActive(joinPath(routePath, child.path), location.pathname, {
        exact: true,
      }),
    );
  });

  setOpenIndex(activeParentIndex !== -1 ? activeParentIndex : null);
}, [location.pathname, routes]);
```

#### Hasilnya

- Jika URL mengarah ke child menu, parent otomatis open
- Jika pindah ke route lain yang bukan child mana pun, parent akan tertutup

---

### 3. Menentukan menu aktif

#### Parent menu

Parent dianggap aktif jika salah satu child aktif.

```jsx
const isActive = routeHasChildren
  ? visibleChildren.some((child) =>
      isPathActive(joinPath(routePath, child.path), location.pathname),
    )
  : isPathActive(routePath, location.pathname);
```

#### Child menu

Child menggunakan `exact: true` agar hanya path yang benar-benar sama yang dianggap aktif.

```jsx
const isChildActive = isPathActive(childPath, location.pathname, {
  exact: true,
});
```

Ini penting agar tidak semua child ikut aktif ketika path mirip.

Contoh masalah yang dihindari:

- `/management/account`
- `/management/account/media`

Jika child tidak memakai `exact: true`, maka `/management/account` bisa ikut aktif saat membuka `/management/account/media`.

---

## Struktur `NavMain`

Berikut komponen `NavMain` yang digunakan:

```jsx
import { useEffect, useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenuLink,
  SidebarMenuCollapsible,
  SidebarMenuItem,
  SidebarMenuSublink,
} from "@components/ui/sidebar";
import { isPathActive, joinPath, normalizePath } from "@src/helpers/routes";
import { useLocation } from "react-router-dom";

function renderIcon(Icon) {
  if (!Icon) return null;
  return <Icon className="text-inherit" />;
}

export function NavMain({ menus = [] }) {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);

  const routes = useMemo(() => {
    return menus.filter((menu) => menu?.handle?.visible);
  }, [menus]);

  useEffect(() => {
    const activeParentIndex = routes.findIndex((menu) => {
      const routePath = normalizePath(menu.path);
      const visibleChildren =
        menu?.children?.filter((child) => child?.handle?.visible) || [];

      return visibleChildren.some((child) =>
        isPathActive(joinPath(routePath, child.path), location.pathname, {
          exact: true,
        }),
      );
    });

    setOpenIndex(activeParentIndex !== -1 ? activeParentIndex : null);
  }, [location.pathname, routes]);

  return (
    <SidebarGroup>
      {routes.map((menu, index) => {
        const Icon = menu?.handle?.Icon;
        const SidebarName = menu?.handle?.sidebarName;

        const visibleChildren =
          menu?.children?.filter((child) => child?.handle?.visible) || [];

        const routeHasChildren = visibleChildren.length > 0;
        const routePath = normalizePath(menu.path);

        const isActive = routeHasChildren
          ? visibleChildren.some((child) =>
              isPathActive(joinPath(routePath, child.path), location.pathname),
            )
          : isPathActive(routePath, location.pathname);

        if (routeHasChildren) {
          return (
            <Collapsible
              key={menu.path}
              open={openIndex === index}
              render={<SidebarMenuItem />}
              onOpenChange={(open) => {
                setOpenIndex(open ? index : null);
              }}
            >
              <CollapsibleTrigger aschild={"true"}>
                <SidebarMenuCollapsible
                  Icon={Icon}
                  active={isActive}
                  open={openIndex === index}
                >
                  {SidebarName}
                </SidebarMenuCollapsible>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {visibleChildren.map((child) => {
                  const childPath = joinPath(routePath, child.path);
                  const isChildActive = isPathActive(
                    childPath,
                    location.pathname,
                    {
                      exact: true,
                    },
                  );

                  return (
                    <SidebarMenuSublink
                      key={child.path}
                      to={childPath}
                      active={isChildActive}
                    >
                      {child?.handle?.sidebarName}
                    </SidebarMenuSublink>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuLink key={menu.path} isActive={isActive} to={routePath}>
            {renderIcon(Icon)}
            <span>{SidebarName}</span>
          </SidebarMenuLink>
        );
      })}
    </SidebarGroup>
  );
}
```

---

## Perilaku Sidebar

Dengan implementasi ini, sidebar memiliki perilaku berikut:

### 1. Menu utama tampil dari route visible

Route dengan `handle.visible: true` akan otomatis masuk ke sidebar.

### 2. Parent dengan child dirender sebagai collapsible

Jika route memiliki `children`, maka menu akan tampil sebagai dropdown/collapsible.

### 3. Parent otomatis terbuka saat child aktif

Saat URL cocok dengan salah satu child, parent akan terbuka otomatis.

### 4. Child aktif menggunakan exact match

Hanya child dengan path yang benar-benar sama yang akan ditandai aktif.

### 5. Parent aktif jika salah satu child aktif

Parent tetap diberi status aktif selama salah satu submenu aktif.

---

## Cara Menambahkan Menu Baru

### Menu biasa

```jsx
{
  path: "reports",
  element: <ReportsPage />,
  handle: {
    title: "Reports",
    sidebarName: "Reports",
    Icon: MdInsertChart,
    visible: true,
  },
}
```

### Menu dengan child

```jsx
{
  path: "management",
  element: <ManagementPage />,
  handle: {
    title: "Management",
    sidebarName: "Management",
    Icon: PiGearSixFill,
    visible: true,
  },
  children: [
    {
      path: "account/media",
      element: <AccountMediaPage />,
      handle: {
        title: "Akun Media",
        sidebarName: "Akun Media",
        visible: true,
      },
    },
  ],
}
```

---

## Catatan

- Gunakan `handle.visible: true` agar route tampil di sidebar
- Gunakan `handle.sidebarName` untuk label menu
- Gunakan `handle.Icon` untuk icon menu utama
- Gunakan child path relatif, misalnya `account/media`
- Gunakan `exact: true` untuk child active state agar tidak bentrok dengan path yang mirip

---

## Ringkasan

Sidebar pada project ini:

- membaca menu dari konfigurasi route
- menampilkan menu berdasarkan `handle.visible`
- mendukung menu biasa dan menu collapsible
- menggunakan helper path untuk normalisasi, join, dan active state
- membuka parent otomatis saat child aktif
- menjaga child active tetap akurat dengan exact match
