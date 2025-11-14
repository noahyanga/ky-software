
import React from 'react';
import { FiTrendingUp, FiMoreHorizontal } from 'react-icons/fi';

interface ForecastCardProps {
  title: string;
  subtitle?: string;
  onAddScenario?: () => void;
  children: React.ReactNode;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  title,
  subtitle,
  onAddScenario,
  children
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onAddScenario && (
            <button
              onClick={onAddScenario}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            >
              + Add scenario
            </button>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiMoreHorizontal className="text-gray-400" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ForecastCard;

