import Navbar from '../components/landing/Navbar';
import { ArrowLeft, BookOpen, Activity, Search, FileText, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Documentation() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-200">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white dark:bg-slate-850 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                    <div className="bg-primary-600 px-8 py-12 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen size={32} className="text-primary-200" />
                            <h1 className="text-4xl font-extrabold tracking-tight">Platform Documentation</h1>
                        </div>
                        <p className="text-primary-100 text-lg max-w-2xl">
                            A comprehensive guide on how Melascope DX operates, the AI underlying its capabilities, and how to use the dashboard for dermoscopic analysis.
                        </p>
                    </div>

                    <div className="p-8 space-y-12">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Activity className="text-primary-600 dark:text-primary-400" /> 1. Overview
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                                <p>
                                    <strong>Melascope DX</strong> is an advanced, AI-powered skin lesion analysis tool designed specifically for research and educational purposes. It assists users—ranging from researchers to clinicians—in the early detection and classification of various skin conditions using state-of-the-art machine learning models.
                                </p>
                                <p>
                                    The platform provides an intuitive web interface to streamline the workflow from image upload to final PDF report generation, augmented by a specialized LLM advisory system to interpret complex dermatoscopic results.
                                </p>
                            </div>
                        </section>

                        <hr className="border-slate-100 dark:border-slate-800" />

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Search className="text-primary-600 dark:text-primary-400" /> 2. AI Inference Engine
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                                <h3 className="dark:text-white">The Model</h3>
                                <p>
                                    At the core of Melascope DX is a deep learning architecture (based on <strong>Vision Transformers</strong> or heavily optimized CNNs) fine-tuned on diverse dermatoscopic image datasets.
                                    The model is trained to recognize subtle morphological patterns in skin lesions that may escape the naked eye.
                                </p>
                                <h3 className="dark:text-white">31 Diagnostic Classes</h3>
                                <p>
                                    Unlike simple binary classifiers (e.g., Melanoma vs. Benign), our research prototype outputs a comprehensive probability distribution across <strong>31 distinct diagnostic classes</strong>.
                                    This includes common conditions like Nevus and Seborrheic Keratosis, as well as high-risk malignancies such as Melanoma and Basal Cell Carcinoma.
                                </p>
                            </div>
                        </section>

                        <hr className="border-slate-100 dark:border-slate-800" />

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <FileText className="text-primary-600 dark:text-primary-400" /> 3. Workflow & Reporting
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                                <h3 className="dark:text-white">Step 1: Patient Context</h3>
                                <p>
                                    Before analysis, users can optionally input patient metadata, including demographic information (Age, Gender) and clinical context (Location on Body, observed symptoms like bleeding or changing size). This data does not alter the raw visual AI prediction but provides crucial context for the LLM advisory system.
                                </p>

                                <h3 className="dark:text-white">Step 2: Instant Analysis</h3>
                                <p>
                                    Upon uploading a dermatoscopic image, the image is processed by the backend API. Results are returned in milliseconds, establishing the top predicted class along with its confidence score.
                                </p>

                                <h3 className="dark:text-white">Step 3: Advisory & Chatbot (MelaBot)</h3>
                                <p>
                                    An integrated AI assistant digests the prediction and provides immediate insights, next steps, and warnings. Users can interact with <strong>MelaBot</strong> dynamically to ask follow-up questions about the specific lesion type or general dermatological advice.
                                </p>

                                <h3 className="dark:text-white">Step 4: PDF Report Generation</h3>
                                <p>
                                    All inputs—the uploaded image, patient context, prediction probabilities, and AI advisory notes—can be compiled into a structured, professional <strong>PDF Report</strong> with a single click. This artifact is strictly generated on-the-fly and safely streamed back to the user without persistent storage.
                                </p>
                            </div>
                        </section>

                        <hr className="border-slate-100 dark:border-slate-800" />

                        {/* Section 4 */}
                        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-700/50">
                            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-500 mb-3 flex items-center gap-3">
                                <ShieldAlert /> 4. Medical Disclaimer
                            </h2>
                            <p className="text-amber-800 dark:text-amber-200/80 text-sm leading-relaxed">
                                Melascope DX is designated strictly as a <strong>Research Prototype (v2.1)</strong>. The AI predictions, advisory summaries, and generated reports presented within this platform are for educational and informational purposes only. <br /><br />
                                <strong>This tool is NOT a substitute for professional medical advice, diagnosis, or treatment.</strong> Always seek the advice of a qualified healthcare provider or dermatologist with any questions regarding a medical condition.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
