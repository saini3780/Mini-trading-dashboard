import React from "react";

const TimeframeSelector = ({ current, onChange }) => {
  const timeframes = [
    { label: "1 Minute", value: "1" },
    { label: "5 Minutes", value: "5" },
    { label: "15 Minutes", value: "15" },
    { label: "1 Hour", value: "60" },
    { label: "1 Day", value: "D" },
  ];

  return (
    <div className="btn-group mb-3" role="group">
      {timeframes.map((t) => (
        <button
          key={t.value}
          className={`btn btn-sm ${
            current === t.value ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
