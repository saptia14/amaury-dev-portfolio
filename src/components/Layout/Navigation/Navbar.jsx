import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaLayerGroup,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PERSONAL_INFO } from "../../../data/constants";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: FaHome },
  { id: "about", label: "About", icon: FaUser },
  { id: "projects", label: "Projects", icon: FaProjectDiagram },
  { id: "tech-stack", label: "Tech Stack", icon: FaLayerGroup },
  { id: "resume", label: "Resume", icon: FaFileAlt },
  { id: "contact", label: "Contact", icon: FaEnvelope },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      const sections = NAV_ITEMS.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);

    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = useCallback(
    (sectionId) => {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el)
            window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el)
          window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
      setIsOpen(false);
    },
    [location.pathname, navigate]
  );

  const handleMobileNavClick = useCallback(
    (sectionId) => {
      setIsOpen(false);
      setTimeout(() => scrollToSection(sectionId), 150);
    },
    [scrollToSection]
  );

  return (
    <>
      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between transition-all duration-500 rounded-2xl ${
              scrolled
                ? "bg-neutral-950/70 backdrop-blur-xl border border-neutral-800/50 px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "px-2 py-2"
            }`}
          >
            {/* ── Left Side (Logo + Lang) ── */}
            <div className="flex items-center gap-4">
              {/* ── Logo ── */}
              <button
                onClick={() => scrollToSection("home")}
                className="flex items-center gap-3 group relative"
              >
                {/* Logo glow on hover */}
                <div className="absolute -inset-2 bg-primary-500/0 group-hover:bg-primary-500/5 rounded-2xl transition-colors duration-300" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/50 group-hover:border-primary-500/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <img
                    src="/logo-bg.png"
                    alt="Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="hidden sm:flex flex-col relative">
                  <span className="text-base font-bold text-neutral-100 tracking-tight leading-tight">
                    {PERSONAL_INFO.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium tracking-wider uppercase">
                    Developer
                  </span>
                </div>
              </button>

              {/* ── Language Selector ── */}
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/50 border border-neutral-800/40 hover:bg-neutral-800 hover:border-primary-500/40 transition-all duration-300 text-lg group relative"
                aria-label="Toggle Language"
                title={i18n.language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              >
                <span className="transform group-hover:scale-110 transition-transform duration-200">
                  {i18n.language === 'en' ? '🇺🇸' : '🇲🇽'}
                </span>
              </button>
            </div>

            {/* ── Desktop Navigation ── */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-neutral-900/50 border border-neutral-800/40 rounded-xl p-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-primary-400"
                          : "text-neutral-500 hover:text-neutral-200"
                      }`}
                    >
                      {/* Animated background pill */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary-500/10 border border-primary-500/20 rounded-lg"
                          layoutId="nav-active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <Icon
                        className={`relative z-10 w-3.5 h-3.5 transition-colors duration-300 ${
                          isActive ? "text-primary-400" : ""
                        }`}
                      />
                      <span className="relative z-10">{t(`nav.${item.id === 'tech-stack' ? 'skills' : item.id}`) || item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection("contact")}
                className="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-neutral-900 text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(245,158,11,0.3)] flex items-center gap-2"
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">{t('home.btn_contact')}</span>
                <FaArrowRight className="relative w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-neutral-800/60 border border-neutral-700/40 flex items-center justify-center text-neutral-300 hover:text-white hover:border-primary-500/30 transition-all duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaTimes className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaBars className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-full max-w-[320px] bg-neutral-950/95 backdrop-blur-xl border-l border-neutral-800/50 z-50 lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 flex items-center justify-center">
                    <img
                      src="/logo-bg.png"
                      alt="Logo"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-neutral-100 block leading-tight">
                      Navigation
                    </span>
                    <span className="text-[10px] text-neutral-600">
                      portfolio
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-neutral-800/60 border border-neutral-700/40 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary-500/30 transition-all"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMobileNavClick(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-primary-400 bg-primary-500/10 border border-primary-500/15"
                          : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/40 border border-transparent"
                      }`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.08 }}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          isActive
                            ? "bg-primary-500/15 text-primary-400"
                            : "bg-neutral-800/60 text-neutral-500"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{t(`nav.${item.id === 'tech-stack' ? 'skills' : item.id}`) || item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="px-4 py-5 border-t border-neutral-800/40 space-y-3">
                <button
                  onClick={() => handleMobileNavClick("contact")}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-neutral-900 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/10"
                >
                  {t('home.btn_contact')}
                  <FaArrowRight className="w-3 h-3" />
                </button>
                <p className="text-[10px] text-neutral-600 text-center">
                  © 2026 {PERSONAL_INFO.fullName}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
