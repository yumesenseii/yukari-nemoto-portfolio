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
import { profile, projects, tools, type ProjectItem } from "@/lib/data";

let nextMessageId = 0;

function createMessageId(prefix: string) {
  nextMessageId += 1;
  return `${prefix}-${nextMessageId}`;
}

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

// --- Chatbot memory: remembers the last discussed project for follow-ups ---
interface ChatCtx {
  project?: ProjectItem;
}

function normQuery(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Alias keywords (portfolio wording) mapped to real project slugs in lib/data.
const PROJECT_ALIASES: { keys: string[]; slug: string }[] = [
  {
    keys: ["teacher anne", "teacheranne", "anne playschool", "playschool", "enrollment system", "school management system"],
    slug: "teacher-anne",
  },
  {
    keys: ["executive dashboard", "kpi dashboard", "scorecard", "benchmarking", "dashboard"],
    slug: "power-bi-dashboard",
  },
  {
    keys: ["power bi data analytics", "business intelligence", "dax"],
    slug: "power-bi-data-analytics",
  },
  {
    keys: ["gray cafe", "graycafe", "grey cafe", "coffee shop", "coffee ordering", "it211", "it 211"],
    slug: "gray-cafe",
  },
  {
    keys: ["ayumi", "merchandise", "wholesale", "beverage ordering"],
    slug: "ayumirich",
  },
  {
    keys: ["cnhs learn", "cnhs"],
    slug: "cnhs-learn",
  },
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
      text: "Hello! I'm Yukari's portfolio assistant. Ask me about her projects, tools, education, resume, or contact details.",
    },
  ]);
  const chatCtxRef = useRef<ChatCtx>({});

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
      id: createMessageId("user"),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");

    // Simulate natural thinking delay (memory lives in a ref: always fresh)
    setTimeout(() => {
      const { message, ctx } = generateAnswer(query, chatCtxRef.current);
      chatCtxRef.current = ctx;
      setMessages((prev) => [...prev, message]);
    }, 320);
  };

  // Answer engine: concise, formal-natural replies grounded only in
  // portfolio data (lib/data). She/her throughout. Remembers the last
  // discussed project so follow-ups ("tell me more", "its tech stack") work.
  const generateAnswer = (
    rawQuery: string,
    ctx: ChatCtx,
  ): { message: ChatMessage; ctx: ChatCtx } => {
    const q = normQuery(rawQuery);
    const Q = ` ${q} `;
    const id = createMessageId("bot");
    // Single words match whole-word only ("it" must not match "with").
    const has = (...ws: string[]) =>
      ws.some((w) => (w.includes(" ") ? q.includes(w) : Q.includes(` ${w} `)));
    const say = (
      text: string,
      action?: ChatMessage["action"],
      next: ChatCtx = {},
    ): { message: ChatMessage; ctx: ChatCtx } => ({
      message: { id, sender: "bot", text, action },
      ctx: next,
    });
    const projectLink = (p: ProjectItem) => ({
      label: "View in Projects",
      href: `/projects?q=${encodeURIComponent(p.title)}`,
    });
    const refersToLast =
      has("it", "this", "that", "project") || q.includes("this one") || q.includes("that one");

    const findProject = (): ProjectItem | null => {
      for (const a of PROJECT_ALIASES) {
        if (a.keys.some((k) => q.includes(k))) {
          const p = projects.find((pp) => pp.slug === a.slug);
          if (p) return p;
        }
      }
      if (q.includes("power bi")) {
        return projects.find((p) => p.slug === "power-bi-data-analytics") ?? null;
      }
      return null;
    };

    const projectIntro = (p: ProjectItem): string => {
      const topTools = (p.toolsList ?? []).slice(0, 3).join(", ");
      return (
        `${p.title} (${p.year}) is her ${p.category} project — ${p.subtitle}. ` +
        `She served as ${p.role}.` +
        (topTools ? ` It was built with ${topTools}.` : "")
      );
    };

    // 0. Greeting only (lets "hi, tell me about…" fall through to intents)
    if (/^(hi+|hello|hey|good ?morning|good ?afternoon|good ?evening|yo|sup|howdy|greetings)\b/.test(q) && q.length < 24) {
      return say("Hello! Ask me about her projects, tools, education, resume, or contact details.");
    }

    // 1. Follow-ups about the last discussed project
    const last = ctx.project ?? null;
    if (last) {
      if (q.length < 48 && /^(tell me )?more|more details|^details|go on|continue|what else|elaborate|and then/.test(q)) {
        const feats = (last.features ?? [])
          .slice(0, 2)
          .map((f) => f.split(":")[0].trim())
          .filter(Boolean);
        const extra = last.client
          ? ` The client was ${last.client}.`
          : last.subject
            ? ` It was her ${last.subject} project.`
            : "";
        return say(
          `On ${last.title}, she served as ${last.role}.` +
            (feats.length ? ` Highlights include ${feats.join(" and ")}.` : "") +
            extra,
          projectLink(last),
          ctx,
        );
      }
      if (has("tech", "stack", "tool", "tools", "technology", "technologies", "built with", "made with", "language", "framework", "database")) {
        const list = (last.toolsList ?? []).join(", ");
        return say(
          list ? `For ${last.title}, she used ${list}.` : `The portfolio does not list a tech stack for ${last.title}.`,
          { label: "Explore all tools", href: "/tools" },
          ctx,
        );
      }
      if (has("role", "position") || (refersToLast && has("she", "her") && has("do", "did", "work", "handle"))) {
        return say(
          `On ${last.title}, her role was ${last.role}${last.client ? `, for ${last.client}` : ""}.`,
          projectLink(last),
          ctx,
        );
      }
      if (has("client", "customer") || (has("who") && has("for"))) {
        const who = last.client
          ? `${last.client} is the client behind ${last.title}.`
          : last.subject
            ? `${last.title} is an academic project for ${last.subject}.`
            : `${last.title} is a self-driven academic project.`;
        return say(who, projectLink(last), ctx);
      }
      if (refersToLast && has("about", "what", "describe", "summary", "overview", "background")) {
        const desc = last.description.length > 240 ? `${last.description.slice(0, 240).trim()}…` : last.description;
        return say(desc, projectLink(last), ctx);
      }
    }

    // 2. Specific project (also catches "tell me about Gray Cafe" shortcuts)
    const matched = findProject();
    if (matched) {
      return say(projectIntro(matched), projectLink(matched), { project: matched });
    }

    // 3. Resume / CV (existing PDF)
    if (has("resume", "resumes", "cv", "cvs", "curriculum vitae") || (has("download", "pdf", "file", "copy") && has("resume", "cv"))) {
      return say("You can view or download her complete resume (PDF) here:", {
        label: "Open Resume PDF ↗",
        href: "/projects/Nemoto-Yukari-Tenshi-Resume.pdf",
        external: true,
      });
    }

    // 4. Contact (existing info only)
    if (has("contact", "email", "e mail", "mail", "reach", "get in touch", "message", "hire", "phone", "mobile", "telephone", "touch base")) {
      return say(
        `She welcomes project, internship, and freelance inquiries at ${profile.email}, and usually replies within a day.`,
        { label: "Go to Contact Form", href: "/contact" },
      );
    }

    // 5. Tools & tech stack (from portfolio data)
    const toolNames = tools.map((t) => t.name.toLowerCase());
    const extraTech = ["php", "sql", "dax", "excel", "html", "css", "javascript", "postgresql", "supabase"];
    if (has("tool", "tools", "tech", "stack", "technology", "technologies", "software", "skill", "skills", "proficient", "uses", "using", "use", "familiar") || toolNames.some((n) => q.includes(n)) || extraTech.some((t) => Q.includes(` ${t} `))) {
      return say(
        "Her core stack is Next.js, React, and TypeScript with Supabase, PostgreSQL, and MySQL; Power BI with DAX for analytics; and Figma, Photoshop, and Lightroom for design and media.",
        { label: "Explore Tech Stack & Tools", href: "/tools" },
      );
    }

    // 6. Education & location
    if (has("bulacan")) {
      return say(
        "She studies at Bulacan State University – Bustos Campus and is based in Bulacan, Philippines (GMT+8).",
        { label: "View Education & Background", href: "/about" },
      );
    }
    if (has("education", "school", "schools", "college", "university", "universities", "campus", "degree", "major", "bsit", "study", "studies", "studying", "student", "students", "academic", "humss", "senior high")) {
      return say(
        "She is a 4th-year BSIT student majoring in Business & Data Analytics at Bulacan State University – Bustos Campus, where she also completes client and capstone system projects.",
        { label: "View Education & Background", href: "/about" },
      );
    }
    if (has("where") && has("live", "lives", "based", "from", "location", "located")) {
      return say("She is based in Bulacan, Philippines (GMT+8).", {
        label: "Go to Contact Form",
        href: "/contact",
      });
    }
    if (q.includes("how old") || (has("age", "old") && has("she", "her", "yukari"))) {
      return say("She is 20 years old.");
    }

    // 7. Experience (portfolio-grounded only)
    if (has("experience", "experienced", "internship", "internships", "intern", "freelance", "freelancer", "career", "employed", "job", "jobs")) {
      return say(
        "As a final-year student, her experience comes from client and capstone work — including the Teacher Anne Playschool system and the Ayumi Rich merchandise prototype — plus freelance photography and editing.",
        { label: "View Education & Background", href: "/about" },
      );
    }

    // 8. Services & pricing
    if (has("service", "services", "pricing", "price", "prices", "cost", "rate", "rates", "commission", "photo", "photos", "photography", "edit", "edits", "editing", "video", "videos", "shoot", "design", "website", "websites")) {
      return say(
        "She offers photography, photo and video editing, and small business websites. Rates are not listed, so the fastest path is the contact page.",
        { label: "Go to Contact Form", href: "/contact" },
      );
    }

    // 9. About Yukari
    if (
      has("who is", "who are", "about", "introduce", "introduction", "herself", "background", "biography", "yukari") ||
      q === "she" || q === "her"
    ) {
      return say(
        "Yukari is a 4th-year BSIT student majoring in Business & Data Analytics. She designs and builds web systems and analytics dashboards, and freelances in photography and creative media.",
        { label: "Explore Her Story", href: "/about" },
      );
    }

    // 10. Projects overview (built from data — count and titles stay truthful)
    if (has("project", "projects", "portfolio", "work", "works", "built", "build", "client", "clients")) {
      if (has("together", "with you", "with her", "collaborate", "collaboration")) {
        return say(`She is open to project work — reach her at ${profile.email} or through the contact form.`, {
          label: "Go to Contact Form",
          href: "/contact",
        });
      }
      const items = projects.map((p) => `${p.title} (${p.category})`);
      const list = items.length > 1 ? `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}` : items[0] ?? "";
      return say(`She has ${projects.length} featured projects: ${list}. Which one would you like to see?`, {
        label: "View All Projects",
        href: "/projects",
      });
    }

    // 11. Thanks / goodbye
    if (has("thank", "thanks", "bye", "goodbye", "goodnight")) {
      return say("You're welcome! Let me know if you'd like to see her projects or tools.");
    }

    // 12. Fallback — concise, no invention
    return {
      message: {
        id,
        sender: "bot",
        text: "I can answer questions about her projects, tools, education, resume, and contact details. What would you like to explore?",
        action: {
          label: "View Selected Works",
          onClick: () => {
            const el = document.getElementById("featured-projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            handleClose();
          },
        },
      },
      ctx: {},
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
    <div className="safe-pb fixed inset-x-3 bottom-3 z-50 flex flex-col items-end sm:inset-x-auto sm:bottom-6 sm:right-6">
      {/* 1. CHATBOT PANEL */}
      {isOpen && (
        <div
          ref={panelRef}
          className="mb-3.5 flex flex-col w-full sm:w-[380px] h-[78dvh] sm:h-[500px] sm:max-h-[82vh] overflow-hidden rounded-3xl sm:rounded-2xl border border-line/80 bg-card/95 shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl ring-1 ring-line"
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
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-tile hover:text-ink sm:size-7"
                aria-label="Reset chat"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleClose}
                title="Close chat"
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-tile hover:text-ink sm:size-7"
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
                      : "bg-tile/80 border border-line/70 text-ink rounded-bl-xs",
                  )}
                >
                  <p className="whitespace-pre-line text-[11.5px] leading-relaxed">{msg.text}</p>
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-line/60">
                      {msg.action.href ? (
                        <Link
                          href={msg.action.href}
                          target={msg.action.external ? "_blank" : undefined}
                          rel={msg.action.external ? "noopener noreferrer" : undefined}
                          onClick={!msg.action.external ? handleClose : undefined}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue hover:underline"
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
                  className="shrink-0 cursor-pointer rounded-full border border-line bg-tile/90 px-3 py-2 text-xs font-medium text-muted transition-all hover:border-blue/50 hover:bg-tile hover:text-ink active:scale-95 sm:px-2.5 sm:py-1 sm:text-[10.5px]"
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
              enterKeyHint="send"
              autoComplete="off"
              className="min-h-[44px] flex-1 rounded-xl border border-line bg-tile/50 px-3 py-2 text-base text-ink placeholder:text-muted focus:border-blue focus:outline-none sm:text-xs"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue text-white transition-opacity disabled:opacity-35 hover:opacity-95 sm:size-8"
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
        <div className="relative shrink-0">
          <ChibiMascot
            variant="chatbot"
            size={48}
            interactive={true}
            onClick={handleOpen}
            tooltipText={isOpen ? "Close Assistant" : "Chat with Yukari's Assistant"}
            className="shrink-0 transition-transform hover:scale-110 active:scale-95 max-lg:scale-110 max-lg:origin-bottom-right"
          />
        </div>
      </div>
    </div>
  );
}
