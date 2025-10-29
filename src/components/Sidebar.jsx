import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Heart, BarChart3, X, ClipboardList } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Command Central', icon: LayoutDashboard },
    { path: '/coach-dashboard', label: 'Coach Dashboard', icon: ClipboardList },
    { path: '/athletes', label: 'Athletes', icon: Users },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/sponsors', label: 'Sponsors', icon: Heart },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-gradient-to-b from-sky-500 to-sky-600 text-white min-h-screen fixed left-0 top-0 flex flex-col z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <div className="p-6 border-b border-sky-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="GoFast" className="h-8 w-auto" />
          <h1 className="text-2xl font-bold">Coach</h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-sky-200 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-gofast-orange text-white shadow-lg'
                  : 'text-sky-100 hover:bg-sky-700 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sky-400 text-xs text-sky-200 text-center">
        Powered by GoFast
      </div>
      </div>
    </>
  );
}

