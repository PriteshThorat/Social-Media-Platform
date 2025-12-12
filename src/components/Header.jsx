import { Logo, ThemeBtn } from './index'
import { useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../service/auth';
import { LogOut, User, ChevronDown, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const [open, setOpen] = useState(false);

    const status = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.user);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
            buttonRef.current && !buttonRef.current.contains(event.target)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const logoutSession = async(e) => {
        e.preventDefault()
        
        setOpen(false)
        try {
          navigate('/login')
          await authService.logout()

          dispatch(logout())
        } catch (error) {
            console.log(error)
        }
    }

    return (
       <>
       {/* Mobile/Tablet Header - unchanged */}
       <header className="lg:hidden sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0">
          <Logo />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <ThemeBtn />

          {/* For Unlogged user show login button */}
          {(!status && (location.pathname !== '/login')) && (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

          {/* User Menu */}
          {status && (
            <div className="relative">
              {/* User Profile Button */}
              <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 group ${
                  open 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 ring-2 ring-blue-200 dark:ring-blue-700' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="User menu"
                aria-expanded={open}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-800 shadow-md overflow-hidden">
                  <img 
                    className="w-full h-full rounded-full object-cover" 
                    src={userData?.avatar || ''} 
                    loading='lazy'
                    alt="User avatar"
                  />
                </div>
                
                {/* Username (hidden on mobile) */}
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {userData?.fullName}
                </span>
                
                {/* Chevron */}
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                  open ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl overflow-hidden animate-in slide-in-from-top-2 duration-200"
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                        <img className="w-full h-full rounded-full object-cover" src={userData?.avatar || ''} loading='lazy' />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {userData?.fullName}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {location.pathname !== '/change-avatar' && (
                      <button
                        onClick={() => navigate('/change-avatar')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Change Profile Picture</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Update your avatar</p>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-2">
                    <button
                      onClick={logoutSession}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                        <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs text-red-500/70 dark:text-red-400/70">End your session</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Desktop Sidebar */}
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 xl:w-72 flex-col backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 z-40">
      {/* Logo & Theme Section */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <Logo />
        <ThemeBtn />
      </div>

      {/* Navigation & Content */}
      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-6">
        {/* Navigation Links */}
        <nav className="space-y-2 mb-6">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === '/' 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* User Section */}
        {status ? (
          <div className="space-y-3 mt-auto">
            {/* User Info Card */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full shadow-md overflow-hidden">
                  <img className="w-full h-full object-cover" src={userData?.avatar || ''} loading='lazy' alt="User avatar" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {userData?.fullName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {userData?.email}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              {location.pathname !== '/change-avatar' && (
                <button
                  onClick={() => navigate('/change-avatar')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-xs">Change Avatar</span>
                </button>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logoutSession}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          /* Login Button for Desktop */
          (!status && (location.pathname !== '/login')) && (
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          )
        )}
      </div>
    </aside>
    </>
    )
};

export default Header;