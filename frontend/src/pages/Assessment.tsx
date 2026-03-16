import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, Save, FileText, Trash2, User, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { api, PredictionResponse, AdvisoryResponse } from '../services/api';
import ChatBot from '../components/common/ChatBot';
import { historyStore } from '../lib/historyStore';

export interface PatientData {
    name: string;
    age: string;
    gender: string;
    location: string;
    symptoms: string[];
}

export default function Assessment() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [advisory, setAdvisory] = useState<AdvisoryResponse | null>(null);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [patientData, setPatientData] = useState<PatientData>({
        name: '',
        age: '',
        gender: '',
        location: '',
        symptoms: []
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            processFile(selected);
        }
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selected = e.dataTransfer.files[0];
            processFile(selected);
        }
    };

    const processFile = (selected: File) => {
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setResult(null);
        setAdvisory(null);
    };

    const startAnalysis = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setResult(null);
        setAdvisory(null);

        try {
            // 1. Analyze Image
            const prediction = await api.analyzeLesion(file);
            setResult(prediction);

            // 2. Get Advisory
            // For now, mocking the advisory based on prediction label
            const advice = await api.getAdvisory(prediction.label, prediction.confidence);
            setAdvisory(advice);

            // 3. Save to History Store
            historyStore.save({
                patientName: patientData.name || 'Anonymous Patient',
                age: patientData.age || 'Unknown',
                gender: patientData.gender || 'Not specified',
                location: patientData.location || 'Unknown',
                topPrediction: prediction.label,
                confidence: prediction.confidence
            });

        } catch (error) {
            console.error("Analysis failed", error);
            alert("Analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAssessment = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setAdvisory(null);
        setPatientData({ name: '', age: '', gender: '', location: '', symptoms: [] });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSymptomToggle = (symptom: string) => {
        setPatientData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptom)
                ? prev.symptoms.filter(s => s !== symptom)
                : [...prev.symptoms, symptom]
        }));
    };

    const handleGenerateReport = async () => {
        if (!result || !file) return;
        setIsGeneratingReport(true);
        try {
            const blob = await api.generateReport(file, patientData, result, advisory);

            // Create a link to download the PDF
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `Melascope_Report_${patientData.name ? patientData.name.replace(/\s+/g, '_') : 'Patient'}_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Failed to generate report", error);
            alert("Failed to generate the report. Please check the console for details.");
        } finally {
            setIsGeneratingReport(false);
        }
    };

    const getSortedProbs = () => {
        if (!result || !result.probabilities) return [];
        return Object.entries(result.probabilities)
            .map(([label, value]) => ({ label, value: value * 100 }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    };

    const topProbs = getSortedProbs();

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <header className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">New Assessment</h1>
                <p className="text-slate-500 dark:text-slate-400">Upload a dermatoscopic image for AI analysis.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Input */}
                <div className="space-y-6 flex flex-col">
                    {/* Image Upload Area */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex-1 flex flex-col min-h-[400px] transition-colors">
                        <h2 className="text-lg font-bold mb-4">Lesion Image</h2>

                        {!preview ? (
                            <div
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-primary-50 dark:hover:bg-slate-800 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 text-center group"
                            >
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="text-primary-600 dark:text-primary-400" size={32} />
                                </div>
                                <p className="font-medium text-slate-900 dark:text-white">Click or drag image to upload</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Supports JPG, PNG (Max 10MB)</p>
                            </div>
                        ) : (
                            <div className="relative flex-1 bg-slate-900 rounded-xl overflow-hidden group">
                                <img src={preview} alt="Lesion" className="w-full h-full object-contain" />
                                <button
                                    onClick={resetAssessment}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Patient Context Form */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <User size={20} className="text-primary-600 dark:text-primary-400" />
                            Patient Context
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                                    placeholder="e.g. Jane Doe"
                                    value={patientData.name}
                                    onChange={e => setPatientData({ ...patientData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                                        placeholder="Age"
                                        value={patientData.age}
                                        onChange={e => setPatientData({ ...patientData, age: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        value={patientData.gender}
                                        onChange={e => setPatientData({ ...patientData, gender: e.target.value })}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location on Body</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                value={patientData.location}
                                onChange={e => setPatientData({ ...patientData, location: e.target.value })}
                            >
                                <option value="">Select location...</option>
                                <option value="Head/Neck">Head/Neck</option>
                                <option value="Torso">Torso</option>
                                <option value="Upper Extremity">Upper Extremity (Arms/Hands)</option>
                                <option value="Lower Extremity">Lower Extremity (Legs/Feet)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <AlertCircle size={16} className="text-slate-400 dark:text-slate-500" />
                                Symptoms (Select all that apply)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {['Itching', 'Bleeding', 'Flaking', 'Changing Size', 'Changing Color', 'Pain', 'New Lesion'].map(symptom => (
                                    <label key={symptom} className={cn(
                                        "px-3 py-1.5 rounded-full text-sm border font-medium cursor-pointer transition-colors select-none",
                                        patientData.symptoms.includes(symptom)
                                            ? "bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-600 text-primary-700 dark:text-primary-300"
                                            : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    )}>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={patientData.symptoms.includes(symptom)}
                                            onChange={() => handleSymptomToggle(symptom)}
                                        />
                                        {symptom}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={startAnalysis}
                        disabled={!file || isAnalyzing || !!result}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-3",
                            !file || result ? "bg-slate-300 cursor-not-allowed shadow-none" : "bg-primary-600 hover:bg-primary-700 hover:scale-[1.02] shadow-primary-500/25"
                        )}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing Lesion...
                            </>
                        ) : result ? (
                            "Analysis Complete"
                        ) : (
                            <>
                                <Search size={24} />
                                Analyze Lesion
                            </>
                        )}
                    </button>
                </div>

                {/* Right Column: Results */}
                <div className="space-y-6">
                    {!result && !isAnalyzing && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 min-h-[400px] transition-colors">
                            <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                                <Search className="text-primary-300 dark:text-primary-500/50" size={40} />
                            </div>
                            <h3 className="text-xl font-bold dark:text-white">Ready for Analysis</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs mt-2">Upload a dermatoscopic image on the left to begin the classification process.</p>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="space-y-6 animate-pulse">
                            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        </div>
                    )}

                    {result && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Result Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden transition-colors">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary-600 dark:bg-primary-500" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Top Prediction</div>
                                            <h2 className="text-3xl font-extrabold tracking-tight">{result.label}</h2>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                                The model is <span className="text-primary-600 dark:text-primary-400 font-bold">{(result.confidence * 100).toFixed(1)}% confident</span> in this classification.
                                            </p>
                                        </div>
                                        {/* Confidence Gauge Graphic could go here */}
                                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                            {(result.confidence * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                </div>

                                {/* Probabilities */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                                    <h3 className="font-bold mb-4">Class Probabilities (Top 5)</h3>
                                    <div className="space-y-4">
                                        {topProbs.map((prob, idx) => (
                                            <div key={prob.label}>
                                                <div className="flex items-center justify-between text-sm mb-1">
                                                    <span className={cn("font-medium", idx === 0 ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                                                        {prob.label}
                                                    </span>
                                                    <span className="text-slate-500 dark:text-slate-500">{prob.value.toFixed(1)}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${prob.value}%` }}
                                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                                        className={cn("h-full rounded-full", idx === 0 ? "bg-primary-600 dark:bg-primary-500" : "bg-slate-400 dark:bg-slate-600")}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
                                        <Save size={18} />
                                        Save Result
                                    </button>
                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={isGeneratingReport}
                                        className={cn(
                                            "flex-1 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors",
                                            isGeneratingReport ? "bg-slate-600 cursor-not-allowed shadow-none" : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/10"
                                        )}
                                    >
                                        {isGeneratingReport ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <FileText size={18} />
                                                Generate Report
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
            
            {/* Floating AI Advisory Chatbot */}
            <ChatBot 
                label={result?.label} 
                confidence={result?.confidence} 
                advisory={advisory}
                onDownloadReport={handleGenerateReport}
            />
        </div>
    );
}
