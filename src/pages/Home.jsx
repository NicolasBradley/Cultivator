import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Activity,
  ArrowUp,
  BarChart3,
  Bell,
  Building2,
  ChevronRight,
  Cpu,
  Download,
  Globe2,
  Handshake,
  Mail,
  Menu,
  Rocket,
  Sprout,
  Waves,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiquidGlassCard, FadeIn, CursorGlow, Footer } from '../components/SharedUI';

import hardwareImg from '../assets/product_img.jpeg';
import appUiImg from '../assets/software_img.png';
import shrimpPondImg from '../assets/shrimp_pond.jpg';
import proposalPdf from '../assets/Cultivator Project Proposal.pdf';
import heroVideo from '../assets/thailand_shrimp_farm_video.mp4';
import logoImg from '../assets/Orange_Shrimp.png';
import heroTitleImg from '../assets/Orange_No BG.png';
import { ContactSection } from '../components/ContactSection';

import sdg1Img from '../assets/sdg_1.png';
import sdg2Img from '../assets/sdg_2.png';
import sdg3Img from '../assets/sdg_3.png';

import field1 from '../assets/Hult Prize Taiwan/S__238305290_0.jpg';
import field2 from '../assets/Hult Prize Taiwan/jason/DSC05264.JPG';
import field3 from '../assets/Hult Prize Taiwan/S__238305296_0.jpg';

import aeratorsImg from '../assets/aerators.jpg';
import electricityImg from '../assets/electricity.jpg';
import smallerShrimpImg from '../assets/smaller_shrimp.jpg';
import problemFragileOps from '../assets/problem_fragile_ops.png';
import shrimpFarmImg from '../assets/shrimp_farm.jpg';
import pexelsQuangImg from '../assets/pexels-quang-nguyen-vinh-222549-6872322.jpg';

import webImg1 from '../assets/web_img1.jpg';
import webImg2 from '../assets/web_img2.jpg';
import webImg4 from '../assets/web_img4.jpeg';
import webImg5 from '../assets/web_img5.jpeg';

import nthuLogo from '../assets/nthu logo.jpg';
import indonesiaFlag from '../assets/Flag-Indonesia.webp';
import usFlag from '../assets/Flag_of_the_United_States.svg.webp';
import thailandFlag from '../assets/thai_flag.jpg';
import memberBg from '../assets/Hult Prize Taiwan/WhatsApp Image 2026-06-30 at 19.54.14 (1).jpeg';
import hultWinnerImg from '../assets/Hult Winner.JPG';
import teamFrans from '../assets/members/frans/frans_pic.jpg';
import teamFransExperience from '../assets/members/frans/frans_experience.png';
import teamJason from '../assets/members/jason/jason_pic.jpg';
import teamJasonExperience from '../assets/members/jason/jason_experience.png';
import teamDelon from '../assets/members/delon/delon_pic.jpg';
import teamDelonExperience from '../assets/members/delon/delon_experience.png';
import teamJai from '../assets/members/jai/jai_pic.jpg';
import teamJaiExperience from '../assets/members/jai/jai_experience.png';

const carouselLogos = Object.entries(import.meta.glob('../assets/carousel/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,svg}', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]/g, ' '),
  }));

const LogoMarquee = ({ compact = false }) => (
  <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
    <div className={`flex w-max animate-marquee items-center ${compact ? 'gap-3' : 'gap-4'} whitespace-nowrap hover:[animation-play-state:paused]`}>
      {[...carouselLogos, ...carouselLogos, ...carouselLogos].map((logo, index) => (
        <div
          key={`${logo.name}-${index}`}
          className={`flex shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white px-4 shadow-lg ${
            compact ? 'h-14 w-32' : 'h-20 w-44 md:h-24 md:w-52'
          }`}
        >
          <img src={logo.src} alt={`${logo.name} logo`} className="max-h-[72%] max-w-[86%] object-contain" loading="lazy" />
        </div>
      ))}
    </div>
  </div>
);

