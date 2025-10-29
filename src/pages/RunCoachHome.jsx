import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import athletesData from '../data/athletes.json';
import eventsData from '../data/events.json';
import analyticsData from '../data/analytics.json';
import StatCard from '../components/StatCard';
import AthleteCard from '../components/AthleteCard';
import EventCard from '../components/EventCard';
import { TrendingUp, Users, Calendar, Activity, ArrowRight, Award, Zap, Target } from 'lucide-react';

export default function RunCoachHome() {
  const navigate = useNavigate();
  const [athletes] = useState(athletesData);
  const [events] = useState(eventsData);
  const [analytics] = useState(analyticsData);

  // Calculate team stats
  const totalWeeklyMileage = athletes.reduce((sum, a) => sum + a.weeklyMileage, 0);
  const avgTeamPace = athletes.length > 0
    ? athletes.reduce((sum, a) => {
        const [mins, secs] = a.averagePace.split(':').map(Number);
        return sum + mins + secs / 60;
      }, 0) / athletes.length
    : 0;
  const avgPaceFormatted = `${Math.floor(avgTeamPace)}:${String(Math.round((avgTeamPace % 1) * 60)).padStart(2, '0')}`;
  const activeStreaks = athletes.filter(a => a.streak > 0).length;
  const topPerformers = [...athletes].sort((a, b) => b.weeklyMileage - a.weeklyMileage).slice(0, 3);
  const recentAthletes = athletes.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Command Central</h1>
        <p className="text-gray-600">See how your athletes are performing</p>
      </div>

      {/* Team Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Team Weekly Mileage"
          value={`${totalWeeklyMileage.toFixed(1)} mi`}
          icon={TrendingUp}
          color="gofast-orange"
          subtitle={`${athletes.length} athletes`}
        />
        <StatCard
          title="Average Team Pace"
          value={avgPaceFormatted}
          icon={Activity}
          color="gofast-blue"
          subtitle="per mile"
        />
        <StatCard
          title="Active Streaks"
          value={activeStreaks}
          icon={Zap}
          color="blue"
          subtitle="athletes on streaks"
        />
        <StatCard
          title="Total Runs"
          value={athletes.reduce((sum, a) => sum + a.totalRuns, 0)}
          icon={Target}
          color="red"
          subtitle="this period"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate('/athletes')}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-2 border-transparent hover:border-sky-500 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <Users className="text-sky-600" size={20} />
              </div>
            <span className="font-semibold text-gray-900">All Athletes</span>
          </div>
          <p className="text-sm text-gray-600">View your team</p>
        </button>

        <button
          onClick={() => navigate('/events')}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-2 border-transparent hover:border-gofast-orange text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-gofast-orange" size={20} />
            </div>
            <span className="font-semibold text-gray-900">Events</span>
          </div>
          <p className="text-sm text-gray-600">Manage events</p>
        </button>

        <button
          onClick={() => navigate('/analytics')}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-2 border-transparent hover:border-blue-500 text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <span className="font-semibold text-gray-900">Analytics</span>
          </div>
          <p className="text-sm text-gray-600">View insights</p>
        </button>

        <button
          onClick={() => navigate('/sponsors')}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-2 border-transparent hover:border-red-500 text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Award className="text-red-600" size={20} />
            </div>
            <span className="font-semibold text-gray-900">Sponsors</span>
          </div>
          <p className="text-sm text-gray-600">Partnerships</p>
        </button>
      </div>

      {/* Top Performers */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Top Performers This Week</h2>
          <button
            onClick={() => navigate('/athletes')}
            className="text-sky-600 hover:text-gofast-orange font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPerformers.map((athlete, index) => (
            <div
              key={athlete.id}
              onClick={() => navigate(`/athletes/${athlete.id}`)}
              className="cursor-pointer relative"
            >
              {index === 0 && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Award size={12} />
                  #1
                </div>
              )}
              <AthleteCard athlete={athlete} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <button
            onClick={() => navigate('/athletes')}
            className="text-sky-600 hover:text-gofast-orange font-medium flex items-center gap-1"
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
            className="text-sky-600 hover:text-gofast-orange font-medium flex items-center gap-1"
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

