"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { TableCellParams } from "@/Types/types";
import { useLivePersistence } from "@/hooks/useLivePersistence";

export default function LiveEditableCell({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const taskId = row.original.id;

  // Get today's UTC date for persistence
  const todayUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  ).toISOString();

  const { saveState, error, updateField, flush } = useLivePersistence({
    taskId,
    dateUTC: todayUTC,
    debounceMs: 500, // Debounced save for text fields
  });

  const handleChange = (newValue: string) => {
    setValue(newValue);
    updateField(column.id, newValue, false); // Debounced save
  };

  const handleBlur = () => {
    setIsEditing(false);
    flush(); // Save immediately on blur
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      flush(); // Save immediately on Enter
    } else if (e.key === "Escape") {
      setValue(initialValue); // Revert on Escape
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-[180px] min-h-[44px]"
          autoFocus
        />

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

  return (
    <div
      className="w-[180px] px-3 py-2 cursor-pointer hover:bg-gray-50 rounded min-h-[44px] flex items-center"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-between w-full">
        <span className="truncate">{value || "Click to edit"}</span>

        {/* Save state indicator */}
        <div className="flex items-center space-x-1 ml-2">
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
    </div>
  );
}
