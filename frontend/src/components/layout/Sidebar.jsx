import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Upload, Table2, FileBarChart2 } from 'lucide-react'
import { Brain } from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload',    label: 'Upload Data', icon: Upload },
  { to: '/explore',  label: 'Explore',   icon: Table2 },
  { to: '/insights', label: 'AI Insights', icon: Brain },
  { to: '/reports',  label: 'Reports',   icon: FileBarChart2 },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col py-6 px-4 shrink-0">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">DL</div>
        <span className="text-white font-semibold text-lg tracking-tight">DataLens</span>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-2 text-xs text-gray-600">v1.0.0</div>
    </aside>
  )
}
