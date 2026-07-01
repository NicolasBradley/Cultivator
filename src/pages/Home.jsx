import { useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  Cpu,
  Download,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  Medal,
  Menu,
  Quote,
  Rocket,
  Sprout,
  Trophy,
  Waves,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LiquidGlassCard, FadeIn, CursorGlow, Footer } from '../components/SharedUI';

import hardwareImg from '../assets/product_img.jpeg';
import appUiImg from '../assets/software_img.png';
import shrimpPondImg from '../assets/shrimp_pond.jpg';
import proposalPdf from '../assets/inspo/Cultivator Project Proposal V5.pdf';
import heroVideo from '../assets/thailand_shrimp_farm_video.mp4';
import logoImg from '../assets/Orange_No BG.png';
import { ContactSection } from '../components/ContactSection';

import sdg1Img from '../assets/sdg_1.png';
import sdg2Img from '../assets/sdg_2.png';
import sdg3Img from '../assets/sdg_3.png';

import field1 from '../assets/asia/S__238305289_0.jpg';
import field2 from '../assets/jason/DSC05264.JPG';
import field3 from '../assets/asia/S__238305296_0.jpg';
import field4 from '../assets/jason/DSC05282.JPG';

import aeratorsImg from '../assets/aerators.jpg';
import electricityImg from '../assets/electricity.jpg';
import smallerShrimpImg from '../assets/smaller_shrimp.jpg';

import webImg1 from '../assets/web_img1.jpg';
import webImg2 from '../assets/web_img2.jpg';
import webImg4 from '../assets/web_img4.jpeg';
import webImg5 from '../assets/web_img5.jpeg';

import nthuLogo from '../assets/nthu logo.jpg';
import teamFrans from '../assets/members/frans/frans_pic.jpg';
import teamFransExperience from '../assets/members/frans/frans_experience.png';
import teamJason from '../assets/members/jason/jason_pic.jpg';
import teamJasonExperience from '../assets/members/jason/jason_experience.png';
import teamDelon from '../assets/members/delon/delon_pic.jpg';
import teamDelonExperience from '../assets/members/delon/delon_experience.png';
import teamJai from '../assets/members/jai/jai_pic.jpg';
import teamJaiExperience from '../assets/members/jai/jai_experience.png';

