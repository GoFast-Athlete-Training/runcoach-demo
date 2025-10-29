import { Calendar, MapPin, Users } from 'lucide-react';

export default function EventCard({ event }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil(event.date);
  const typeColors = {
    race: 'from-red-500 to-orange-500',
    training: 'from-blue-500 to-purple-500',
    social: 'from-green-500 to-teal-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${
            typeColors[event.type] || 'from-gray-500 to-gray-600'
          } mb-2`}>
            {event.type.toUpperCase()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={18} className="text-gofast-purple" />
          <span className="text-sm">{formatDate(event.date)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={18} className="text-gofast-orange" />
          <span className="text-sm">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Users size={18} className="text-blue-500" />
          <span className="text-sm font-medium">{event.participantsCount} participants</span>
        </div>

        {daysUntil >= 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gofast-purple">{daysUntil}</div>
              <div className="text-xs text-gray-500">days until event</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

