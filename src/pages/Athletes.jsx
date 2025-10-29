import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import athletesData from '../data/athletes.json';
import AthleteCard from '../components/AthleteCard';
import { Plus, X } from 'lucide-react';

export default function Athletes() {
  const navigate = useNavigate();
  const [athletes, setAthletes] = useState(athletesData);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' });

  const handleInviteRunner = (e) => {
    e.preventDefault();
    
    if (!inviteForm.name || !inviteForm.email) {
      alert('Please fill in both name and email');
      return;
    }

    const newAthlete = {
      id: Date.now(),
      name: inviteForm.name,
      email: inviteForm.email,
      weeklyMileage: 0,
      averagePace: '0:00',
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(inviteForm.name)}&background=2e004f&color=fff`,
      lastActive: new Date().toISOString(),
      badges: [],
      totalRuns: 0,
      streak: 0,
    };

    setAthletes([newAthlete, ...athletes]);
    setInviteForm({ name: '', email: '' });
    setShowInviteModal(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coach Dashboard</h1>
          <p className="text-gray-600">View and manage all your athletes</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <Plus size={20} />
          Invite Runner
        </button>
      </div>

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <div
            key={athlete.id}
            onClick={() => navigate(`/athletes/${athlete.id}`)}
            className="cursor-pointer"
          >
            <AthleteCard athlete={athlete} />
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Invite Runner</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleInviteRunner} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Runner Name *
                </label>
                <input
                  type="text"
                  required
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                >
                  Send Invite
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

