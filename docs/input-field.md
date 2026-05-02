# Input Field

Dokumentasi penggunaan komponen `InputField`.

---

## Lokasi File

- Component: `InputField.jsx`

---

## Konsep

`InputField` adalah wrapper input yang sudah mendukung:

- label
- description
- error message
- disabled state
- required indicator
- icon
- password toggle

---

## Contoh Penggunaan

```jsx
<InputField
  label="Text here"
  descriptions="descriptions here"
  error={false}
  disabled={false}
  required
  alignIcon="inline-start"
  icon={TbPasswordUser}
  message="error here"
  value={search}
  handleChange={(e) => onInputChange(e.target.value)}
/>
```

---

## Props

| Props          | Type        | Default           | Keterangan               |
| -------------- | ----------- | ----------------- | ------------------------ |
| `label`        | `string`    | -                 | Label input              |
| `descriptions` | `string`    | -                 | Deskripsi di bawah input |
| `placeholder`  | `string`    | `"Masukan Input"` | Placeholder input        |
| `error`        | `boolean`   | -                 | Status error             |
| `message`      | `string`    | -                 | Pesan error              |
| `disabled`     | `boolean`   | -                 | Nonaktifkan input        |
| `required`     | `boolean`   | -                 | Menandai field wajib isi |
| `value`        | `string`    | -                 | Value input              |
| `typeInput`    | `string`    | `"text"`          | Type input               |
| `icon`         | `ReactNode` | -                 | Icon di dalam input      |
| `handleChange` | `function`  | -                 | Event change input       |
| `alignIcon`    | `string`    | `"inline-start"`  | Posisi icon              |

---

## Type Input

`InputField` mendukung beberapa type input, misalnya:

```jsx
typeInput = "text";
typeInput = "password";
typeInput = "email";
```

---

## Password Field

Jika `typeInput="password"` dan `icon` diisi, icon akan berfungsi sebagai toggle show/hide password.

Contoh:

```jsx
<InputField
  label="Password"
  typeInput="password"
  icon={TbPasswordUser}
  value={password}
  handleChange={(e) => setPassword(e.target.value)}
/>
```

---

## Error State

Untuk menampilkan error:

```jsx
<InputField
  label="Email"
  error={true}
  message="Email wajib diisi"
  value={email}
  handleChange={(e) => setEmail(e.target.value)}
/>
```

Jika `error` dan `message` diisi, komponen akan menampilkan pesan error di bawah input.

---

## Required Field

Gunakan `required` untuk menampilkan tanda bintang merah pada label.

```jsx
<InputField
  label="Nama Lengkap"
  required
  value={name}
  handleChange={(e) => setName(e.target.value)}
/>
```

---

## Disabled Field

Gunakan `disabled` untuk menonaktifkan input.

```jsx
<InputField label="Username" disabled value="admin" />
```

---

## Description

Gunakan `descriptions` untuk menampilkan teks bantuan di bawah input.

```jsx
<InputField
  label="Username"
  descriptions="Gunakan username unik"
  value={username}
  handleChange={(e) => setUsername(e.target.value)}
/>
```

---

## Posisi Icon

Gunakan `alignIcon` untuk mengatur posisi icon:

- `inline-start`
- `inline-end`
- `block-start`
- `block-end`

Contoh:

```jsx
<InputField
  label="Search"
  icon={TbSearch}
  alignIcon="inline-start"
  value={search}
  handleChange={(e) => setSearch(e.target.value)}
/>
```

---

## Catatan

- `handleChange` menerima event dari input
- `icon` bersifat opsional
- Untuk password, icon otomatis menjadi toggle visibility
- Gunakan `error` + `message` untuk validasi form
