import React from "react";

interface ChartCardProps {
  title: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="min-w-0 p-24 bg-white rounded-lg shadow-xs">
      <p className="mb-4 font-semibold text-gray-800">
        {title}
      </p>
      {children}
    </div>
  );
};

export default ChartCard;
