import { TrendingUp, Calendar, Award } from 'lucide-react';

export default function AthleteCard({ athlete }) {
  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={athlete.photoURL}
            alt={athlete.name}
            className="w-16 h-16 rounded-full border-2 border-gofast-orange"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{athlete.name}</h3>
            <p className="text-sm text-gray-500">Last active: {formatLastActive(athlete.lastActive)}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <TrendingUp size={14} />
            <span>Weekly Mileage</span>
          </div>
          <div className="text-lg font-bold text-gofast-purple">{athlete.weeklyMileage} mi</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Calendar size={14} />
            <span>Average Pace</span>
          </div>
          <div className="text-lg font-bold text-gofast-orange">{athlete.averagePace}/mi</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
        <div>
          <span className="font-medium">{athlete.totalRuns}</span> total runs
        </div>
        <div>
          <span className="font-medium text-gofast-orange">{athlete.streak}</span> day streak
        </div>
      </div>

      {/* Badges */}
      {athlete.badges && athlete.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {athlete.badges.map((badge, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-gofast-purple to-purple-600 text-white text-xs rounded-full"
            >
              <Award size={12} />
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

