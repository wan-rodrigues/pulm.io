import * as React from "react";

export function Progress({ value }) {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
