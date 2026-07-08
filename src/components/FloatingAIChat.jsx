import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = `You are the SmartCare AI Assistant. Your primary goal is to guide patients, answer questions about our 8+ specialties (General Physician, Cardiologist, Orthopedist, Dermatologist, Pediatrician, Gynecologist, Neurologist, Ophthalmologist), and convince people that SmartCare Clinic is the absolute best healthcare solution. Be helpful, enthusiastic, professional, and concise.`;

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am the SmartCare AI Assistant ✨ How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setApiKeyError(true);
      return;
    }
    setApiKeyError(false);

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // Convert our message history to the format expected by GenAI
      // We skip the first message as it's a hardcoded greeting
      const history = messages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      
      // Append the new user message
      history.push({ role: 'user', parts: [{ text: userMsg }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: history,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to my brain. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[350px] max-w-[calc(100vw-48px)] flex flex-col border border-gray-100"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1976D2] to-[#2B70C9] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">SmartCare AI</h3>
                  <p className="text-[11px] text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* API Key Warning */}
            {apiKeyError && (
              <div className="bg-red-50 p-3 text-xs text-red-700 border-b border-red-100">
                <strong>Missing API Key:</strong> Please add VITE_GEMINI_API_KEY to your .env file to enable the AI assistant.
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1976D2] text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-[#1976D2] hover:bg-[#1565C0] text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-xl rounded-xl px-4 py-3 text-sm font-medium text-textPrimary border border-gray-100 text-center flex flex-col"
          >
            <span className="text-[#1976D2] font-bold mb-0.5">Try Gemini AI! ✨</span>
            <span className="text-gray-500 text-xs">Ask anything about the clinic</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Open AI Assistant"
          className="w-14 h-14 bg-gradient-to-r from-[#1976D2] to-[#2B70C9] rounded-full flex items-center justify-center shadow-2xl text-white relative"
        >
          {/* Animated glow rings behind the button */}
          <div className="absolute inset-0 rounded-full border-2 border-[#1976D2] animate-ping opacity-20"></div>
          
          <Bot size={28} />
          <div className="absolute -top-1 -right-1 bg-white text-[#1976D2] rounded-full p-1 shadow-md">
            <Sparkles size={12} className="animate-pulse" />
          </div>
        </motion.button>
      )}
    </div>
  );
}
