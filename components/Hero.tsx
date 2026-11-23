'use client';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { PROPS, THUMB } from '../lib/data';

/* deterministic skyline (same on server + client) */
const R = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
type B = { x: number; w: number; h: number; s: boolean };
const row = (x0: number, x1: number, base: number, rg: number): B[] => {
  const o: B[] = []; let x = x0;
  while (x < x1) {
    const w = 26 + R() * 44, near = 1 - Math.min(1, Math.abs(x - 800) / 800);
    if (Math.abs(x - 800) > 70) o.push({ x, w, h: base + R() * rg * (0.35 + near), s: R() > 0.78 });
    x += w + R() * 6;
  }
  return o;
};
const back = [...row(0, 740, 90, 150), ...row(860, 1600, 90, 150)];
const front = [...row(-10, 730, 70, 200), ...row(870, 1610, 70, 200)];
const lights = Array.from({ length: 80 }, () => ({ x: R() * 1600, y: 818 + R() * 28, r: 1.2 + R() * 2.4, c: ['#ffb347', '#ffe9b0', '#ff8a3d'][Math.floor(R() * 3)] }));
const bush = Array.from({ length: 70 }, () => ({ x: R() * 1600, r: 7 + R() * 9 }));
const TOWER = 'M778 840V210L786 150L790 74H794L796 150H804L806 74H810L814 150L822 210V840Z';
const P = ({ b, fill }: { b: B; fill: string }) => (
  <path d={`M${b.x} 840V${840 - b.h}${b.s ? `L${b.x + b.w} ${870 - b.h}` : `H${b.x + b.w}`}V840Z`} fill={fill} />
);

function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <pattern id="wn" width="7" height="9" patternUnits="userSpaceOnUse"><rect x="2" y="3" width="2.4" height="3" fill="#ffd9a0" opacity=".55" /></pattern>
        <linearGradient id="bf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a3358" /><stop offset="1" stopColor="#6a7092" /></linearGradient>
        <linearGradient id="tw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c3b70" /><stop offset=".7" stopColor="#3a4a80" /><stop offset="1" stopColor="#d9dff0" /></linearGradient>
        <linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2a3c" /><stop offset="1" stopColor="#110c1c" /></linearGradient>
        <filter id="gl"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
      <g className="rise" style={{ animationDelay: '1.1s' }} opacity=".55">{back.map((b, i) => <P key={i} b={b} fill="#7c7fa8" />)}</g>
      <g className="rise" style={{ animationDelay: '.2s', animationDuration: '1.9s' }}>
        <path d={TOWER} fill="url(#tw)" /><path d={TOWER} fill="url(#wn)" /><rect x="822" y="650" width="22" height="190" fill="url(#tw)" />
      </g>
      <g className="rise" style={{ animationDelay: '.9s' }}>{front.map((b, i) => (<g key={i}><P b={b} fill="url(#bf)" /><P b={b} fill="url(#wn)" /></g>))}</g>
      <g className="fade">
        <rect y="852" width="1600" height="48" fill="url(#wt)" /><rect y="832" width="1600" height="22" fill="#1b1520" />
        {bush.map((c, i) => <circle key={i} cx={c.x} cy="832" r={c.r} fill="#1b1520" />)}
        <g filter="url(#gl)">{lights.map((l, i) => <circle key={i} cx={l.x} cy={l.y} r={l.r} fill={l.c} />)}</g>
      </g>
    </svg>
  );
}

const Figure = () => (
  <svg className="fig" viewBox="0 0 60 140" aria-hidden>
    <defs><linearGradient id="th" x1="0" x2="1"><stop offset="0" stopColor="#cfdcf5" /><stop offset=".5" stopColor="#f4f8ff" /><stop offset="1" stopColor="#b8c8e8" /></linearGradient></defs>
    <path d="M12 44Q30 34 48 44L53 136H7Z" fill="url(#th)" />
    <path d="M17 20Q30 -2 43 20L48 50Q30 40 12 50Z" fill="#b84b93" />
    <path d="M20 16Q30 8 40 16" stroke="#17141f" strokeWidth="2.4" fill="none" />
  </svg>
);
const Stairs = () => (
  <svg className="stairs" viewBox="0 0 400 180" aria-hidden>
    <defs><filter id="sg"><feGaussianBlur stdDeviation="2" /></filter></defs>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const y = i * 26, hw = 50 + i * 24; return (
        <g key={i}><rect x={200 - hw} y={y} width={hw * 2} height="22" fill="#06204f" opacity=".85" /><rect x={200 - hw} y={y} width={hw * 2} height="3" fill="#5ccfff" filter="url(#sg)" /></g>);
    })}
  </svg>
);

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Hero() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = track.current, el = root.current; if (!t || !el) return;
      const r = t.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      const set = (k: string, v: number) => el.style.setProperty(k, String(v));
      const w = ease(seg(p, 0.15, 0.5));
      set('--to', 1 - seg(p, 0, 0.14));
      set('--wl', lerp(-6, 23.7, w)); set('--wt', lerp(-6, 24, w)); set('--wr', lerp(-6, 22.4, w)); set('--wb', lerp(-6, 23, w));
      set('--fo', seg(p, 0.2, 0.4));
      set('--fy', lerp(40, 0, ease(seg(p, 0.38, 0.6)))); set('--fa', seg(p, 0.38, 0.52)); set('--so', seg(p, 0.45, 0.6));
      for (let i = 0; i < 4; i++) set(`--c${i}`, ease(seg(p, 0.6 + i * 0.07, 0.8 + i * 0.05)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={track} className="track">
      <div ref={root} className="stick">
        <div className="win">
          <div className="sky" />
          <div className="txt"><div className="in"><p className="script">Invest in</p><h1 className="big">DUBAI</h1></div></div>
          <Skyline />
          <div className="side l"><div className="in"><span className="thumb" style={{ backgroundImage: `url(${THUMB})` }}><i /></span><p>Build Your<br />Future.</p></div></div>
          <div className="side r"><div className="in"><p>Discover exceptional property investment opportunities in Dubai. From luxury residences to high-potential real estate projects. Make confident investment decisions with expert guidance and find a property that aligns with your goals.</p></div></div>
          <div className="frame"><i /><i /></div>
        </div>
        <Stairs /><Figure />
        {PROPS.map((p, i) => (
          <article key={i} className={`card c${i}`} style={{ '--c': `var(--c${i})`, '--dir': i % 2 ? 1 : -1 } as CSSProperties}>
            <div className="ph"><img src={p.img} alt={`${p.name} property`} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} /></div>
            <div className="meta"><div><b>{p.name}</b><span>{p.sub}</span></div><em>{p.price}</em></div>
            <ul>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
