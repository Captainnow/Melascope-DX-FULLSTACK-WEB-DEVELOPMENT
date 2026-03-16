import { FileText, Download, Search as SearchIcon, Filter } from 'lucide-react';
import clsx from 'clsx';
import { historyStore, HistoryRecord } from '../lib/historyStore';
import { useState, useEffect } from 'react';

export default function Patients() {
    const [history, setHistory] = useState<HistoryRecord[]>([]);

    useEffect(() => {
        setHistory(historyStore.getAll());
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Patient Directory</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage patient records and clinical screening history.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none w-full sm:w-64 transition-all"
                        />
                    </div>
                    <button className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Filter size={20} />
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to clear all history?')) {
                                historyStore.clear();
                                setHistory([]);
                            }
                        }}
                        className="ml-2 text-sm text-red-500 hover:text-red-600 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-850/50 text-slate-500 dark:text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Patient Name</th>
                                <th className="px-6 py-4">Demographics</th>
                                <th className="px-6 py-4">Last Screening Date</th>
                                <th className="px-6 py-4">Top Diagnostic Focus</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <FileText size={48} className="text-slate-300 dark:text-slate-600 mb-2" />
                                            <p className="text-lg font-medium">No patient records found</p>
                                            <p className="text-sm max-w-sm">Complete a screening via the Assessment tool to automatically save patient history here.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                history.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center font-bold text-xs uppercase">
                                                    {record.patientName.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="font-medium text-slate-900 dark:text-slate-200">{record.patientName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {record.age} yrs • {record.gender}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(record.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full" style={{
                                                    backgroundColor: record.confidence > 0.9 ? '#ef4444' : record.confidence > 0.8 ? '#f59e0b' : '#3b82f6'
                                                }} />
                                                <span className="font-medium text-slate-900 dark:text-slate-300">{record.topPrediction}</span>
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
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => alert(`Opening full clinical record for ${record.patientName}...`)}
                                                    className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                                                    title="View History"
                                                >
                                                    <FileText size={18} />
                                                </button>
                                                <button
                                                    onClick={() => alert(`Downloading AI Assessment Report PDF for ${record.patientName}...`)}
                                                    className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-400 dark:hover:bg-primary-900/20 transition-colors"
                                                    title="Download PDF Report"
                                                >
                                                    <Download size={18} />
                                                </button>
                                            </div>
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
