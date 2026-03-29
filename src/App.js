import React, { useEffect, useRef, useState } from 'react';

const injectStyles = () => {
  if (document.getElementById('felicita-styles')) return;
  const style = document.createElement('style');
  style.id = 'felicita-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

    :root {
      --g:   #C9A84C; --gl:  #E8C97E; --gd:  #9B7A2E;
      --g05: rgba(201,168,76,.05); --g10: rgba(201,168,76,.10);
      --g15: rgba(201,168,76,.15); --g20: rgba(201,168,76,.20);
      --g30: rgba(201,168,76,.30); --g50: rgba(201,168,76,.50);
      --blk: #0A0A0A; --blk2: #101010; --blk3: #161616;
      --wht: #FAFAFA; --crm: #F5F0E8; --crm2: #EDE8DC;
      --txt: #2C2C2C; --txts: #5C5C5C;
    }

    html { scroll-behavior: smooth; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--blk); color: var(--wht); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    ::selection { background: var(--g); color: var(--blk); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--blk); }
    ::-webkit-scrollbar-thumb { background: var(--g); }

    .fade-up {
      opacity: 0; transform: translateY(28px);
      transition: opacity .9s cubic-bezier(.25,.46,.45,.94), transform .9s cubic-bezier(.25,.46,.45,.94);
    }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    .f-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 999;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 56px;
      background: rgba(10,10,10,.92);
      backdrop-filter: blur(16px);
      border-bottom: .5px solid var(--g20);
      transition: padding .35s ease;
      }
    .f-nav.compact { padding: 10px 56px; }
    .f-nav-links { display: flex; gap: 36px; list-style: none; }
    .f-nav-links a {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px; font-weight: 500;
      letter-spacing: .38em; text-transform: uppercase;
      color: rgba(250,250,250,.45); text-decoration: none;
      transition: color .2s;
    }
    .f-nav-links a:hover { color: var(--g); }

    .f-nav-logo { display: flex; align-items: center; }
    .f-nav-logo img { height: 52px; width: auto; display: block; }

    .photo-frame { position: relative; }
    .photo-frame-border { position: absolute; inset: 0; border: .5px solid var(--g30); z-index: 2; pointer-events: none; }
    .photo-frame::before, .photo-frame::after { content: ''; position: absolute; width: 22px; height: 22px; z-index: 3; }
    .photo-frame::before { top: -1px; left: -1px; border-top: 1.5px solid var(--g); border-left: 1.5px solid var(--g); }
    .photo-frame::after { bottom: -1px; right: -1px; border-bottom: 1.5px solid var(--g); border-right: 1.5px solid var(--g); }
    .photo-frame .corner-tr { position: absolute; top: -1px; right: -1px; width: 22px; height: 22px; border-top: 1.5px solid var(--g); border-right: 1.5px solid var(--g); z-index: 3; pointer-events: none; }
    .photo-frame .corner-bl { position: absolute; bottom: -1px; left: -1px; width: 22px; height: 22px; border-bottom: 1.5px solid var(--g); border-left: 1.5px solid var(--g); z-index: 3; pointer-events: none; }
    .photo-frame img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 1.1s cubic-bezier(.25,.46,.45,.94); }
    .photo-frame:hover img { transform: scale(1.04); }

    .spread { position: relative; overflow: hidden; }
    .spread-img { position: absolute; top: -15%; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
    .spread-veil { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(10,10,10,.35) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 55%, rgba(10,10,10,.88) 100%); }

    .spread-text {
      position: absolute;
      bottom: 250px;
      left: 100px;
      z-index: 10;
    }
    .inv-table-row { display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; padding: 11px 0; border-bottom: .5px solid rgba(201,168,76,.12); transition: background .2s; }
    .inv-table-row:hover { background: var(--g05); }
    .inv-table-row:last-child { border-bottom: none; }

    .team-item { border-bottom: .5px solid rgba(44,44,44,.6); padding-bottom: 20px; transition: border-color .4s; }
    .team-item:hover { border-color: var(--g); }

    .buffet-row { display: flex; flex-direction: column; padding-bottom: 24px; border-bottom: .5px solid rgba(232,201,126,.4); }
    @media (min-width: 768px) { .buffet-row { flex-direction: row; align-items: baseline; } }

    .kids-item { display: flex; align-items: center; padding: 7px 0; border-bottom: .5px solid rgba(201,168,76,.12); font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 300; color: var(--txts); }
    .kids-item:last-child { border-bottom: none; }

    .diff-card { padding: 28px 24px; border: .5px solid rgba(201,168,76,.2); background: var(--blk3); position: relative; overflow: hidden; transition: border-color .4s, background .4s; }
    .diff-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: .5px; background: linear-gradient(90deg, var(--g), transparent); opacity: .7; }
    .diff-card:hover { border-color: rgba(201,168,76,.5); background: #1a1a1a; }
    .stat-item { display: flex; flex-direction: column; padding: 16px 0; }

    #hero { position: relative !important; }
    .hero-logo-overlay {
      position: absolute;
      bottom: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: 220px;
      z-index: 10;
      pointer-events: none;
    }

    @media (max-width: 768px) {
      .f-nav { padding: 8px 16px; justify-content: center; }
      .f-nav-links { display: none; }
      .f-nav a { flex-direction: column !important; gap: 6px !important; width: 100%; }
      .f-nav a span { font-size: 18px !important; text-align: center !important; line-height: 1.1 !important; }
      .f-nav-logo img { height: 40px !important; }
      section { padding-left: 20px !important; padding-right: 20px !important; overflow-x: hidden !important; } * { max-width: 100vw; box-sizing: border-box; }
      .spread img[alt="Espaço Felicitá"] { display: none !important; }
      #celebracao > div > div { grid-template-columns: 1fr !important; }
      #celebracao { padding: 48px 20px !important; }
      #hero { height: 90vh !important; }
      .hero-logo-overlay { width: 120px !important; bottom: 18%; display: block !important; }
      #hero > div:nth-child(3) { padding-top: 40px !important; padding-bottom: 60px !important; }
      #hero > div:nth-child(3) > div:nth-child(1) span { font-size: 8px !important; letter-spacing: 0.3em !important; }
      #hero > div:nth-child(3) > div:nth-child(3) > div { height: 48px !important; margin: 20px auto 0 !important; }
      #hero > div:nth-child(3) > div:nth-child(3) > span { font-size: 36px !important; letter-spacing: .04em !important; margin-top: 60px !important; }
      #celebracao { padding: 40px 16px !important; }
      #celebracao > div > div { grid-template-columns: 1fr !important; gap: 32px !important; }
      #celebracao h2 { font-size: 28px !important; line-height: 1.15 !important; margin-bottom: 6px !important; }
      #celebracao h2 + h2 { margin-top: 4px !important; }
      #celebracao blockquote { font-size: 20px !important; line-height: 1.6 !important; border-left-width: 2px !important; padding-left: 16px !important; margin: 18px 0 22px !important; }
      #celebracao p { font-size: 16px !important; line-height: 1.8 !important; }
      #celebracao > div > div > div:last-child > div { grid-template-columns: 1fr !important; gap: 12px !important; }
      .spread-text { bottom: 160px !important; left: 56px !important; }
      .spread:nth-of-type(1) { height: 70vh !important; }
      .spread:nth-of-type(2) { height: 85vh !important; }
      .spread:nth-of-type(3) { height: 80vh !important; }
      .spread p { font-size: 24px !important; }
      .spread h2 { font-size: 28px !important; }
      .s9-logo-overlay { position: absolute !important; right: 16px !important; bottom: 16px !important; left: auto !important; top: auto !important; transform: none !important; z-index: 20 !important; }
      .s9-logo-overlay img { height: 52px !important; width: auto !important; }
      .spread:nth-of-type(3) > div:nth-child(3) { display: none !important; visibility: hidden !important; opacity: 0 !important; }
      .spread:nth-of-type(3) img { object-position: center 60% !important; }
      .spread:nth-of-type(3) { height: 72vh !important; }
      section:nth-of-type(11) img { object-position: center 35% !important; }
      section:nth-of-type(11) { height: auto !important; }
      section:nth-of-type(4) { padding: 48px 20px !important; }
      section:nth-of-type(4) > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
      #estrutura { padding: 48px 20px !important; }
      #estrutura > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
      #estrutura > div > div > div:last-child { grid-template-columns: 1fr !important; gap: 12px !important; }
      section:nth-of-type(6) { padding: 48px 20px !important; }
      section:nth-of-type(6) > div > div { grid-template-columns: 1fr !important; gap: 32px !important; }
      section:nth-of-type(8) { padding: 48px 20px !important; }
      section:nth-of-type(8) > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
      #gastronomia { padding: 48px 20px !important; }
      #gastronomia > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
      section:nth-of-type(11) { padding: 48px 20px !important; }
      section:nth-of-type(11) > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
      section:nth-of-type(11) > div > div > div:last-child > div { grid-template-columns: 1fr !important; gap: 0 !important; }
      #investimento { padding: 48px 20px !important; }
      #investimento > div > div > div { padding: 32px 16px !important; }
      #investimento > div > div > div > div { grid-template-columns: 1fr !important; padding: 8px 0 !important; }
      #investimento > div > div > div { display: flex !important; flex-direction: column !important; gap: 16px !important; padding: 24px 12px !important; }
      #investimento > div > div > div > div:first-child { display: none !important; }
      .inv-table-row { display: block !important; padding: 20px 16px !important; border: .5px solid rgba(201,168,76,.2) !important; background: var(--blk2) !important; text-align: center !important; margin-bottom: 0 !important; }
      .inv-table-row span:nth-child(1) { font-size: 28px !important; color: var(--g) !important; display: block !important; margin-bottom: 16px !important; font-weight: 600 !important; }
      .inv-table-row span:nth-child(2) { font-size: 16px !important; color: rgba(250,250,250,.8) !important; display: block !important; margin-bottom: 8px !important; }
      .inv-table-row span:nth-child(2)::before { content: 'Seg · Qui · Dom: ' !important; font-weight: 500 !important; color: var(--g) !important; }
      .inv-table-row span:nth-child(3) { font-size: 16px !important; color: rgba(250,250,250,.8) !important; display: block !important; }
      .inv-table-row span:nth-child(3)::before { content: 'Sex · Sáb · Véspera · Feriado: ' !important; font-weight: 500 !important; color: var(--g) !important; }
      #contato { padding: 48px 20px !important; }
      #contato > div:nth-child(4) > div { display: grid !important; grid-template-columns: 1fr !important; gap: 24px !important; }
      #contato > div:nth-child(5) > div { flex-direction: column !important; gap: 16px !important; }
      #contato img { height: 300px !important; }
      #contato h2 { font-size: 26px !important; line-height: 1.2 !important; }
      #contato > div:nth-child(4) > div > span:nth-child(2) { font-size: 16px !important; }
      #contato > div:nth-child(5) > div > span { white-space: normal !important; word-break: break-word !important; overflow-wrap: anywhere !important; font-size: 12px !important; letter-spacing: .2em !important; }
      #contato > div:nth-child(4) > div > span { white-space: normal !important; word-break: break-word !important; overflow-wrap: anywhere !important; font-size: 14px !important; }
      #contato > div:nth-child(4) > div { min-width: 0 !important; }
      #contato > div:nth-child(4) > div > span:nth-child(2) { min-width: 0 !important; max-width: 100% !important; overflow-wrap: anywhere !important; word-break: break-word !important; }
      #contato > div:nth-child(5) > div > div { display: flex !important; flex-direction: column !important; gap: 12px !important; width: 100% !important; align-items: center !important; }
      #contato > div:nth-child(5) > div > div span { font-size: 20px !important; white-space: normal !important; text-align: center !important; }
      #contato > p { font-size: 10px !important; letter-spacing: .1em !important; text-align: center !important; max-width: 360px !important; margin: 12px auto 0 !important; white-space: normal !important; word-break: break-word !important; }
      .spread:nth-of-type(3) > div:nth-child(3) { display: none !important; }
      .spread:nth-of-type(3) img { object-position: center 50% !important; }
      section:nth-of-type(11) img { object-position: center 35% !important; }
    }
  `;
  document.head.appendChild(style);
};
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};
const useFadeIn = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`fade-up ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const LogoDark = ({ className = '' }) => (
  <img src="/images/Logo com letras branca correto.svg" alt="Espaço Felicitá"
    className={className}
    style={{ width: '70px', height: 'auto', display: 'block' }} />
);

const LogoLight = ({ height = 160 }) => (
  <img src="/images/Logo com letras branca correto.svg" alt="Espaço Felicitá" style={{ height, width: 'auto', display: 'block' }} />
);

const Orn = ({ dark = false, width = 220, className = '' }) => {
  const col = dark ? '#9B7A2E' : '#C9A84C';
  return (
    <div className={`flex items-center justify-center my-10 ${className}`}>
      <svg width={width} height="14" viewBox={`0 0 ${width} 14`} fill="none">
        <line x1="0" y1="7" x2={width * .4} y2="7" stroke={col} strokeWidth=".6" opacity=".6" />
        <rect x={width * .44} y="2" width="10" height="10" stroke={col} strokeWidth=".8" fill="none" transform={`rotate(45 ${width * .44 + 5} 7)`} opacity=".85" />
        <line x1={width * .6} y1="7" x2={width} y2="7" stroke={col} strokeWidth=".6" opacity=".6" />
      </svg>
    </div>
  );
};

const Ey = ({ text, dark = false }) => (
  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.44em', textTransform: 'uppercase', color: dark ? '#9B7A2E' : '#C9A84C', display: 'block', marginBottom: 14 }}>{text}</span>
);

const Frame = ({ src, alt, className = '', style: s = {}, imgStyle = {} }) => (
  <div className={`photo-frame overflow-hidden ${className}`} style={s}>
    <div className="photo-frame-border" />
    <div className="corner-tr" />
    <div className="corner-bl" />
    <img src={src} alt={alt} style={imgStyle} />
  </div>
);

const Rule = ({ center = false, dark = false }) => (
  <div style={{ width: 56, height: 1, background: center ? `linear-gradient(90deg,transparent,${dark ? '#9B7A2E' : '#C9A84C'},transparent)` : `linear-gradient(90deg,${dark ? '#9B7A2E' : '#C9A84C'},transparent)`, margin: center ? '18px auto' : '18px 0' }} />
);

const Nav = () => {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`f-nav ${compact ? 'compact' : ''}`}>
      <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '50px' }}>
        <LogoDark />
        <span style={{ fontFamily: "'Futura', serif", fontWeight: 600, fontStyle: 'italic', fontSize: 38, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gl)', opacity: .7 }}>Unidade Palmares</span>
      </a>
      <ul className="f-nav-links">
        {[['Celebração', '#celebracao'], ['Estrutura', '#estrutura'], ['Gastronomia', '#gastronomia'], ['Investimento', '#investimento'], ['Contato', '#contato']].map(([l, h]) => (
          <li key={h}><a href={h}>{l}</a></li>
        ))}
      </ul>
    </nav>
  );
};

