import { LucideIcon } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, color = 'gofast-purple', subtitle }) {
  const colorClasses = {
    'gofast-purple': 'bg-purple-50 text-gofast-purple',
    'gofast-orange': 'bg-orange-50 text-gofast-orange',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

