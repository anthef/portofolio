import { useState, useRef, useEffect, useId } from 'react';
import Markdown from '@uiw/react-markdown-preview';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Send } from 'lucide-react';

interface Message {
  isBot: boolean;
  text: string;
  id: string;
  fullText?: string;
  showCopied?: boolean;
}

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const processedMessages = useRef<Set<string>>(new Set());
  const prevMessagesLength = useRef(0);
  const id = useId();

  const scrollToBottom = () => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      const height = containerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      containerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      scrollToBottom();
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.isBot && msg.fullText && !processedMessages.current.has(msg.id)) {
        processedMessages.current.add(msg.id);
        let currentLength = msg.text.length;
        const fullText = msg.fullText;

        const intervalId = setInterval(() => {
          currentLength += 1;
          setMessages(prevMessages =>
            prevMessages.map(m =>
              m.id === msg.id
                ? { ...m, text: fullText.substring(0, currentLength) }
                : m
            )
          );
          if (currentLength === fullText.length) {
            clearInterval(intervalId);
            processedMessages.current.delete(msg.id);
          }
        }, 30);
      }
    });
  }, [messages]);

  const handleCopy = async (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;

    try {
      const textToCopy = message.fullText || message.text;
      await navigator.clipboard.writeText(textToCopy);
      
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, showCopied: true } : msg
        )
      );

      setTimeout(() => {
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageId ? { ...msg, showCopied: false } : msg
          )
        );
      }, 2000);
    } catch (error) {
      console.error('Gagal menyalin teks:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      isBot: false,
      text: input,
      id: `${id}-${uuidv4()}`,
      showCopied: false
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) throw new Error('API response error');
      const data = await response.json();

      const botMessage: Message = {
        isBot: true,
        text: '',
        id: `${id}-${uuidv4()}`,
        fullText: data.text,
        showCopied: false
      };

      setMessages(prev => [...prev, botMessage]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const errorMessage: Message = {
        isBot: true,
        text: "⚠️ Sorry, I'm having trouble connecting. Please try again later.",
        id: `${id}-${uuidv4()}`,
        showCopied: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id='chat' className="flex flex-col min-h-screen items-center justify-center gap-6 z-10 py-20 md:py-40 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        style={{
          backgroundImage: 'linear-gradient(to right, #348B96, #2A717A, #24475B, #24475B)',
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.15), 0 30px 35px rgba(0, 0, 0, 0.1)`,
          border: '2px solid #24475B',
          borderRadius: '9999px',
          outline: '3px solid rgba(36, 71, 91, 0.5)',
        }}
        className="px-6 py-3 backdrop-blur-lg relative"
      >
        <h1 className="text-4xl font-poppins text-white">
          Ask Me!
        </h1>
      </motion.div>
        
        <br></br>
      <div className="max-w-[1000px] mx-auto w-full border border-gray-200 rounded-lg overflow-hidden bg-[#123655]">
        <div 
          ref={containerRef}
          className="h-[400px] overflow-y-auto overscroll-contain"
        >
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`p-3 pr-8 rounded-2xl max-w-[80%] break-words relative ${
                  msg.isBot 
                    ? 'bg-white text-gray-800 rounded-tl-none shadow-md font-poppins' 
                    : ' bg-white text-white rounded-tr-none shadow-md font-poppins'
                }`}>
                  <Markdown source={msg.text} />
                  
                  <button
                    onClick={() => handleCopy(msg.id)}
                    className={`absolute bottom-1 right-1 p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                      msg.isBot 
                        ? 'text-gray-600 hover:bg-gray-200' 
                        : 'text-gray-600 hover:bg-gray-700'
                    }`}
                    aria-label="Salin pesan"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {msg.showCopied && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -bottom-5 right-1 text-xs bg-gray-700 text-white px-2 py-1 rounded"
                    >
                      Copied!
                    </motion.span>
                  )}

                  {msg.isBot && msg.text.length < (msg.fullText?.length || 0) && (
                    <span className="inline-block ml-1 h-3 w-[2px] bg-gray-500 animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-2xl rounded-tl-none p-2">
                  <div className="flex space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="flex p-4 bg-white border-t border-gray-200"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about my skills..."
            className="flex-1 p-2 mr-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#123655] text-gray-800"
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-[#123655] text-white rounded-full hover:bg-[#0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}