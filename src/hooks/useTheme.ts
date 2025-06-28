
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check system preference first
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Check saved theme in localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        
        // Use saved theme if available, otherwise use system preference
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        setTheme(initialTheme);
        applyTheme(initialTheme);
        
        console.log('Theme initialized:', initialTheme);
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Fallback to dark theme
        setTheme('dark');
        applyTheme('dark');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    try {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#1e293b' : '#ffffff');
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      console.log('Theme toggled to:', newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const setSpecificTheme = (newTheme: 'light' | 'dark') => {
    try {
      setTheme(newTheme);
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      console.log('Theme set to:', newTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  return { 
    theme, 
    toggleTheme, 
    setTheme: setSpecificTheme,
    isLoading 
  };
};
