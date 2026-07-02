"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail,
  ExternalLink,
  ChevronDown,
  Code2,
  Briefcase,
  User,
  Layers,
  TerminalSquare,
  Send
} from 'lucide-react';

// --- Portfolio Data ---
const PERSONAL_INFO = {
  name: "امید عسگری",
  role: "توسعه‌دهنده فرانت‌اند",
  bio: "من یک مهندس نرم‌افزار با اشتیاق به خلق رابط‌های کاربری زیبا، سریع و کاربردی هستم. تخصص من تبدیل ایده‌های پیچیده به تجربه‌های دیجیتالی ساده و لذت‌بخش است.",
  email: "asgariomid287@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

const SKILLS: string[] = [
  "React.js", "Next.js", "JavaScript",
  "Tailwind CSS", "Html/Css",
  "SEO", "photoshop", "cripto"
];

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
    image: string;   
  description: string;
  tech: string[];
  link: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "مدیر ارشد سئو",
    company: "سایت فروشگاهی عطربان",
    period: "1400 - 1403",
    description: "مدیر سئو و رهبری تیم تولید محتوا | نتیجه: افزایش فروش - حضور در صفحه اول گوگل در برخی از عبارات"
  },
  {
    id: 2,
    role: "توسعه‌دهنده وب | مدیر سئو",
    company: "فروشگاه دیاناکالا",
    period: "1401 - 1402",
    description: " کار با HTML, CSS, JS. طراحی صفحات لندینگ واکنش‌گرا و بهینه‌سازی سئو پایه."
  },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "کانون تبلیغاتی Avarang",
    description: "طراحی وبسایت کانون تبلیغاتی آوارنگ (درحال حال منتشر نشده است)",
     image: "",
    tech: ["React", "TypeScript", "Tailwind"],
    link: "#"
  },
  {
    id: 2,
    title: "فروشگاه آنلاین دیانا کالا",
    description: "توسعه وب و مدیر سئو",
     image: "",
    tech: ["HTML","CSS3","JS","JavaScript"],
    link: "https://dianakala.ir/"
  }
];

// --- Props Types ---
interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface ProjectCardProps {
  project: Project;
}

interface ExperienceItemProps {
  experience: Experience;
}

// --- Scroll Animation Component (fixed memory leak and useRef) ---
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
      clearTimeout(timerRef.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Project Card Component (using Tailwind v4 gradient classes) ---
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (project.link === "#") {
      e.preventDefault();
      console.log(`پروژه ${project.title} در دست ساخت است`);
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group h-full flex flex-col hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.15)] transition-shadow duration-300">
      <div className="h-48 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center text-slate-600">
          <Code2 size={48} className="opacity-20" />
        </div>
        {project.id === 1 && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold bg-emerald-500 text-slate-950 rounded-full">
            جدید
          </span>
        )}
      </div>

      <div className="p-8 grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <a
            href={project.link}
            onClick={handleLinkClick}
            className="text-slate-400 hover:text-emerald-400 transition-colors p-2 hover:bg-emerald-500/10 rounded-full"
            aria-label={`مشاهده پروژه ${project.title}`}
          >
            <ExternalLink size={20} />
          </a>
        </div>
        <p className="text-slate-400 mb-6 grow leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech: string, idx: number) => (
            <span
              key={`${project.id}-tech-${idx}`}
              className="text-xs font-mono text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-500/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Experience Item Component (timeline dot position kept arbitrary for precision) ---
