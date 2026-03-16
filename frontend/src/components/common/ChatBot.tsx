import { useState, useRef, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, ChatMessage, AdvisoryResponse } from '../../services/api';
interface ChatBotProps {
    label?: string;
    confidence?: number;
    advisory?: AdvisoryResponse | null;
    onDownloadReport?: () => void;
}

function BotAvatar({ state }: { state: 'idle' | 'thinking' | 'speaking' }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible drop-shadow-2xl">
            {/* Main Floating Animation Container */}
            <motion.div
                className="w-full h-full flex items-center justify-center pointer-events-none"
                animate={
                    state === 'thinking' ? { y: [-5, 5, -5], rotate: [-2, 2, -2] } : 
                    state === 'speaking' ? { y: [-2, 2, -2] } : 
                    { y: [-5, 5, -5] }
                }
                transition={
                    state === 'thinking' ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : 
                    state === 'speaking' ? { repeat: Infinity, duration: 0.5, ease: "easeInOut" } : 
                    { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }
            >
                <svg viewBox="0 0 120 120" className="w-[110%] h-[110%]">
                    <defs>
                        {/* 3D Body Gradient */}
                        <radialGradient id="bodyGrad" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#e0f2fe" /> {/* light blue 50 */}
                            <stop offset="50%" stopColor="#bae6fd" /> {/* light blue 200 */}
                            <stop offset="100%" stopColor="#38bdf8" /> {/* light blue 400 */}
                        </radialGradient>
                        
                        {/* Glass Visor Gradient */}
                        <radialGradient id="visorGrad" cx="50%" cy="20%" r="80%">
                            <stop offset="0%" stopColor="#334155" /> {/* slate 700 */}
                            <stop offset="100%" stopColor="#0f172a" /> {/* slate 900 */}
                        </radialGradient>

                        {/* Glow Filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Robot Head Base */}
                    <rect x="15" y="20" width="90" height="80" rx="40" fill="url(#bodyGrad)" />
                    
                    {/* Head Highlights / Specular */}
                    <path d="M 30 25 Q 60 15 90 25" stroke="#ffffff" strokeWidth="3" fill="transparent" strokeLinecap="round" opacity="0.6" />

                    {/* Ears / Antennas */}
                    <rect x="5" y="45" width="15" height="30" rx="5" fill="#94a3b8" />
                    <rect x="100" y="45" width="15" height="30" rx="5" fill="#94a3b8" />
                    
                    {/* Glass Visor (Screen) */}
                    <rect x="25" y="35" width="70" height="50" rx="20" fill="url(#visorGrad)" stroke="#1e293b" strokeWidth="2" />
                    <path d="M 30 40 Q 60 35 90 40" stroke="#ffffff" strokeWidth="2" fill="transparent" strokeLinecap="round" opacity="0.2" />

                    {/* Face Elements Container (Eyes and Mouth) */}
                    <motion.g
                        animate={
                            state === 'thinking' ? { x: [-3, 3, -3] } : 
                            state === 'idle' ? { x: [0, 0, -4, -4, 4, 4, 0, 0], y: [0, 0, 0, 0, 0, 0, 0, 0] } : { x: 0 }
                        }
                        transition={
                            state === 'thinking' ? { repeat: Infinity, duration: 2, ease: "easeInOut" } :
                            state === 'idle' ? { repeat: Infinity, duration: 8, times: [0, 0.3, 0.35, 0.5, 0.55, 0.7, 0.75, 1], ease: "easeInOut" } : {}
                        }
                    >
                        {/* Eyes */}
                        {/* Left Eye */}
                        <motion.ellipse 
                            cx="45" cy="55" rx="8" ry="10" 
                            fill="#22d3ee" 
                            filter="url(#glow)"
                            animate={
                                state === 'thinking' ? { scaleY: [1, 0.1, 1], scaleX: [1, 1.2, 1] } : 
                                { scaleY: [1, 1, 0.1, 1, 1, 0.3, 0.3, 1, 1, 0.1, 1, 1] }
                            }
                            transition={
                                state === 'thinking' ? { repeat: Infinity, duration: 1 } : 
                                { repeat: Infinity, duration: 8, times: [0, 0.2, 0.23, 0.26, 0.4, 0.43, 0.6, 0.63, 0.8, 0.83, 0.86, 1] }
                            }
                        />
                        {/* Right Eye */}
                        <motion.ellipse 
                            cx="75" cy="55" rx="8" ry="10" 
                            fill="#22d3ee" 
                            filter="url(#glow)"
                            animate={
                                state === 'thinking' ? { scaleY: [1, 0.1, 1], scaleX: [1, 1.2, 1] } : 
                                { scaleY: [1, 1, 0.1, 1, 1, 0.3, 0.3, 1, 1, 0.1, 1, 1] }
                            }
                            transition={
                                state === 'thinking' ? { repeat: Infinity, duration: 1, delay: 0.1 } : 
                                { repeat: Infinity, duration: 8, times: [0, 0.2, 0.23, 0.26, 0.4, 0.43, 0.6, 0.63, 0.8, 0.83, 0.86, 1] }
                            }
                        />

                        {/* Mouth */}
                        {state === 'idle' && (
                            <path d="M 50 72 Q 60 78 70 72" stroke="#22d3ee" strokeWidth="3" fill="transparent" strokeLinecap="round" filter="url(#glow)" />
                        )}
                        {state === 'thinking' && (
                            <path d="M 55 75 L 65 75" stroke="#22d3ee" strokeWidth="3" fill="transparent" strokeLinecap="round" filter="url(#glow)" />
                        )}
                        {state === 'speaking' && (
                            <motion.path 
                                d="M 50 72 Q 60 82 70 72" 
                                stroke="#22d3ee" strokeWidth="3" fill="#22d3ee" strokeLinecap="round" filter="url(#glow)"
                                animate={{ d: ["M 50 72 Q 60 82 70 72", "M 52 75 Q 60 78 68 75", "M 50 72 Q 60 82 70 72"] }}
                                transition={{ repeat: Infinity, duration: 0.3 }}
                            />
                        )}
                    </motion.g>
                </svg>
            </motion.div>
        </div>
    );
}

