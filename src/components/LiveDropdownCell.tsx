"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES } from "@/Types/constants";
import { TableCellParams } from "@/Types/types";
import { useLivePersistence } from "@/hooks/useLivePersistence";

export default function LiveDropdownCell({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const taskId = row.original.id;

  // Get today's UTC date for persistence
  const todayUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  ).toISOString();

  const { saveState, error, updateField } = useLivePersistence({
    taskId,
    dateUTC: todayUTC,
    debounceMs: 0, // Immediate save for status changes
  });

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    updateField(column.id, newValue, true); // Immediate save for status
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px] min-h-[44px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((status) => (
            <SelectItem key={status} value={status} className="min-h-[44px]">
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Save state indicator */}
      <div className="flex items-center space-x-1">
        {saveState === "saving" && (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        )}
        {saveState === "saved" && (
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        )}
        {saveState === "error" && (
          <div
            className="w-2 h-2 bg-red-500 rounded-full"
            title={error || "Error"}
          />
        )}
      </div>
    </div>
  );
}
