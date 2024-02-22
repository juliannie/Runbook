import { useEffect, useState } from "react";
import { TableCellParams } from "@/Types/types";
import { Input } from "@/components/ui/input";

export default function EditableCell({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  // console.log("Column");
  // console.log(column.id);
  const onBlur = () => {
    table.options.meta?.updateTodoData({
      rowIndex: row.index,
      columnId: column.id,
      value,
    });
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}
