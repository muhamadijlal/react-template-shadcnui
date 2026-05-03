```text
AutoComplete Component
======================

Reusable AutoComplete component built on top of Combobox. Mendukung single & multiple selection, validasi, dan mudah diintegrasikan ke form.

--------------------------------------------------

📦 Import

import { AutoComplete } from "@components/ui/auto-complete";

--------------------------------------------------

🧱 Basic Usage (Single)

import { useState } from "react";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
];

function Example() {
  const [framework, setFramework] = useState("");

  return (
    <AutoComplete
      label="Framework"
      options={frameworks}
      value={framework}
      onChange={setFramework}
      placeholder="Pilih framework"
    />
  );
}

--------------------------------------------------

🧩 Multiple Selection

const [frameworksValue, setFrameworksValue] = useState([]);

<AutoComplete
  multiple
  label="Frameworks"
  options={frameworks}
  value={frameworksValue}
  onChange={setFrameworksValue}
/>

--------------------------------------------------

✅ Validation (Error State)

const [framework, setFramework] = useState("");

<AutoComplete
  label="Framework"
  options={frameworks}
  value={framework}
  onChange={setFramework}
  required
  error={!framework}
  message="Please select a framework."
/>

--------------------------------------------------

📝 Full Example

import { Card, CardContent } from "@components/ui/card";
import { AutoComplete } from "@components/ui/auto-complete";
import { useState } from "react";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "next.js" },
];

function DashboardPage() {
  const [framework, setFramework] = useState([]);

  return (
    <Card>
      <CardContent>
        <AutoComplete
          label="Framework"
          options={frameworks}
          value={framework}
          onChange={setFramework}
          multiple
          required
          error={framework.length === 0}
          placeholder="Pilih framework"
          message="Please select a framework."
          description="Select your preferred JavaScript framework from the list."
        />
      </CardContent>
    </Card>
  );
}

export default DashboardPage;

--------------------------------------------------

⚙️ Props

multiple        : boolean                (default: false)
options         : {label, value}[]
value           : string | string[]
onChange        : function
label           : string
placeholder     : string
description     : string
required        : boolean
error           : boolean
message         : string
disabled        : boolean
textNotFound    : string

--------------------------------------------------

🔄 Behavior

Single Mode
- Select item → dropdown close
- Input menampilkan label

Multiple Mode
- Select tanpa search → tetap open
- Select saat search → close
- Search otomatis di-reset setelah select

--------------------------------------------------

📌 Notes

- Gunakan controlled component:
  value={state}
  onChange={setState}

- Jangan gunakan defaultValue bersamaan

- Validasi:
  Single   → error={!value}
  Multiple → error={value.length === 0}

--------------------------------------------------
```
