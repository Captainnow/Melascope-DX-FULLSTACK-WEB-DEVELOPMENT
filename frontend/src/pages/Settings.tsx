import { useState } from 'react';
import { User, Bell, Shield, Key, Download, Save } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Manage your account preferences, notifications, and security settings.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors text-left shrink-0 md:shrink ${activeTab === 'profile' ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            <User size={20} />
                            Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors text-left shrink-0 md:shrink ${activeTab === 'notifications' ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            <Bell size={20} />
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors text-left shrink-0 md:shrink ${activeTab === 'security' ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            <Shield size={20} />
                            Security
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile Details</h2>
                                
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/50 border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center overflow-hidden">
                                        <User size={40} className="text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                                                Change Avatar
                                            </button>
                                            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition">
                                                Remove
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                                            <input type="text" defaultValue="Dr. Sarah" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                                            <input type="text" defaultValue="Smith" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                        <input type="email" defaultValue="dr.smith@clinic.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 focus:outline-none cursor-not-allowed" disabled />
                                        <p className="text-xs text-slate-500">To change your email address, please contact support.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Clinic / Organization</label>
                                        <input type="text" defaultValue="Dermatology Associates" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
                                    </div>
                                </div>
                            </div>
                            
                            <hr className="border-slate-200 dark:border-slate-700" />
                            
                            <div className="flex justify-end gap-3">
                                <button className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">Cancel</button>
                                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/30 transition">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Notification Preferences</h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Choose what updates you want to receive.</p>

                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Analysis Complete</h4>
                                            <p className="text-sm text-slate-500">Receive an email when an AI assessment finishes.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>
                                    <hr className="border-slate-200 dark:border-slate-700" />

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Weekly Diagnostic Reports</h4>
                                            <p className="text-sm text-slate-500">Get a weekly digest of your clinic's screening statistics.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>
                                    <hr className="border-slate-200 dark:border-slate-700" />

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Security Alerts</h4>
                                            <p className="text-sm text-slate-500">Get notified of any new logins from unrecognized devices.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked disabled />
                                            <div className="w-11 h-6 bg-primary-600/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-8">
                                <button className="px-6 py-2.5 rounded-xl font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/30 transition">
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Security & Authentication</h2>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="mt-1 text-slate-400">
                                                <Key size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">Password</h4>
                                                <p className="text-sm text-slate-500 mt-1">Last changed 3 months ago</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                                            Update Password
                                        </button>
                                    </div>
                                    
                                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="mt-1 text-primary-500">
                                                <Shield size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                                                <p className="text-sm text-slate-500 mt-1">Protect your account with an extra layer of security.</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold rounded-xl hover:bg-primary-100 dark:hover:bg-primary-500/20 transition whitespace-nowrap">
                                            Enable 2FA
                                        </button>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="mt-1 text-slate-400">
                                                <Download size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">Export Patient Data</h4>
                                                <p className="text-sm text-slate-500 mt-1">Download a CSV of all your anonymized screening activities.</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition whitespace-nowrap">
                                            Export CSV
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                                <p className="text-sm text-slate-500 mb-4">Permanently delete your account and all associated data.</p>
                                <button className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition border border-red-200">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
