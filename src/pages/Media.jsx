import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, ExternalLink } from 'lucide-react';
import { CursorGlow, FadeIn, Footer } from '../components/SharedUI';
import logoImg from '../assets/Orange_Shrimp.png';

const asiaImages = Object.entries(import.meta.glob('../assets/asia/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, alt: `Cultivator Asia field media ${path.split('/').pop()}`, group: 'Asia Field Work' }));

const jasonImages = Object.entries(import.meta.glob('../assets/jason/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, alt: `Cultivator build media ${path.split('/').pop()}`, group: 'Build Sessions' }));

const instagramPostUrls = ['https://www.instagram.com/p/DYSOWpOkZ8s/?igsh=cDU5YTBqMGJmOHR2', 'https://www.instagram.com/p/DZHsTlFIC_j/?img_index=1', 'https://www.instagram.com/p/DaAylbWhN9D/'];

const MediaGrid = ({ title, description, images }) => (
  <section className="relative px-4 py-16">
    <div className="mx-auto max-w-7xl">
      <FadeIn>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sunset-orange">{title}</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">{description}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-lightgrey">{images.length} photos from Cultivator's field, build, and team archive.</p>
        </div>
      </FadeIn>

      <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]">
        {images.map((image, index) => (
          <FadeIn key={`${image.src}-${index}`} delay={(index % 8) * 35} className={`${index % 11 === 0 ? 'col-span-2 row-span-2' : ''} ${index % 7 === 0 ? 'md:row-span-2' : ''}`}>
            <figure className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <img src={image.src} alt={image.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-linear-to-t from-navy/72 via-transparent to-transparent opacity-80"></div>
              <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-navy/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/75 backdrop-blur-xl">
                {image.group}
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const InstagramSection = () => {
  useEffect(() => {
    if (!instagramPostUrls.length) return;

    const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      return;
    }

    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="relative border-y border-white/5 bg-navy/45 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sunset-orange">Instagram</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">Live from @cultivatorteam.</h2>
            </div>
            <a
              href="https://www.instagram.com/cultivatorteam/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
            >
              Open Instagram <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>

        {instagramPostUrls.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instagramPostUrls.map((url) => (
              <blockquote key={url} className="instagram-media rounded-3xl border border-white/10 bg-white p-4" data-instgrm-permalink={url} data-instgrm-version="14">
                <a href={url}>View this post on Instagram</a>
              </blockquote>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
              <Camera className="mx-auto mb-4 h-10 w-10 text-sunset-orange" />
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-lightgrey">
                Instagram post embeds are ready. Add public post or reel URLs to the `instagramPostUrls` array in this page, and they will render here.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default function MediaPage() {
  const featuredImages = [...asiaImages.slice(0, 8), ...jasonImages.slice(8, 18)];

  return (
    <div className="relative min-h-screen bg-navy text-white selection:bg-sunset-orange selection:text-navy">
      <CursorGlow />
      <header className="relative overflow-hidden px-4 pb-16 pt-8 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,120,40,0.18),transparent_30rem),radial-gradient(circle_at_80%_10%,rgba(57,182,255,0.14),transparent_28rem)]"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-16 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-bold text-white backdrop-blur-xl transition hover:bg-white/10 active:scale-[0.98]">
              <img src={logoImg} alt="Cultivator" className="h-7 w-7 rounded-full object-cover" />
              Cultivator
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/10 active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </nav>

          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-sunset-orange">Media archive</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
                Field work, prototypes, and the team behind Cultivator.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-lightgrey">
                A visual record of Cultivator's farm discovery, student startup work, hardware testing, and field validation across the images already in the project.
              </p>
            </div>
          </FadeIn>
        </div>
      </header>

      <MediaGrid title="Highlights" description="Recent work in view." images={featuredImages} />
      <MediaGrid title="Asia" description="Field validation and farm discovery." images={asiaImages} />
      <MediaGrid title="Jason" description="Build sessions and project moments." images={jasonImages} />
      <InstagramSection />
      <Footer />
    </div>
  );
}
