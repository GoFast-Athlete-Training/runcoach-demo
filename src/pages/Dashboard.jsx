import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import athletesData from '../data/athletes.json';
import eventsData from '../data/events.json';
import analyticsData from '../data/analytics.json';
import StatCard from '../components/StatCard';
import AthleteCard from '../components/AthleteCard';
import EventCard from '../components/EventCard';
import { TrendingUp, Users, Activity, Calendar, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [athletes] = useState(athletesData);
  const [events] = useState(eventsData);
  const [analytics] = useState(analyticsData);

  const recentAthletes = athletes.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your coaching program</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Miles"
          value={analytics.summary.totalMiles}
          icon={TrendingUp}
          color="gofast-orange"
          subtitle="This month"
        />
        <StatCard
          title="Active Runners"
          value={athletes.length}
          icon={Users}
          color="gofast-purple"
          subtitle="Team members"
        />
        <StatCard
          title="Average Heart Rate"
          value={`${analytics.summary.averageHeartRate} bpm`}
          icon={Activity}
          color="red"
          subtitle="Training zone"
        />
        <StatCard
          title="Total Runs"
          value={analytics.summary.totalRuns}
          icon={Calendar}
          color="blue"
          subtitle="All time"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/athletes')}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gofast-purple to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 mb-6"
        >
          <Users size={24} />
          <span>View All Athletes</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Recent Athletes Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Athletes</h2>
          <button
            onClick={() => navigate('/athletes')}
            className="text-gofast-purple hover:text-gofast-orange font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAthletes.map((athlete) => (
            <div
              key={athlete.id}
              onClick={() => navigate(`/athletes/${athlete.id}`)}
              className="cursor-pointer"
            >
              <AthleteCard athlete={athlete} />
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <button
            onClick={() => navigate('/events')}
            className="text-gofast-purple hover:text-gofast-orange font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
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

