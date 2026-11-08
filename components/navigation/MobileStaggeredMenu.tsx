'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookOpen, Search, Layers, X, Menu } from 'lucide-react';
import './mobile-staggered-menu.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/subjects', label: 'Subjects' },
  { href: '/search', label: 'Global Search' },
];

export default function MobileStaggeredMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="honors-mobile-nav lg:hidden" data-open={open ? 'true' : 'false'}>
      <header className="honors-mobile-nav__bar">
        <Link href="/" onClick={close} className="honors-mobile-nav__brand">
          <span className="honors-mobile-nav__brand-icon"><BookOpen size={20} /></span>
          <span><strong>Honors 4th Year</strong><small>Academic Resource Platform</small></span>
        </Link>
        <button type="button" className="honors-mobile-nav__toggle" onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="honors-mobile-menu">
          <span className="honors-mobile-nav__toggle-label"><span className="honors-mobile-nav__toggle-words"><span>Menu</span><span>Close</span></span></span>
          <span className="honors-mobile-nav__toggle-icon">{open ? <X size={20} /> : <Menu size={20} />}</span>
        </button>
      </header>

      <button aria-label="Close navigation menu" tabIndex={open ? 0 : -1}
        className="honors-mobile-nav__backdrop" onClick={close} />

      <div className="honors-mobile-nav__layers" aria-hidden="true">
        <span /><span /><span />
      </div>

      <nav id="honors-mobile-menu" className="honors-mobile-nav__panel" aria-hidden={!open} inert={!open}>
        <p className="honors-mobile-nav__eyebrow">Explore platform</p>
        <ul>
          {links.map((item, index) => (
            <li key={item.href} style={{ '--menu-index': index } as React.CSSProperties}>
              <Link href={item.href} onClick={close}>
                <span className="honors-mobile-nav__number">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
                {item.href === '/subjects' ? <Layers size={19} /> : item.href === '/search' ? <Search size={19} /> : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className="honors-mobile-nav__footer">Find your next topic. Learn without limits.</div>
      </nav>
    </div>
  );
}
