import React from "react";

interface SpinnerProps {
  size?: number;       // size in pixels
  color?: string;      // Tailwind border color
  className?: string;  // additional classes
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = "border-blue-500", className }) => {
  return (
    <div className={`flex justify-center items-center ${className || ""}`}>
      <div
        className={`border-4 border-dashed rounded-full animate-spin ${color}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Spinner;
