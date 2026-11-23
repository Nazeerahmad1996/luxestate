import Hero from '../components/Hero';
export default function Page() {
  return (<>
    <header className="nav">
      <a className="logo" href="#">LUXE<b>STATE</b></a>
      <nav className="pill">{['Home', 'About Us', 'Property List', 'Contact Us'].map((t, i) => (<a key={t} href="#" className={i === 0 ? 'on' : ''}>{t}</a>))}</nav>
      <div className="right">
        <span className="lang"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>Eng</span>
        <a className="signup" href="#">Sign up</a>
      </div>
    </header>
    <Hero />
  </>);
}
