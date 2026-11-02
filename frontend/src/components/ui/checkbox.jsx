import React from "react";

export function Checkbox({ id, checked, onCheckedChange, className }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onCheckedChange}
      className={`h-5 w-5 rounded border-gray-400 ${className}`}
    />
  );
}
