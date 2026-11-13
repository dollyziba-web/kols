"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2348067403009";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pointer-events-none sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="tooltip"
            className="pointer-events-auto hidden sm:flex items-center gap-2 bg-charcoal text-ivory border border-bronze/40 px-4 py-2.5 text-xs tracking-wider uppercase font-sans shadow-xl"
          >
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat with us on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.75, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.07, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(23,25,27,0.35)] ring-2 ring-ivory/80 transition-shadow hover:shadow-[0_14px_38px_rgba(37,211,102,0.45)] focus:outline-none focus:ring-2 focus:ring-bronze"
      >
        <span className="sr-only">Chat with us on WhatsApp</span>
        {/* Subtle outer pulse ring */}
        <span className="absolute inset-0 rounded-full border border-[#25D366] opacity-40 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-0" />
        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="27"
          height="27"
          fill="currentColor"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <path d="M12.031 2.002c-5.515 0-9.996 4.48-9.998 9.995a9.96 9.96 0 0 0 1.497 5.275L2 22l4.855-1.477a9.974 9.974 0 0 0 5.174 1.441h.004c5.514 0 9.996-4.48 9.998-9.995a9.936 9.936 0 0 0-2.927-7.07A9.935 9.935 0 0 0 12.031 2.002Zm5.847 14.122c-.246.693-1.434 1.326-1.996 1.41-.513.076-1.163.108-1.878-.119-.433-.138-.99-.322-1.703-.63-2.997-1.294-4.953-4.316-5.103-4.516-.15-.2-1.218-1.621-1.218-3.092 0-1.471.77-2.194 1.044-2.494.274-.3.598-.375.798-.375.199 0 .399.002.573.01.184.009.43-.07.673.514.249.599.847 2.07.922 2.22.075.15.125.324.025.524-.1.2-.15.324-.299.499-.15.175-.314.39-.449.524-.15.149-.305.311-.131.61.174.3.774 1.278 1.662 2.07 1.142 1.018 2.104 1.334 2.403 1.484.3.15.474.125.649-.075.174-.2.748-.873.947-1.172.2-.3.399-.25.673-.15.274.1 1.745.823 2.044.973.3.15.499.224.573.349.075.125.075.723-.171 1.415Z" />
        </svg>
      </motion.a>
    </div>
  );
}
