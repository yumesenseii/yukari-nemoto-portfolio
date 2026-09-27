"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  FileText,
  Mail,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ChibiMascot } from "@/components/chibi-mascot";
import { cn } from "@/lib/cn";
import { profile, projects, tools } from "@/lib/data";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    external?: boolean;
  };
}

const suggestedQuestions = [
  "Tell me about Teacher Anne",
  "Tell me about Gray Cafe",
  "Show me your projects",
  "What tools do you use?",
  "Tell me about your education",
  "Open your resume",
  "How can I contact you?",
];

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleText, setBubbleText] = useState("Hello! 👋");
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hey there! 👋 I'm Yukari's portfolio assistant. Whether you want to check out his latest projects (like the Teacher Anne school platform, Gray Cafe coffee ordering system, or Power BI analytics), explore his tech stack, or grab his resume, I'm here to help! What's on your mind?",
    },
  ]);

  const panelRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Bubble text sequence: "Hello! 👋" -> "Need help exploring my portfolio?"
  useEffect(() => {
    const timer = setTimeout(() => {
      if (bubbleRef.current) {
        gsap.to(bubbleRef.current, {
          opacity: 0,
          y: -4,
          duration: 0.25,
          onComplete: () => {
            setBubbleText("Need help exploring my portfolio?");
            gsap.to(bubbleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            });
          },
        });
      } else {
        setBubbleText("Need help exploring my portfolio?");
      }
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Open chatbot panel with GSAP
  const handleOpen = () => {
    if (isOpen) {
      handleClose();
      return;
    }

    setIsOpen(true);
    setBubbleVisible(false);

    setTimeout(() => {
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.95, y: 16 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
        );
      }
      inputRef.current?.focus();
    }, 10);
  };

  // Close chatbot panel with GSAP
  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 12,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setIsOpen(false);
          setBubbleVisible(true);
        },
      });
    } else {
      setIsOpen(false);
      setBubbleVisible(true);
    }
  };

  // Process question and return grounded reply
  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");

    // Simulate natural thinking delay
    setTimeout(() => {
      const reply = generateAnswer(query);
      setMessages((prev) => [...prev, reply]);
    }, 320);
  };

  // Generate reply strictly using existing portfolio data with a warm, human voice
  const generateAnswer = (rawQuery: string): ChatMessage => {
    const q = rawQuery.toLowerCase();
    const id = `bot-${Date.now()}`;

    // 1. Who are you / About
    if (
      q.includes("who are you") ||
      q.includes("about") ||
      q.includes("who is yukari") ||
      q.includes("introduce") ||
      q.includes("background") ||
      q.includes("bio")
    ) {
      return {
        id,
        sender: "bot",
        text: `Hey! 👋 Yukari is a 4th-year BSIT student majoring in Business & Data Analytics at Bulacan State University (Bustos Campus).\n\nHe loves connecting the dots between raw numbers, database architectures, and thoughtful UI/UX design. When he isn't modeling DAX calculations or writing TypeScript, he also freelances in photography and creative media! ✨`,
        action: {
          label: "Explore Yukari's Story",
          href: "/about",
        },
      };
    }

    // 1.5. Teacher Anne School Management System
    if (
      q.includes("teacher anne") ||
      q.includes("teacher-anne") ||
      q.includes("school management") ||
      q.includes("playschool")
    ) {
      return {
        id,
        sender: "bot",
        text: `🏫 Teacher Anne is a comprehensive school management system designed to streamline enrollment and centralize student records, attendance, payments, teacher management, announcements, and reporting in one platform for efficient school administration!\n\n• Tech Stack: Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Vercel, Brevo, Figma, Lucide React\n• Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, and Figma UI/UX\n• Backend: Supabase, PostgreSQL database, Supabase Auth & Storage\n• Deployment: Vercel\n• Key Services: Brevo transactional email receipts, QR code generation & scanning for attendance, and GCash payment proof verification!\n\nYou can explore Teacher Anne directly in the Projects view!`,
        action: {
          label: "Explore in Projects ↗",
          href: "/projects",
        },
      };
    }

    // 1.6. Gray Cafe (Web Systems and Technologies - IT211)
    if (
      q.includes("gray cafe") ||
      q.includes("gray-cafe") ||
      q.includes("coffee") ||
      q.includes("cafe") ||
      q.includes("it211") ||
      q.includes("web system")
    ) {
      return {
        id,
        sender: "bot",
        text: `☕ Gray Cafe is Yukari's final academic project for Web Systems and Technologies (IT211)!\n\n• Tech Stack: HTML5, CSS3, JavaScript, PHP, MySQL (phpMyAdmin), XAMPP, Apache\n• Architecture: Dynamic beverage catalog, responsive shopping cart, live total bill computation, PHP backend order processing, and a relational MySQL database.\n• Development Stack: Configured with local Apache server and MySQL service on XAMPP.\n\nCheck out the video showcase on the Projects page!`,
        action: {
          label: "View Gray Cafe in Projects ↗",
          href: "/projects",
        },
      };
    }

    // 2. Projects
    if (
      q.includes("project") ||
      q.includes("work") ||
      q.includes("show me your projects") ||
      q.includes("portfolio") ||
      q.includes("details") ||
      q.includes("overview") ||
      q.includes("ayumi")
    ) {
      return {
        id,
        sender: "bot",
        text: `Yukari has built 6 comprehensive client and academic projects! Here are the highlights:\n\n• 🏫 Teacher Anne — Full-stack school management system with Next.js, Supabase, QR attendance, and GCash verification.\n• ☕ Gray Cafe — Interactive coffee shop & ordering web system (IT211) using HTML, CSS, JS, PHP, MySQL, and XAMPP.\n• 📊 Power BI Data Analytics — Interactive dashboards with DAX measures and star-schema models.\n• 📈 Power BI Executive Dashboard — Strategic KPI benchmarking scorecard.\n• 🎓 CNHS LEARN — School academic portal and student performance analytics system.\n• 🍹 Ayumi Rich Merchandise — Beverage wholesale ordering & payment management system prototype designed in Figma.\n\nWhich one would you like to see?`,
        action: {
          label: "View All Projects",
          href: "/projects",
        },
      };
    }

    // 3. Tools / Tech Stack
    if (
      q.includes("tool") ||
      q.includes("tech") ||
      q.includes("stack") ||
      q.includes("software") ||
      q.includes("skills") ||
      q.includes("what tools do you use")
    ) {
      return {
        id,
        sender: "bot",
        text: `Yukari's toolkit blends analytics, engineering, and visual design:\n\n💻 Web & Systems: Next.js, React, TypeScript, Tailwind CSS, PHP, Supabase, PostgreSQL, MySQL, Vercel, XAMPP, VS Code\n📊 Data & Analytics: Power BI, DAX Modeling, Star-Schema Architecture, SQL, Excel\n🎨 Design & Media: Figma (wireframes & interactive prototypes), Photoshop, Lightroom, Canva, CapCut\n\nHe loves taking ideas all the way from research and design wireframes to production code and analytics!`,
        action: {
          label: "Explore Tech Stack & Tools",
          href: "/tools",
        },
      };
    }

    // 4. Experience & Education
    if (
      q.includes("experience") ||
      q.includes("education") ||
      q.includes("school") ||
      q.includes("college") ||
      q.includes("history") ||
      q.includes("tell me about your experience")
    ) {
      return {
        id,
        sender: "bot",
        text: `Yukari is currently completing his final year in BSIT (Business & Data Analytics) at Bulacan State University — Bustos Campus (2023–Present).\n\nAlong the way, he's led client capstone system designs (like the Ayumi Rich project), built websites for clients (like Teacher Anne Playschool), and participated in regional tech summits!`,
        action: {
          label: "View Education & Academic Background",
          href: "/about",
        },
      };
    }

    // 5. Resume
    if (
      q.includes("resume") ||
      q.includes("cv") ||
      q.includes("open your resume") ||
      q.includes("download")
    ) {
      return {
        id,
        sender: "bot",
        text: `Looking for a copy of Yukari's CV? You can view or download the complete PDF resume directly here:`,
        action: {
          label: "Open Resume PDF ↗",
          href: "/projects/Nemoto-Yukari-Tenshi-Resume.pdf",
          external: true,
        },
      };
    }

    // 6. Contact
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("hire") ||
      q.includes("reach") ||
      q.includes("how can i contact you") ||
      q.includes("message")
    ) {
      return {
        id,
        sender: "bot",
        text: `Yukari is always excited to collaborate on new opportunities, internships, or freelance projects! ✉️\n\nYou can reach him directly at yukarinepomuceno@gmail.com or send a message through the contact page:`,
        action: {
          label: "Go to Contact Form",
          href: "/contact",
        },
      };
    }

    // Default polite response with suggested topics
    return {
      id,
      sender: "bot",
      text: `I'm here to help you explore Yukari's work! You can ask about his projects (like Ayumi Rich or Power BI), his analytics and design tools, or view his resume.`,
      action: {
        label: "View Selected Works",
        onClick: () => {
          const el = document.getElementById("featured-projects");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          handleClose();
        },
      },
    };
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Fresh start! ✨ What would you like to know about Yukari's work, projects, or background?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* 1. CHATBOT PANEL */}
      {isOpen && (
        <div
          ref={panelRef}
          className="mb-3.5 flex flex-col w-[320px] sm:w-[380px] h-[500px] max-h-[82vh] overflow-hidden rounded-2xl border border-line/80 bg-card/95 dark:bg-[#0a0a0a]/95 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl ring-1 ring-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-tile/40">
            <div className="flex items-center gap-2.5">
              <ChibiMascot variant="sitting" size={28} interactive={false} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xs font-bold text-ink">
                    Yukari Assistant
                  </span>
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="font-mono text-[9px] text-muted truncate">
                  Portfolio Mascot &amp; Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-tile hover:text-ink"
                aria-label="Reset chat"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleClose}
                title="Close chat"
                className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-tile hover:text-ink"
                aria-label="Close assistant"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages Area with custom sleek scrollbar */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3.5 scroll-smooth text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === "bot" && (
                  <div className="shrink-0 mb-1">
                    <ChibiMascot variant="sitting" size={22} interactive={false} />
                  </div>
                )}

                <div
                  className={cn(
                    "flex flex-col max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-2xs",
                    msg.sender === "user"
                      ? "bg-blue text-white rounded-br-xs shadow-xs"
                      : "bg-tile/80 dark:bg-[#141414] border border-line/70 dark:border-white/10 text-ink rounded-bl-xs",
                  )}
                >
                  <p className="whitespace-pre-line text-[11.5px] leading-relaxed">{msg.text}</p>
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-line/60 dark:border-white/10">
                      {msg.action.href ? (
                        <Link
                          href={msg.action.href}
                          target={msg.action.external ? "_blank" : undefined}
                          rel={msg.action.external ? "noopener noreferrer" : undefined}
                          onClick={!msg.action.external ? handleClose : undefined}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue dark:text-powder-blue hover:underline"
                        >
                          <span>{msg.action.label}</span>
                          {msg.action.external ? (
                            <ExternalLink className="size-3" />
                          ) : (
                            <ArrowRight className="size-3" />
                          )}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={msg.action.onClick}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue dark:text-powder-blue hover:underline cursor-pointer"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight className="size-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (Clean, Scrollbar Hidden with Edge Fade) */}
          <div className="relative px-3 py-2 border-t border-line/60 bg-tile/30">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 [mask-image:linear-gradient(to_right,transparent,black_8px,black_calc(100%-8px),transparent)]">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="shrink-0 cursor-pointer rounded-full border border-line bg-tile/90 px-2.5 py-1 text-[10.5px] font-medium text-muted transition-all hover:border-blue/50 hover:bg-tile hover:text-ink active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-line p-2.5 bg-sidebar/90"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about projects, tools, resume..."
              className="flex-1 rounded-xl border border-line bg-tile/50 px-3 py-2 text-xs text-ink placeholder:text-muted focus:border-blue focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue text-white transition-opacity disabled:opacity-35 hover:opacity-95"
              aria-label="Send message"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 2. CHIBI MASCOT DOCK & GREETING BUBBLE */}
      <div className="flex items-center gap-2">
        {/* Compact Greeting Speech Bubble */}
        {bubbleVisible && !isOpen && (
          <div
            ref={bubbleRef}
            onClick={handleOpen}
            className="group cursor-pointer select-none rounded-2xl border border-line bg-tile/95 px-3 py-1.5 shadow-lg backdrop-blur-md transition-all hover:border-blue active:scale-95"
          >
            <p className="font-mono text-[11px] font-semibold text-ink transition-colors group-hover:text-blue flex items-center gap-1.5">
              <span>{bubbleText}</span>
              <span className="size-1 rounded-full bg-blue animate-pulse" />
            </p>
          </div>
        )}

        {/* Mascot Avatar Button */}
        <div className="relative">
          <ChibiMascot
            variant="chatbot"
            size={48}
            interactive={true}
            onClick={handleOpen}
            tooltipText={isOpen ? "Close Assistant" : "Chat with Yukari's Assistant"}
            className="transition-transform hover:scale-110 active:scale-95"
          />
        </div>
      </div>
    </div>
  );
}