const LogoBand = () => (
  <div className="pointer-events-auto relative w-full space-y-2 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
    <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-navy/12 via-tealblue/10 to-navy/14" aria-hidden="true"></div>
    {[carouselLogos, [...carouselLogos].reverse()].map((rowLogos, rowIndex) => (
      <div
        key={`sponsor-row-${rowIndex}`}
        className={`relative flex w-max animate-marquee items-center gap-2 whitespace-nowrap hover:[animation-play-state:paused] md:gap-3 ${
          rowIndex === 0 ? '[animation-duration:30s]' : '[animation-direction:reverse] [animation-duration:42s]'
        }`}
      >
        {[...rowLogos, ...rowLogos].map((logo, index) => (
          <div key={`${logo.name}-hero-${rowIndex}-${index}`} className="relative flex h-8 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-3 shadow-[0_10px_24px_rgba(0,0,0,0.12)] md:h-10 md:w-32">
            <img src={logo.src} alt={`${logo.name} logo`} className="max-h-[70%] max-w-[86%] object-contain" loading="lazy" />
            <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-navy/34 via-tealblue/28 to-sunset-orange/20" aria-hidden="true"></span>
          </div>
        ))}
      </div>
    ))}
  </div>
);
const CTAButton = ({ href, children, variant = 'primary', className = '' }) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition hover:-translate-y-0.5 active:scale-[0.98] md:px-8 md:py-4 md:text-lg';
  const styles =
    variant === 'primary'
      ? 'bg-sunset-orange text-navy shadow-[0_0_12px_rgba(255,145,16,0.25)] hover:bg-sunset-orange/90'
      : 'border border-white/20 bg-white/5 text-white hover:bg-white/10';

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = ['problem', 'solution', 'traction', 'market', 'team', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }

      if (window.scrollY < 100) setActiveSection('Home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', action: scrollToTop },
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'Traction', href: '#traction' },
    { label: 'Market', href: '#market' },
    { label: 'Team', href: '#team' },
    { label: 'Media', to: '/media' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div
      className={`pointer-events-none fixed top-6 z-50 flex w-full justify-center px-4 transition-all duration-300 ease-out ${
        isScrolled ? 'top-4 left-4 px-0' : 'justify-center'
      }`}
    >
      <nav
        className={`pointer-events-auto border border-white/10 bg-darkblue/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 ease-out ${
          isScrolled
            ? 'w-auto rounded-2xl px-3 py-3'
            : 'w-full max-w-md rounded-3xl px-5 py-4 md:w-auto md:max-w-none md:rounded-full md:px-12'
        } ${isOpen && isScrolled ? 'overflow-visible' : 'overflow-hidden'}`}
      >
        <div className={`relative flex items-center gap-3 ${isScrolled ? 'justify-start' : 'justify-center'}`}>
          {/* Logo - clickable to scroll to top */}
          <button onClick={scrollToTop} className="flex items-center gap-2 transition hover:scale-105 active:scale-95" aria-label="Scroll to top">
            <img src={logoImg} alt="Cultivator Logo" className="h-7 w-7 rounded-full object-cover" />
            {!isScrolled && <span className="hidden md:inline text-xl font-bold tracking-wide text-white">Cultivator</span>}
          </button>

          {/* Desktop: nav items (hidden when scrolled) */}
          <div className={`hidden items-center space-x-8 pl-2 md:flex transition-all duration-300 ${isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            {navItems.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to} className="text-base font-medium text-white/80 transition hover:text-white">
                  {item.label}
                </Link>
              ) : item.action ? (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="cursor-pointer text-base font-medium text-white/80 transition hover:text-white active:scale-[0.98]"
                >
                  {item.label}
                </button>
              ) : (
                <a key={item.label} href={item.href} className="text-base font-medium text-white/80 transition hover:text-white">
                  {item.label}
                </a>
              ),
            )}
          </div>

          {/* Desktop: scrolled state - show active section + menu + scroll top */}
          {isScrolled && (
            <div className="hidden md:flex items-center gap-3 pl-3">
              <span className="text-sm font-medium text-white/60">{activeSection}</span>
              <div className="h-4 w-px bg-white/20" />
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white/70 hover:text-white transition hover:scale-110" aria-label="Toggle menu">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <button onClick={scrollToTop} className="p-2 text-white/70 hover:text-white transition hover:scale-110 rounded-full hover:bg-white/10" aria-label="Scroll to top">
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Mobile: logo + menu button (no double logo) */}
          <div className="flex w-full items-center justify-between md:hidden">
            {/* Only show logo + name if NOT scrolled, otherwise logo is already visible above */}
            {!isScrolled && (
              <span className="flex items-center gap-2 text-lg font-bold tracking-wide text-white">
                Cultivator
              </span>
            )}
            {/* Spacer when scrolled to keep menu button on right */}
            {isScrolled && <div className="flex-1" />}
            <button
              onClick={() => setIsOpen((value) => !value)}
              className="ml-4 text-white transition hover:text-sunset-orange active:scale-[0.96]"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin-top] duration-200 ease-out md:hidden ${
            isOpen ? 'mt-6 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col items-center gap-5 pb-1 pt-2">
              {navItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-white/80 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : item.action ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    className="cursor-pointer text-lg font-medium text-white/80 transition hover:text-white active:scale-[0.98]"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-white/80 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Desktop dropdown menu (when scrolled + menu clicked) */}
        {isOpen && isScrolled && (
          <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-white/10 bg-navy/95 backdrop-blur-xl shadow-xl p-4 hidden md:block">
            {navItems.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2 text-base font-medium text-white/80 transition hover:text-white hover:bg-white/5 rounded-lg px-3"
                >
                  {item.label}
                </Link>
              ) : item.action ? (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="block w-full py-2 text-left text-base font-medium text-white/80 transition hover:text-white hover:bg-white/5 rounded-lg px-3"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2 text-base font-medium text-white/80 transition hover:text-white hover:bg-white/5 rounded-lg px-3"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

const Hero = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [heroLogoOpacity, setHeroLogoOpacity] = useState(1);
  const [ripplePositions, setRipplePositions] = useState([]);

  const metrics = [
    { label: 'Pilot Farms', value: '3+', text: 'Committed farm partners' },
    { label: 'Projected ROI', value: '12 mo', text: 'Target payback window' },
    { label: 'Market Size', value: '$800M', text: 'Global hardware TAM' },
  ];

  const currentMetric = metrics[activeMetric];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMetric((current) => (current + 1) % metrics.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [metrics.length]);

  useEffect(() => {
    let frame = 0;

    const updateLogoFade = () => {
      frame = 0;
      const nextOpacity = Math.max(0, Math.min(1, 1 - window.scrollY / 260));
      setHeroLogoOpacity(nextOpacity);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateLogoFade);
    };

    updateLogoFade();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleLogoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipplePositions(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipplePositions(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 md:pb-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={shrimpPondImg}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46vh] bg-[linear-gradient(180deg,rgba(179,229,255,0.72)_0%,rgba(103,199,255,0.38)_48%,transparent_100%)] mix-blend-screen"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-navy via-navy/55 to-transparent"></div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col items-center justify-center text-center">
        <FadeIn className="mx-auto w-full max-w-xs space-y-5 sm:max-w-none sm:space-y-7 md:space-y-9">
          <div className="space-y-4 md:space-y-6">
            <h1 className="mx-auto relative">
              <button
                onClick={handleLogoClick}
                className="relative cursor-pointer bg-transparent border-0 p-0"
                style={{ opacity: heroLogoOpacity }}
              >
                <img
                  src={heroTitleImg}
                  alt="Cultivator"
                  className={`mx-auto h-auto w-[min(82vw,19rem)] drop-shadow-[0_12px_35px_rgba(0,0,0,0.5)] sm:w-[min(78vw,30rem)] md:w-[min(72vw,42rem)] lg:w-[min(66vw,48rem)]`}
                  fetchPriority="high"
                />
                {ripplePositions.map(ripple => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full border-2 border-tealblue/40 animate-ping pointer-events-none"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      transform: 'translate(-50%, -50%)',
                      width: '100px',
                      height: '100px',
                    }}
                  />
                ))}
              </button>
            </h1>
            <p className="mx-auto max-w-[21ch] text-[1.35rem] font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:max-w-[32ch] sm:text-2xl md:max-w-4xl md:text-4xl">
              The Next Generation <span className="text-sunset-orange">of Smart Aquaculture Technology.</span>
            </p>
            <div className="mx-auto min-h-24 w-full max-w-xs sm:min-h-28 sm:max-w-md md:min-h-32">
              <div key={currentMetric.label} className="animate-ghost-metric text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-200/90">{currentMetric.label}</p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:mt-2 sm:text-6xl md:text-7xl">
                  {currentMetric.value}
                </p>
                <p className="mt-3 text-sm font-light text-white/60 tracking-wide md:text-base">{currentMetric.text}</p>
              </div>
            </div>
          </div>

          <div className="mx-auto min-h-10 w-full max-w-xs sm:min-h-16 sm:max-w-none md:min-h-20">
            <p className="mx-auto max-w-[26ch] text-sm font-semibold leading-snug text-white/88 drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:hidden">
              Prevent aerator failure before it costs a harvest.
            </p>
            <p className="mx-auto hidden max-w-[34ch] text-lg font-medium leading-relaxed text-white/88 sm:block md:max-w-3xl md:text-xl">
              Cultivator helps shrimp farms prevent aerator failure, protect harvest value, and turn emergency maintenance into predictable operating savings.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-xs flex-col gap-3 pt-1 sm:max-w-none sm:flex-row sm:justify-center">
            <CTAButton href="#problem" className="w-full sm:w-auto">
              Learn more <ChevronRight className="h-5 w-5" />
            </CTAButton>
          </div>

          <div className="mx-[calc(50%-50vw)] mt-2 w-screen">
            <LogoBand />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export const Problem = () => (
  <section id="problem" className="relative px-4 py-20 overflow-hidden">
    {/* Background image with smooth gradient fade top and bottom */}
    <div className="absolute inset-0 z-0">
      <img src={problemFragileOps} alt="" className="h-full w-full object-cover opacity-[0.15] mix-blend-luminosity" loading="lazy" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent"></div>
    </div>

    <div className="mx-auto max-w-7xl relative z-10">
      <FadeIn>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Problems with aerators.</h2>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        <FadeIn delay={100} className="h-full">
          <div className="relative h-full min-h-[380px] rounded-4xl overflow-hidden group animate-float [animation-delay:0s] shadow-2xl border border-white/10">
            <img src={aeratorsImg} alt="Failures go undetected" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-navy/95 via-navy/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">Failures go undetected</h3>
              <p className="text-white/90 leading-relaxed font-medium">Aerator Failures are often caught too late, resulting in immediate effect of the shrimps stress level and immune system.</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={200} className="h-full">
          <div className="relative h-full min-h-[380px] rounded-4xl overflow-hidden group animate-float [animation-delay:1s] shadow-2xl border border-white/10">
            <img src={electricityImg} alt="Electricity Cost Too High!" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-navy/95 via-navy/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">Electricity Cost Too High!</h3>
              <p className="text-white/90 leading-relaxed font-medium">The second highest cost goes to the electricity cost, ranking second to feeding.</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={300} className="h-full">
          <div className="relative h-full min-h-[380px] rounded-4xl overflow-hidden group animate-float [animation-delay:2s] shadow-2xl border border-white/10">
            <img src={smallerShrimpImg} alt="Smaller Shrimp" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-navy/95 via-navy/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-sunset-orange transition-colors">Smaller Shrimp</h3>
              <p className="text-white/90 leading-relaxed font-medium">Farmers are forced to harvest their shrimp earlier, meaning a smaller harvest; lower revenue.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export const Team = () => {
  const [activeMember, setActiveMember] = useState(null);
  const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const members = [
    {
      name: 'Frans (郭凡思)',
      role: 'CEO, Product Strategy',
      image: teamFrans,
      imageClass: 'brightness-110 contrast-105',
      nationality: 'Indonesia',
      flag: indonesiaFlag,
      major: 'B.Sc. EECS / 電機資訊學士班',
      experience: 'LITEON',
      experienceImage: teamFransExperience,
      experienceLogoClass: 'h-18 md:h-20 max-w-[13rem]',
    },
    {
      name: 'Jason (陈建豪)',
      role: 'COO, AI Systems & Data',
      image: teamJason,
      nationality: 'Indonesia',
      flag: indonesiaFlag,
      major: 'B.Sc. EECS / 電機資訊學士班',
      experience: 'KaikuTek',
      experienceImage: teamJasonExperience,
      experienceLogoClass: 'h-9 md:h-11',
    },
    {
      name: 'Delon (羊忠誠)',
      role: 'CMO, Marketing & Growth',
      image: teamDelon,
      nationality: 'United States',
      flag: usFlag,
      major: 'B.Sc. EECS / 電機資訊學士班',
      experience: 'NTHU Garage',
      experienceImage: teamDelonExperience,
      experienceLogoClass: 'h-9 md:h-11',
    },
    {
      name: 'Jai Jai (孫宏才)',
      role: 'CTO, Hardware Design',
      image: teamJai,
      nationality: 'Thailand',
      flag: thailandFlag,
      major: 'Engineering Technology / 工程技術學程',
      experience: 'Logitech',
      experienceImage: teamJaiExperience,
      experienceLogoClass: 'h-16 md:h-18 max-w-[14rem]',
    },
  ];
  const active = activeMember === null ? null : members[activeMember];
  const compactMembers =
    activeMember === null ? [] : members.map((member, index) => ({ ...member, index })).filter((member) => member.index !== activeMember);

  return (
    <section id="team" className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <img src={memberBg} alt="Background" className="h-full w-full object-cover opacity-[0.15] mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">Meet the Innovators.</h2>
            <p className="text-lg text-lightgrey">A focused NTHU founding team spanning product, AI, growth, and hardware design.</p>
          </div>
        </FadeIn>

        {active === null ? (
          <div className="mx-auto mb-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {members.map((member, index) => (
              <FadeIn key={member.name} delay={index * 80}>
                <button
                  type="button"
                  onClick={() => setActiveMember(index)}
                  onMouseEnter={() => {
                    if (canHover()) setActiveMember(index);
                  }}
                  className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-lg backdrop-blur-xl transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-sunset-orange/40 hover:bg-white/8 focus:outline-none focus-visible:border-sunset-orange focus-visible:ring-2 focus-visible:ring-sunset-orange/40 active:scale-[0.99]"
                >
                  <div className="relative aspect-square overflow-hidden bg-black md:aspect-[3/4]">
                    <img src={member.image} alt={member.name} className={`absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:scale-[1.03] ${member.imageClass || ''}`} />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/92 via-navy/12 to-transparent"></div>
                    <div className="absolute inset-x-3 bottom-3 md:bottom-4">
                      <h3 className="text-base font-bold leading-tight text-white md:text-lg">{member.name}</h3>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-sunset-orange md:text-[10px]">{member.role}</p>
                    </div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div
            className="mx-auto mb-10 grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-stretch"
            onMouseLeave={() => {
              if (canHover()) setActiveMember(null);
            }}
          >
            <FadeIn>
              <button
                type="button"
                onClick={() => {
                  if (!canHover()) setActiveMember(null);
                }}
                className="block w-full overflow-hidden rounded-3xl border border-sunset-orange/45 bg-white/10 text-left shadow-lg backdrop-blur-xl transition active:scale-[0.99]"
                aria-expanded="true"
              >
                <div className="grid md:grid-cols-[0.72fr_1fr]">
                  <div className="relative min-h-64 overflow-hidden bg-black sm:min-h-80 md:min-h-[24rem]">
                    <img src={active.image} alt={active.name} className={`absolute inset-0 h-full w-full object-cover ${active.imageClass || ''}`} />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/92 via-navy/18 to-transparent"></div>
                    <div className="absolute inset-x-5 bottom-5">
                      <h3 className="text-2xl font-bold leading-tight text-white">{active.name}</h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-sunset-orange">{active.role}</p>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center gap-4 bg-navy/82 p-5 md:p-7">
                    <div className="flex items-center gap-3">
                      <img src={active.flag} alt={`${active.nationality} flag`} className="h-6 w-9 rounded-[0.3rem] object-cover shadow-sm" />
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/82">{active.nationality}</p>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3">
                      <img src={nthuLogo} alt="NTHU" className="h-9 w-9 shrink-0 rounded-full bg-white object-cover" />
                      <div>
                        <p className="text-base font-bold text-white">NTHU, National Tsing Hua University</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-lightgrey">{active.major}</p>
                      </div>
                    </div>

                    <div className="max-w-sm rounded-2xl border border-white/10 bg-white p-3">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-navy/55">{active.experience}</p>
                      <img src={active.experienceImage} alt={`${active.experience} experience`} className={`mx-auto w-full object-contain ${active.experienceLogoClass}`} />
                    </div>
                  </div>
                </div>
              </button>
            </FadeIn>

            <div className="grid grid-cols-2 gap-3 pb-2 lg:flex lg:flex-col lg:pb-0">
              {compactMembers.map((member) => (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setActiveMember(member.index)}
                  onMouseEnter={() => {
                    if (canHover()) setActiveMember(member.index);
                  }}
                  className="group relative h-28 min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-lg transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-sunset-orange/40 hover:bg-white/8 focus:outline-none focus-visible:border-sunset-orange focus-visible:ring-2 focus-visible:ring-sunset-orange/40 active:scale-[0.98] sm:h-32 lg:h-full lg:min-h-0 lg:flex-1"
                >
                  <img src={member.image} alt={member.name} className={`absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:scale-[1.03] ${member.imageClass || ''}`} />
                  <div className="absolute inset-0 bg-linear-to-r from-navy/94 via-navy/45 to-transparent"></div>
                  <div className="absolute inset-0 flex items-end justify-between gap-3 p-3">
                    <div>
                      <p className="text-sm font-bold leading-tight text-white sm:text-base">{member.name}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-sunset-orange">{member.role}</p>
                    </div>
                    <img src={member.flag} alt={`${member.nationality} flag`} className="h-5 w-7 shrink-0 rounded-[0.25rem] object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const Gallery = () => {
  const images = [webImg1, webImg2, webImg4, webImg5];
  
  return (
    <section className="relative overflow-hidden py-24 bg-linear-to-b from-navy/95 to-navy/90">
      <div className="mb-12 text-center px-4 relative z-10">
        <h2 className="text-3xl font-bold text-white md:text-5xl">Real Operations, <span className="text-sunset-orange">Real Impact.</span></h2>
        <p className="mt-4 text-xl text-lightgrey">A glimpse into our pilot testing and field deployments across Asia.</p>
      </div>
      
      {/* Marquee container with fade edges */}
      <div className="relative flex w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-navy to-transparent md:w-64"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-navy to-transparent md:w-64"></div>
        
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...images, ...images, ...images].map((src, index) => (
            <div key={index} className="mx-4 relative overflow-hidden rounded-3xl border border-white/10 w-72 h-52 sm:w-96 sm:h-64 shrink-0 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              <img src={src} alt={`Field operation ${index}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CultivatorSolution = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  const hardwareFeatures = [
    {
      icon: Activity,
      title: 'Electrical Current',
      desc: 'Instantly detect power loss, overloads, or motor interruptions before they escalate into complete failures.',
    },
    {
      icon: Cpu,
      title: 'Mechanical Vibration',
      desc: 'Continuously monitor for abnormal movement, excessive wear, or impending mechanical failure.',
    },
  ];

  const softwareFeatures = [
    {
      icon: BarChart3,
      title: 'Real-time Anomaly Detection',
      desc: 'Analysis flags unusual operational patterns seconds after they occur.',
    },
    {
      icon: Bell,
      title: 'Instant Fault Notifications',
      desc: 'Receive critical alerts via SMS or push notification immediately when intervention is needed.',
    },
    {
      icon: Waves,
      title: 'Historical Analytics',
      desc: 'Track equipment lifespan and performance degradation over time to optimize maintenance schedules.',
    },
  ];

  const currentFeatures = activeTab === 'hardware' ? hardwareFeatures : softwareFeatures;
  const currentImage = activeTab === 'hardware' ? hardwareImg : appUiImg;
  const imageAlt = activeTab === 'hardware' ? 'Cultivator hardware on aerator' : 'Cultivator dashboard interface';
  const overlayText = activeTab === 'hardware' ? 'Works with what you have.' : 'See everything at a glance.';
  const badgeText = activeTab === 'hardware' ? 'Retrofit module' : 'Mobile dashboard';

  return (
    <section id="solution" className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <img src={shrimpPondImg} alt="" className="h-full w-full object-cover opacity-[0.12] mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-5 text-3xl font-bold text-white md:text-5xl">Solution</h2>
            <p className="text-lg leading-relaxed text-lightgrey md:text-xl">
              Hardware monitors your aerators. Software alerts you to problems.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mx-auto mb-10 flex w-fit justify-center rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('hardware')}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                activeTab === 'hardware'
                  ? 'bg-sunset-orange text-navy shadow-[0_0_20px_rgba(255,120,40,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Hardware
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                activeTab === 'software'
                  ? 'bg-sunset-orange text-navy shadow-[0_0_20px_rgba(255,120,40,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Software
            </button>
          </div>
        </FadeIn>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn delay={120}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <img src={currentImage} alt={imageAlt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-navy/88 via-navy/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="inline-flex rounded-full bg-sunset-orange px-4 py-2 text-sm font-bold text-navy">
                    {badgeText}
                  </div>
                  <p className="mt-4 max-w-md text-lg font-semibold leading-relaxed text-white">
                    {overlayText}
                  </p>
                </div>
              </div>

              {activeTab === 'hardware' && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Installation', value: 'No rewiring' },
                    { label: 'Connectivity', value: 'LoRaWAN' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/8 px-4 py-3 text-center backdrop-blur-md">
                      <p className="text-sm font-bold text-white">{item.value}</p>
                      <p className="mt-1 text-xs text-lightgrey">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          <div className="space-y-4">
            {currentFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={180 + index * 60}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-sunset-orange/30 hover:bg-white/8">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunset-orange text-navy">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-lightgrey">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}

            <FadeIn delay={480}>
              <CTAButton href="#traction" variant="secondary" className="w-full">
                See field validation <ChevronRight className="h-5 w-5" />
              </CTAButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => (
    <section id="traction" className="relative px-4 py-20">
      <div className="absolute inset-0 z-0">
        <img src={field3} alt="" className="h-full w-full object-cover opacity-[0.12] mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent"></div>
      </div>
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Credibility from the Field.</h2>
            <p className="text-xl text-lightgrey">Cultivator is combining startup momentum with direct farmer validation and Taiwan-based technical support.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <LogoMarquee />
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn delay={120}>
            <LiquidGlassCard className="h-full border-l-4 border-l-sunset-orange">
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-5xl font-extrabold text-white">5</p>
                  <p className="mt-1 text-lightgrey">Farmers approached</p>
                </div>
                <div>
                  <p className="text-5xl font-extrabold text-sunset-orange">3</p>
                  <p className="mt-1 text-lightgrey">Committed to pilot</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-lightgrey">
                Two partners in Indonesia are ready to adopt after MVP finalization, while a Taiwan partner is working with us for localized field testing.
              </p>
              <Link
                to="/media"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunset-orange px-6 py-3 text-base font-bold text-navy shadow-[0_0_22px_rgba(255,145,16,0.35)] transition hover:-translate-y-0.5 hover:bg-sunset-orange/90 active:scale-[0.98] sm:w-auto"
              >
                See more media <ChevronRight className="h-5 w-5" />
              </Link>
            </LiquidGlassCard>
          </FadeIn>

          <FadeIn delay={180}>
            <div className="grid h-full grid-cols-2 gap-4">
              {[field1, field2, field3].map((image, index) => (
                <div key={image} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl ${index === 0 ? 'col-span-2 h-48 md:h-56' : 'h-36 md:h-44'}`}>
                  <img src={image} alt="Cultivator field validation" className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/65 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
);

const Competitions = () => (
  <section id="competitions" className="relative px-4 py-20 bg-linear-to-b from-navy/80 to-navy/70">
    <div className="mx-auto max-w-7xl">
      <FadeIn>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Recognized Startup Momentum.</h2>
          <p className="text-xl text-lightgrey">External competitions help validate the business case, the social impact, and the team's execution speed.</p>
        </div>
      </FadeIn>

      <div className="grid gap-8 md:grid-cols-1">
        <FadeIn delay={100}>
          <LiquidGlassCard className="h-full">
            <div className="mb-6 overflow-hidden rounded-2xl">
              <img src={hultWinnerImg} alt="Hult Prize Winner" className="h-auto w-full object-cover" />
            </div>
            <h3 className="relative z-10 mb-4 text-3xl font-bold text-white">Hult Prize Nationals Winner</h3>
            <p className="relative z-10 mb-6 text-lg leading-relaxed text-lightgrey">
              Cultivator advanced through Taiwan's national stage and is preparing for the Digital Incubator track.
            </p>
            <div className="relative z-10 inline-flex rounded-full bg-sunset-orange/20 px-4 py-2 text-sm font-bold text-sunset-orange">
              Entering Digital Incubator
            </div>
          </LiquidGlassCard>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Market = () => {
  const [animatedStats, setAnimatedStats] = useState({ tam: 0, sam: 0, som: 0 });
  const [inView, setInView] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRef = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTimeout(() => {
            setAnimatedStats({ tam: 800, sam: 300, som: 50 });
          }, 300);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      label: 'TAM',
      full: 'Global aquaculture hardware',
      text: 'Total global hardware market.',
      progress: 100,
      icon: Globe2,
      value: 'tam',
    },
    {
      label: 'SAM',
      full: 'Asia hardware opportunity',
      text: "Asia's hardware aquaculture market.",
      progress: 62,
      icon: Waves,
      value: 'sam',
    },
    {
      label: 'SOM',
      full: 'Taiwan plus SEA entry',
      text: "Taiwan's pilot farms and 10% of Southeast Asia.",
      progress: 28,
      icon: Sprout,
      value: 'som',
    },
  ];

  const insights = [
    { label: 'Aerators per pond', value: '4-8', text: 'Creates repeated monitoring demand.' },
    { label: 'Taiwan farms', value: '~12k', text: 'Nearby access for installation and testing.' },
    { label: 'B2B2F launch', value: '2028', text: 'After pilot and MVP validation.' },
  ];

  return (
    <section id="market" ref={sectionRef} className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <img src={pexelsQuangImg} alt="" className="h-full w-full object-cover opacity-[0.12] mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">A Scalable Solution.</h2>
            <p className="text-xl text-lightgrey">Taiwan shrimp market ~$507M. ~12,000 farms using 4-8 aerators per pond.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mx-auto mb-10 flex w-fit justify-center rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('overview')}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                activeTab === 'overview'
                  ? 'bg-sunset-orange text-navy shadow-[0_0_20px_rgba(255,120,40,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Market Size
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                activeTab === 'insights'
                  ? 'bg-sunset-orange text-navy shadow-[0_0_20px_rgba(255,120,40,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Market Insights
            </button>
          </div>
        </FadeIn>

        {activeTab === 'overview' ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-sunset-orange/40 hover:bg-white/8 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,120,40,0.15)]">
                  <div className="mb-4 flex items-center justify-between">
                    <stat.icon className={`h-7 w-7 text-sunset-orange transition-transform duration-500 ${inView ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: `${index * 100 + 200}ms` }} />
                    <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-white/75">
                      {stat.label}
                    </div>
                  </div>

                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white md:text-5xl">
                      {inView ? `$${Math.round(animatedStats[stat.value])}M` : '$0M'}
                    </span>
                  </div>

                  <p className="mb-4 text-sm font-medium text-white/70">{stat.full}</p>

                  <div className="relative">
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-sunset-orange to-sunset-skyblue transition-all duration-1000 ease-out"
                        style={{ width: inView ? `${stat.progress}%` : '0%', transitionDelay: `${index * 100 + 400}ms` }}
                      />
                    </div>
                    <img
                      src={logoImg}
                      alt=""
                      className="absolute -top-3 h-7 w-7 rounded-full border-2 border-white/30 object-cover shadow-lg transition-all duration-1000 ease-out"
                      style={{ left: inView ? `${stat.progress}%` : '0%', transform: 'translateX(-50%)', transitionDelay: `${index * 100 + 400}ms` }}
                    />
                  </div>

                  <p className={`mt-4 text-sm leading-relaxed text-lightgrey transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: `${index * 100 + 600}ms` }}>
                    {stat.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {insights.map((item, index) => (
              <FadeIn key={item.label} delay={index * 100}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-sunset-orange/30 hover:bg-white/8 hover:-translate-y-1">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-lightgrey">{item.label}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/78">{item.text}</p>
                    </div>
                    <p className="shrink-0 text-3xl font-extrabold text-sunset-orange">{item.value}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={300}>
              <div className="rounded-3xl border border-sunset-orange/20 bg-sunset-orange/10 p-6">
                <p className="mb-2 text-sm font-bold text-sunset-orange">Why this matters</p>
                <p className="text-sm leading-relaxed text-white/82">
                  Cultivator starts where aerator failure has immediate cost, then expands through partners serving pond operators.
                </p>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </section>
  );
};

const Roadmap = () => {
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(null);
  const sectionRef = useState(null);

  const phases = [
    {
      label: 'Pilot',
      range: 'Months 1-3',
      status: 'Current',
      farms: 3,
      icon: Rocket,
      color: 'sunset-orange',
      items: [
        { time: 'Month 1', title: 'Prototype Finalization', text: 'Finalize device, build pilot units, waterproof case, confirm farms.' },
        { time: 'Month 2', title: 'Field Deployment', text: 'Install devices, collect data, test alerts, gather farmer feedback.' },
        { time: 'Month 3', title: 'Validation', text: 'Analyze results, improve product, prepare pilot report.' },
      ],
    },
    {
      label: 'Expansion',
      range: '2026-2028',
      status: 'Next',
      farms: 200,
      icon: Handshake,
      color: 'sunset-skyblue',
      items: [
        { time: '2026', title: 'Final MVP', text: 'Final MVP and pilot farms reaching 50 farmers.' },
        { time: '2027', title: 'Precision Prototype', text: 'Precision prototype deployed across 50 farms.' },
        { time: '2028', title: 'B2B2F Launch', text: '200 farmers and expansion into Southeast Asia.' },
      ],
    },
    {
      label: 'Scale',
      range: '2029-2030',
      status: 'Future',
      farms: 5000,
      icon: Building2,
      color: 'tealblue',
      items: [
        { time: '2029', title: 'Operational BEP', text: '1,000 farmers, operational break-even, 1,260 ponds.' },
        { time: '2030', title: 'Asia Expansion', text: '5,000 farmers across Asia.' },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTimeout(() => setProgress(18), 300);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className="relative overflow-hidden px-4 py-16 sm:py-24">
      <div className="absolute inset-0 z-0">
        <img src={shrimpFarmImg} alt="" className="h-full w-full object-cover opacity-[0.12] mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(85,212,255,0.08),transparent_45%)]"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-bold text-white md:mb-6 md:text-5xl">Path to 5,000 Farms</h2>
            <p className="text-base text-lightgrey sm:text-xl">Pilot → Expansion → Scale across Asia</p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="mb-6 h-1 rounded-full bg-white/10 sm:mb-8">
            <div
              className="h-full rounded-full bg-linear-to-r from-sunset-orange via-sunset-skyblue to-tealblue transition-all duration-1000 ease-out"
              style={{ width: inView ? `${progress}%` : '0%' }}
            />
            <img
              src={logoImg}
              alt=""
              className="absolute -top-3 h-8 w-8 rounded-full border-2 border-white/30 object-cover shadow-lg transition-all duration-1000 ease-out"
              style={{ left: inView ? `${progress}%` : '0%', transform: 'translateX(-50%)' }}
            />
          </div>

          <div className="roadmap-phase-list mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4 md:grid md:max-w-4xl md:auto-rows-fr md:grid-cols-3 md:items-stretch">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = progress > index * 40;
              const isExpanded = activePhase === index;

              return (
                <FadeIn key={phase.label} delay={index * 120} className="roadmap-phase-item min-w-0 shrink-0 md:h-full">
                  <button
                    onClick={() => setActivePhase(isExpanded ? null : index)}
                    className={`roadmap-phase-card group relative w-full overflow-hidden rounded-2xl border bg-white/4 p-4 text-left transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out md:h-full md:rounded-3xl md:p-3 ${
                      isActive
                        ? `border-${phase.color}/40 bg-white/8 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(85,212,255,0.15)]`
                        : 'border-white/10'
                    }`}
                  >
                    <div className="relative z-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 md:flex md:justify-between md:gap-4">
                      <div className="flex min-w-0 items-center gap-3 md:gap-4">
                        <div className={`shrink-0 rounded-xl p-2.5 transition-transform duration-200 ease-out md:rounded-2xl md:p-3 ${isActive ? `bg-${phase.color}/20 md:scale-110` : `bg-${phase.color}/10`}`}>
                          <Icon className={`h-5 w-5 text-${phase.color} md:h-6 md:w-6`} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-lightgrey md:text-sm md:tracking-[0.18em]">{phase.range}</p>
                          <h3 className="truncate text-lg font-bold text-white md:text-2xl">{phase.label}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-extrabold leading-none text-white transition-transform duration-200 ease-out md:text-2xl ${isActive ? 'md:scale-110' : ''}`}>
                          {phase.farms.toLocaleString()}
                        </div>
                        <p className="mt-1 text-[10px] leading-none text-lightgrey md:text-xs">farms</p>
                      </div>
                    </div>

                    <div className={`relative z-10 grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out ${isExpanded ? 'mt-4 grid-rows-[1fr] opacity-100 md:mt-6' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="space-y-2 md:space-y-3">
                          {phase.items.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-white/10 bg-navy/40 p-3 md:p-4">
                              <p className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-lightgrey md:text-xs">{item.time}</p>
                              <h4 className="mb-1.5 text-base font-bold text-white md:mb-2 md:text-lg">{item.title}</h4>
                              <p className="text-sm leading-relaxed text-lightgrey">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-${phase.color}/10 to-transparent transition-opacity duration-200 md:rounded-3xl ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const SDGImpact = () => {
  const [tiltCards, setTiltCards] = useState([null, null, null]);

  const handleMouseMove = (index, e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTiltCards(prev => {
      const updated = [...prev];
      updated[index] = { rotateX, rotateY };
      return updated;
    });
  };

  const handleMouseLeave = (index) => {
    setTiltCards(prev => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const goals = [
    {
      img: sdg1Img,
      alt: 'SDG 2 Zero Hunger',
      headline: 'Zero Hunger',
      metric: 'Supporting 50+ farmers by 2026',
      text: 'Reducing avoidable crop loss protects local protein supply and strengthens small farm resilience.',
    },
    {
      img: sdg2Img,
      alt: 'SDG 9 Industry, Innovation and Infrastructure',
      headline: 'Resilient Infrastructure',
      metric: 'Retrofitting existing aerators',
      text: 'Cultivator upgrades farm equipment without forcing expensive pond redesigns or full system replacement.',
    },
    {
      img: sdg3Img,
      alt: 'SDG 12 Responsible Consumption and Production',
      headline: 'Responsible Production',
      metric: 'Fewer emergency failures',
      text: 'Earlier maintenance signals can reduce wasted energy, prevent sudden die-offs, and improve operational planning.',
    },
  ];

  return (
    <section id="sdg" className="relative overflow-hidden px-4 py-20 bg-linear-to-b from-navy/90 to-navy">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(85,212,255,0.05),transparent_50%)]"></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Sustainable Impact.</h2>
            <p className="text-xl text-lightgrey">Cultivator connects farm-level reliability with measurable progress on food security, infrastructure, and responsible production.</p>
          </div>
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-3">
          {goals.map((goal, index) => (
            <FadeIn key={goal.headline} delay={index * 120}>
              <div
                className="perspective-1000"
                onMouseMove={(e) => handleMouseMove(index, e)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div
                  className="transition-transform duration-200 ease-out will-change-transform"
                  style={{
                    transform: tiltCards[index]
                      ? `perspective(1000px) rotateX(${tiltCards[index].rotateX}deg) rotateY(${tiltCards[index].rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                      : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
                  }}
                >
                  <LiquidGlassCard className="h-full">
                    <img src={goal.img} alt={goal.alt} className="mb-6 h-28 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] md:h-32" />
                    <h3 className="mb-3 text-2xl font-bold text-white">{goal.headline}</h3>
                    <div className="mb-4 rounded-2xl bg-sunset-orange/15 px-4 py-3 text-sm font-bold text-sunset-orange">{goal.metric}</div>
                    <p className="leading-relaxed text-lightgrey">{goal.text}</p>
                  </LiquidGlassCard>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const StickyInvestorCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!isDismissed) {
        setIsVisible(window.scrollY > window.innerHeight * 0.72);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setDragOffsetX(0);
  };

  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffsetX(deltaX);
    } else if (deltaY > 50) {
      handleDismiss();
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffsetX) > 90) {
      handleDismiss();
    } else {
      setDragOffsetX(0);
    }
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition duration-300 ease-out md:px-6 md:pb-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${dragOffsetX}px)` }}
    >
      <div className="mx-auto flex max-w-4xl items-start gap-2 sm:items-center">
        <div className="relative flex-1 rounded-3xl border border-white/15 bg-navy/85 p-4 pr-14 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:flex sm:items-center sm:justify-between sm:p-3">
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy/90 p-2 text-white/70 shadow-lg transition-colors hover:bg-white/10 hover:text-white sm:hidden"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="px-2 text-center sm:pr-4 sm:text-left">
            <p className="font-bold text-white">Ready to review Cultivator?</p>
            <p className="text-sm text-lightgrey">Download the deck or book a partner conversation.</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-0 sm:flex">
          <a
            href={proposalPdf}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset-orange px-4 py-3 text-sm font-bold text-navy transition hover:bg-sunset-orange/90 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Pitch Deck
          </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15 active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </a>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-navy/90 p-2 text-white/70 shadow-lg transition-colors hover:bg-white/10 hover:text-white sm:flex"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  useLayoutEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const previousScrollRestoration = window.history.scrollRestoration;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    if (isMobile && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    document.documentElement.style.scrollBehavior = 'auto';

    const scrollToHero = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    scrollToHero();

    const frame = window.requestAnimationFrame(scrollToHero);
    const shortTimer = window.setTimeout(scrollToHero, 60);
    const restoreTimer = window.setTimeout(() => {
      scrollToHero();
      document.documentElement.style.scrollBehavior = 'smooth';
    }, isMobile ? 260 : 0);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(shortTimer);
      window.clearTimeout(restoreTimer);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      if (isMobile && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-navy pb-28 text-white selection:bg-sunset-orange selection:text-navy md:pb-24">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Problem />
      <CultivatorSolution />
      <SocialProof />
      <Competitions />
      <Market />
      <Gallery />
      <Team />
      <Roadmap />
      <SDGImpact />
      <ContactSection />
      <Footer />
      <StickyInvestorCTA />
    </div>
  );
}
