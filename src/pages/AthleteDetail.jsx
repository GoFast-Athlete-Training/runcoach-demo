import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import athletesData from '../data/athletes.json';
import { ArrowLeft, TrendingUp, Calendar, Award, Activity, MapPin, Clock } from 'lucide-react';

export default function AthleteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    const found = athletesData.find(a => a.id === parseInt(id));
    setAthlete(found);
  }, [id]);

  if (!athlete) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Athlete not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gofast-purple hover:text-gofast-orange"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  // Mock recent runs data
  const recentRuns = [
    { id: 1, date: '2024-01-15', distance: 5.2, pace: athlete.averagePace, duration: '38:12', location: 'Central Park' },
    { id: 2, date: '2024-01-13', distance: 3.8, pace: athlete.averagePace, duration: '28:45', location: 'Riverside Trail' },
    { id: 3, date: '2024-01-11', distance: 6.5, pace: athlete.averagePace, duration: '49:30', location: 'Track Loop' },
    { id: 4, date: '2024-01-09', distance: 4.2, pace: athlete.averagePace, duration: '31:24', location: 'Neighborhood' },
  ];

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gofast-purple mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </button>

      {/* Athlete Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={athlete.photoURL}
            alt={athlete.name}
            className="w-24 h-24 rounded-full border-4 border-gofast-orange"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{athlete.name}</h1>
            <p className="text-gray-600 mb-4">Last active: {formatLastActive(athlete.lastActive)}</p>
            
            {/* Badges */}
            {athlete.badges && athlete.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {athlete.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-gofast-purple to-purple-600 text-white text-sm rounded-full font-medium"
                  >
                    <Award size={14} />
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <TrendingUp className="text-gofast-orange" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{athlete.weeklyMileage} mi</div>
          <div className="text-sm text-gray-600">Weekly Mileage</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Clock className="text-gofast-purple" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{athlete.averagePace}</div>
          <div className="text-sm text-gray-600">Average Pace /mi</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{athlete.totalRuns}</div>
          <div className="text-sm text-gray-600">Total Runs</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
              <Activity className="text-red-600" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{athlete.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Runs</h2>
        <div className="space-y-4">
          {recentRuns.map((run) => (
            <div
              key={run.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-gofast-purple to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {run.distance}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{run.distance} miles</div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin size={14} />
                    {run.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <div className="text-gray-600">Date</div>
                  <div className="font-medium text-gray-900">
                    {new Date(run.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Pace</div>
                  <div className="font-medium text-gray-900">{run.pace}/mi</div>
                </div>
                <div>
                  <div className="text-gray-600">Duration</div>
                  <div className="font-medium text-gray-900">{run.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        Powered by GoFast
      </div>
    </div>
  );
}

