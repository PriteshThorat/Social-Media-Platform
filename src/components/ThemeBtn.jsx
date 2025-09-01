import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../store/themeSlice";
import { Sun, Moon } from 'lucide-react';

const ThemeBtn = () => {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        if (themeMode === "light") {
            dispatch(darkTheme());
        } else {
            dispatch(lightTheme());
        }
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
            aria-label="Toggle theme" >
            {themeMode === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform duration-200" />
            ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-200" />
            )}
        </button>
    );
};

export default ThemeBtn;