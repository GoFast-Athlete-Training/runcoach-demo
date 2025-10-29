import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Heart, BarChart3, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
      <div className={`w-64 bg-gofast-purple text-white min-h-screen fixed left-0 top-0 flex flex-col z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <div className="p-6 border-b border-purple-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-gofast-orange">GoFast</span>
          <span>Coach</span>
        </h1>
        <button
          onClick={onClose}
          className="lg:hidden text-purple-200 hover:text-white"
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
                  : 'text-purple-200 hover:bg-purple-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-700 text-xs text-purple-300 text-center">
        Powered by GoFast
      </div>
      </div>
    </>
  );
}

