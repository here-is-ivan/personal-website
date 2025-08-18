import { useState, useEffect } from 'react';
import { LuSun } from 'react-icons/lu';
import { FaMoon } from 'react-icons/fa';

const ThemeSwitch = () => {
  const getInitialMode = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return true;
  };

  const [isDarkMode, setisDarkMode] = useState(getInitialMode());

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setisDarkMode((prev) => !prev);
  };

  return (
    <button
      className="fixed top-2 right-2 w-14 h-8 z-50 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer"
      style={{
        backgroundColor: isDarkMode ? '#34C759' : '#E9E9EA',
      }}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <div
        className="relative w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center"
        style={{
          backgroundColor: 'white',
          transform: isDarkMode ? 'translateX(24px)' : 'translateX(0)',
        }}
      >
        {isDarkMode ? (
          <FaMoon size={14} className="text-green-500" />
        ) : (
          <LuSun size={14} className="text-blue-400" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitch;
