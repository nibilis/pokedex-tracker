import React from "react";

export default function ProgressBar({ total, caught }) {
  const percent = total ? ((caught / total) * 100).toFixed(1) : 0;
  return (
    <div className="w-full my-4">
      <div className="bg-gray-300 rounded-full h-6">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 font-semibold">
        {caught} / {total} Captured Pokémons ({percent}%)
      </p>
    </div>
  );
}
