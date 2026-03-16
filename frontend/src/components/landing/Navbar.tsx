import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import ThemeToggle from '../common/ThemeToggle';

export default function Navbar() {
    return (
        <nav className="fixed w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Activity size={20} />
                    </div>
                    <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Melascope DX</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/google-deepmind" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hidden sm:block">About Model</a>
                    <Link to="/documentation" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hidden sm:block">Documentation</Link>
                    <ThemeToggle />
                    <Link to="/app/dashboard">
                        <Button variant="primary" size="sm">
                            Access Platform
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
