import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Search, Layers, FileText, UserRound, Sparkles, Github, Linkedin, Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';
import './globals.css';
import 'katex/dist/katex.min.css';
import { AcademicAIAssistant } from '@/components/ai/AcademicAIAssistant';
import MobileStaggeredMenu from '@/components/navigation/MobileStaggeredMenu';

const siteUrl = 'https://honors-4th-year-physics.vercel.app';
const siteTitle = 'BraKet — ⟨φ|ψ⟩';
const siteDescription = 'BraKet is a Physics learning hub for Honors students, with subject-wise chapters, YouTube classes, shared study notes, and a multilingual Campus Assistant.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BraKet — ⟨φ|ψ⟩ | Physics Learning Hub',
    template: '%s | BraKet ⟨φ|ψ⟩',
  },
  description: siteDescription,
  applicationName: 'BraKet',
  keywords: [
    'BraKet', '⟨φ|ψ⟩', 'Physics', 'Honors Physics', 'Physics notes',
    'Physics lectures', 'chapter-wise study notes', 'YouTube classes',
    'Bangla Physics resources', 'Quantum Mechanics', 'Classical Electrodynamics',
  ],
  authors: [{ name: 'Masud Rana', url: 'https://github.com/masudrana430' }],
  creator: 'Masud Rana',
  publisher: 'Masud Rana',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteTitle,
    title: 'BraKet — ⟨φ|ψ⟩ | Physics Learning Hub',
    description: siteDescription,
    images: [{ url: '/braket-logo.jpg', width: 512, height: 512, alt: 'BraKet logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BraKet — ⟨φ|ψ⟩ | Physics Learning Hub',
    description: siteDescription,
    images: ['/braket-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/apple-icon.jpg',
  },
};

const socialLinks = [
  { href: 'https://github.com/masudrana430', label: 'GitHub', Icon: Github },
  { href: 'https://linkedin.com/in/masudrana430', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.facebook.com/profile.php?id=100069416914519', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.instagram.com/masud04052003/?hl=en', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.youtube.com/@sukoonalqalb-c9v', label: 'YouTube', Icon: Youtube },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Masud Rana',
    jobTitle: 'Full-Stack Developer & Product Engineer',
    url: 'https://masud-rana.dev/',
    image: `${siteUrl}/braket-logo.jpg`,
    email: 'mailto:masud040502@gmail.com',
    telephone: '+8801878155256',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chattogram',
      addressCountry: 'BD',
    },
    sameAs: [
      'https://github.com/masudrana430',
      'https://linkedin.com/in/masudrana430',
      'https://www.facebook.com/profile.php?id=100069416914519',
      'https://www.instagram.com/masud04052003/?hl=en',
      'https://www.youtube.com/@sukoonalqalb-c9v',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BraKet',
    alternateName: 'BraKet ⟨φ|ψ⟩',
    url: siteUrl,
    description: siteDescription,
    creator: { '@type': 'Person', name: 'Masud Rana', url: 'https://masud-rana.dev/' },
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <header className="sticky top-0 z-40">
          <MobileStaggeredMenu />
          <div className="hidden border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:block">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/braket-logo.jpg" alt="BraKet logo" width={48} height={48} priority className="h-11 w-11 rounded-xl object-cover" />
                <div>
                  <span className="block text-base font-extrabold tracking-tight text-slate-900 dark:text-white">BraKet</span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">⟨φ|ψ⟩ · Physics Learning Hub</span>
                </div>
              </Link>
              <nav aria-label="Main navigation" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Link href="/" className="hover:text-indigo-600 px-2 py-1">Home</Link>
                <Link href="/subjects" className="inline-flex items-center gap-1 hover:text-indigo-600 px-2 py-1">
                  <Layers className="h-4 w-4" /><span>Subjects</span>
                </Link>
                <Link href="/notes" className="inline-flex items-center gap-1 hover:text-indigo-600 px-2 py-1">
                  <FileText className="h-4 w-4" /><span>Notes</span>
                </Link>
                <Link href="/about" className="inline-flex items-center gap-1 hover:text-indigo-600 px-2 py-1">
                  <UserRound className="h-4 w-4" /><span>About Me</span>
                </Link>
                <Link href="/search" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-200">
                  <Search className="h-3.5 w-3.5" /><span>Global Search</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-7 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Image src="/braket-logo.jpg" alt="BraKet logo" width={56} height={56} className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Masud Rana</p>
                  <p className="mt-0.5">Full-Stack Developer & Product Engineer</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">Chattogram, Bangladesh · Remote friendly</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex items-center gap-1.5 hover:text-indigo-600">
                    <Icon className="h-3.5 w-3.5" />{label}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} BraKet ⟨φ|ψ⟩. Built by Masud Rana.</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href="mailto:masud040502@gmail.com" className="inline-flex items-center gap-1.5 hover:text-indigo-600"><Mail className="h-3.5 w-3.5" />masud040502@gmail.com</a>
                <a href="tel:+8801878155256" className="inline-flex items-center gap-1.5 hover:text-indigo-600"><Phone className="h-3.5 w-3.5" />+880 1878-155256</a>
                <Link href="/about" className="font-semibold text-indigo-600 hover:underline">About Me</Link>
              </div>
            </div>
          </div>
        </footer>
        <AcademicAIAssistant />
      </body>
    </html>
  );
}
