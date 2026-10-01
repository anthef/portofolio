/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import Markdown from '@uiw/react-markdown-preview';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Send, Copy, Check } from 'lucide-react';
import { Camera, ImagePlus, X } from 'lucide-react';
import { useTheme } from '@hooks';
import { Blob, Panel, Reveal, Section, SectionHeader, StatusDot } from '@elements';

interface Message {
  isBot: boolean;
  text: string;
  id: string;
  fullText?: string;
  showCopied?: boolean;
  images?: string[];
}

interface ImagePreview {
  id: string;
  data: string;
}

// Notebook prompt label shown beside each message.
const Gutter = ({ children, tone }: { children: ReactNode; tone: 'in' | 'out' }) => (
  <span
    className={`shrink-0 pt-[3px] font-mono text-[11.5px] sm:w-[60px] sm:text-right ${
      tone === 'in' ? 'text-accent sm:pt-[12px]' : 'text-series-2'
    }`}
  >
    {children}
  </span>
);

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const processedMessages = useRef<Set<string>>(new Set());
  const prevMessagesLength = useRef(0);
  const id = useId();
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const tips = [
    { 
      text: {
        en: "💡 Ask me about Anthony's work experience!",
        id: "💡 Tanya tentang pengalaman kerja Anthony!"
      }
    },
    {
      text: {
        en: "🌟 Want to know Anthony's educational background?",
        id: "🌟 Mau tahu latar belakang pendidikan Anthony?"
      }
    },
    {
      text: {
        en: "🚀 Ask about projects Anthony has worked on!",
        id: "🚀 Tanya tentang proyek yang pernah Anthony kerjakan!"
      }
    },
    {
      text: {
        en: "📚 What technical skills do Anthony's have?",
        id: "📚 Skill teknis apa saja yang Anthony kuasai?"
      }
    }
  ];

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

  const handleTipClick = (tipText: string) => {
    setInput(tipText);
    setTimeout(() => {
      (document.getElementById('chat-form') as HTMLFormElement)?.requestSubmit();
    }, 100);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const newImages: ImagePreview[] = [];
    
    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) { // Batas 5MB
        alert(input.toLowerCase().startsWith('id') 
          ? "Ukuran gambar melebihi 5MB" 
          : "Image size exceeds 5MB");
        continue;
      }
  
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (result) {
          newImages.push({
            id: uuidv4(),
            data: result.toString()
          });
          setImagePreviews(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImagePreview = (id: string) => {
    setImagePreviews(prev => prev.filter(img => img.id !== id));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasContent = input.trim() || imagePreviews.length > 0;
    if (!hasContent) return;

    const userMessage: Message = {
      isBot: false,
      text: input,
      id: `${id}-${uuidv4()}`,
      showCopied: false,
      images: imagePreviews.map(img => img.data)
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    setImagePreviews([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          images: imagePreviews.map(img => img.data) 
        })
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
        text: input.toLowerCase().startsWith('id') 
          ? "⚠️ Maaf, sedang ada gangguan koneksi. Silakan coba lagi nanti." 
          : "⚠️ Sorry, I'm having trouble connecting. Please try again later.",
        id: `${id}-${uuidv4()}`,
        showCopied: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // "/" jumps to the chat from anywhere on the page (hinted on the hero button).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest('input, textarea, [contenteditable="true"]');
      if (e.key !== '/' || typing || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isIndonesian = input.toLowerCase().startsWith('id');
  const canSend = !isLoading && (input.trim().length > 0 || imagePreviews.length > 0);

  // Jupyter-style execution counts: each question opens a new cell number.
  let cellCount = 0;
  const cells = messages.map((msg) => {
    if (!msg.isBot) cellCount += 1;
    return { msg, n: Math.max(cellCount, 1) };
  });
  const lastUserIndex = messages.map((m) => m.isBot).lastIndexOf(false);

  return (
    <Section
      id="chat"
      className="overflow-hidden"
      backdrop={<Blob className="-left-32 top-1/3 h-[380px] w-[380px]" color="var(--series-3)" />}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            cell={8}
            code={`model.generate_content(prompt)`}
            title={
              <>
                Curious about me?
                <br />
                Just ask.
              </>
            }
            description="A Gemini-powered assistant that knows my experience, projects, and skills. It answers in the language you write in."
          >
            <div className="mt-2 w-full">
              <p className="mb-2 font-mono text-[11.5px] text-faint">
                {isIndonesian ? '# coba tanyakan' : '# try asking'}
              </p>
              <ul className="flex w-full flex-col items-start gap-2">
                {tips.map((tip) => {
                  const text = isIndonesian ? tip.text.id : tip.text.en;
                  return (
                    <li key={tip.text.en} className="max-w-full">
                      <button
                        type="button"
                        onClick={() => handleTipClick(text)}
                        disabled={isLoading}
                        className="card-shadow group flex max-w-full items-center gap-3 rounded-full bg-surface py-2.5 pl-4 pr-3 text-left text-[14px] text-text transition-all duration-300 hover:-translate-y-0.5 hover:text-accent disabled:opacity-50"
                      >
                        <span>{text.replace(/^\S+\s/, '')}</span>
                        <span className="font-mono text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
                          ↵
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SectionHeader>
        </Reveal>

        <Reveal delay={0.1}>
          <Panel
            title="ask_anthony.ipynb"
            meta={
              <span className="flex items-center gap-2">
                {isLoading ? <StatusDot tone="accent" /> : <span className="h-2 w-2 rounded-full border border-faint" />}
                {isLoading ? 'busy' : 'idle'}
              </span>
            }
            footer={
              <>
                <span>
                  {isIndonesian ? 'tekan' : 'press'} <kbd className="rounded-full bg-well px-1.5 text-ink">/</kbd>{' '}
                  {isIndonesian ? 'untuk mengetik' : 'to type'}
                </span>
                <span className="text-faint">{cellCount} {cellCount === 1 ? 'cell' : 'cells'}</span>
              </>
            }
          >
            <div ref={containerRef} className="h-[440px] overflow-y-auto overscroll-contain">
              {messages.length === 0 && !isLoading ? (
                <div className="dot-paper mx-3 flex h-full flex-col items-center justify-center gap-2 rounded-[18px] px-6 text-center">
                  <p className="font-mono text-[12px] text-faint">In [ ]: # empty notebook</p>
                  <p className="text-[14px] text-muted">
                    {isIndonesian
                      ? 'Pilih salah satu pertanyaan atau ketik di bawah.'
                      : 'Pick a prompt, or type your own question below.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 p-4 md:p-5">
                  {cells.map(({ msg, n }, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-1.5 sm:flex-row sm:gap-3"
                    >
                      <Gutter tone={msg.isBot ? 'out' : 'in'}>
                        {msg.isBot ? `Out[${n}]:` : isLoading && index === lastUserIndex ? 'In [*]:' : `In [${n}]:`}
                      </Gutter>

                      <div className="group/cell relative min-w-0 flex-1">
                        <div
                          className={`break-words text-[14px] leading-relaxed ${
                            msg.isBot ? 'rounded-[6px] px-0.5 py-0.5 text-text' : 'rounded-[18px] rounded-tl-[6px] bg-well px-4 py-2.5 text-ink'
                          }`}
                        >
                          {msg.images && msg.images.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                              {msg.images.map((img, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  src={img}
                                  alt="Uploaded content"
                                  className="h-16 w-16 rounded-[12px] object-cover"
                                />
                              ))}
                            </div>
                          )}

                          {msg.text && (
                            <Markdown
                              source={msg.text}
                              wrapperElement={{ 'data-color-mode': theme }}
                              style={{
                                background: 'transparent',
                                color: 'inherit',
                                fontFamily: 'inherit',
                                fontSize: 14,
                              }}
                            />
                          )}

                          {msg.isBot && msg.text.length < (msg.fullText?.length || 0) && (
                            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-blink bg-accent" />
                          )}
                        </div>

                        {msg.isBot && (
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id)}
                            className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-faint transition-colors hover:text-ink"
                            aria-label={isIndonesian ? 'Salin pesan' : 'Copy message'}
                          >
                            {msg.showCopied ? <Check size={12} /> : <Copy size={12} />}
                            {msg.showCopied ? (isIndonesian ? 'tersalin' : 'copied') : isIndonesian ? 'salin' : 'copy'}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
                      <Gutter tone="out">{`Out[${Math.max(cellCount, 1)}]:`}</Gutter>
                      <div className="flex items-center gap-1.5 py-2">
                        {[0, 0.2, 0.4].map((delay) => (
                          <motion.span
                            key={delay}
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                            animate={{ opacity: [0.25, 1, 0.25] }}
                            transition={{ duration: 1, repeat: Infinity, delay }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form id="chat-form" onSubmit={handleSubmit} className="p-3 pt-0">
              {imagePreviews.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {imagePreviews.map((img) => (
                    <div key={img.id} className="group relative">
                      <img src={img.data} alt="Preview" className="h-16 w-16 rounded-[12px] object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImagePreview(img.id)}
                        className="absolute -right-2 -top-2 rounded-full bg-inverse p-0.5 text-on-inverse opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1.5 rounded-full bg-well p-1.5 transition-shadow focus-within:shadow-[0_0_0_2px_var(--accent)]">
                <span className="hidden shrink-0 pl-3 pr-1 font-mono text-[11.5px] text-accent sm:block">In [ ]:</span>

                <label
                  className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-faint opacity-50"
                  title={isIndonesian ? 'Unggah gambar segera hadir' : 'Image upload coming soon'}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled
                    onChange={handleImageUpload}
                    className="hidden"
                    aria-label="Upload image"
                  />
                  <ImagePlus size={16} />
                </label>

                <label
                  className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-faint opacity-50 md:hidden"
                  title={isIndonesian ? 'Kamera segera hadir' : 'Camera coming soon'}
                >
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                    aria-label="Take photo"
                    disabled={true}
                  />
                  <Camera size={16} />
                </label>

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isIndonesian ? 'Tanyakan sesuatu…' : 'Ask me anything…'}
                  className="h-10 min-w-0 flex-1 bg-transparent px-2 text-[14px] text-ink placeholder:text-faint focus:outline-none"
                  aria-label="Chat input"
                />

                <button
                  type="submit"
                  disabled={!canSend}
                  title={
                    !canSend && !isLoading
                      ? isIndonesian
                        ? 'Silakan masukkan pesan terlebih dahulu'
                        : 'Please enter a message first'
                      : undefined
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-inverse text-on-inverse transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-inverse"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
