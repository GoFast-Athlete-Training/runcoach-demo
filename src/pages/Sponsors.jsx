import { useState } from 'react';
import sponsorsData from '../data/sponsors.json';
import SponsorCard from '../components/SponsorCard';
import { Plus, X } from 'lucide-react';

export default function Sponsors() {
  const [sponsors, setSponsors] = useState(sponsorsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sponsorForm, setSponsorForm] = useState({
    name: '',
    website: '',
    contact: '',
    tier: 'bronze',
  });

  const handleAddSponsor = (e) => {
    e.preventDefault();

    if (!sponsorForm.name) {
      alert('Please fill in the sponsor name');
      return;
    }

    const newSponsor = {
      id: Date.now(),
      name: sponsorForm.name,
      logoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(sponsorForm.name)}&bold=true&size=128&background=${sponsorForm.tier === 'gold' ? 'fbbf24' : sponsorForm.tier === 'silver' ? '6b7280' : 'ea580c'}&color=fff`,
      tier: sponsorForm.tier,
      website: sponsorForm.website || '',
      contact: sponsorForm.contact || '',
    };

    setSponsors([newSponsor, ...sponsors]);
    setSponsorForm({
      name: '',
      website: '',
      contact: '',
      tier: 'bronze',
    });
    setShowAddModal(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sponsors</h1>
          <p className="text-gray-600">Manage your program partners</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-gofast-purple to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Sponsor
        </button>
      </div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>

      {/* Add Sponsor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Sponsor</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddSponsor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sponsor Name *
                </label>
                <input
                  type="text"
                  required
                  value={sponsorForm.name}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gofast-purple focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Tier
                </label>
                <select
                  value={sponsorForm.tier}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, tier: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gofast-purple focus:border-transparent"
                >
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={sponsorForm.website}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, website: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gofast-purple focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={sponsorForm.contact}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, contact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gofast-purple focus:border-transparent"
                  placeholder="contact@company.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gofast-purple to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                >
                  Add Sponsor
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