export default function ChatBot({ label, confidence, advisory, onDownloadReport }: ChatBotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const prevLabelRef = useRef<string | undefined>(label);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    // Initial message setup
    useEffect(() => {
        if (messages.length === 0) {
            if (label) {
                const summary = advisory?.summary ? ` \n\n${advisory.summary}` : '';
                const greeting = `Hello! I'm MelaBot. I've analyzed your image and identified patterns consistent with **${label}**.${summary}\n\nWhat would you like to know about this assessment? I can help you understand the next steps or general information about this condition. You can also ask me to **download your report**.`;
                setMessages([{ role: 'assistant', content: greeting }]);
                setIsOpen(true);
            } else {
                setMessages([{ role: 'assistant', content: "Hello! I'm MelaBot. I'm here to help you understand your skin health. You can upload an image for AI assessment, or ask me any general questions." }]);
            }
        }
    }, []);

    // Handle new assessment result
    useEffect(() => {
        if (label && label !== prevLabelRef.current) {
            const summary = advisory?.summary ? ` \n\n${advisory.summary}` : '';
            const greeting = `I've analyzed your newly uploaded image and identified patterns consistent with **${label}**.${summary}\n\nWhat would you like to know about this assessment? You can also ask me to **download your report**.`;
            
            setMessages(prev => [...prev, { role: 'assistant', content: greeting }]);
            setIsOpen(true);
        }
        prevLabelRef.current = label;
    }, [label, advisory]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        const lowerInput = userText.toLowerCase();

        // Check for clear chat intent
        if (lowerInput === 'clear chat' || lowerInput === 'clear' || lowerInput === 'reset chat' || lowerInput === 'restart') {
            setInput('');
            setIsLoading(true);
            
            // Show a brief loading state before clearing
            setTimeout(() => {
                let greeting = '';
                if (label) {
                    const summary = advisory?.summary ? ` \n\n${advisory.summary}` : '';
                    greeting = `*Chat history cleared.* \n\nI've analyzed your newly uploaded image and identified patterns consistent with **${label}**.${summary}\n\nWhat would you like to know about this assessment? You can also ask me to **download your report**.`;
                } else {
                    greeting = "*Chat history cleared.* \n\nHello! I'm MelaBot. I'm here to help you understand your skin health. You can upload an image for AI assessment, or ask me any general questions.";
                }
                setMessages([{ role: 'assistant', content: greeting }]);
                setIsLoading(false);
            }, 600);
            return;
        }

        const userMsg: ChatMessage = { role: 'user', content: userText };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        
        // Check for download intent
        const isDownloadIntent = 
            (lowerInput.includes('download') || lowerInput.includes('save') || lowerInput.includes('get') || lowerInput.includes('export')) &&
            (lowerInput.includes('report') || lowerInput.includes('result') || lowerInput.includes('pdf'));

        if (isDownloadIntent && onDownloadReport) {
            setIsLoading(true);
            setTimeout(() => {
                onDownloadReport();
                setMessages(prev => [...prev, { role: 'assistant', content: "I've initiated the download of your assessment report. It should save to your device shortly!" }]);
                setIsLoading(false);
            }, 800); // Small delay to simulate action
            
            // If the message was purely a command (e.g., "download my report"), don't send to LLM
            if (lowerInput.length < 30) {
                return;
            }
        }

        setIsLoading(true);
        try {
            const history = messages.filter(m => m.role !== 'system');
            const safeLabel = label || 'General Inquiry';
            const safeConfidence = confidence || 0;
            
            const responseContent = await api.chat(safeLabel, safeConfidence, [...history, userMsg]);
            setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the advisory service. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                        className="w-[24rem] sm:w-[26rem] h-[550px] max-h-[80vh] mb-4 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-colors origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-5 flex items-center justify-between text-white shrink-0 shadow-sm relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center p-0.5 bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner">
                                    <BotAvatar state={isLoading ? 'thinking' : 'idle'} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
                                        MelaBot Advisor
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 uppercase tracking-widest text-primary-50">AI</span>
                                    </h3>
                                    <p className="text-xs text-primary-100 flex items-center gap-1.5 mt-0.5 font-medium">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.5)]"></span>
                                        Online • Assisting with {label}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-slate-850">
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx} 
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'p-0.5 bg-white/50 dark:bg-slate-800'}`}>
                                        {msg.role === 'user' ? <User size={16} /> : <BotAvatar state="idle" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none font-medium'}`}>
                                        {msg.content.replace(/\*\*(.*?)\*\*/g, '$1')} 
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm p-0.5 bg-white/50 dark:bg-slate-800">
                                        <BotAvatar state="thinking" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm min-h-[44px] flex items-center">
                                        <div className="flex gap-1.5 ml-1">
                                            <span className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask MelaBot a question..."
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary-500 rounded-full px-5 py-3 text-sm focus:ring-4 focus:ring-primary-500/20 focus:outline-none dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shrink-0 shadow-md shadow-primary-600/20"
                                >
                                    <Send size={20} className="translate-x-0.5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-20 h-20 flex items-center justify-center transition-all duration-300 relative group overflow-visible ${isOpen ? 'bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full shadow-2xl w-14 h-14 mt-2' : ''}`}
            >
                {isOpen && <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform origin-center rounded-full opacity-0 group-hover:opacity-100"></div>}
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-20 h-20"
                        >
                            <BotAvatar state="idle" />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Notification dot when closed */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-bounce shadow"></span>
                )}
            </motion.button>
        </div>
    );
}
