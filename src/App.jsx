import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import RunCoachHome from './pages/RunCoachHome';
import CoachDashboard from './pages/CoachDashboard';
import AthleteDetail from './pages/AthleteDetail';
import Athletes from './pages/Athletes';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Analytics from './pages/Analytics';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Topbar */}
          <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Page Content */}
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<RunCoachHome />} />
              <Route path="/coach-dashboard" element={<CoachDashboard />} />
              <Route path="/athletes" element={<Athletes />} />
              <Route path="/athletes/:id" element={<AthleteDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

