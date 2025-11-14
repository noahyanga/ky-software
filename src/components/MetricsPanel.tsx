
import React from 'react';

interface Metric {
  label: string;
  value: string;
}

interface MetricsPanelProps {
  title: string;
  subtitle?: string;
  userMetrics: Metric[];
  systemMetrics: Metric[];
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  title,
  subtitle,
  userMetrics,
  systemMetrics
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">{title}</h3>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>

      {/* User Defined Metrics */}
      {userMetrics.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            User defined
          </h4>
          <div className="space-y-2">
            {userMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center py-1.5">
                <span className="text-sm text-gray-700">{metric.label}</span>
                <span className="text-sm font-semibold text-gray-900 tabular-nums">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Defined Metrics */}
      {systemMetrics.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            System defined
          </h4>
          <div className="space-y-2">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center py-1.5">
                <span className="text-sm text-gray-700">{metric.label}</span>
                <span className="text-sm font-medium text-gray-900 tabular-nums">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsPanel;

