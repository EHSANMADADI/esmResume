"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Server,
  Sparkles,
  Layers3,
  Moon,
  Sun,
} from "lucide-react";

// ==========================================
// Translations (Fa / En)
// ==========================================
const translations = {
  fa: {
    nav: {
      about: "معرفی",
      experience: "سوابق شغلی",
      education: "تحصیلات",
      skills: "مهارت‌ها",
      projects: "پروژه‌ها",
      contact: "ارتباط با من",
    },
    common: {
      next: "بعدی",
      prev: "قبلی",
      viewExperience: "ادامه",
      role: "توسعه‌دهنده فول‌استک · لید تیم فرانت‌اند",
    },
    about: {
      greeting: "سلام، من",
      name: "احسان مددی",
      status: "آماده همکاری روی پروژه‌های تازه",
      description:
        "توسعه‌دهنده فول‌استک و لید تیم فرانت‌اند هستم. محصولاتی می‌سازم که کاربرانشان از استفاده‌شان لذت ببرند و کسب‌وکارها بتوانند به آن‌ها تکیه کنند: از رابط کاربری سریع با React و Next.js تا بک‌اند پایدار با Node.js و MongoDB. تجربه ساخت سامانه‌های سازمانی و یکپارچه‌سازی هوش مصنوعی (OCR، ASR و RAG) را دارم و می‌دانم چطور یک ایده را مرحله‌به‌مرحله، شفاف و بدون سردرگمی به محصولی آماده انتشار تبدیل کنم.",
      chip1: "از ایده تا اجرا",
      chip2: "Full-Stack",
      stats: [
        { value: "۲", label: "سازمان" },
        { value: "۳", label: "حوزه پروژه" },
        { value: "۳", label: "سرویس هوش مصنوعی" },
      ],
    },
    experience: {
      eyebrow: "تجربه کاری",
      title: "مسیر حرفه‌ای",
      desc: "از توسعه رابط کاربری تا رهبری تیم فرانت‌اند و ورود به دنیای بک‌اند.",
      jobs: [
        {
          year: "۱ سال",
          title: "Front-End Developer",
          company: "شرکت JTD",
          website: "https://jtd.ir/",
          websiteLabel: "مشاهده وب‌سایت ",
          description:
            "عضوی از تیم توسعه وب بودم و پروژه‌های سازمانی مختلف را با React پیاده‌سازی می‌کردم. تمرکزم روی ساخت رابط‌های کاربری، پیاده‌سازی قابلیت‌های موردنیاز و همکاری نزدیک با تیم بود.",
          tags: ["React.js", "JavaScript", "Web Applications", "Teamwork"],
        },
        {
          year: "۱۴۰۳ — اکنون",
          title: "Front-End Team Lead & Back-End Developer",
          company: "شرکت فناوران پارس تدبیر شریف",
          website: "https://fanpars.ir/",
          websiteLabel: "مشاهده وب‌سایت ",
          description:
            "از عضویت در تیم فرانت‌اند شروع کردم و بعد مسئولیت لید تیم را پذیرفتم. با توجه به نیاز شرکت و علاقه‌ام وارد بک‌اند شدم و در کنار مسئولیت‌های فرانت‌اند، در توسعه API، سرویس‌های سمت سرور، مدیریت داده و یکپارچه‌سازی سرویس‌ها مشارکت دارم.",
          tags: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
        },
      ],
      skills: [
        { title: "سامانه‌های هوشمند", text: "تجربه کار با OCR، ASR، RAG و سرویس‌های پردازش متن" },
        { title: "تیم لید فرانت", text: "هماهنگی پیاده‌سازی، حفظ کیفیت کد و پیشبرد کار تیم" },
        { title: "توسعه بک‌اند", text: "طراحی API، مدیریت داده و اتصال سرویس‌های نرم‌افزاری" },
      ],
    },
    education: {
      eyebrow: "پیشینه علمی",
      title: "تحصیلات",
      desc: "پایه مهندسی کامپیوتر؛ جایی که نگاه الگوریتمی و اصول مهندسی نرم‌افزار شکل گرفت.",
      degree: "کارشناسی",
      field: "مهندسی کامپیوتر",
      university: "دانشگاه صنعتی قم",
      status: "Bachelor of Science",
    },
    skills: {
      eyebrow: "ابزارها و فناوری‌ها",
      title: "مهارت‌های فنی",
      desc: "فناوری‌هایی که در توسعه و یکپارچه‌سازی محصولات نرم‌افزاری با آن‌ها کار کرده‌ام.",
    },
    projects: {
      eyebrow: "نمونه کارها",
      title: "پروژه‌ها",
      desc: "نگاهی به حوزه‌هایی که در آن‌ها محصول ساخته‌ام؛ از سامانه‌های هوشمند تا وب‌اپلیکیشن‌های سازمانی.",
      items: [
        {
          title: "Sarir AI Platform",
          category: "هوش مصنوعی و ابزارهای سازمانی",
          description:
            "مشارکت در توسعه و یکپارچه‌سازی قابلیت‌های هوش مصنوعی، پردازش اسناد و فایل‌ها و سرویس‌هایی مانند OCR، ASR و RAG در یک سامانه نرم‌افزاری.",
        },
        {
          title: "Nourya",
          category: "سلامت و گردشگری",
          description:
            "مشارکت در توسعه یک پروژه در حوزه سلامت و گردشگری، با تمرکز بر تجربه کاربری مناسب و پیاده‌سازی قابلیت‌های وب محصول.",
        },
        {
          title: "Enterprise Web Applications",
          category: "سامانه‌های سازمانی",
          description:
            "پیاده‌سازی پروژه‌های سازمانی در تیم وب شرکت JTD و توسعه رابط‌های کاربری با React متناسب با نیاز هر پروژه.",
        },
      ],
    },
    contact: {
      eyebrow: "ارتباط",
      title: "ایده‌ای دارید؟ بیایید آن را به محصول تبدیل کنیم",
      desc: "چه یک رابط کاربری تازه لازم داشته باشید، چه بک‌اند یا یکپارچه‌سازی هوش مصنوعی، خوشحال می‌شوم درباره‌اش گفت‌وگو کنیم. یک پیام کوتاه برای شروع کافی است.",
      emailHint: "ارسال ایمیل مستقیم",
      githubHint: "مشاهده پروفایل و پروژه‌ها",
      footer: "پاسخ‌گوی پیشنهادهای همکاری و پروژه‌های جدید",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    common: {
      next: "Next",
      prev: "Prev",
      viewExperience: "Continue",
      role: "Full-Stack Developer · Front-End Team Lead",
    },
    about: {
      greeting: "HELLO, I'M",
      name: "Ehsan Madadi",
      status: "Open to new projects & collaborations",
      description:
        "I'm a full-stack developer and front-end team lead. I build products that users enjoy and businesses can rely on: fast interfaces with React and Next.js, backed by stable services in Node.js and MongoDB. I've worked on enterprise systems and AI-powered features (OCR, ASR and RAG), and I know how to take an idea from first sketch to a launch-ready product, step by step and with clear communication.",
      chip1: "Idea to Execution",
      chip2: "Full-Stack",
      stats: [
        { value: "2", label: "Organizations" },
        { value: "3", label: "Project Domains" },
        { value: "3", label: "AI Services" },
      ],
    },
    experience: {
      eyebrow: "CAREER JOURNEY",
      title: "Experience",
      desc: "From building interfaces to leading a front-end team and stepping into the back end.",
      jobs: [
        {
          year: "1 Year",
          title: "Front-End Developer",
          company: "JTD Company",
          website: "https://jtd.ir/",
          websiteLabel: "Visit company website",
          description:
            "Part of the web development team, implementing a range of enterprise projects with React. I focused on building interfaces, delivering required features and collaborating closely with the team.",
          tags: ["React.js", "JavaScript", "Web Applications", "Teamwork"],
        },
        {
          year: "2024 — Present",
          title: "Front-End Team Lead & Back-End Developer",
          company: "Pars Tadbir Sharif Technologies",
          website: "https://fanpars.ir/",
          websiteLabel: "Visit company website",
          description:
            "Started as a front-end team member, then took on the Front-End Team Lead role. Guided by company needs and my own interest, I moved into the back end too, contributing to API design, server-side services, data management and service integration.",
          tags: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
        },
      ],
      skills: [
        { title: "Smart Systems", text: "Hands-on with OCR, ASR, RAG and text processing services." },
        { title: "Front-End Leadership", text: "Coordinating implementation, keeping code quality high and moving the team forward." },
        { title: "Back-End Dev", text: "API design, data management and software service integration." },
      ],
    },
    education: {
      eyebrow: "EDUCATION",
      title: "Education",
      desc: "A computer engineering foundation, where algorithmic thinking and software engineering principles took shape.",
      degree: "Bachelor's",
      field: "Computer Engineering",
      university: "Qom University of Technology",
      status: "Bachelor of Science",
    },
    skills: {
      eyebrow: "TECH STACK",
      title: "Technical Skills",
      desc: "Technologies I've used to build and integrate software products.",
    },
    projects: {
      eyebrow: "SELECTED WORK",
      title: "Projects",
      desc: "A look at the domains where I've built products, from smart systems to enterprise web apps.",
      items: [
        {
          title: "Sarir AI Platform",
          category: "AI & Enterprise Tools",
          description:
            "Contributed to developing and integrating AI features, document and file processing, and services such as OCR, ASR and RAG into one software platform.",
        },
        {
          title: "Nourya",
          category: "Health & Tourism",
          description:
            "Contributed to a health and tourism project, focusing on a solid user experience and the web functionality the product needed.",
        },
        {
          title: "Enterprise Web Apps",
          category: "Enterprise Systems",
          description:
            "Implemented enterprise projects within the JTD web team, building React interfaces tailored to each project's needs.",
        },
      ],
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      title: "Have an idea? Let's turn it into a product.",
      desc: "Whether you need a polished front end, a solid back end, or AI woven into your product, I'd love to hear about it. A short message is all it takes to start.",
      emailHint: "Send a direct email",
      githubHint: "View profile and projects",
      footer: "Open to collaboration offers and new projects",
    },
  },
};

const transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 55 : -55,
    opacity: 0,
    scale: 0.985,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -45 : 45,
    opacity: 0,
    scale: 0.99,
  }),
};

