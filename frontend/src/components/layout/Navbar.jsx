import {
  Bell,
  User,
  LogOut,
} from 'lucide-react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

const titles = {
  '/dashboard': 'Dashboard',
  '/upload': 'Upload Data',
  '/explore': 'Explore Datasets',
  '/insights': 'AI Insights',
  '/reports': 'Reports',
}

export default function Navbar() {

  const { pathname } =
    useLocation()

  const navigate =
    useNavigate()

  const title =
    titles[pathname] ?? 'DataLens'

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="
      h-14
      bg-gray-900
      border-b
      border-gray-800

      flex
      items-center
      justify-between

      px-6
      shrink-0
    ">

      <h1 className="
        text-white
        font-semibold
        text-base
      ">
        {title}
      </h1>

      <div className="
        flex
        items-center
        gap-3
      ">

        {/* Logout */}
        <button
          onClick={handleLogout}

          className="
            text-gray-400
            hover:text-red-400

            transition-colors

            p-1.5
            rounded-lg

            hover:bg-gray-800
          "
        >
          <LogOut size={18} />
        </button>

        {/* Notifications */}
        <button className="
          text-gray-400
          hover:text-white

          transition-colors

          p-1.5
          rounded-lg

          hover:bg-gray-800
        ">
          <Bell size={18} />
        </button>

        {/* User Avatar */}
        <div className="
          w-8
          h-8

          rounded-full

          bg-blue-600

          flex
          items-center
          justify-center
        ">
          <User
            size={15}
            className="text-white"
          />
        </div>

      </div>

    </header>
  )
}