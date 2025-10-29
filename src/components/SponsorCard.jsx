import { ExternalLink, Mail } from 'lucide-react';

export default function SponsorCard({ sponsor }) {
  const tierStyles = {
    gold: {
      bg: 'from-yellow-400 via-yellow-500 to-yellow-600',
      border: 'border-yellow-300',
      badge: 'Gold Partner',
    },
    silver: {
      bg: 'from-gray-300 via-gray-400 to-gray-500',
      border: 'border-gray-300',
      badge: 'Silver Partner',
    },
    bronze: {
      bg: 'from-orange-600 via-orange-700 to-orange-800',
      border: 'border-orange-400',
      badge: 'Bronze Partner',
    },
  };

  const style = tierStyles[sponsor.tier] || tierStyles.bronze;

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 ${style.border}`}>
      {/* Tier Badge */}
      <div className="flex justify-end mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${style.bg}`}>
          {style.badge}
        </span>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={sponsor.logoURL}
          alt={sponsor.name}
          className="w-24 h-24 rounded-lg object-contain"
        />
      </div>

      {/* Sponsor Name */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-4">{sponsor.name}</h3>

      {/* Contact Info */}
      <div className="space-y-2 text-sm">
        {sponsor.contact && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={16} className="text-gofast-purple" />
            <span>{sponsor.contact}</span>
          </div>
        )}
        
        {sponsor.website && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gofast-orange hover:text-gofast-purple transition-colors"
          >
            <ExternalLink size={16} />
            <span>Visit Website</span>
          </a>
        )}
      </div>
    </div>
  );
}