export default function Resume() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const reduceMotion = useReducedMotion();
  const t = translations[lang];

  const sections = [
    { id: "about", title: t.nav.about },
    { id: "experience", title: t.nav.experience },
    { id: "education", title: t.nav.education },
    { id: "skills", title: t.nav.skills },
    { id: "projects", title: t.nav.projects },
    { id: "contact", title: t.nav.contact },
  ];

  const toggleLang = () => setLang((prev) => (prev === "fa" ? "en" : "fa"));
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // اعمال تم روی <html> تا body و کل صفحه هم تغییر کنند
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
  }, [lang]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= sections.length || index === currentSection) return;
      setDirection(index > currentSection ? 1 : -1);
      setCurrentSection(index);
    },
    [currentSection, sections.length],
  );

  const next = useCallback(() => {
    setCurrentSection((current) => {
      if (current >= sections.length - 1) return current;
      setDirection(1);
      return current + 1;
    });
  }, [sections.length]);

  const previous = useCallback(() => {
    setCurrentSection((current) => {
      if (current <= 0) return current;
      setDirection(-1);
      return current - 1;
    });
  }, []);

  useEffect(() => {
    // در حالت راست‌به‌چپ، جهت کلیدهای چپ/راست برعکس می‌شود
    const nextKeys =
      lang === "fa" ? ["ArrowDown", "ArrowLeft", "PageDown"] : ["ArrowDown", "ArrowRight", "PageDown"];
    const prevKeys =
      lang === "fa" ? ["ArrowUp", "ArrowRight", "PageUp"] : ["ArrowUp", "ArrowLeft", "PageUp"];

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      )
        return;

      if (nextKeys.includes(event.key)) {
        event.preventDefault();
        next();
      } else if (prevKeys.includes(event.key)) {
        event.preventDefault();
        previous();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous, lang]);

  const motionProps = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, x: 0, scale: 1 } }
    : {};

  return (
    <div className={`app-root ${theme} ${lang === "fa" ? "dir-rtl" : "dir-ltr"}`}>
      <style>{`
        :root,
        html.light {
          --neu-bg: #e0e5ec;
          --neu-shadow-1: #a3b1c6;
          --neu-shadow-2: #ffffff;
          --glass-bg: rgba(255, 255, 255, 0.45);
          --glass-border: rgba(255, 255, 255, 0.7);
          --text-primary: #1e293b;
          --text-secondary: #475569;
          --accent: #4f46e5;
          --accent-shadow: rgba(79, 70, 229, 0.3);
          --accent-shadow-hover: rgba(79, 70, 229, 0.4);
          --grad-a: #4f46e5;
          --grad-b: #0ea5e9;
          --btn-a: #4f46e5;
          --btn-b: #0284c7;
          /* Orbit */
          --orbit-line: rgba(79, 70, 229, 0.28);
          --orbit-dot: #6366f1;
          --orbit-dot-glow: rgba(99, 102, 241, 0.55);
        }

        html.dark,
        .app-root.dark {
          --neu-bg: #0f172a;
          --neu-shadow-1: #070a13;
          --neu-shadow-2: #1c2742;
          --glass-bg: rgba(15, 23, 42, 0.55);
          --glass-border: rgba(255, 255, 255, 0.08);
          --text-primary: #f8fafc;
          --text-secondary: #94a3b8;
          --accent: #818cf8;
          --accent-shadow: rgba(99, 102, 241, 0.35);
          --accent-shadow-hover: rgba(99, 102, 241, 0.5);
          --grad-a: #a5b4fc;
          --grad-b: #38bdf8;
          --btn-a: #6366f1;
          --btn-b: #0ea5e9;
          /* Orbit: در تم دارک روشن‌تر و واضح‌تر */
          --orbit-line: rgba(129, 140, 248, 0.45);
          --orbit-dot: #a5b4fc;
          --orbit-dot-glow: rgba(165, 180, 252, 0.8);
        }

        html,
        body {
          background-color: var(--neu-bg);
          color: var(--text-primary);
          margin: 0;
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        .app-root {
          min-height: 100vh;
          background-color: var(--neu-bg);
          color: var(--text-primary);
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        .dir-rtl { direction: rtl; }
        .dir-ltr { direction: ltr; }

        /* فاصله حروف در فارسی باعث جدا شدن حروف می‌شود */
        .dir-rtl .tracking-fix { letter-spacing: 0 !important; }

        svg { color: inherit; }

        /* ---------- Panels ---------- */
        .neu-glass-panel {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          box-shadow:
            12px 12px 24px var(--neu-shadow-1),
            -12px -12px 24px var(--neu-shadow-2),
            inset 0 1px 1px var(--glass-border);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, translate 0.3s ease;
        }

        /* از خاصیت translate استفاده شده تا با transform فریمر موشن تداخل نکند */
        .hover-lift:hover { translate: 0 -4px; }
        .hover-lift:hover {
          border-color: var(--accent);
        }

        .neu-glass-button {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            6px 6px 12px var(--neu-shadow-1),
            -6px -6px 12px var(--neu-shadow-2);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          color: var(--text-primary);
        }
        .neu-glass-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            8px 8px 16px var(--neu-shadow-1),
            -8px -8px 16px var(--neu-shadow-2);
        }
        .neu-glass-button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow:
            inset 4px 4px 8px var(--neu-shadow-1),
            inset -4px -4px 8px var(--neu-shadow-2);
        }

        .neu-glass-chip {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          box-shadow:
            4px 4px 10px var(--neu-shadow-1),
            -4px -4px 10px var(--neu-shadow-2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--text-primary);
        }

        .primary-btn {
          background: linear-gradient(135deg, var(--btn-a), var(--btn-b));
          color: #fff;
          box-shadow:
            6px 6px 16px var(--accent-shadow),
            -4px -4px 12px var(--neu-shadow-2);
          border: none;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.3s;
        }
        .primary-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow:
            8px 8px 20px var(--accent-shadow-hover),
            -4px -4px 12px var(--neu-shadow-2);
        }

        .gradient-text {
          background: linear-gradient(90deg, var(--grad-a), var(--grad-b));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .nav-link-active {
          box-shadow:
            inset 3px 3px 6px var(--neu-shadow-1),
            inset -3px -3px 6px var(--neu-shadow-2);
          background: rgba(0,0,0,0.03);
        }
        .dark .nav-link-active { background: rgba(255,255,255,0.03); }

        .profile-core {
          background: var(--neu-bg);
          box-shadow:
            inset 8px 8px 16px var(--neu-shadow-1),
            inset -8px -8px 16px var(--neu-shadow-2);
          border: 2px solid var(--glass-border);
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }

        /* ---------- Orbit (گوشه بالا-راست، کمی بیرون از صفحه) ---------- */
        .orbit {
          position: absolute;
          /* right و top فیزیکی هستند و در RTL هم همان گوشه راست می‌مانند */
          right: clamp(-300px, -14vw, -60px);
          top: -4%;
          width: min(70vw, 620px);
          height: min(70vw, 620px);
          border-radius: 50%;
          pointer-events: none;
        }
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--orbit-line);
        }
        .orbit-ring-1 {
          inset: 0;
          border-style: dashed;
          animation: orbit-spin 95s linear infinite;
        }
        .orbit-ring-2 {
          inset: 20% 0;
          animation: orbit-spin-rev 70s linear infinite;
        }
        .orbit-ring-3 {
          inset: 0 20%;
          animation: orbit-spin 120s linear infinite;
        }
        .orbit-ring-4 {
          inset: 14%;
          border-style: dotted;
          animation: orbit-spin-rev 150s linear infinite;
        }
        .orbit-dot {
          position: absolute;
          top: -5px;
          left: 50%;
          width: 10px;
          height: 10px;
          margin-left: -5px;
          border-radius: 50%;
          background: var(--orbit-dot);
          box-shadow: 0 0 16px 3px var(--orbit-dot-glow);
        }
        .orbit-dot-sm {
          width: 7px;
          height: 7px;
          top: -3.5px;
          margin-left: -3.5px;
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring { animation: none !important; }
        }

        /* ---------- Ambient Glows ---------- */
        .ambient-glow-one {
          background: radial-gradient(circle, rgba(147, 197, 253, 0.45), transparent 70%);
        }
        .ambient-glow-two {
          background: radial-gradient(circle, rgba(196, 181, 253, 0.45), transparent 70%);
        }
        .dark .ambient-glow-one {
          background: radial-gradient(circle, rgba(99, 102, 241, 0.22), transparent 70%);
        }
        .dark .ambient-glow-two {
          background: radial-gradient(circle, rgba(56, 189, 248, 0.18), transparent 70%);
        }
      `}</style>

      <main className="relative isolate min-h-screen overflow-x-clip">
        {/* Background: glows + orbit */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="ambient-glow-one absolute -right-28 -top-32 h-[30rem] w-[30rem] rounded-full blur-[80px]" />
          <div className="ambient-glow-two absolute -bottom-40 -left-32 h-[35rem] w-[35rem] rounded-full blur-[80px]" />

          <div className="orbit">
            <div className="orbit-ring orbit-ring-1">
              <span className="orbit-dot" />
            </div>
            <div className="orbit-ring orbit-ring-2">
              <span className="orbit-dot orbit-dot-sm" />
            </div>
            <div className="orbit-ring orbit-ring-3">
              <span className="orbit-dot orbit-dot-sm" />
            </div>
            <div className="orbit-ring orbit-ring-4" />
          </div>
        </div>

        {/* Header */}
        <header className="relative z-20 px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
          <div className="neu-glass-panel mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(0)}
                className="neu-glass-button cursor-pointer flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black tracking-wide"
                aria-label="Home"
              >
                EM
              </button>

              <div className="hidden text-left sm:block" dir="ltr">
                <p className="text-xs font-bold text-[var(--text-primary)]">Ehsan Madadi</p>
                <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">Software Developer</p>
              </div>
            </div>

            <nav className="hidden items-center gap-2 md:flex" aria-label="Navigation">
              {sections.map((section, index) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => goTo(index)}
                  className={`rounded-xl px-4 py-2 text-sm md:text-base font-semibold cursor-pointer transition-all ${
                    currentSection === index
                      ? "nav-link-active text-[var(--text-primary)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border-r border-[var(--glass-border)] pr-3 rtl:border-l rtl:border-r-0 rtl:pl-3 rtl:pr-0">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="neu-glass-button cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold"
                  title="Toggle Language"
                >
                  {lang === "fa" ? "EN" : "FA"}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="neu-glass-button cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg"
                  title="Toggle Theme"
                >
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-7xl items-center px-4 pb-28 pt-8 sm:px-6 lg:px-10">
          <div className="w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={sections[currentSection].id}
                custom={direction}
                variants={slideVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? undefined : "exit"}
                transition={transition}
                className="w-full"
                {...motionProps}
              >
                {currentSection === 0 && <AboutSection t={t} onExplore={() => goTo(1)} />}
                {currentSection === 1 && <ExperienceSection t={t} />}
                {currentSection === 2 && <EducationSection t={t} />}
                {currentSection === 3 && <SkillsSection t={t} />}
                {currentSection === 4 && <ProjectsSection t={t} />}
                {currentSection === 5 && <ContactSection t={t} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-10">
          <div className="neu-glass-panel mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <button
              type="button"
              onClick={previous}
              disabled={currentSection === 0}
              className="neu-glass-button cursor-pointer flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
            >
              {lang === "fa" ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}
              <span className="hidden sm:inline">{t.common.prev}</span>
            </button>

            <div className="flex items-center gap-2" dir="ltr">
              <span className="ml-1 text-xs font-bold tabular-nums text-[var(--text-secondary)]">
                {String(currentSection + 1).padStart(2, "0")}
              </span>
              {sections.map((section, index) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => goTo(index)}
                  className="flex h-5 items-center cursor-pointer px-1"
                  aria-label={section.title}
                >
                  <motion.span
                    animate={{
                      width: currentSection === index ? 24 : 8,
                      opacity: currentSection === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                    className="block h-1.5 rounded-full bg-[var(--text-primary)]"
                  />
                </button>
              ))}
              <span className="mr-1 text-xs font-bold tabular-nums text-[var(--text-secondary)] opacity-50">
                {String(sections.length).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={next}
              disabled={currentSection === sections.length - 1}
              className="neu-glass-button cursor-pointer flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
            >
              <span className="hidden sm:inline">
                {currentSection === 0 ? t.common.viewExperience : t.common.next}
              </span>
              {lang === "fa" ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ==========================================
// Sub-Components
// ==========================================

function AboutSection({ onExplore, t }: { onExplore: () => void; t: any }) {
  const highlights = [
    { icon: <Code2 size={16} />, label: "React / Next.js" },
    { icon: <Server size={16} />, label: "Node.js / Express" },
    { icon: <BrainCircuit size={16} />, label: "AI Integration" },
    { icon: <Database size={16} />, label: "MongoDB" },
  ];

  return (
    <section className="grid min-h-[65vh] items-center gap-10 py-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="order-2 flex justify-center lg:order-1"
      >
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
          <div className="absolute inset-5 rounded-full border border-[var(--glass-border)] opacity-30" />

          <div className="neu-glass-panel relative flex h-52 w-52 items-center justify-center rounded-full sm:h-72 sm:w-72">
            <div className="profile-core relative flex h-48 w-48 flex-col items-center justify-center rounded-full overflow-hidden sm:h-[16.5rem] sm:w-[16.5rem]">
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <span className="gradient-text text-5xl font-black tracking-tight sm:text-7xl">EM</span>
                <span className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--text-secondary)]" dir="ltr">
                  DEVELOPER
                </span>
              </div>
              <img
                src="/EhsanMadadi.jpg"
                alt="Profile"
                className="absolute inset-0 h-full w-full object-cover z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Chip: Full-Stack */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="neu-glass-chip absolute -bottom-2 -left-2 z-20 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold"
          >
            <Code2 size={15} className="text-sky-500" />
            {t.about.chip2}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12 }}
        className="order-1 text-center lg:order-2 rtl:lg:text-right ltr:lg:text-left"
      >
        <div className="neu-glass-chip mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.about.status}
        </div>

        <p className="tracking-fix mb-2 text-sm font-semibold tracking-[0.22em] text-[var(--text-secondary)]">
          {t.about.greeting}
        </p>
        <h1 className="gradient-text pb-1 text-4xl font-black tracking-tight sm:text-6xl xl:text-7xl">
          {t.about.name}
        </h1>
        <h2 className="mt-4 text-lg font-bold text-[var(--text-secondary)] sm:text-2xl">
          {t.common.role}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[var(--text-secondary)] sm:text-base sm:leading-9 lg:mx-0">
          {t.about.description}
        </p>

       

        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="neu-glass-chip flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold"
            >
              {item.icon}
              <span dir="ltr">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <button
            type="button"
            onClick={onExplore}
            className="primary-btn cursor-pointer inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
          >
            {t.common.viewExperience}
            <ArrowDown size={17} />
          </button>
          <a
            href="https://github.com/EHSANMADADI"
            target="_blank"
            rel="noreferrer"
            className="neu-glass-button cursor-pointer inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
          >
            <Code2 size={17} />
            GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function SectionHeading({ icon, eyebrow, title, description }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="neu-glass-panel mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-[var(--accent)]">
        {icon}
      </div>
      <p className="tracking-fix text-[10px] font-bold tracking-[0.32em] text-[var(--accent)] sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
    </motion.div>
  );
}

function ExperienceSection({ t }: { t: any }) {
  return (
    <section className="py-3">
      <SectionHeading
        icon={<BriefcaseBusiness size={28} />}
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
        description={t.experience.desc}
      />

      <div className="mx-auto mt-8 max-w-4xl space-y-6">
        {t.experience.jobs.map((job: any, index: number) => (
          <TimelineCard key={job.title} job={job} index={index} />
        ))}

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <SmallExperience
            icon={<BrainCircuit size={24} />}
            title={t.experience.skills[0].title}
            text={t.experience.skills[0].text}
            index={0}
          />
          <SmallExperience
            icon={<Layers3 size={24} />}
            title={t.experience.skills[1].title}
            text={t.experience.skills[1].text}
            index={1}
          />
          <SmallExperience
            icon={<Server size={24} />}
            title={t.experience.skills[2].title}
            text={t.experience.skills[2].text}
            index={2}
          />
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ job, index }: { job: any; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="neu-glass-panel hover-lift relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="absolute bottom-0 right-0 top-0 w-1.5 bg-gradient-to-b from-sky-400 via-indigo-500 to-violet-500 rtl:right-0 rtl:left-auto ltr:left-0 ltr:right-auto" />
      <div className="ml-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 rtl:ml-0 rtl:mr-3">
        <span className="neu-glass-chip inline-flex w-fit shrink-0 rounded-xl px-4 py-2 text-xs font-bold text-[var(--accent)]">
          {job.year}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-black text-[var(--text-primary)] sm:text-2xl" dir="ltr">
            {job.title}
          </h3>
          <p className="mt-1 font-bold text-[var(--text-secondary)]">{job.company}</p>

          {job.website && (
            <a
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${job.websiteLabel}: ${job.company}`}
              className="group/company-link mt-3 inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3.5 py-2 text-xs font-bold text-[var(--accent)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              dir="auto"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--neu-bg)] shadow-[inset_2px_2px_5px_var(--neu-shadow-1),inset_-2px_-2px_5px_var(--neu-shadow-2)] transition-transform duration-300 group-hover/company-link:scale-105">
                <ExternalLink size={14} />
              </span>
              <span>{job.websiteLabel}</span>
              <span className="mx-1 h-3.5 w-px bg-[var(--glass-border)]" />
              <span className="font-semibold opacity-80" dir="ltr">
                {new URL(job.website).hostname.replace(/^www\./, "")}
              </span>
            </a>
          )}

          <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{job.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {job.tags.map((tag: string) => (
              <span key={tag} className="neu-glass-chip rounded-lg px-3 py-1.5 text-[11px] font-bold" dir="ltr">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SmallExperience({ icon, title, text, index }: any) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.09, duration: 0.45 }}
      className="neu-glass-panel hover-lift flex flex-col items-start rounded-3xl p-6"
    >
      <div className="mb-4 text-[var(--accent)]">{icon}</div>
      <h3 className="font-bold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">{text}</p>
    </motion.article>
  );
}

function EducationSection({ t }: { t: any }) {
  return (
    <section className="py-4">
      <SectionHeading
        icon={<GraduationCap size={28} />}
        eyebrow={t.education.eyebrow}
        title={t.education.title}
        description={t.education.desc}
      />
      <div className="mx-auto mt-10 flex w-full justify-center">
        <div className="w-full max-w-md">
          <EducationCard
            degree={t.education.degree}
            field={t.education.field}
            university={t.education.university}
            status={t.education.status}
            active
          />
        </div>
      </div>
    </section>
  );
}

function EducationCard({ degree, field, university, status, active = false }: any) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`neu-glass-panel hover-lift rounded-3xl p-7 ${active ? "border-2 border-[var(--accent)]" : ""}`}
    >
      <div className="neu-glass-chip flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--accent)]">
        <GraduationCap size={28} />
      </div>
      <p className="mt-6 text-xs font-bold text-[var(--text-secondary)]">{degree}</p>
      <h3 className="mt-2 text-2xl font-black text-[var(--text-primary)]">{field}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{university}</p>
      <div className="mt-6 flex items-center gap-2 border-t border-[var(--glass-border)] pt-4 text-xs font-bold text-[var(--text-secondary)]">
        <CheckCircle2 size={16} className="text-emerald-500" />
        <span dir="ltr">{status}</span>
      </div>
    </motion.article>
  );
}

