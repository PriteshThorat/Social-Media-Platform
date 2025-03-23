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
            className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            {
            themeMode === "dark" ? (
                <MdOutlineDarkMode size={24} />
            ) : (
                <MdDarkMode size={24} />
            )}
        </button>
    );
};

export default ThemeBtn;