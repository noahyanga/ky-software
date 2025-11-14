
import React from 'react';
import { FiDollarSign, FiShoppingBag, FiClock } from 'react-icons/fi';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface StatsCardsProps { }

const StatsCards: React.FC<StatsCardsProps> = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Sales',
      value: '$592k',
      icon: <FiDollarSign />,
      color: '#2563eb'
    },
    {
      title: 'New Sales',
      value: '$458k',
      icon: <FiShoppingBag />,
      color: '#059669'
    },
    {
      title: 'Pending',
      value: '$315k',
      icon: <FiClock />,
      color: '#dc2626'
    }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-title">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