const CTAButton = ({ href, children, variant = 'primary', className = '' }) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition hover:-translate-y-0.5 active:scale-[0.98] md:px-8 md:py-4 md:text-lg';
  const styles =
    variant === 'primary'
      ? 'bg-sunset-orange text-navy shadow-[0_0_22px_rgba(255,145,16,0.42)] hover:bg-sunset-orange/90'
      : 'border border-white/20 bg-white/5 text-white hover:bg-white/10';

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', action: () => navigate('/') },
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'Traction', href: '#traction' },
    { label: 'Market', href: '#market' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="pointer-events-none fixed top-6 z-50 flex w-full justify-center px-4">
      <nav
        className="pointer-events-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-darkblue/50 px-5 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[background-color,border-color] duration-200 ease-out md:w-auto md:max-w-none md:rounded-full md:px-12"
      >
        <div className="relative flex items-center justify-center gap-4">
          <div className="hidden items-center gap-6 border-r border-white/10 pr-6 md:flex">
            <span className="flex items-center gap-2 text-xl font-bold tracking-wide text-white">
              <img src={logoImg} alt="Cultivator Logo" className="h-8 w-8 rounded-full object-cover" />
              Cultivator
            </span>
          </div>
          <div className="hidden items-center space-x-8 pl-2 md:flex">
            {navItems.map((item) =>
              item.action ? (
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

          <div className="flex w-full items-center justify-between px-2 md:hidden">
            <span className="flex items-center gap-2 text-lg font-bold tracking-wide text-white">
              <img src={logoImg} alt="Cultivator Logo" className="h-7 w-7 rounded-full object-cover" />
              Cultivator
            </span>
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

        <div
          className={`grid transition-[grid-template-rows,opacity,margin-top] duration-200 ease-out md:hidden ${
            isOpen ? 'mt-6 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col items-center gap-5 pb-1 pt-2">
              {navItems.map((item) =>
                item.action ? (
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
      </nav>
    </div>
  );
};

const Hero = () => {

  const metrics = [
    { label: 'Pilot Farms', value: '3+', text: 'Committed farm partners' },
    { label: 'Projected ROI', value: '12 mo', text: 'Target payback window' },
    { label: 'Market Size', value: '$800M', text: 'Global hardware TAM' },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 md:pb-16">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={shrimpPondImg}
        className="absolute inset-0 h-full w-full object-cover opacity-[62%]"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-navy/15 via-navy/55 to-navy"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy to-transparent"></div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col items-center justify-center text-center">
        <FadeIn className="mx-auto w-full max-w-xs space-y-7 sm:max-w-none md:space-y-9">
          <div className="space-y-5 md:space-y-6">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85 shadow-xl backdrop-blur-xl">
              <BarChart3 className="h-4 w-4 text-sunset-orange" />
              <span className="sm:hidden">Investor-ready aquaculture</span>
              <span className="hidden sm:inline">Investor-ready aquaculture infrastructure</span>
            </div>
            <h1
              className="mx-auto text-[2.35rem] font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:max-w-none md:text-6xl lg:text-7xl"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.62)' }}
            >
              <span className="md:hidden">
                Support the
                <br />
                Next
                <br />
                Generation
                <br />
                <span className="text-sunset-orange">
                  of Smart
                  <br />
                  Aquaculture
                  <br />
                  Technology.
                </span>
              </span>
              <span className="hidden md:inline">
                Support the Next Generation <br />
                <span className="text-sunset-orange">of Smart Aquaculture Technology.</span>
              </span>
            </h1>
            <p className="mx-auto max-w-[25ch] text-base font-medium leading-relaxed text-white/88 sm:max-w-[34ch] sm:text-lg md:max-w-3xl md:text-2xl">
              AeroTrust helps shrimp farms prevent aerator failure, protect harvest value, and turn emergency maintenance into predictable operating savings.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-xs gap-3 rounded-3xl border border-white/15 bg-white/10 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:max-w-5xl sm:grid-cols-3 md:gap-4 md:p-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-navy/35 px-4 py-4 text-left md:px-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lightgrey">{metric.label}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-2xl md:text-4xl">{metric.value}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/75 md:text-base">{metric.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-xs flex-col gap-3 pt-1 sm:max-w-none sm:flex-row sm:justify-center">
            <CTAButton href="#contact" className="w-full sm:w-auto">
              Contact Us <ChevronRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton href={proposalPdf} variant="secondary" className="w-full backdrop-blur-xl sm:w-auto">
              <Download className="h-5 w-5" />
              Download Pitch Deck
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export const Problem = () => (
  <section id="problem" className="relative px-4 py-20">
    <div className="mx-auto max-w-7xl relative z-10">
      <FadeIn>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Problems with aerators.</h2>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        <FadeIn delay={100} className="h-full">
          <div className="relative h-full min-h-[380px] rounded-4xl overflow-hidden group animate-float [animation-delay:0s] shadow-2xl border border-white/10">
            <img src={aeratorsImg} alt="Failures go undetected" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-navy/95 via-navy/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">Failures go undetected</h3>
              <p className="text-white/90 leading-relaxed font-medium">Aerator Failures are often caught too late, resulting in immediate effect of the shrimps stress level and immune system.</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={200} className="h-full">
          <div className="relative h-full min-h-[380px] rounded-4xl overflow-hidden group animate-float [animation-delay:1s] shadow-2xl border border-white/10">
            <img src={electricityImg} alt="Electricity Cost Too High!" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-navy/95 via-navy/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">Electricity Cost Too High!</h3>
              <p className="text-white/90 leading-relaxed font-medium">The second highest cost goes to the electricity cost, ranking second to feeding.</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={300} className="h-full">
          <div className="relative h-full min-h-[380px] rounded-4xl overflow-hidden group animate-float [animation-delay:2s] shadow-2xl border border-white/10">
            <img src={smallerShrimpImg} alt="Smaller Shrimp" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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

export const Team = () => (
  <section id="team" className="relative px-4 py-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={hardwareImg} alt="Background" className="h-full w-full object-cover opacity-[0.03] mix-blend-luminosity" />
    </div>
    <div className="relative z-10 mx-auto max-w-6xl">
      <FadeIn>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">Meet the Innovators.</h2>
          <p className="text-lg text-lightgrey">A focused NTHU founding team spanning product, AI, growth, and hardware design.</p>
        </div>
      </FadeIn>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10 mx-auto">
        {[
          {
            name: 'Frans (郭凡思)',
            role: 'CEO, Product Strategy',
            image: teamFrans,
            imageClass: 'brightness-110 contrast-105',
            nationality: 'Indonesia',
            major: 'B.S. in Electrical Engineering and Computer Science / 電機資訊學士班',
            experience: 'LITEON',
            experienceImage: teamFransExperience,
            experienceLogoClass: 'h-18 md:h-20',
          },
          {
            name: 'Jason (陈建豪)',
            role: 'COO, AI Systems & Data',
            image: teamJason,
            nationality: 'Indonesia',
            major: 'B.S. in Electrical Engineering and Computer Science / 電機資訊學士班',
            experience: 'KaikuTek',
            experienceImage: teamJasonExperience,
            experienceLogoClass: 'h-14 md:h-16',
          },
          {
            name: 'Delon (羊忠誠)',
            role: 'CMO, Marketing & Growth',
            image: teamDelon,
            nationality: 'United States',
            major: 'B.S. in Electrical Engineering and Computer Science / 電機資訊學士班',
            experience: 'NTHU Garage',
            experienceImage: teamDelonExperience,
            experienceLogoClass: 'h-14 md:h-16',
          },
          {
            name: 'Jai Jai (孫宏才)',
            role: 'CTO, Hardware Design',
            image: teamJai,
            nationality: 'Thailand',
            major: 'Engineering Technology Program / 工程技術學程',
            experience: 'Logitech',
            experienceImage: teamJaiExperience,
            experienceLogoClass: 'h-18 md:h-20',
          },
        ].map((member, index) => (
          <FadeIn key={member.name} delay={index * 100}>
            <button type="button" className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-sunset-orange/40 hover:bg-white/8 focus:outline-none focus-visible:border-sunset-orange focus-visible:ring-2 focus-visible:ring-sunset-orange/40 active:scale-[0.99]">
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img src={member.image} alt={member.name} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-focus:scale-[1.03] ${member.imageClass || ''}`} />
                <div className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/20 to-transparent"></div>

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-navy/65 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-xl">
                  <img src={nthuLogo} alt="NTHU" className="h-5 w-5 rounded-full bg-white object-cover" />
                  NTHU
                </div>

                <div className="absolute inset-x-3 bottom-3 translate-y-[calc(100%-4.5rem)] rounded-3xl border border-white/10 bg-navy/82 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 ease-out group-hover:translate-y-0 group-focus:translate-y-0">
                    <h3 className="text-lg font-bold leading-tight text-white">{member.name}</h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sunset-orange">{member.role}</p>

                  <div className="mt-4 border-t border-white/10 pt-4 opacity-0 transition duration-200 group-hover:opacity-100 group-focus:opacity-100">
                    <div className="mb-3 rounded-2xl border border-white/10 bg-white/8 p-3 text-sm">
                      <p className="font-bold text-white">{member.nationality}</p>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-lightgrey">Nationality</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-navy/55">Experience</p>
                      <img src={member.experienceImage} alt={`${member.experience} experience`} className={`w-full object-contain ${member.experienceLogoClass}`} />
                    </div>

                    <div className="mt-3 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/8 p-3">
                      <img src={nthuLogo} alt="National Tsing Hua University" className="h-8 w-8 rounded-full bg-white object-cover" />
                      <div>
                        <p className="text-sm font-bold text-white">National Tsing Hua University</p>
                        <p className="text-xs leading-snug text-lightgrey">{member.major}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export const Gallery = () => {
  const images = [webImg1, webImg2, webImg4, webImg5];
  
  return (
    <section className="relative overflow-hidden py-24">
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

const AeroTrustSolution = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  return (
    <section id="solution" className="relative px-4 py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">The AeroTrust Solution.</h2>
            <p className="text-xl text-lightgrey">Real-time aerator health monitoring for aquaculture systems. Installed directly on existing paddlewheel aerators.</p>
          </div>
        </FadeIn>

        <div className="mb-10 flex justify-center md:mb-12">
          <div className="grid w-full max-w-md grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md sm:w-auto">
            <button
              onClick={() => setActiveTab('hardware')}
              className={`rounded-full px-5 py-3 text-base font-bold transition active:scale-[0.98] md:px-8 md:text-lg ${
                activeTab === 'hardware' ? 'bg-sunset-orange text-navy shadow-[0_0_15px_rgba(85,212,255,0.35)]' : 'text-white/70 hover:text-white'
              }`}
            >
              Hardware
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className={`rounded-full px-5 py-3 text-base font-bold transition active:scale-[0.98] md:px-8 md:text-lg ${
                activeTab === 'software' ? 'bg-sunset-orange text-navy shadow-[0_0_15px_rgba(85,212,255,0.35)]' : 'text-white/70 hover:text-white'
              }`}
            >
              Software
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <div className={`transition-all duration-300 ease-out ${activeTab === 'hardware' ? 'relative z-10 translate-y-0 opacity-100' : 'pointer-events-none absolute inset-0 translate-y-5 opacity-0'}`}>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <LiquidGlassCard className="border-l-4 border-l-sunset-orange">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-2xl bg-sunset-orange/20 p-3 text-sunset-orange">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-white">Electrical Current</h3>
                      <p className="leading-relaxed text-lightgrey">Instantly detect power loss, overloads, or motor interruptions before they escalate into complete failures.</p>
                    </div>
                  </div>
                </LiquidGlassCard>
                <LiquidGlassCard className="border-l-4 border-l-sunset-skyblue">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-2xl bg-sunset-skyblue/20 p-3 text-sunset-skyblue">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-white">Mechanical Vibration</h3>
                      <p className="leading-relaxed text-lightgrey">Continuously monitor for abnormal movement, excessive wear, or impending mechanical failure.</p>
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-white/10 shadow-2xl">
                <img src={hardwareImg} alt="Hardware on aerator" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-xl font-bold text-white">Plug and Play Installation</p>
                  <p className="mt-2 text-lightgrey">Retrofits easily onto standard paddlewheel aerators.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-300 ease-out ${activeTab === 'software' ? 'relative z-10 translate-y-0 opacity-100' : 'pointer-events-none absolute inset-0 translate-y-5 opacity-0'}`}>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-white/10 shadow-2xl">
                <img src={appUiImg} alt="AeroTrust dashboard" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-xl font-bold text-white">AeroTrust Dashboard</p>
                  <p className="mt-2 text-lightgrey">Clear, actionable data in the palm of your hand.</p>
                </div>
              </div>
              <div className="space-y-6">
                <LiquidGlassCard>
                  <div className="mb-3 flex items-center gap-4">
                    <div className="rounded-xl bg-sunset-skyblue/20 p-2 text-sunset-skyblue">
                      <Activity className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Real-time Anomaly Detection</h3>
                  </div>
                  <p className="text-lightgrey">AI-assisted analysis flags unusual operational patterns seconds after they occur.</p>
                </LiquidGlassCard>
                <LiquidGlassCard>
                  <div className="mb-3 flex items-center gap-4">
                    <div className="rounded-xl bg-sunset-orange/20 p-2 text-sunset-orange">
                      <Bell className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Instant Fault Notifications</h3>
                  </div>
                  <p className="text-lightgrey">Receive critical alerts via SMS or push notification immediately when intervention is needed.</p>
                </LiquidGlassCard>
                <LiquidGlassCard>
                  <div className="mb-3 flex items-center gap-4">
                    <div className="rounded-xl bg-white/10 p-2 text-white">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Historical Analytics</h3>
                  </div>
                  <p className="text-lightgrey">Track equipment lifespan and performance degradation over time to optimize maintenance schedules.</p>
                </LiquidGlassCard>
              </div>
            </div>
          </div>
        </div>

        <FadeIn delay={120}>
          <div className="mt-12 flex justify-center">
            <CTAButton href="#market" variant="secondary">
              See market opportunity <ChevronRight className="h-5 w-5" />
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const partners = [
    { name: 'NTHU', detail: 'Campus ecosystem' },
    { name: 'NTHU Garage', detail: 'Startup support' },
    { name: 'Pilot Farms', detail: 'Field validation' },
    { name: 'NTOU', detail: 'Technical conversations' },
  ];

  const testimonials = [
    {
      quote: 'A failed aerator at night can decide the whole harvest. Earlier alerts would change how we manage risk.',
      name: 'Taiwan shrimp farm operator',
      meta: 'Pilot discovery interview',
      image: field2,
    },
    {
      quote: 'The device fits our current workflow because it checks the machine instead of asking farmers to change everything.',
      name: 'Partner farm manager',
      meta: 'Field feedback',
      image: field3,
    },
    {
      quote: 'A simple warning before oxygen drops is the kind of tool small farms can actually use.',
      name: 'Southeast Asia farm partner',
      meta: 'Expansion feedback',
      image: field4,
    },
  ];

  return (
    <section id="traction" className="relative border-y border-white/5 bg-navy/45 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Credibility from the Field.</h2>
            <p className="text-xl text-lightgrey">Cultivator is combining startup momentum with direct farmer validation and Taiwan-based technical support.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-12 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-navy/35 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sunset-skyblue/30 bg-sunset-skyblue/10 text-sm font-extrabold text-white">
                  {partner.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-bold text-white">{partner.name}</p>
                  <p className="text-sm text-lightgrey">{partner.detail}</p>
                </div>
              </div>
            ))}
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href={proposalPdf} className="w-full sm:w-auto">
                  <Download className="h-5 w-5" />
                  Pitch Deck
                </CTAButton>
                <CTAButton href="#contact" variant="secondary" className="w-full sm:w-auto">
                  Partner With Us
                </CTAButton>
              </div>
            </LiquidGlassCard>
          </FadeIn>

          <FadeIn delay={180}>
            <div className="grid h-full grid-cols-2 gap-4">
              {[field1, field2, field3, field4].map((image, index) => (
                <div key={image} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl ${index === 0 ? 'col-span-2 h-48 md:h-56' : 'h-36 md:h-44'}`}>
                  <img src={image} alt="Cultivator field validation" className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/65 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.name} delay={index * 100}>
              <LiquidGlassCard className="h-full">
                <Quote className="mb-5 h-8 w-8 text-sunset-orange" />
                <p className="mb-6 text-lg leading-relaxed text-white/88">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={`${testimonial.name} - ${testimonial.meta}`} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-lightgrey">{testimonial.meta}</p>
                  </div>
                </div>
              </LiquidGlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Competitions = () => (
  <section id="competitions" className="relative border-y border-tealblue/20 bg-navy/60 px-4 py-20">
    <div className="mx-auto max-w-7xl">
      <FadeIn>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Recognized Startup Momentum.</h2>
          <p className="text-xl text-lightgrey">External competitions help validate the business case, the social impact, and the team's execution speed.</p>
        </div>
      </FadeIn>

      <div className="grid gap-8 md:grid-cols-2">
        <FadeIn delay={100}>
          <LiquidGlassCard className="h-full">
            <Trophy className="relative z-10 mb-6 h-12 w-12 text-sunset-orange" />
            <h3 className="relative z-10 mb-4 text-3xl font-bold text-white">Hult Prize Nationals Winner</h3>
            <p className="relative z-10 mb-6 text-lg leading-relaxed text-lightgrey">
              Cultivator advanced through Taiwan's national stage and is preparing for the Digital Incubator track.
            </p>
            <div className="relative z-10 inline-flex rounded-full bg-sunset-orange/20 px-4 py-2 text-sm font-bold text-sunset-orange">
              Entering Digital Incubator
            </div>
          </LiquidGlassCard>
        </FadeIn>

        <FadeIn delay={180}>
          <LiquidGlassCard className="h-full">
            <Medal className="relative z-10 mb-6 h-12 w-12 text-sunset-skyblue" />
            <h3 className="relative z-10 mb-4 text-3xl font-bold text-white">Startup World Cup Hsinchu</h3>
            <p className="relative z-10 mb-6 text-lg leading-relaxed text-lightgrey">
              Startup exposure in Hsinchu connects the team with mentors, investors, technical advisors, and potential channel partners.
            </p>
            <div className="relative z-10 inline-flex rounded-full bg-sunset-skyblue/15 px-4 py-2 text-sm font-bold text-sunset-skyblue">
              Supported by NTHU Garage
            </div>
          </LiquidGlassCard>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Market = () => {
  const [activeRegion, setActiveRegion] = useState('taiwan');

  const stats = [
    {
      label: 'TAM',
      value: '~$800M',
      full: 'Global aquaculture hardware',
      text: 'Total global hardware aquaculture market excluding SaaS.',
      progress: 100,
      icon: Globe2,
    },
    {
      label: 'SAM',
      value: '~$300M',
      full: 'Asia hardware opportunity',
      text: "Asia's hardware aquaculture market.",
      progress: 62,
      icon: Waves,
    },
    {
      label: 'SOM',
      value: '~$50M',
      full: 'Taiwan plus SEA entry',
      text: "Taiwan's pilot farms and 10% of the Southeast Asia market.",
      progress: 28,
      icon: Sprout,
    },
  ];

  const regions = {
    taiwan: {
      label: 'Taiwan',
      title: 'Launch market',
      text: 'Dense shrimp farming, nearby field access, and strong university support make Taiwan the validation base.',
      metric: '~12,000 farms',
    },
    sea: {
      label: 'Southeast Asia',
      title: 'Expansion corridor',
      text: 'Indonesia, Thailand, Vietnam, and nearby markets share aerator-heavy pond operations and similar equipment risks.',
      metric: '2028 target',
    },
  };

  return (
    <section id="market" className="relative overflow-hidden border-t border-white/5 px-4 py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">A Scalable Solution.</h2>
            <p className="text-xl text-lightgrey">The Taiwan shrimp market reached ~$507M USD in 2024. With ~12,000 farms using 4-8 aerators per pond, hardware optimization has room to scale.</p>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn delay={80}>
            <LiquidGlassCard className="h-full">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-sunset-orange">Market funnel</p>
                  <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">TAM to SAM to SOM</h3>
                </div>
                <BarChart3 className="h-9 w-9 text-sunset-skyblue" />
              </div>

              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="relative">
                    <div
                      className={`mx-auto rounded-3xl border border-white/12 bg-white/8 p-5 text-center shadow-xl ${
                        index === 0 ? 'w-full' : index === 1 ? 'w-[86%]' : 'w-[68%]'
                      }`}
                    >
                      <stat.icon className="mx-auto mb-2 h-6 w-6 text-sunset-orange" />
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-lightgrey">{stat.label}</p>
                      <p className="mt-1 text-3xl font-extrabold text-white md:text-4xl">{stat.value}</p>
                      <p className="mt-1 text-sm text-white/75">{stat.full}</p>
                    </div>
                    {index < stats.length - 1 && <div className="mx-auto h-6 w-px bg-linear-to-b from-sunset-skyblue to-sunset-orange"></div>}
                  </div>
                ))}
              </div>
            </LiquidGlassCard>
          </FadeIn>

          <FadeIn delay={140}>
            <LiquidGlassCard className="h-full">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-sunset-skyblue">Target regions</p>
                  <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">Taiwan to Southeast Asia</h3>
                </div>
                <div className="grid grid-cols-2 rounded-full border border-white/10 bg-navy/40 p-1">
                  {Object.entries(regions).map(([key, region]) => (
                    <button
                      key={key}
                      onClick={() => setActiveRegion(key)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-[0.98] ${
                        activeRegion === key ? 'bg-sunset-orange text-navy' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div className="relative min-h-80 overflow-hidden rounded-3xl border border-white/10 bg-navy/55 p-6">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(85,212,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(85,212,255,0.08)_1px,transparent_1px)] bg-size-[38px_38px]"></div>
                  <div className="absolute left-[53%] top-[30%] h-5 w-5 rounded-full bg-sunset-orange shadow-[0_0_28px_rgba(255,145,16,0.9)]"></div>
                  <div className="absolute left-[48%] top-[36%] h-32 w-44 rounded-[55%] border border-sunset-orange/40 bg-sunset-orange/10 blur-[1px]"></div>
                  <button
                    onClick={() => setActiveRegion('taiwan')}
                    className={`absolute left-[45%] top-[22%] rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-xl transition active:scale-[0.98] ${
                      activeRegion === 'taiwan' ? 'border-sunset-orange bg-sunset-orange text-navy' : 'border-white/20 bg-white/10 text-white'
                    }`}
                  >
                    Taiwan
                  </button>
                  <button
                    onClick={() => setActiveRegion('sea')}
                    className={`absolute bottom-[24%] left-[28%] rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-xl transition active:scale-[0.98] ${
                      activeRegion === 'sea' ? 'border-sunset-orange bg-sunset-orange text-navy' : 'border-white/20 bg-white/10 text-white'
                    }`}
                  >
                    SE Asia
                  </button>
                  <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-sm text-lightgrey">
                    <MapPin className="h-4 w-4 text-sunset-skyblue" />
                    Click a region to inspect the go-to-market focus.
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-lightgrey">{regions[activeRegion].label}</p>
                  <h4 className="mt-2 text-2xl font-bold text-white">{regions[activeRegion].title}</h4>
                  <p className="mt-4 leading-relaxed text-lightgrey">{regions[activeRegion].text}</p>
                  <div className="mt-6 rounded-2xl bg-sunset-skyblue/10 p-4">
                    <p className="text-sm font-bold text-sunset-skyblue">Focus metric</p>
                    <p className="mt-1 text-2xl font-extrabold text-white">{regions[activeRegion].metric}</p>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </FadeIn>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 100}>
              <LiquidGlassCard className="h-full">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-white/75">
                    {stat.label}
                  </div>
                  <stat.icon className="h-6 w-6 text-sunset-orange" />
                </div>
                <div className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">{stat.value}</div>
                <p className="min-h-16 text-lg leading-relaxed text-white/80">{stat.text}</p>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-linear-to-r from-sunset-orange to-sunset-skyblue" style={{ width: `${stat.progress}%` }}></div>
                </div>
              </LiquidGlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const [openPhases, setOpenPhases] = useState({ 0: true });

  const phases = [
    {
      label: 'Phase 1: Pilot',
      range: 'Months 1-3',
      status: 'Current phase',
      progress: 33,
      icon: Rocket,
      items: [
        { time: 'Month 1', title: 'Prototype Finalization', text: 'Finalize device, build pilot units, waterproof case, confirm farms.' },
        { time: 'Month 2', title: 'Field Deployment', text: 'Install devices, collect data, test alerts, and gather farmer feedback.' },
        { time: 'Month 3', title: 'Validation and Hult', text: 'Analyze results, improve product, and prepare pilot report for scaling.' },
      ],
    },
    {
      label: 'Phase 2: Expansion',
      range: '2026-2028',
      status: 'Next milestone',
      progress: 0,
      icon: Handshake,
      items: [
        { time: '2026', title: 'Final MVP', text: 'Final MVP and pilot farms reaching 50 farmers.' },
        { time: '2027', title: 'Precision Prototype', text: 'Precision prototype deployed across 50 farms.' },
        { time: '2028', title: 'B2B2F Launch', text: '200 farmers and expansion into Southeast Asia.' },
      ],
    },
    {
      label: 'Phase 3: Scale',
      range: '2029-2030',
      status: 'Long-term scale',
      progress: 0,
      icon: Building2,
      items: [
        { time: '2029', title: 'Operational BEP', text: '1,000 farmers, operational break-even, and 1,260 ponds.' },
        { time: '2030', title: 'Asia Expansion', text: '5,000 farmers across Asia.' },
      ],
    },
  ];

  const togglePhase = (index) => {
    setOpenPhases((current) => ({ ...current, [index]: !current[index] }));
  };

  return (
    <section id="roadmap" className="relative overflow-hidden border-y border-tealblue/20 bg-navy/60 px-4 py-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(85,212,255,0.08),transparent_45%)]"></div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">The Path to 5,000 Farms.</h2>
            <p className="text-xl text-lightgrey">Grouped milestones keep the operating plan readable from pilot validation to Asia-wide scale.</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lightgrey">Current position</p>
              <p className="text-sm font-bold text-sunset-orange">Pilot phase</p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[18%] rounded-full bg-linear-to-r from-sunset-orange to-sunset-skyblue"></div>
            </div>
            <div className="mt-3 grid grid-cols-3 text-xs font-bold uppercase tracking-[0.14em] text-lightgrey">
              <span>Pilot</span>
              <span className="text-center">Expansion</span>
              <span className="text-right">Scale</span>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-5">
          {phases.map((phase, index) => (
            <FadeIn key={phase.label} delay={index * 100}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
                <button
                  onClick={() => togglePhase(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-white/5 active:scale-[0.995] md:p-6"
                  aria-expanded={Boolean(openPhases[index])}
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-2xl p-3 ${index === 0 ? 'bg-sunset-orange/20 text-sunset-orange' : 'bg-sunset-skyblue/15 text-sunset-skyblue'}`}>
                      <phase.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-lightgrey">{phase.range}</p>
                      <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">{phase.label}</h3>
                      <p className="mt-1 text-sm text-sunset-orange">{phase.status}</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 shrink-0 text-white transition duration-300 ${openPhases[index] ? 'rotate-180' : ''}`} />
                </button>

                <div className={`grid transition-all duration-300 ease-out ${openPhases[index] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 p-5 md:p-6">
                      <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-linear-to-r from-sunset-orange to-sunset-skyblue" style={{ width: `${phase.progress}%` }}></div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {phase.items.map((item) => (
                          <div key={item.title} className="rounded-2xl border border-white/10 bg-navy/35 p-5">
                            <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.14em] text-lightgrey">{item.time}</p>
                            <h4 className="mb-2 text-lg font-bold text-white">{item.title}</h4>
                            <p className="text-sm leading-relaxed text-lightgrey">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const SDGImpact = () => {
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
      text: 'AeroTrust upgrades farm equipment without forcing expensive pond redesigns or full system replacement.',
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
    <section id="sdg" className="relative overflow-hidden border-t border-white/5 bg-navy/40 px-4 py-20">
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
              <LiquidGlassCard className="h-full">
                <img src={goal.img} alt={goal.alt} className="mb-6 h-28 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] md:h-32" />
                <h3 className="mb-3 text-2xl font-bold text-white">{goal.headline}</h3>
                <div className="mb-4 rounded-2xl bg-sunset-orange/15 px-4 py-3 text-sm font-bold text-sunset-orange">{goal.metric}</div>
                <p className="leading-relaxed text-lightgrey">{goal.text}</p>
              </LiquidGlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const StickyInvestorCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.72);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition duration-300 ease-out md:px-6 md:pb-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-3xl border border-white/15 bg-navy/85 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="px-2 text-center sm:text-left">
          <p className="font-bold text-white">Ready to review Cultivator?</p>
          <p className="text-sm text-lightgrey">Download the deck or book a partner conversation.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <a
            href={proposalPdf}
            target="_blank"
            rel="noopener noreferrer"
            download="Cultivator_Project_Proposal.pdf"
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
    </div>
  );
};

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative min-h-screen bg-navy pb-28 text-white selection:bg-sunset-orange selection:text-navy md:pb-24">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Problem />
      <AeroTrustSolution />
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