const gridBg = { backgroundImage: 'linear-gradient(rgba(166,129,54,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(166,129,54,.05) 1px, transparent 1px)', backgroundSize: '30px 30px', backgroundPosition: 'center center' };

export default function App() {
  useEffect(() => { injectStyles(); }, []);
  const isMobile = useIsMobile();

  return (
    <div style={{ backgroundColor: 'var(--blk)', minHeight: '100vh', overflowX: 'hidden', ...gridBg }}>
      <Nav />

      {/* S1 HERO */}
      <section id="hero" className="spread" style={{ height: '130vh' }}>
        <img className="spread-img" src="/images/hero.jpg" alt="Espaço Felicitá Unidade Palmares" style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 80, textAlign: 'center' }}>
          <FadeIn delay={200}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--g50)', display: 'block', marginBottom: 28 }}>
              Proposta Exclusiva · Casamento · 2026
            </span>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="spread-text"></div>
          </FadeIn>
        </div>
        <img src="/images/Logodark.svg" alt="Felicitá logo hero" className="hero-logo-overlay" />
      </section>

      {/* S2 MANIFESTO (CREAM) */}
      <section id="celebracao" style={{ background: 'var(--crm)', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 56px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/essence.jpg" alt="Mesa de casamento" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
            <div>
              <FadeIn>
                <Ey text="A Essência da Celebração" dark />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px,3.5vw,50px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.12, marginBottom: 8 }}>Dois sonhos</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px,3.5vw,50px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gd)', lineHeight: 1.12 }}>que se encontram.</h2>
                <Rule dark />
              </FadeIn>
              <FadeIn delay={200}>
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 25, color: 'var(--txts)', lineHeight: 1.75, borderLeft: '2px solid var(--g)', paddingLeft: 20, margin: '24px 0 28px' }}>
                  "Dois sonhos que se encontram merecem um palco à altura. Somos o espaço onde histórias de amor ganham o cenário perfeito para começar."
                </blockquote>
              </FadeIn>
              <FadeIn delay={300}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.95, marginBottom: 12 }}>
                  No Espaço Felicitá, cada detalhe do seu casamento é conduzido por uma equipe que compreende o peso singular de uma noite como esta. Da entrada marcante à última música na pista, tudo acontece com sensibilidade, elegância e precisão absoluta.
                </p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.95, marginBottom: 36 }}>
                  Espaço, serviços e buffet próprio se unem para criar uma experiência que transcende o evento: uma memória que a sua família vai guardar para sempre.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 8, borderTop: '1px solid rgba(232,201,126,.45)', paddingTop: 28 }}>
                  {[{ n: '+14', l: 'Anos de história' }, { n: '3', l: 'Unidades em BH' }, { n: '180', l: 'Convidados' }, { n: 'Próprio', l: 'Buffet exclusivo' }].map((s, i) => (
                    <div key={i} className="stat-item">
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: 'var(--gd)', display: 'block', lineHeight: 1.1, marginBottom: 6 }}>{s.n}</span>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--txts)' }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S3 SPREAD 1 */}
      <section className="spread" style={{ height: '85vh' }}>
        <img className="spread-img" src="/images/spread-1.jpg" alt="Salão Espaço Felicitá" style={{ objectPosition: 'center 70%' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 28, right: 40, zIndex: 20 }}><LogoDark height={52} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 100 : 160, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20, textAlign: 'left' }}>
          <FadeIn>
            <div style={{ textAlign: 'left' }}><Orn /></div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: isMobile ? 22 : 30, fontWeight: 300, color: 'rgba(250,250,250,.85)', display: 'block', marginBottom: 8, textAlign: 'left' }}>
              o começo de uma história com
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 34 : 'clamp(38px,5vw,68px)', fontWeight: 700, color: 'var(--g)', lineHeight: 1.1, textAlign: 'left' }}>
              Momentos Inesquecíveis
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* S4 EQUIPE (DARK) */}
      <section style={{ backgroundColor: 'var(--blk)', padding: '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <Ey text="Profissionais Dedicados" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>A equipe que transforma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--g)', lineHeight: 1.12 }}>cada detalhe.</h2>
              <Rule center />
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'rgba(250,250,250,.55)', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.9 }}>Cada membro da nossa equipe é treinado para antecipar necessidades, resolver imprevistos com discrição absoluta e garantir que nenhum detalhe passe despercebido.</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[{ t: 'Coordenador do Evento', d: 'Orquestração completa — do planejamento ao último brinde' }, { t: 'Garçons', d: 'Serviço impecável e presença discreta durante toda a celebração' }, { t: 'Porteiro', d: 'Recepção elegante e controle de acesso com cordialidade' }, { t: 'Equipe de Limpeza', d: 'Ambiente impecável mantido durante toda a celebração' }, { t: 'Equipe de Cozinha', d: 'Especialistas em experiência gastronômica de alto nível' }].map((item, i) => (
                <FadeIn delay={i * 80} key={i}>
                  <div className="team-item">
                    <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, color: 'var(--gl)', marginBottom: 6 }}>{item.t}</h5>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'rgba(250,250,250,.45)', lineHeight: 1.7 }}>{item.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={200}><Frame src="/images/team.jpg" alt="Equipe" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 20%' }} /></FadeIn>
          </div>
        </div>
      </section>

      {/* S5 DIFERENCIAIS (DARK2) */}
      <section id="estrutura" style={{ backgroundColor: 'var(--blk2)', padding: '80px 56px', borderTop: '.5px solid rgba(44,44,44,.6)', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 32 : 72, alignItems: 'start' }}>
            <FadeIn>
              <div>
                <Ey text="Estrutura & Exclusividade" />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,3vw,44px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Detalhes que elevam</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--g)', lineHeight: 1.12 }}>cada momento.</h2>
                <Rule />
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.9, marginTop: 16 }}>A Unidade Palmares foi concebida para ser o cenário perfeito de uma noite única. Cada elemento foi escolhido com um único critério: a excelência.</p>
              </div>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ t: 'Capacidade', v: '180', s: 'convidados' }, { t: 'Exclusividade', v: 'Sala VIP', s: 'para os anfitriões' }, { t: 'Conforto', v: 'Climatizado', s: 'todos os ambientes' }, { t: 'Arquitetura', v: '4m', s: 'de pé-direito' }, { t: 'Elegância', v: 'Lustres', s: 'de cristal' }, { t: 'Segurança', v: 'Câmeras', s: 'circuito completo' }].map((c, i) => (
                <FadeIn delay={i * 70} key={i}>
                  <div className="diff-card">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--g)', display: 'block', marginBottom: 10 }}>{c.t}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 600, color: 'var(--wht)', display: 'block', lineHeight: 1.1, marginBottom: 4 }}>{c.v}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(250,250,250,.4)' }}>{c.s}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S6 MOBILIÁRIO (CREAM) */}
      <section style={{ background: 'var(--crm2)', padding: '96px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Ey text="Ambientação & Conforto" dark />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,3vw,44px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.12, marginBottom: 6 }}>Conforto e estilo</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gd)', lineHeight: 1.12 }}>em cada ambiente.</h2>
              <Rule center dark />
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 48, alignItems: 'center' }}>
            <FadeIn><Frame src="/images/ambiance.jpg" alt="Salão decorado" style={{ aspectRatio: '3/4' }} imgStyle={{ objectPosition: 'center 35%' }} /></FadeIn>
            <div style={{ background: 'rgba(201,168,76,.25)', height: '60%', width: 1 }} />
            <FadeIn delay={200}>
              <div style={{ border: '.5px solid rgba(155,122,46,.3)', padding: '40px 36px', background: 'var(--crm)' }}>
                <Ey text="Mobiliário" dark />
                {[{ n: '12', l: 'Mesas Redondas' }, { n: '4', l: 'Mesas Retangulares' }, { n: '116', l: 'Cadeiras' }, { n: '2', l: 'Sofás' }, { n: '10', l: 'Poltronas' }].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: i < 4 ? '.5px solid rgba(201,168,76,.2)' : 'none' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 400, color: 'var(--gd)', lineHeight: 1, minWidth: 56 }}>{item.n}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 500, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--txts)' }}>{item.l}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S7 SPREAD 2 */}
      <section className="spread" style={{ height: isMobile ? '75vh' : '116vh' }}>
        <img className="spread-img" src="/images/spread-2.jpg" alt="Salão" style={{ objectPosition: isMobile ? '25% top' : 'center -180%', top: isMobile ? '0%' : '-15%' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 28, right: 40, zIndex: 20 }}><LogoDark height={52} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 40 : 160, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20, textAlign: 'left' }}>
          <FadeIn>
            <div style={{ textAlign: 'left' }}><Orn /></div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: isMobile ? 22 : 30, fontWeight: 300, color: 'rgba(250,250,250,.85)', display: 'block', marginBottom: 8, textAlign: 'left', textShadow: isMobile ? '2px 2px 4px rgba(0,0,0,0.7)' : 'none' }}>
              o encanto de uma
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 34 : 'clamp(36px,5vw,64px)', fontWeight: 700, color: 'var(--g)', lineHeight: 1.1, textAlign: 'left', textShadow: isMobile ? '2px 2px 4px rgba(0,0,0,0.7)' : 'none' }}>
              Nova Fase Começa Aqui
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* S8 BOATE (DARK) */}
      <section style={{ backgroundColor: 'var(--blk)', padding: '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            <div>
              <FadeIn>
                <Ey text="Música · Luz · Celebração" />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,3vw,46px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>Onde a noite</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,3vw,46px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--g)', lineHeight: 1.12 }}>ganha vida.</h2>
                <Rule />
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 25, color: 'rgba(250,250,250,.55)', lineHeight: 1.8, borderLeft: '2px solid var(--g)', paddingLeft: 20, margin: '24px 0 32px' }}>
                  "Um espaço pensado para que a festa aconteça com a energia que a sua noite merece — efeitos de luz, música vibrante e uma pista que convida a dançar todas as gerações."
                </blockquote>
              </FadeIn>
              <FadeIn delay={200}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['DJ Profissional — repertório personalizado', '21 Globos Espelhados de Grande Porte', '02 Microfones sem Fio', 'Mesa Numark Mix Control', 'Estrutura Retangular Completa', '02 Caixas de Som Profissionais', 'Painel e Pista de LED', 'Iluminação Cênica Completa'].map((item, i) => (
                    <li key={i} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'rgba(250,250,250,.62)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 20, height: 1, background: 'var(--g)', flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn delay={150}><Frame src="/images/celebration.jpg" alt="Boate" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} /></FadeIn>
          </div>
        </div>
      </section>

      {/* S9 SPREAD 3 */}
      <section className="spread" style={{ height: '110vh' }}>
        <img src="/images/spread-3.jpg" alt="Casal de Noivos" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? '60% 15%' : 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,.38) 42%, rgba(0,0,0,.74) 100%)' }} />
        <div className="s9-logo-overlay" style={{ position: 'absolute', top: 28, right: 40, zIndex: 20 }}><LogoDark height={52} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 24 : 54, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 20, textAlign: isMobile ? 'left' : 'inherit' }}>
          <FadeIn>
            <div style={{ textAlign: isMobile ? 'left' : 'inherit' }}><Orn /></div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 30, fontWeight: 300, color: 'rgba(250,250,250,.85)', display: 'block', marginBottom: 8, textAlign: isMobile ? 'left' : 'inherit' }}>um capítulo inesquecível</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px,4.5vw,60px)', fontWeight: 700, color: 'var(--g)', lineHeight: 1.1, textAlign: isMobile ? 'left' : 'inherit' }}>De Uma Vida que Ganha Novos Sonhos</h2>
          </FadeIn>
        </div>
      </section>

      {/* S10 BUFFET (CREAM) */}
      <section id="gastronomia" style={{ background: 'var(--crm)', padding: '96px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72 }}>
            <div>
              <FadeIn>
                <Ey text="Gastronomia Exclusiva" dark />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,2.8vw,42px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.12, marginBottom: 6 }}>Buffet próprio,</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,2.8vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gd)', lineHeight: 1.12 }}>com qualidade garantida.</h2>
                <Rule dark />
              </FadeIn>
              <FadeIn delay={150}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 25, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.8, borderLeft: '2px solid var(--gd)', paddingLeft: 18, margin: '24px 0 36px' }}>
                  Nosso buffet é inteiramente próprio — desenvolvido por uma equipe especializada que une sabores tradicionais e contemporâneos, pensados para encantar em cada detalhe.
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <Frame src="/images/buffet-1.jpg" alt="Gastronomia" style={{ aspectRatio: '1' }} imgStyle={{ objectPosition: 'center 40%' }} />
                  <Frame src="/images/buffet-2.jpg" alt="Bebidas" style={{ aspectRatio: '1' }} imgStyle={{ objectPosition: 'center 40%' }} />
                </div>
              </FadeIn>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[{ t: 'Salgados', items: ['Consumo livre durante todo o evento', 'Frios, fritos, assados e folhados'] }, { t: 'Doces', items: ['06 unidades por convidado', 'Finos e tradicionais'] }, { t: 'Pratos & Petit Gourmet', items: ['Prato quente — ponto fixo ou volante', 'Petit Gourmet — 02 tipos exclusivos'] }, { t: 'Bebidas', items: ['Água e refrigerantes — consumo livre', 'Versões zero disponíveis', 'Cerveja Original — por engradado'] }, { t: 'Bolos', items: ['Bolo fake para o ritual do corte', 'Torta de corte — vide cardápio'] }].map((block, i) => (
                <FadeIn delay={i * 80} key={i}>
                  <div className="buffet-row">
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: 'var(--gd)', minWidth: 260, marginBottom: 12 }}>{block.t}</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                      {block.items.map((item, j) => (
                        <li key={j} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'var(--txts)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <span style={{ color: 'var(--g)', fontSize: 8, flexShrink: 0, marginTop: 5 }}>◆</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S11 KIDS (CREAM2) */}
      <section style={{ background: 'var(--crm2)', padding: '80px 56px', borderTop: '.5px solid rgba(232,201,126,.3)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <FadeIn><Frame src="/images/kids.jpg" alt="Espaço Kids" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 25%' }} /></FadeIn>
            <div>
              <FadeIn>
                <Ey text="Serviço Opcional · Crianças" dark />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,2.8vw,42px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.12, marginBottom: 6 }}>Um universo de alegria</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,2.8vw,42px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gd)', lineHeight: 1.12 }}>para os pequenos.</h2>
                <Rule dark />
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.9, marginBottom: 28 }}>Para que os pais vivam plenamente cada instante da celebração, o Espaço Felicitá oferece um Espaço Kids completo — monitores treinados, brinquedos para todas as idades, segurança e diversão em harmonia.</p>
              </FadeIn>
              <FadeIn delay={200}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  {['Área Baby', 'Tobogã', 'Piscina de Bolinha', 'Cama Elástica Suspensa', 'Simuladores', 'Mini Mercado', 'Mini Cozinha', 'Torre Espacial', 'Formigueiro', 'Circuito Brinquedão', 'Video Games'].map((toy, i) => (
                    <div key={i} className="kids-item">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--g)', flexShrink: 0, marginRight: 10 }} />{toy}
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <div style={{ marginTop: 24, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 16, fontWeight: 300, color: 'var(--gd)', borderLeft: '2px solid var(--g)', paddingLeft: 16, lineHeight: 1.7 }}>
                  Ambiente seguro com monitores especializados, garantindo tranquilidade para os convidados e diversão garantida para os pequenos.
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S12 INVESTIMENTO (DARK2) */}
      <section id="investimento" style={{ backgroundColor: 'var(--blk2)', padding: '96px 56px', ...gridBg }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Ey text="Proposta de Investimento" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,3vw,46px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.12, marginBottom: 6 }}>O valor de uma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,3vw,46px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--g)', lineHeight: 1.12 }}>memória eterna.</h2>
              <Rule center />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 25, fontWeight: 300, color: 'rgba(250,250,250,.5)', lineHeight: 1.8, maxWidth: 520, margin: '16px auto 0' }}>
                "Cada celebração é única — e o Espaço Felicitá garante que o investimento reflita a exclusividade que a sua noite merece."
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ border: '.5px solid rgba(201,168,76,.3)', background: 'var(--blk3)', padding: '40px 36px', position: 'relative' }}>
              {[{ top: -1, left: -1, borderTop: '2px solid var(--g)', borderLeft: '2px solid var(--g)' }, { top: -1, right: -1, borderTop: '2px solid var(--g)', borderRight: '2px solid var(--g)' }, { bottom: -1, left: -1, borderBottom: '2px solid var(--g)', borderLeft: '2px solid var(--g)' }, { bottom: -1, right: -1, borderBottom: '2px solid var(--g)', borderRight: '2px solid var(--g)' }].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 18, height: 18, ...s }} />
              ))}
              {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,.1)', gap: 12 }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, color: 'var(--g)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Convidados</span>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--g)', margin: '0 0 6px 0', textTransform: 'uppercase' }}>Seg · Qui · Dom</p>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.2em', color: 'var(--g)', margin: 0, textTransform: 'uppercase' }}>Sex · Sáb · Véspera · Feriado</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                  {['Convidados', 'Seg · Qui · Dom', 'Sex · Sáb · Véspera · Feriado'].map((h, i) => (
                    <span key={i} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, color: 'var(--g)', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: i === 0 ? 'left' : 'center' }}>{h}</span>
                  ))}
                </div>
              )}
              {[[60,'34.000,00','36.600,00'],[70,'36.000,00','38.600,00'],[80,'38.000,00','40.600,00'],[90,'40.000,00','42.600,00'],[100,'42.000,00','44.600,00'],[110,'44.000,00','46.600,00'],[120,'46.000,00','48.600,00'],[130,'48.000,00','50.600,00'],[140,'50.000,00','52.600,00'],[150,'52.000,00','54.600,00'],[160,'54.000,00','56.600,00'],[170,'56.000,00','58.600,00'],[180,'58.000,00','60.600,00'],].map(([pax,v1,v2],i) => (
                <div key={i} className="inv-table-row">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: 'var(--g)' }}>{pax}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(250,250,250,.72)', textAlign: 'center' }}>R$ {v1}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--gl)', textAlign: 'center' }}>R$ {v2}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--g)', border: '.5px solid var(--g20)', padding: '8px 20px', display: 'inline-block' }}>Formas de pagamento a combinar</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: 'rgba(250,250,250,.38)', textAlign: 'center', lineHeight: 1.7 }}>
                * Esta proposta tem validade de 5 dias e não garante reserva de data.<br />
                * Para eventos realizados no sábado à noite, mínimo de 150 convidados.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S13 CONTATO (DARK FINAL) */}
      <section id="contato" style={{ backgroundColor: 'var(--blk)', padding: isMobile ? '60px 24px' : '96px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '.5px solid rgba(44,44,44,.8)', ...gridBg }}>
        <FadeIn><LogoLight height={isMobile ? 300 : 400} /></FadeIn>
        <Orn className="my-8" />
        <FadeIn delay={200}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: 'var(--wht)', lineHeight: 1.3, marginBottom: 8 }}>Onde os seus sonhos</h2>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--g)', lineHeight: 1.3, marginBottom: 56 }}>se realizam</h2>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, maxWidth: 900, width: '100%', marginBottom: 56 }}>
            {[
              { l: 'Instagram', v: <a href="https://www.instagram.com/espaco_felicita" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none' }}>@espaco_felicita</a> },
              { l: 'WhatsApp', v: (<><a href="https://wa.me/5531971871101?text=Ol%C3%A1!%20Vim%20pela%20proposta%20de%20or%C3%A7amento%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Espa%C3%A7o%20Felicit%C3%A1." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none', display: 'block', marginBottom: 4 }}>(31) 97187-1101</a><a href="https://wa.me/5531984086068?text=Ol%C3%A1!%20Vim%20pela%20proposta%20de%20or%C3%A7amento%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Espa%C3%A7o%20Felicit%C3%A1." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none', display: 'block' }}>(31) 98408-6068</a></>) },
              { l: 'Endereço', v: <a href="https://maps.app.goo.gl/GjqQxNVBU18E1pRd6?g_st=ac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none' }}>R. Cel. Jaíro Pereira, 999<br />Palmares, BH</a> },
              { l: 'Site', v: <a href="https://www.espacofelicita.com.br/site/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wht)', textDecoration: 'none' }}>www.espacofelicita.com.br</a> }
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.4em', textTransform: 'uppercase', color: 'var(--g)' }}>{c.l}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: 'var(--wht)', lineHeight: 1.5 }}>{c.v}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ borderTop: '.5px solid rgba(44,44,44,.8)', paddingTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 520 }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '.4em', textTransform: 'uppercase', color: 'rgba(250,250,250,.28)' }}>Conheça também nossas casas</span>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 40, alignItems: 'center', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 29, color: 'var(--gl)' }}>
              <span style={{ whiteSpace: 'nowrap' }}>Felicitá Cidade Nova</span>
              {!isMobile && <span style={{ color: 'var(--g30)' }}>·</span>}
              <span style={{ whiteSpace: 'nowrap' }}>Felicitá Pampulha</span>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 300, letterSpacing: '.18em', color: 'rgba(250,250,250,.18)', marginTop: 48 }}>
            Espaço Felicitá © 2026 · Unidade Palmares · Belo Horizonte, MG
          </p>
        </FadeIn>
      </section>
    </div>
  );
}