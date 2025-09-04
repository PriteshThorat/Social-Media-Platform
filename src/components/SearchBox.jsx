import { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp, Clock, Hash } from 'lucide-react';

const SearchBox = ({ placeholder = "Search posts, users, topics...", onSearch, className = "" }) => {
    const [query, setQuery] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Mock suggestions - in a real app, these would come from an API
    const suggestions = [
        { type: 'trending', icon: <TrendingUp className="w-4 h-4" />, text: '#ReactJS', category: 'Trending' },
        { type: 'trending', icon: <TrendingUp className="w-4 h-4" />, text: '#WebDevelopment', category: 'Trending' },
        { type: 'recent', icon: <Clock className="w-4 h-4" />, text: 'machine learning', category: 'Recent' },
        { type: 'recent', icon: <Clock className="w-4 h-4" />, text: 'UI design patterns', category: 'Recent' },
        { type: 'hashtag', icon: <Hash className="w-4 h-4" />, text: '#JavaScript', category: 'Popular' },
        { type: 'hashtag', icon: <Hash className="w-4 h-4" />, text: '#TailwindCSS', category: 'Popular' },
    ];

    const filteredSuggestions = suggestions.filter(item =>
        item.text.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setIsActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(value.length > 0 || isActive);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch?.(query.trim());
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.text);
        onSearch?.(suggestion.text);
        setShowSuggestions(false);
        inputRef.current?.blur();
    };

    const handleFocus = () => {
        setIsActive(true);
        setShowSuggestions(true);
    };

    const clearSearch = () => {
        setQuery('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    return (
        <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
            {/* Search Input */}
            <form onSubmit={handleSubmit} className="relative">
                <div className={`
                    relative flex items-center transition-all duration-300
                    ${isActive 
                        ? 'bg-white dark:bg-gray-800 shadow-xl ring-2 ring-blue-500/30 dark:ring-blue-400/30' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                    rounded-2xl border border-gray-200 dark:border-gray-700
                `}>
                    {/* Search Icon */}
                    <div className="flex items-center justify-center pl-4 pr-2">
                        <Search className={`w-5 h-5 transition-colors duration-200 ${
                            isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                        }`} />
                    </div>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        placeholder={placeholder}
                        className="flex-1 py-3 pr-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                    />

                    {/* Clear Button */}
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </button>
                    )}
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 backdrop-blur-xl">
                    {/* Search History / Suggestions */}
                    {query === '' ? (
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Trending & Popular
                            </h3>
                            <div className="space-y-1">
                                {suggestions.slice(0, 6).map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                                    >
                                        <div className={`p-2 rounded-lg ${
                                            item.type === 'trending' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                            item.type === 'recent' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                            'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                        }`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.text}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {item.category}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-4">
                            {filteredSuggestions.length > 0 ? (
                                <>
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Suggestions
                                    </h3>
                                    <div className="space-y-1">
                                        {filteredSuggestions.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestionClick(item)}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                                            >
                                                <div className={`p-2 rounded-lg ${
                                                    item.type === 'trending' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                                    item.type === 'recent' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                }`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="p-6 text-center">
                                    <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        No suggestions found for "{query}"
                                    </p>
                                    <button
                                        onClick={handleSubmit}
                                        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                    >
                                        Search anyway
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
