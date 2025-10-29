import { Menu } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900 p-2"
        >
          <Menu size={24} />
        </button>
        <span className="text-sm text-gray-600 font-medium">Coach Dashboard</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-gofast-purple to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            S
          </div>
          <span className="text-sm font-medium text-gray-700">Coach Sheila</span>
        </div>
      </div>
    </div>
  );
}

