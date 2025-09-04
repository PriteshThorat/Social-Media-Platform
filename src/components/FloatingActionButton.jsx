import { useState, useEffect } from 'react';
import { Plus, Edit3, X } from 'lucide-react';

const FloatingActionButton = ({ onClick, show = true }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200 && show);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [show]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                aria-label="Create new post"
            >
                {/* Main Icon */}
                <div className={`transition-transform duration-300 ${isHovered ? 'rotate-90' : ''}`}>
                    <Edit3 className="w-6 h-6" />
                </div>

                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse delay-75"></div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                        Create Post
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                    </div>
                </div>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
            </button>
        </div>
    );
};

export default FloatingActionButton;
