import { useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { DatePickerField } from "@components/ui/datepicker/date-picker-field";
import { InputField } from "@src/components/ui/input/input-field";

function DashboardPage() {
  const [date, setDate] = useState(null);
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });

  return (
    <Card>
      <CardContent>
        <InputField
          label="Nama"
          required
          error={true}
          message="Nama wajib diisi"
          placeholder="Masukkan nama lengkap"
        />
        <DatePickerField
          label="Tanggal Lahir"
          required
          value={date}
          onChange={setDate}
          error={!date}
          message="Tanggal wajib dipilih"
        />

        <DatePickerField
          label="Periode"
          mode="range"
          value={range}
          onChange={setRange}
          descriptions="Pilih tanggal mulai dan selesai"
        />
      </CardContent>
    </Card>
  );
}

export default DashboardPage;
