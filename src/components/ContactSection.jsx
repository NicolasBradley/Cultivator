import { useState } from 'react';
import { Mail, Smartphone, Download } from 'lucide-react';
import { FadeIn } from './SharedUI';
import shrimpPondImg from '../assets/shrimp_pond.jpg';
import proposalPdf from '../assets/Cultivator Project Proposal.pdf';

export const ContactSection = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/ddieong04@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-tealblue/30 px-4 py-20 md:py-24">
      <div className="absolute inset-0 z-0">
        <img src={shrimpPondImg} alt="Aquaculture pond background" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-linear-to-r from-navy/95 via-navy/90 to-navy/70"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            
            {/* Left Side: Information */}
            <div className="text-left space-y-6 md:space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:text-7xl">Let's Connect.</h2>
              <p className="max-w-md text-lg md:text-xl font-medium leading-relaxed text-lightgrey">
                Interested in partnering with Cultivator? We welcome collaboration with farmers, distributors, and industry partners ready to drive sustainable growth.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/10 w-full md:w-3/4">
                <div className="flex items-center gap-4 pt-4">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                    <Smartphone className="w-5 h-5 text-sunset-orange" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+886 95380908 (Daniel)</p>
                    <p className="text-white font-medium">+886 97072303 (Jason)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                    <Mail className="w-5 h-5 text-sunset-orange" />
                  </div>
                  <p className="text-white font-medium">ddieong04@gmail.com</p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://www.linkedin.com/company/cultivatortech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md text-white/70 hover:text-white transition hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/cultivatorteam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md text-white/70 hover:text-white transition hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>

                <div className="pt-6 flex flex-col gap-3 md:gap-4 w-full sm:w-fit">
                  <a href={proposalPdf} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center justify-center gap-2 md:gap-3 rounded-full bg-sunset-orange px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-navy shadow-[0_0_10px_rgba(255,145,16,0.25)] transition hover:-translate-y-1 hover:bg-sunset-orange/90 hover:shadow-[0_0_15px_rgba(255,145,16,0.35)] w-full">
                    <Download className="w-5 h-5 md:w-6 md:h-6" />
                    Download Project Proposal
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="rounded-3xl md:rounded-4xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              {status === 'success' ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                  <p className="text-lightgrey">Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-lightgrey mb-1">Topic</label>
                    <select name="topic" required className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sunset-orange transition-colors">
                      <option value="" className="bg-navy">Select...</option>
                      <option value="partnership" className="bg-navy">Partnership</option>
                      <option value="investment" className="bg-navy">Investment</option>
                      <option value="general" className="bg-navy">General Inquiry</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lightgrey mb-1">Name</label>
                      <input type="text" name="name" required placeholder="Jane Smith" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lightgrey mb-1">Email</label>
                      <input type="email" name="email" required placeholder="example@example.com" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lightgrey mb-1">Company</label>
                      <input type="text" name="company" required placeholder="Cultivator Farm" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lightgrey mb-1">Location</label>
                      <input type="text" name="location" required placeholder="Taiwan" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lightgrey mb-1">Phone</label>
                      <input type="tel" name="phone" required placeholder="+886..." className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lightgrey mb-1">Line ID (Optional)</label>
                      <input type="text" name="lineId" placeholder="Line ID" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lightgrey mb-1">Message</label>
                    <textarea name="message" required rows="4" placeholder="I need..." className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-sunset-orange transition-colors resize-none"></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full rounded-xl bg-sunset-orange px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-navy shadow-[0_0_10px_rgba(255,145,16,0.25)] transition hover:-translate-y-1 hover:bg-sunset-orange/90 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed mt-4"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};
