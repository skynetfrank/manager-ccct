import React from "react";

export default function LoadingSpinner({ txt, tipo }) {
  return (
    <div className="flx jcenter font-1">
      <div className={tipo === "mini" ? "loader mini" : "loader"}></div>
      <span>{txt}</span>
    </div>
  );
}
