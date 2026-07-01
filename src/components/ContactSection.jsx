import { useState } from 'react';
import { Mail, Smartphone, Download } from 'lucide-react';
import { FadeIn } from './SharedUI';
import shrimpPondImg from '../assets/shrimp_pond.jpg';
import proposalPdf from '../assets/inspo/Cultivator Project Proposal V5.pdf';

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
                    <span className="text-sm font-bold">in</span>
                  </a>
                  <a
                    href="https://www.instagram.com/cultivatorteam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md text-white/70 hover:text-white transition hover:scale-110"
                    aria-label="Instagram"
                  >
                    <span className="text-sm font-bold">ig</span>
                  </a>
                </div>

                <div className="pt-6 flex flex-col gap-3 md:gap-4 w-full sm:w-fit">
                  <a href={proposalPdf} target="_blank" rel="noopener noreferrer" download="Cultivator_Project_Proposal.pdf" className="inline-flex items-center justify-center gap-2 md:gap-3 rounded-full bg-sunset-orange px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-navy shadow-[0_0_20px_rgba(255,145,16,0.45)] transition hover:-translate-y-1 hover:bg-sunset-orange/90 hover:shadow-[0_0_30px_rgba(255,145,16,0.6)] w-full">
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
                    className="w-full rounded-xl bg-sunset-orange px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-navy shadow-[0_0_20px_rgba(255,145,16,0.45)] transition hover:-translate-y-1 hover:bg-sunset-orange/90 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed mt-4"
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
