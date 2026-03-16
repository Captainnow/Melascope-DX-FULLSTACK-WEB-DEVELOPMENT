// Helper for clsx in this file since it's used inline
import clsx from 'clsx';
import { Download } from 'lucide-react';
import { historyStore, HistoryRecord } from '../lib/historyStore';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [recentScreenings, setRecentScreenings] = useState<HistoryRecord[]>([]);

    useEffect(() => {
        setRecentScreenings(historyStore.getAll().slice(0, 4));
    }, []);

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Welcome back, Dr. Smith.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Total Scans', value: '1,234', trend: '+12%' },
                    { label: 'High Risk Cases', value: '56', trend: '-2%' },
                    { label: 'Patients', value: '892', trend: '+5%' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
                        <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                            <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full",
                                stat.trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Screenings</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-850/50 text-slate-500 dark:text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Patient Name</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Prediction</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Report</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {recentScreenings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        No recent screenings found. Run an assessment to see records here.
                                    </td>
                                </tr>
                            ) : (
                                recentScreenings.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">
                                            {record.patientName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(record.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900 dark:text-slate-300">{record.topPrediction}</span>
                                                <span className="text-xs text-slate-500">{(record.confidence * 100).toFixed(0)}% Confidence</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-full text-xs font-medium border",
                                                record.status === 'Complete'
                                                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50"
                                                    : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50"
                                            )}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => alert(`Downloading mock report for ${record.patientName}...`)}
                                                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                title="Download PDF Report"
                                            >
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
