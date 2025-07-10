import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../store/themeSlice";

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
            className="p-2 rounded-full transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-700 dark:text-gray-200">
            {
            themeMode === "dark" ? (
                <MdOutlineDarkMode size={22} />
            ) : (
                <MdDarkMode size={22} />
            )}
        </button>
    );
};

export default ThemeBtn;