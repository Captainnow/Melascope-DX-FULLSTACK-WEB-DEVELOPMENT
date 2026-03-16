import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils'; // Optional if you need custom class merges

interface ThemeToggleProps {
    className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-2 rounded-lg transition-colors flex items-center justify-center",
                "bg-slate-100 hover:bg-slate-200 text-slate-600",
                "dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300",
                className
            )}
            aria-label="Toggle Dark Mode"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-indigo-600" />
            ) : (
                <Sun size={20} className="text-yellow-400" />
            )}
        </button>
    );
}
