"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Monitor } from "lucide-react";

interface ThemeSelectorProps {
  onSelect: (mode: "professional" | "interactive") => void;
}

export default function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  return (
    <div 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden font-sans p-4 sm:p-6 select-none bg-gradient-to-br from-[#f2f2f0] via-[#e6e6e3] to-[#d6d6d2]"
    >
      
      {/* Standard Cursor Overrides inside macOS Theme Selector */}
      <style jsx global>{`
        body, html, * {
          cursor: default !important;
        }
        a, button, [role="button"], .cursor-pointer {
          cursor: pointer !important;
        }
      `}</style>

      {/* Decorative Grid Layer (Identical to macOS Desktop) */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, black 1px, transparent 0),
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 120px 120px, 120px 120px"
        }}
      />

      {/* Noise Overlay Layer (Identical to macOS Desktop) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseMacUnder'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseMacUnder)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Central macOS Glassmorphic Setup Window (Exact macOS WindowWrapper Styles) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl rounded-[32px] overflow-hidden flex flex-col shadow-2xl transition-shadow duration-150 text-black shadow-black/25"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 25px 70px rgba(0,0,0,0.3)",
        }}
      >
        {/* Soft radial highlights / internal glass reflections (Identical to WindowWrapper) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[31px]">
          <div
            className="absolute -top-[40%] -left-[40%] w-[180%] h-[180%] opacity-30"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 65%)",
            }}
          />
          <div
            className="absolute -bottom-[40%] -right-[40%] w-[180%] h-[180%] opacity-20"
            style={{
              background: "radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 65%)",
            }}
          />
        </div>

        {/* macOS Window Header - Identical to WindowWrapper bar styling */}
        <div className="window-header flex items-center justify-between px-3 sm:px-4 h-10 sm:h-11 border-b border-white/10 select-none shrink-0 bg-white/10 relative z-10">
          <div className="w-14 sm:w-[80px] shrink-0" />
          {/* Centered Window Title */}
          <div className="text-[10px] sm:text-xs font-semibold text-zinc-700 tracking-wide select-none uppercase font-mono truncate px-2 text-center">
            System Setup Assistant
          </div>
          <div className="w-14 sm:w-[80px] shrink-0" />
        </div>

        {/* Window Content */}
        <div className="p-8 sm:p-10 flex flex-col items-center gap-8 relative z-10">
          
          {/* Header Typography */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-none bg-gradient-to-b from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
              PON AKILESH P.
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-semibold max-w-md mx-auto">
              Select a workspace theme configuration to boot the portfolio:
            </p>
          </div>

          {/* Sub-panels (Side by Side Options - Styled exactly like the popup window inner containers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Option: Professional Mode */}
            <div
              tabIndex={0}
              onClick={() => onSelect("professional")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect("professional"); }}
              className="group cursor-pointer flex flex-col justify-between p-5 rounded-md border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:scale-[1.02] focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400/50 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Monospace Subheader (About Me Style) */}
                

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-650">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm font-bold text-zinc-800 tracking-tight">
                    Professional Mode
                  </h2>
                </div>
                
                <p className="text-xs text-zinc-600 leading-relaxed mb-6 text-justify">
                  A modern, clean single-page dashboard designed specifically for recruiters, highlighting skills, MERN projects, and immediate resume actions.
                </p>

                <ul className="space-y-2 text-[10px] text-zinc-500 mb-8 leading-snug font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-zinc-400 shrink-0">•</span>
                    <span>Structured recruiter-first workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-zinc-400 shrink-0">•</span>
                    <span>Direct resume download & view</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-zinc-400 shrink-0">•</span>
                    <span>MERN project spotlights & credentials</span>
                  </li>
                </ul>
              </div>

              {/* Action Trigger Button (Identical to About Me CTAs) */}
              <button 
                type="button"
                className="w-full rounded-full bg-[#f3f3f5] px-5 py-2 text-sm font-semibold text-slate-950 border border-slate-300 shadow-sm group-hover:bg-white group-focus:bg-white transition cursor-pointer text-center"
              >
                Launch Professional Mode
              </button>
            </div>

            {/* Option: Mac/Win Mode */}
            <div
              tabIndex={0}
              onClick={() => onSelect("interactive")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect("interactive"); }}
              className="group cursor-pointer flex flex-col justify-between p-5 rounded-md border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:scale-[1.02] focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400/50 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Monospace Subheader (About Me Style) */}
               

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-650">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm font-bold text-zinc-800 tracking-tight">
                    Mac/Win Mode
                  </h2>
                </div>
                
                <p className="text-xs text-zinc-600 leading-relaxed mb-6 text-justify">
                  An interactive macOS-like and Windows 95 canvas featuring draggable windows, live Spotify integration, and customizable face avatar builders.
                </p>

                <ul className="space-y-2 text-[10px] text-zinc-500 mb-8 leading-snug font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-zinc-400 shrink-0">•</span>
                    <span>Draggable panels & window stacking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-zinc-400 shrink-0">•</span>
                    <span>Dual OS themes & visual overlays</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-zinc-400 shrink-0">•</span>
                    <span>Interactive custom avatar builder</span>
                  </li>
                </ul>
              </div>

              {/* Action Trigger Button (Identical to About Me CTAs) */}
              <button 
                type="button"
                className="w-full rounded-full bg-[#f3f3f5] px-5 py-2 text-sm font-semibold text-slate-950 border border-slate-300 shadow-sm group-hover:bg-white group-focus:bg-white transition cursor-pointer text-center"
              >
                Launch Mac/Win Mode
              </button>
            </div>

          </div>

          {/* Escape / Alternate info helper */}
          <div className="text-[10px] text-zinc-400 text-center font-semibold mt-1">
            Note: Toggle between these desktop modes at any time via the switcher pill.
          </div>

        </div>
      </motion.div>

    </div>
  );
}
