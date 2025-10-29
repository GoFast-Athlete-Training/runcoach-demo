import { useEffect } from 'react';
import analyticsData from '../data/analytics.json';
import StatCard from '../components/StatCard';
import { TrendingUp, Users, Activity, Calendar, BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Analytics() {
  const analytics = analyticsData;
  const { weeklyData, summary } = analytics;

  const mileageChartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Weekly Mileage (miles)',
        data: weeklyData.mileage,
        borderColor: '#ff6600',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const heartRateChartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Average Heart Rate (bpm)',
        data: weeklyData.heartRate,
        borderColor: '#2e004f',
        backgroundColor: 'rgba(46, 0, 79, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const runsChartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Number of Runs',
        data: weeklyData.runs,
        backgroundColor: [
          'rgba(255, 102, 0, 0.8)',
          'rgba(46, 0, 79, 0.8)',
          'rgba(255, 102, 0, 0.8)',
          'rgba(46, 0, 79, 0.8)',
          'rgba(255, 102, 0, 0.8)',
          'rgba(46, 0, 79, 0.8)',
          'rgba(255, 102, 0, 0.8)',
        ],
        borderColor: [
          '#ff6600',
          '#2e004f',
          '#ff6600',
          '#2e004f',
          '#ff6600',
          '#2e004f',
          '#ff6600',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Track performance and program metrics</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Miles"
          value={summary.totalMiles}
          icon={TrendingUp}
          color="gofast-orange"
          subtitle="All time"
        />
        <StatCard
          title="Avg Heart Rate"
          value={`${summary.averageHeartRate} bpm`}
          icon={Activity}
          color="red"
          subtitle="Training zone"
        />
        <StatCard
          title="Active Runners"
          value={summary.activeRunners}
          icon={Users}
          color="gofast-purple"
          subtitle="Currently active"
        />
        <StatCard
          title="Total Runs"
          value={summary.totalRuns}
          icon={Calendar}
          color="blue"
          subtitle="Completed"
        />
        <StatCard
          title="Avg Pace"
          value={summary.averagePace}
          icon={BarChart3}
          color="green"
          subtitle="per mile"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Mileage Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Mileage Trend</h3>
          <div className="h-64">
            <Line data={mileageChartData} options={chartOptions} />
          </div>
        </div>

        {/* Heart Rate Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Average Heart Rate</h3>
          <div className="h-64">
            <Line data={heartRateChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Runs Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Runs This Week</h3>
        <div className="h-64">
          <Bar data={runsChartData} options={chartOptions} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        Powered by GoFast
      </div>
    </div>
  );
}

