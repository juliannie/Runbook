"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES } from "@/store/TODOS";
import { TableCellParams } from "@/Types/types";

export default function DropdownCell({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const valueChangeHandler = (e: string) => {
    setValue(e);
    table.options.meta?.updateData({
      rowIndex: row.index,
      columnId: column.id,
      value: e,
    });
  };

  return (
    <Select
      value={value}
      onValueChange={(e) => {
        valueChangeHandler(e);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