const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="relative group">
      {/* Dot centered on the timeline border */}
      <div className="absolute -right-[42px] top-1 w-5 h-5 rounded-full bg-slate-900 border-4 border-slate-700 group-hover:border-emerald-500 transition-colors duration-300"></div>

      <div className="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-15px_rgba(16,185,129,0.2)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {experience.role}
          </h3>
          <span className="text-sm font-mono text-emerald-500/80 bg-emerald-500/10 px-3 py-1 rounded-full whitespace-nowrap self-start">
            {experience.period}
          </span>
        </div>
        <h4 className="text-lg text-slate-300 mb-4 font-medium">{experience.company}</h4>
        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
          {experience.description}
        </p>
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const activeSectionRef = useRef(activeSection);

  // Keep the ref in sync
  activeSectionRef.current = activeSection;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const sections = ["home", "about", "experience", "projects", "contact"];
      const scrollPosition = scrollY + 120;

      let currentSection = sections[0];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          if (scrollPosition >= element.offsetTop) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        setActiveSection(currentSection);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [mounted]);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="bg-[#0a0f1c] text-slate-300 min-h-screen relative overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-200"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;900&display=swap');
        
        * {
          font-family: 'Vazirmatn', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .glass-nav {
          background: rgba(10, 15, 28, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .glass-card:hover {
          border-color: rgba(52, 211, 153, 0.3);
        }
        
        .bg-glow-1 {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
          border-radius: 50%;
          filter: blur(60px);
          z-index: 0;
          pointer-events: none;
        }
        
        .bg-glow-2 {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-glow-1" aria-hidden="true"></div>
      <div className="bg-glow-2" aria-hidden="true"></div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
        role="navigation"
        aria-label="منوی اصلی"
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div
            className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => scrollTo('home')}
            role="button"
            tabIndex={0}
            aria-label="بازگشت به صفحه اصلی"
            onKeyDown={(e) => e.key === 'Enter' && scrollTo('home')}
          >
            {PERSONAL_INFO.name}.
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse text-sm font-medium">
            {[
              { id: "about", label: "درباره من" },
              { id: "experience", label: "تجربیات" },
              { id: "projects", label: "پروژه‌ها" },
              { id: "contact", label: "تماس" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors hover:text-emerald-400 ${
                  activeSection === item.id ? 'text-emerald-400' : 'text-slate-400'
                } relative group`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block px-5 py-2 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all text-sm font-medium hover:border-emerald-500/60 hover:scale-105"
            aria-label="ارسال پیام همکاری"
          >
            همکاری با من
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-20"
          aria-label="صفحه اصلی"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <RevealOnScroll>
              <div className="inline-block mb-4 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium animate-float">
                👋 سلام، به دنیای من خوش آمدید
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
                من <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">{PERSONAL_INFO.name}</span> هستم
                <br />
                {PERSONAL_INFO.role}
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => scrollTo('projects')}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
                  aria-label="مشاهده پروژه‌ها"
                >
                  <Layers size={20} />
                  مشاهده پروژه‌ها
                </button>
                <div className="flex items-center gap-4">
                  {/*<a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-card hover:text-emerald-400 hover:-translate-y-1 transition-all"
                    aria-label="گیت‌هاب"
                  >
                    <span className="text-xl">🐙</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-card hover:text-emerald-400 hover:-translate-y-1 transition-all"
                    aria-label="لینکدین"
                  >
                    <span className="text-xl">💼</span>
                  </a>*/}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="p-3 rounded-full glass-card hover:text-emerald-400 hover:-translate-y-1 transition-all"
                    aria-label="ایمیل"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-slate-500 hover:text-emerald-400 transition-colors"
              onClick={() => scrollTo('about')}
              role="button"
              tabIndex={0}
              aria-label="اسکرول به پایین"
              onKeyDown={(e) => e.key === 'Enter' && scrollTo('about')}
            >
              <ChevronDown size={32} />
            </div>
          </div>
        </section>

        {/* About & Skills Section */}
        <section
          id="about"
          className="py-24 bg-slate-900/30"
          aria-label="درباره من و مهارت‌ها"
        >
          <div className="max-w-6xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-12">
                <User className="text-emerald-400" size={28} aria-hidden="true" />
                <h2 className="text-3xl font-bold text-white">درباره من و مهارت‌ها</h2>
                <div className="h-px bg-slate-800 grow mr-6" role="presentation"></div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <RevealOnScroll>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed">
                  <p>
                     امید عسگری | توسعه‌دهنده فرانت‌اند & همچنینفعال در حوزه سئو و کریپتو 
                  </p>
                  <p className="mt-4">
                     توسعه‌دهنده‌ی فرانت‌اند، دانشجوی کامپیوتر، و یک کارآفرین در حال ساخت.
                  </p>
                  <p>
                      داستان من از کجا شروع شد؟
                  </p>
                  <p>
                      حدود ۴ سال پیش، وقتی برای اولین بار با طراحی وب آشنا شدم، چیزی که من را جذب کرد، تلفیق هنر و منطق بود. عاشق این بودم که بتوانم با ترکیب رنگ‌ها، چینش المان‌ها و خطوط کد، چیزی بسازم که هم زیبا باشد و هم کاربردی. از همان روزها تصمیم گرفتم مسیر فرانت‌اند را جدی بگیرم. بزرگترین چالشی که داشتم، نحوه شروع بود؛ دقیقاً همان نقطه‌ای که خیلی‌ها در آن متوقف می‌شوند. اما من با پشتکار، از همان قدم‌های کوچک شروع کردم و حالا هر روز در حال یادگیری و ساختن هستم.
                  </p>
                  <p>
                      فلسفه‌ی کاری من           
                 </p>
                  <p>
                      موسس یک شرکت تبلیغاتی نوپا هستم؛ تازه شروع کردیم ولی با باوری ریشه‌دار: تبلیغات، پلی است برای ارتباط واقعی، نه یک نمایش سطحی. هر پروژه برای من یک داستان است که باید درست روایت شود؛ و همین حالا هم در حال ساختن پلی هستیم بین برندها و مخاطبانشان، با انرژی یک تازه‌وارد اما نگاه یک حرفه‌ای.
                  </p>
                  <p>
                      و اما بیرون از دنیای کد...                 </p>
                 <p>
                      آدم شکمویی هستم! آشپزی کردن برای من یک تفریح لذت‌بخش است، همانقدر که بازی‌های ویدئویی یا تماشای یک فیلم خوب..
                 </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Code2 className="text-emerald-400" size={20} aria-hidden="true" />
                    <h3 className="text-xl font-bold text-white">مهارت‌های من</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {SKILLS.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-lg bg-slate-800/80 text-slate-300 text-sm font-medium border border-slate-700/50 hover:border-emerald-500/50 hover:text-emerald-300 hover:bg-slate-800 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-24"
          aria-label="سوابق شغلی"
        >
          <div className="max-w-4xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-16">
                <Briefcase className="text-emerald-400" size={28} aria-hidden="true" />
                <h2 className="text-3xl font-bold text-white">سوابق شغلی</h2>
                <div className="h-px bg-slate-800 grow mr-6" role="presentation"></div>
              </div>
            </RevealOnScroll>

            <div className="space-y-12 border-r-2 border-slate-800 pr-8 relative">
              {EXPERIENCES.map((exp: Experience, index: number) => (
                <RevealOnScroll key={exp.id} delay={index * 100}>
                  <ExperienceItem experience={exp} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 bg-slate-900/30"
          aria-label="پروژه‌های منتخب"
        >
          <div className="max-w-6xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-16">
                <TerminalSquare className="text-emerald-400" size={28} aria-hidden="true" />
                <h2 className="text-3xl font-bold text-white">پروژه‌های منتخب</h2>
                <div className="h-px bg-slate-800 grow mr-6" role="presentation"></div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((project: Project, index: number) => (
                <RevealOnScroll key={project.id} delay={index * 150}>
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </div>

            {/*<RevealOnScroll>
              <div className="mt-16 text-center">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-medium border-b border-transparent hover:border-emerald-400 pb-1 group"
                >
                  مشاهده پروژه‌های بیشتر در گیت‌هاب
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </RevealOnScroll>*/}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-32"
          aria-label="تماس با من"
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <RevealOnScroll>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">پروژه بعدی شما چیست؟</h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                من در حال حاضر برای موقعیت‌های شغلی جدید و پروژه‌های فریلنسری در دسترس هستم.
                اگر سوالی دارید یا می‌خواهید با هم همکاری کنیم، خوشحال می‌شوم پیام شما را دریافت کنم.
              </p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-lg hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.6)] group"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                ارسال پیام به من
              </a>
            </RevealOnScroll>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer
        className="border-t border-slate-800/50 py-8 relative z-10"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            طراحی و توسعه توسط {PERSONAL_INFO.name} &copy;
          </p>
          <div className="flex items-center gap-4">
            {/*<a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-emerald-400 transition-colors"
              aria-label="گیت‌هاب"
            >
              <span className="text-lg">🐙</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-emerald-400 transition-colors"
              aria-label="لینکدین"
            >
              <span className="text-lg">💼</span>
            </a>*/}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-500 hover:text-emerald-400 transition-colors"
              aria-label="ایمیل"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}