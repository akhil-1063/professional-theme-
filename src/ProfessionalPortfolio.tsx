"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  profileInfo, 
  skillsData, 
  projects, 
  certifications, 
  experienceData 
} from "./data/portfolio";
import { 
  Award, 
  Send, 
  Sun, 
  Moon, 
  Eye,
  Download,
  Menu,
  X
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/SocialIcons";
import { trackEvent } from "./lib/analytics";

// Removed interface for standalone version

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjhw6HL0HBXF1rfAMo0TxoTPP-2gv6xTi9PHxkB_XkbqHHjmF1FurjyCi85N1IAc1g/exec";

const softSkills = [
  { title: "Team Collaboration", desc: "Proven team player with athletic discipline from competing in national volleyball tournaments." },
  { title: "Problem Solving", desc: "Strong analytical capability to debug complex backend routing and state synchronization issues." },
  { title: "Effective Communication", desc: "Capable of translating technical MERN specifications into clear client/peer-level milestones." },
  { title: "Adaptability & Growth", desc: "Rapidly picking up new tools (React Native, Zustand, Vercel) to build scalable, responsive applications." }
];

// Reusable scroll animation settings
const scrollSlideLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const scrollFadeUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export default function ProfessionalPortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add professional-mode class to body and html to handle styles and scrolling
    document.body.classList.add("professional-view-active");
    document.documentElement.classList.add("professional-view-active");
    
    // Check saved theme
    const savedTheme = localStorage.getItem("prof-theme");
    if (savedTheme === "light") setIsDark(false);

    return () => {
      document.body.classList.remove("professional-view-active");
      document.documentElement.classList.remove("professional-view-active");
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("prof-theme", nextDark ? "dark" : "light");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.mobile && !/^\+?[0-9]{7,15}$/.test(form.mobile.replace(/\s/g, ""))) {
      setMobileError("Enter a valid mobile number");
      return;
    }
    setMobileError(null);
    setFormStatus("sending");
    trackEvent("prof_contact_submit", { name: form.name });
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ 
          name: form.name, 
          email: form.email, 
          mobile: form.mobile, 
          message: form.message,
          timestamp: new Date().toISOString() 
        }).toString(),
      });
      setFormStatus("success");
      setForm({ name: "", email: "", mobile: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <div className={`prof-container ${isDark ? "dark-theme" : "light-theme"}`}>
      
      {/* Dynamic Theme Style Override Block */}
      <style jsx global>{`
        /* Theme variables */
        .prof-container {
          --ink: #111411;
          --muted: #5a635a;
          --soft: #f1f3f1;
          --deep: #1c2e1e;
          --leaf: #4d6d47;
          --line: #e7ebe6;
          --alt-bg: #fafbf9;
          --main-bg: #ffffff;
          --card-bg: #ffffff;
          --card-hover-bg: #fafbf9;
          --border-hover: #d8ded6;
          
          background: var(--main-bg);
          color: var(--ink);
          font-family: "Inter", -apple-system, sans-serif;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          transition: background 300ms ease, color 300ms ease;
        }

        .prof-container.dark-theme {
          --ink: #f2f3f2;
          --muted: #a2aba2;
          --soft: #1b261b;
          --deep: #e2e5e2;
          --leaf: #85a87d;
          --line: #2e382d;
          --alt-bg: #0c120c;
          --main-bg: #070a07;
          --card-bg: #0c120c;
          --card-hover-bg: #121a12;
          --border-hover: #455243;
        }

        /* Natural Scrolling override */
        body.professional-view-active,
        html.professional-view-active {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
          min-height: 100vh !important;
        }

        /* Cursor Overrides */
        body.professional-view-active, 
        body.professional-view-active *, 
        body.professional-view-active html {
          cursor: default !important;
        }
        body.professional-view-active a, 
        body.professional-view-active button, 
        body.professional-view-active [role="button"],
        body.professional-view-active input,
        body.professional-view-active textarea,
        body.professional-view-active .brand-lockup,
        body.professional-view-active .project-card,
        body.professional-view-active .btn-primary,
        body.professional-view-active .btn-secondary {
          cursor: pointer !important;
        }

        /* Typewriter cursor blinking */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .type-cursor {
          display: inline-block;
          width: 2px;
          height: 0.9em;
          background: var(--ink);
          vertical-align: middle;
          margin-left: 5px;
          animation: blink 1s step-end infinite;
        }

        /* Custom Tactile Buttons (Non-Shadcn) */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 750;
          border-radius: 6px;
          border: 1px solid var(--ink);
          background: var(--ink);
          color: var(--main-bg);
          transition: transform 150ms ease, box-shadow 150ms ease;
          box-shadow: 3px 3px 0px var(--leaf);
        }
        .btn-primary:hover {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0px var(--leaf);
          background: var(--ink);
          color: var(--main-bg);
        }
        .btn-primary:active {
          transform: translate(3px, 3px);
          box-shadow: 0px 0px 0px var(--leaf);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 750;
          border-radius: 6px;
          border: 1px solid var(--ink);
          background: var(--main-bg);
          color: var(--ink);
          transition: transform 150ms ease, box-shadow 150ms ease;
          box-shadow: 3px 3px 0px var(--line);
        }
        .btn-secondary:hover {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0px var(--line);
          background: var(--main-bg);
          color: var(--ink);
          border-color: var(--ink);
        }
        .btn-secondary:active {
          transform: translate(3px, 3px);
          box-shadow: 0px 0px 0px var(--line);
        }

        /* Glossy Desktop Navigation Tab Bar (Inspiration Style) */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.18rem;
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.65);
          box-shadow: 0 16px 34px rgba(28, 46, 30, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          padding: 0.32rem;
          transition: background 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }
        .dark-theme .desktop-nav {
          background: rgba(7, 10, 7, 0.65);
          border-color: var(--line);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .desktop-nav a {
          text-decoration: none;
          border-radius: 999px;
          padding: 0.45rem 0.85rem;
          color: var(--muted);
          transition: color 160ms ease, background 160ms ease, transform 160ms ease;
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 700;
        }
        .desktop-nav a:hover,
        .desktop-nav a:focus-visible {
          color: var(--ink);
          background: var(--soft);
          transform: translateY(-1px);
        }

        /* Inspiration Site UI Components styling */
        .intro-section,
        .portfolio-section,
        .contact-section {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          border-top: 1px solid var(--line);
        }

        .intro-section {
          background: var(--alt-bg);
          max-width: 100%;
          transition: background 300ms ease;
        }
        .intro-section-content {
          max-width: 80rem;
          margin: 0 auto;
        }

        .stack-section {
          background: var(--alt-bg);
          max-width: 100%;
          transition: background 300ms ease;
        }
        .stack-section-content {
          max-width: 80rem;
          margin: 0 auto;
        }

        .contact-section {
          background: var(--alt-bg);
          max-width: 100%;
          border-top: none;
          transition: background 300ms ease;
        }
        .contact-section-content {
          max-width: 80rem;
          margin: 0 auto;
        }

        .section-kicker {
          color: var(--leaf);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          margin-bottom: 1rem;
        }

        .intro-grid h2,
        .section-heading h2,
        .contact-section h2 {
          font-size: clamp(1.8rem, 5.5vw, 4.2rem);
          line-height: 1.02;
          letter-spacing: -0.05em;
          font-weight: 500;
          color: var(--ink);
        }

        .project-card {
          min-height: 20rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: var(--card-bg);
          transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          background: var(--card-hover-bg);
          border-color: var(--border-hover);
        }

        .project-card > .seq-num {
          color: var(--leaf);
          font-size: 0.8rem;
          font-weight: 800;
          margin-bottom: auto;
        }

        .project-card h3 {
          font-size: 1.7rem;
          letter-spacing: -0.04em;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--ink);
        }

        .project-card p {
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .tag-row span {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 0.35rem 0.65rem;
          color: var(--deep);
          font-weight: 600;
          font-size: 0.76rem;
          background: var(--main-bg);
        }

        .focus-panel {
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 1.5rem;
          width: 100%;
          box-shadow: 0 24px 60px rgba(28, 46, 30, 0.08);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(250, 251, 249, 0.52));
          backdrop-filter: blur(18px) saturate(125%);
          -webkit-backdrop-filter: blur(18px) saturate(125%);
          transition: background 300ms ease, border-color 300ms ease;
        }
        .dark-theme .focus-panel {
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: linear-gradient(135deg, rgba(7, 10, 7, 0.78), rgba(12, 18, 12, 0.52));
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
        }

        .focus-grid div {
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--main-bg);
          padding: 0.85rem;
          transition: background 300ms ease, border-color 300ms ease;
        }

        .focus-grid span {
          display: block;
          color: var(--leaf);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .focus-grid strong {
          display: block;
          color: var(--ink);
          font-size: 0.95rem;
          line-height: 1.25;
          font-weight: 650;
        }

        .stack-group-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--leaf);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .timeline { border-top: 1px solid var(--line); }
        .timeline article {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 1.6rem 0;
          border-bottom: 1px solid var(--line);
        }
        .timeline h3 {
          font-size: clamp(1.2rem, 2.5vw, 1.5rem);
          letter-spacing: -0.03em;
          font-weight: 600;
          color: var(--ink);
        }
        .timeline time {
          color: var(--leaf);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .timeline p { color: var(--muted); margin-top: 0.2rem; }

        .contact-email {
          display: inline-block;
          color: var(--ink);
          font-size: clamp(1.4rem, 5.5vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 2rem;
          text-decoration: underline;
          text-decoration-color: var(--line);
          text-decoration-thickness: 2px;
          text-underline-offset: 0.2em;
          word-break: break-word;
          transition: text-decoration-color 180ms ease, color 180ms ease;
        }
        .contact-email:hover {
          color: var(--leaf);
          text-decoration-color: var(--leaf);
        }

        .socials a {
          min-height: 2.8rem;
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--ink);
          border-radius: 6px;
          padding: 0.6rem 1.2rem;
          text-decoration: none;
          color: var(--ink);
          font-weight: 750;
          transition: transform 150ms ease, box-shadow 150ms ease;
          background: var(--main-bg);
          box-shadow: 3px 3px 0px var(--line);
        }
        .socials a:hover {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0px var(--line);
          background: var(--main-bg);
          color: var(--ink);
          border-color: var(--ink);
        }
        .socials a:active {
          transform: translate(3px, 3px);
          box-shadow: 0px 0px 0px var(--line);
        }

        .prof-input {
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--main-bg);
          color: var(--ink);
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          transition: border-color 200ms ease, background 200ms ease;
          width: 100%;
        }
        .prof-input:focus {
          outline: none;
          border-color: var(--leaf);
        }

        /* Glassmorphic Header (Stuck at Top) */
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          width: 100%;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px) saturate(145%);
          -webkit-backdrop-filter: blur(20px) saturate(145%);
          border-bottom: 1px solid var(--line);
          box-shadow: 0 8px 32px rgba(28, 46, 30, 0.04);
          transition: background 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
        }
        .dark-theme .site-header {
          background: rgba(7, 10, 7, 0.75);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
      `}</style>

      {/* Header / Navigation */}
      <header className="site-header">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between w-full">
          <a className="brand-lockup flex items-center gap-2" href="#" aria-label="Akilesh portfolio home">
            <span className="brand-text text-xl font-bold tracking-tight">Akilesh.dev</span>
            <span className="brand-mark text-2xl font-medium leading-none">&#10033;</span>
          </a>
          
          <nav className="desktop-nav hidden md:flex select-none">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#stack">Stack</a>
            <a href="#experience">Experience</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-4 select-none">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all"
              style={{ background: "var(--soft)", color: "var(--leaf)" }}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl transition-all md:hidden"
              style={{ background: "var(--soft)", color: "var(--leaf)" }}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: "var(--line)", background: "var(--main-bg)" }}
            >
              <nav className="flex flex-col px-6 py-4 gap-3 select-none">
                <a 
                  href="#about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold py-1.5 hover:text-[var(--leaf)] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  About
                </a>
                <a 
                  href="#work" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold py-1.5 hover:text-[var(--leaf)] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Work
                </a>
                <a 
                  href="#stack" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold py-1.5 hover:text-[var(--leaf)] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Stack
                </a>
                <a 
                  href="#experience" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold py-1.5 hover:text-[var(--leaf)] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Experience
                </a>
                <a 
                  href="#certifications" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold py-1.5 hover:text-[var(--leaf)] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Certifications
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold py-1.5 hover:text-[var(--leaf)] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Contact
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-12 flex flex-col gap-20">
        
        {/* Section: Hero / About Me */}
        <section id="about" className="scroll-mt-24 pt-4 pb-8 flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* Left Side: Portrait & Copy (Left-Aligned Layout & Entrance Animation) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-8 items-start max-w-2xl w-full"
          >
            {/* Profile Photo */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 self-start">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border shadow-lg" style={{ borderColor: "var(--line)", background: "var(--card-bg)" }}>
                <img 
                  src="/assets/General/instagram pfp.jpeg" 
                  alt={profileInfo.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/reference/neutral face.png";
                  }}
                />
              </div>
            </div>

            {/* Copy (Left-Aligned Elements) */}
            <div className="flex flex-col gap-3 text-left w-full items-start">
              <div>
                <p className="eyebrow select-none text-left">Web Developer</p>
                <h1 className="text-3xl sm:text-5xl tracking-tight leading-none font-bold mb-2 text-left" style={{ color: "var(--ink)" }}>
                  Pon Akilesh
                  <span className="type-cursor" />
                </h1>
               
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-left mt-1" style={{ color: "var(--muted)" }}>
                Web developer building scalable web applications, responsive mobile interfaces, and custom user environments that feel fast and dependable.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Focus Panel (Entrance Animation) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="w-full lg:max-w-md"
          >
            <div className="focus-panel flex flex-col gap-5">
              <div className="focus-panel-copy border-b pb-4" style={{ borderColor: "var(--line)" }}>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--leaf)" }}>Core Philosophy</p>
                <h2 className="text-base sm:text-lg font-bold leading-tight" style={{ color: "var(--ink)" }}>
                  Building web applications that feel calm on the surface and serious underneath.
                </h2>
              </div>

              <div className="focus-grid grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-1">
                  <span>Focus</span>
                  <strong>MERN Stack & React Native Product Development</strong>
                </div>
                <div className="flex flex-col gap-1">
                  <span>Now</span>
                  <strong>Open for Web Developer internships & roles</strong>
                </div>
                <div className="flex flex-col gap-1">
                  <span>Stack</span>
                  <strong>React, Next.js, Node.js, PostgreSQL, MongoDB, MCP</strong>
                </div>
              </div>

              {/* Focus Actions - Replaced with tactile rectangular buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setIsPdfOpen(true)}
                  className="btn-primary flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Resume
                </button>
                <a
                  href="#contact"
                  className="btn-secondary text-center flex items-center justify-center"
                >
                  Start a conversation
                </a>
              </div>
            </div>
          </motion.div>

        </section>

        {/* Intro Section (Scroll slide in left effect) */}
        <motion.section 
          {...scrollSlideLeft}
          className="intro-section scroll-mt-24 rounded-2xl"
        >
          <div className="intro-section-content flex flex-col gap-4">
            <p className="section-kicker">Selected Profile</p>
            <div className="intro-grid grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <h2 className="md:col-span-7 font-bold tracking-tight leading-tight" style={{ fontSize: "clamp(1.5rem, 4vw, 2.6rem)" }}>
                Engineering robust web solutions with clean architecture and responsive user experiences.
              </h2>
              <div className="md:col-span-5 flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-justify" style={{ color: "var(--muted)" }}>
                <p>
                  I am Pon Akilesh, a web developer focused on React, Next.js, Node.js, PostgreSQL, and AI integrations. I like products that feel calm on the surface and serious underneath.
                </p>
                <p>
                  With a strong foundation in database design, authentication logic, and custom user components, I focus on building platforms that are clear and reliable. My athletic discipline as a national-level volleyball player shapes my teamwork ethics and problem-solving focus.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section: Projects (Work with Staggered Scroll-up) */}
        <section id="work" className="portfolio-section scroll-mt-24">
          <motion.div {...scrollSlideLeft} className="section-heading mb-8">
            <p className="section-kicker">Work</p>
            <h2>Projects shipped</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.id === "sfx-hostels" || p.id === "eventra" || p.id === "doha-wellness" || p.id === "dual-theme-portfolio" || p.id === "liftlog").map((project, idx) => (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.12 }}
                className="project-card"
              >
                <span className="seq-num select-none">0{idx + 1}</span>
                <h3 className="mt-4">{project.title}</h3>
                <p className="text-justify">{project.description}</p>
                
                <div className="tag-row mb-6 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="w-full pt-4 mt-auto border-t flex flex-col gap-2" style={{ borderColor: "var(--line)" }}>
                  {project.status === "wip" ? (
                    <span className="text-xs text-slate-500 font-semibold italic flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Building in Public
                    </span>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {project.githubUrl && (
                        <div className="flex flex-col gap-1.5">
                          <a 
                            href={project.githubFrontendUrl || project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 text-xs font-bold hover:opacity-85 transition-opacity"
                            style={{ color: "var(--leaf)" }}
                          >
                            {project.githubBackendUrl && project.githubBackendUrl !== (project.githubFrontendUrl || project.githubUrl) 
                              ? "Frontend Code \u2192" 
                              : "Code \u2192"}
                          </a>
                          {project.githubBackendUrl && project.githubBackendUrl !== (project.githubFrontendUrl || project.githubUrl) && (
                            <a 
                              href={project.githubBackendUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center gap-1 text-xs font-bold hover:opacity-85 transition-opacity"
                              style={{ color: "var(--leaf)" }}
                            >
                              Backend Code &rarr;
                            </a>
                          )}
                        </div>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-xs font-bold hover:opacity-85 transition-opacity"
                          style={{ color: "var(--leaf)" }}
                        >
                          Live Demo &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section: Skills (Stack - Scroll Staggered Slide Left) */}
        <motion.section 
          {...scrollSlideLeft}
          id="stack" 
          className="stack-section scroll-mt-24 rounded-2xl"
        >
          <div className="stack-section-content flex flex-col gap-8">
            <div className="section-heading">
              <p className="section-kicker">Stack</p>
              <h2>Tools I reach for</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Frontend group */}
              <div className="flex flex-col gap-3">
                <p className="stack-group-label">Frontend</p>
                <div className="flex flex-wrap gap-2">
                  {skillsData.find(s => s.title === "Frontend")?.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>
                      {skill}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>React Native</span>
                  <span className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>Zustand</span>
                  <span className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>JavaScript</span>
                  <span className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>TypeScript</span>
                </div>
              </div>

              {/* Backend & DB group */}
              <div className="flex flex-col gap-3">
                <p className="stack-group-label">Backend & Databases</p>
                <div className="flex flex-wrap gap-2">
                  {skillsData.find(s => s.title === "Backend")?.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>
                      {skill}
                    </span>
                  ))}
                  {skillsData.find(s => s.title === "Databases")?.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Infra */}
              <div className="flex flex-col gap-3">
                <p className="stack-group-label">Infrastructure & Tools</p>
                <div className="flex flex-wrap gap-2">
                  {skillsData.find(s => s.title === "Tools" || s.title === "Tools & Platforms")?.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>
                      {skill}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "var(--line)", color: "var(--deep)", background: "var(--main-bg)" }}>Expo CLI</span>
                </div>
              </div>
            </div>

            {/* Soft Skills Section inside Stack Section */}
            <div className="border-t pt-6 flex flex-col gap-3 mt-4" style={{ borderColor: "var(--line)" }}>
              <p className="stack-group-label">Professional Qualities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {softSkills.map((skill, index) => (
                  <div key={index} className="p-4 rounded-xl border flex flex-col gap-1.5" style={{ borderColor: "var(--line)", background: "var(--main-bg)" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: "var(--leaf)" }}>&#10003;</span>
                      <h4 className="text-xs font-bold uppercase tracking-wider">{skill.title}</h4>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section: Experience & Resume (Flight Log - Scroll slide in left) */}
        <section id="experience" className="portfolio-section scroll-mt-24 timeline">
          <motion.div 
            {...scrollSlideLeft}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6" 
            style={{ borderColor: "var(--line)" }}
          >
            <div className="section-heading mb-0">
              <p className="section-kicker">Education and Experience</p>
              <h2>Flight log, grounded edition</h2>
            </div>
            
            {/* Tactile button links for resume view/download */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsPdfOpen(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> View Resume PDF
              </button>
              <a 
                href="/assets/General/Pon Akilesh Resume.pdf"
                download="Pon_Akilesh_Resume.pdf"
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Resume PDF
              </a>
            </div>
          </motion.div>
          
          <div className="flex flex-col">
            {experienceData.map((item, idx) => (
              <motion.article 
                key={item.id} 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="py-6 border-b flex flex-col gap-2" 
                style={{ borderColor: "var(--line)" }}
              >
                <time className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--leaf)" }}>
                  {item.period}
                </time>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--ink)" }}>
                  {item.role} &mdash; {item.companyOrInstitution}
                </h3>
                <ul className="space-y-1.5 mt-1 pl-4 list-disc text-xs sm:text-sm" style={{ color: "var(--muted)" }}>
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="leading-relaxed text-justify">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section: Certifications */}
        <section id="certifications" className="portfolio-section scroll-mt-24">
          <motion.div {...scrollSlideLeft} className="section-heading mb-8">
            <p className="section-kicker">Certifications</p>
            <h2>Verified Credentials</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <motion.article 
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                className="p-5 rounded-lg border flex items-start gap-4 transition-all"
                style={{ borderColor: "var(--line)", background: "var(--card-bg)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--soft)", color: "var(--leaf)" }}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--leaf)" }}>{cert.issuer}</span>
                  <h3 className="text-base font-bold tracking-tight mt-0.5" style={{ color: "var(--ink)" }}>{cert.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Issued: {cert.date}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section: Contact */}
        <motion.section 
          {...scrollFadeUp}
          id="contact" 
          className="contact-section scroll-mt-24 rounded-2xl"
        >
          <div className="contact-section-content flex flex-col items-center gap-6">
            <p className="section-kicker">Contact</p>
            <h2 className="text-center font-bold">Let's build something precise, useful, and a little memorable.</h2>
            
            <a className="contact-email text-center" href={`mailto:${profileInfo.email}`}>
              {profileInfo.email}
            </a>

            {/* Socials row */}
            <div className="socials flex gap-3 justify-center flex-wrap mb-8">
              <a href={profileInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profileInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${profileInfo.email}`}>Email</a>
            </div>

            {/* Message form wrapper */}
            <div className="w-full max-w-2xl text-left border-t pt-10" style={{ borderColor: "var(--line)" }}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-6 text-center" style={{ color: "var(--leaf)" }}>Or Send an Instant Message</h3>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="prof-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="prof-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Mobile Number (WhatsApp preferred)</label>
                  <input 
                    type="tel" 
                    value={form.mobile}
                    onChange={(e) => {
                      setForm({...form, mobile: e.target.value});
                      setMobileError(null);
                    }}
                    className="prof-input"
                    placeholder="Optional"
                  />
                  {mobileError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{mobileError}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Message</label>
                  <textarea 
                    required 
                    minLength={10} 
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="prof-input resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {formStatus === "sending" && "Sending Message..."}
                  {formStatus === "success" && "Message Sent Successfully!"}
                  {formStatus === "error" && "Failed to Send. Retry."}
                  {formStatus === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer (Aditya style) */}
      <footer className="py-8 text-center text-xs border-t" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        <span>Designed &amp; built by Pon Akilesh / 2026</span>
      </footer>

      {/* PDF View Modal Overlay */}
      <AnimatePresence>
        {isPdfOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPdfOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 z-[60] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 shrink-0">
                <h3 className="text-sm font-bold text-slate-200">Pon Akilesh P. — Resume</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href="/assets/General/Pon Akilesh Resume.pdf"
                    download="Pon_Akilesh_Resume.pdf"
                    className="btn-primary flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                  <button 
                    onClick={() => setIsPdfOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-slate-950 p-2 overflow-hidden">
                <iframe 
                  src="/assets/General/Pon Akilesh Resume.pdf" 
                  className="w-full h-full border-0 rounded-2xl"
                  title="Pon Akilesh Resume View"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