function SkillsSection({ t }: { t: any }) {
  const skillGroups = [
    {
      title: "Front-End",
      icon: <Code2 size={24} />,
      items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI", "HTML", "CSS"],
    },
    {
      title: "Back-End",
      icon: <Server size={24} />,
      items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "Authentication", "Multer", "Axios"],
    },
    {
      title: "AI & Data",
      icon: <BrainCircuit size={24} />,
      items: ["OCR", "ASR", "RAG", "LLM APIs", "Text Processing", "AI Integration"],
    },
    {
      title: "Tools & Infra",
      icon: <Cpu size={24} />,
      items: ["Git", "Docker", "Linux", "MinIO", "Keycloak", "API Integration"],
    },
  ];

  return (
    <section className="py-3">
      <SectionHeading
        icon={<Code2 size={28} />}
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        description={t.skills.desc}
      />
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="neu-glass-panel hover-lift rounded-3xl p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="neu-glass-chip flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--accent)]">
                {group.icon}
              </div>
              <h3 className="text-xl font-black text-[var(--text-primary)]" dir="ltr">
                {group.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span key={item} className="neu-glass-chip rounded-xl px-4 py-2 text-xs font-bold" dir="ltr">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ t }: { t: any }) {
  const icons = [
    <BrainCircuit size={26} key={1} />,
    <Sparkles size={26} key={2} />,
    <Layers3 size={26} key={3} />,
  ];

  return (
    <section className="py-3">
      <SectionHeading
        icon={<Layers3 size={28} />}
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        description={t.projects.desc}
      />
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
        {t.projects.items.map((project: any, index: number) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="neu-glass-panel hover-lift flex h-full flex-col rounded-3xl p-6 sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="neu-glass-chip flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--accent)]">
                {icons[index]}
              </div>
              <span className="gradient-text text-3xl font-black tabular-nums opacity-70" dir="ltr">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[11px] font-bold text-[var(--accent)]">{project.category}</p>
            <h3 className="mt-2 text-xl font-black text-[var(--text-primary)]" dir="ltr">
              {project.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-[var(--text-secondary)]">{project.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ t }: { t: any }) {
  return (
    <section className="flex min-h-[58vh] items-center justify-center py-5">
      <div className="w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="neu-glass-panel mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl text-[var(--accent)]"
        >
          <Mail size={36} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="tracking-fix text-xs font-bold tracking-[0.3em] text-[var(--accent)]"
        >
          {t.contact.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="gradient-text mx-auto mt-3 max-w-3xl pb-1 text-3xl font-black leading-tight sm:text-5xl sm:leading-tight"
        >
          {t.contact.title}
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[var(--text-secondary)] sm:text-base">
          {t.contact.desc}
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
          <ContactLink
            href="mailto:ehsanmadadialengareqhi@gmail.com"
            icon={<Mail size={24} />}
            title="Email"
            value="ehsanmadadialengareqhi@gmail.com"
            hint={t.contact.emailHint}
          />
          <ContactLink
            href="https://github.com/EHSANMADADI"
            icon={<Code2 size={24} />}
            title="GitHub"
            value="github.com/EHSANMADADI"
            hint={t.contact.githubHint}
            external
          />
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
          <MapPin size={16} />
          {t.contact.footer}
        </p>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, title, value, hint, external = false }: any) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="neu-glass-button group flex cursor-pointer items-center gap-4 rounded-3xl p-5 text-start"
    >
      <div className="neu-glass-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[var(--accent)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-[var(--text-primary)]">{title}</p>
        <p className="mt-1 truncate text-xs font-semibold text-[var(--text-secondary)] sm:text-sm" dir="ltr" title={value}>
          {value}
        </p>
        <p className="mt-2 text-[10px] text-[var(--text-secondary)]">{hint}</p>
      </div>
      <ExternalLink
        size={18}
        className="shrink-0 text-[var(--text-secondary)] opacity-50 transition group-hover:text-[var(--accent)] group-hover:opacity-100"
      />
    </motion.a>
  );
}