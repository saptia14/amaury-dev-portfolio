import { useState, useEffect, memo } from "react";
import TypeWriter from "./TypeWriter";
import { FaArrowRight, FaGithub, FaLinkedin, FaJava, FaEnvelope, FaDownload } from "react-icons/fa";
import {
  SiSpringboot,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiSpring,
} from "react-icons/si";

const MobileHome = memo(() => {
  const techStack = [
    { icon: FaJava, name: "Java", color: "text-red-400" },
    { icon: SiSpringboot, name: "Spring Boot", color: "text-green-400" },
    { icon: SiReact, name: "React", color: "text-cyan-400" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-400" },
    { icon: SiSpring, name: "Spring", color: "text-green-500" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <main className="section-padding pt-20 pb-16 min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-primary-500/5" />

      <div className="max-w-6xl mx-auto relative">
        <div className="space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/70 border border-neutral-800/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-neutral-400 text-xs font-medium">Open to Opportunities</span>
          </div>

          {/* Name */}
          <div>
            <p className="text-neutral-500 text-sm font-medium mb-2">Hi there, I'm —</p>
            <h1 className="text-4xl font-black leading-tight">
              <span className="text-neutral-50">Nguyen Tran</span>
              <br />
              <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-600 bg-clip-text text-transparent">
                Gia Si
              </span>
            </h1>
          </div>

          {/* TypeWriter */}
          <div className="text-lg text-neutral-300 font-semibold min-h-[1.75rem]">
            <TypeWriter
              texts={[
                "Java Backend Developer",
                "Spring Boot Specialist",
                "Full Stack Engineer",
                "Team Leader",
              ]}
              delay={100}
              deleteDelay={50}
            />
          </div>

          {/* Description */}
          <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
            Final-year{" "}
            <span className="text-primary-400 font-semibold">Software Engineering</span>{" "}
            student building scalable systems with{" "}
            <span className="text-primary-400 font-semibold">Java, Spring Boot & React</span>.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-neutral-900 px-5 py-3 rounded-xl font-semibold text-sm"
            >
              View Projects
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 border border-neutral-700/60 text-neutral-300 px-5 py-3 rounded-xl font-medium text-sm"
            >
              <FaEnvelope className="text-primary-500 text-xs" />
              Contact
            </button>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://github.com/saptia14"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-neutral-500 hover:text-primary-400 bg-neutral-900/50 border border-neutral-800/50 rounded-xl transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/amaury"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-neutral-500 hover:text-primary-400 bg-neutral-900/50 border border-neutral-800/50 rounded-xl transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-0 divide-x divide-neutral-800 bg-neutral-900/50 border border-neutral-800/60 rounded-xl py-2 mt-2">
            {[
              { v: "8+", l: "Projects" },
              { v: "4+", l: "Teams" },
              { v: "6+", l: "Tech" },
            ].map((s) => (
              <div key={s.l} className="flex-1 text-center px-2">
                <span className="block text-lg font-black text-primary-400">{s.v}</span>
                <span className="block text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                  {s.l}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="pt-4">
            <p className="text-neutral-600 text-[10px] uppercase tracking-[0.2em] mb-3 font-medium">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-800/60 rounded-lg px-3 py-1.5"
                  >
                    <Icon className={`${tech.color} text-sm`} />
                    <span className="text-neutral-400 text-xs font-medium">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

MobileHome.displayName = 'MobileHome';

export default MobileHome;
