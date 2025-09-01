import { useNavigate } from "react-router-dom"
import { Home, Sparkles } from 'lucide-react'
import { useState } from 'react'

const Logo = () => {
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
       <div className="flex items-center space-x-4">
      {/* Enhanced Logo Button */}
      <button
        onClick={() => navigate("/")}
        className="group relative flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-2xl"
        aria-label="Go to homepage"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-110"></div>
        
        {/* Main container */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-500/50">
          {/* Inner glow ring */}
          <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Logo image container */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              className={`w-14 h-14 object-cover transition-all duration-500 ${
                isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              } group-hover:scale-110 group-hover:brightness-110`}
              src="images.png"
              loading="lazy"
              alt="Company logo"
              onLoad={() => setIsLoaded(true)}
              onError={(e) => {
                // Fallback gradient background if image fails to load
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600');
                const icon = document.createElement('div');
                icon.className = 'w-14 h-14 flex items-center justify-center';
                icon.innerHTML = '<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>';
                e.target.parentElement.appendChild(icon);
              }}
            />
            
            {/* Loading shimmer effect */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
            )}
            
            {/* Sparkle effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="absolute top-1 right-1 w-3 h-3 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute bottom-1 left-1 w-2 h-2 text-blue-400 animate-pulse delay-300" />
            </div>
          </div>
        </div>

        {/* Enhanced tooltip */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none">
          <div className="relative bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg border border-gray-700 dark:border-gray-600 backdrop-blur-sm">
            <div className="flex items-center space-x-1">
              <Home className="w-3 h-3" />
              <span>Go Home</span>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 border-l border-t border-gray-700 dark:border-gray-600 rotate-45"></div>
          </div>
        </div>
      </button>

      {/* Alternative: Logo with text version */}
      <div className="hidden md:flex items-center space-x-3">
        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Sociya
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
            Dashboard
          </span>
        </div>
      </div>
    </div>
    );
};

export default Logo;