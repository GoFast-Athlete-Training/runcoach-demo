import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import athletesData from '../data/athletes.json';
import { Plus, X, Trophy, TrendingUp, Calendar, Target, Flame } from 'lucide-react';

export default function CoachDashboard() {
  const navigate = useNavigate();
  const [athletes] = useState(athletesData);
  const [showWorkoutBuilder, setShowWorkoutBuilder] = useState(false);
  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    type: 'easy',
    distance: '',
    description: '',
    date: '',
  });

  // Sort athletes by performance (weekly mileage)
  const leaderboard = [...athletes].sort((a, b) => b.weeklyMileage - a.weeklyMileage);

  // Mock workouts for this week
  const thisWeekWorkouts = [
    { id: 1, name: 'Recovery Run', type: 'easy', distance: '3-4 mi', date: '2024-01-15', athletes: 5 },
    { id: 2, name: 'Tempo Run', type: 'tempo', distance: '5 mi', date: '2024-01-17', athletes: 4 },
    { id: 3, name: 'Long Run', type: 'long', distance: '8-10 mi', date: '2024-01-20', athletes: 3 },
  ];

  const handleCreateWorkout = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert(`Workout "${workoutForm.name}" created!`);
    setWorkoutForm({
      name: '',
      type: 'easy',
      distance: '',
      description: '',
      date: '',
    });
    setShowWorkoutBuilder(false);
  };

  const getPositionBadge = (position) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  const getTypeColor = (type) => {
    const colors = {
      easy: 'bg-green-100 text-green-700',
      tempo: 'bg-orange-100 text-orange-700',
      long: 'bg-blue-100 text-blue-700',
      interval: 'bg-red-100 text-red-700',
    };
    return colors[type] || colors.easy;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coach Dashboard</h1>
          <p className="text-gray-600">Manage workouts and track athlete performance</p>
        </div>
        <button
          onClick={() => setShowWorkoutBuilder(true)}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <Plus size={20} />
          Build Workout
        </button>
      </div>

      {/* This Week's Workouts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">This Week's Workouts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {thisWeekWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${getTypeColor(workout.type)}`}>
                    {workout.type.toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{workout.name}</h3>
                </div>
                <Calendar className="text-gray-400" size={20} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Target size={16} />
                  <span className="text-sm">{workout.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp size={16} />
                  <span className="text-sm">{workout.athletes} athletes signed up</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Athletes Leaderboard */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Athletes Leaderboard</h2>
          <button
            onClick={() => navigate('/athletes')}
            className="text-sky-600 hover:text-gofast-orange font-medium flex items-center gap-1"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Athlete</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Weekly Mileage</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Pace</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Runs</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((athlete, index) => (
                <tr
                  key={athlete.id}
                  onClick={() => navigate(`/athletes/${athlete.id}`)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{getPositionBadge(index + 1)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={athlete.photoURL}
                        alt={athlete.name}
                        className="w-10 h-10 rounded-full border-2 border-gofast-orange"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{athlete.name}</div>
                        {athlete.badges && athlete.badges.length > 0 && (
                          <div className="text-xs text-gray-500">{athlete.badges[0]}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-bold text-gofast-orange">{athlete.weeklyMileage} mi</div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-medium text-gray-900">{athlete.averagePace}/mi</div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-medium text-gray-900">{athlete.totalRuns}</div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Flame className="text-gofast-orange" size={16} />
                      <span className="font-medium text-gray-900">{athlete.streak}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workout Builder Modal */}
      {showWorkoutBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Build New Workout</h2>
              <button
                onClick={() => setShowWorkoutBuilder(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateWorkout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workout Name *
                </label>
                <input
                  type="text"
                  required
                  value={workoutForm.name}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Tempo Run"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workout Type
                  </label>
                  <select
                    value={workoutForm.type}
                    onChange={(e) => setWorkoutForm({ ...workoutForm, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="tempo">Tempo</option>
                    <option value="long">Long</option>
                    <option value="interval">Interval</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <input
                    type="text"
                    value={workoutForm.distance}
                    onChange={(e) => setWorkoutForm({ ...workoutForm, distance: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="5 mi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={workoutForm.date}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={workoutForm.description}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Workout details, pace targets, etc..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowWorkoutBuilder(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                >
                  Create Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        Powered by GoFast
      </div>
    </div>
  );
}

