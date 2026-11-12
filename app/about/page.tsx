import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Github, Linkedin, Facebook, Instagram, Youtube, Globe, Mail, Phone, MessageCircle,
  FileText, MapPin, ExternalLink, Code2, GraduationCap, BriefcaseBusiness, ArrowUpRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Masud Rana',
  description: 'Meet Masud Rana, a Full-Stack Developer and Product Engineer from Chattogram, Bangladesh. Explore his skills, projects, education, resume, and contact links.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Masud Rana | BraKet ⟨φ|ψ⟩',
    description: 'Full-Stack Developer & Product Engineer · Chattogram, Bangladesh.',
    url: '/about',
    images: [{ url: '/braket-logo.jpg', width: 256, height: 256, alt: 'BraKet logo' }],
  },
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/masudrana430', Icon: Github },
  { label: 'Portfolio', href: 'https://masud-rana.dev/', Icon: Globe },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/masudrana430', Icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100069416914519', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/masud04052003/?hl=en', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@sukoonalqalb-c9v', Icon: Youtube },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1etarj3H6FQBGSjCJPe73b3FaYpRkTG97/view', Icon: FileText },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01bf8ead3f54ab2897', Icon: BriefcaseBusiness },
];

const skillGroups = [
  { title: 'Languages', skills: ['JavaScript', 'TypeScript'] },
  { title: 'Frontend', skills: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS', 'React Router'] },
  { title: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Middleware'] },
  { title: 'Database & Auth', skills: ['MongoDB', 'PostgreSQL', 'Firebase Auth', 'Data Modeling'] },
  { title: 'Tools & Deployment', skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Netlify', 'Docker', 'AWS', 'Vitest'] },
  { title: 'UI & Product', skills: ['Responsive UI', 'UI/UX', 'Animation', 'Dashboards', 'Accessibility'] },
];

const projects = [
  {
    name: 'Thornview Grocery',
    description: 'Full-stack grocery eCommerce platform with role-based dashboards, live support chat, secure payments, and product management.',
    live: 'https://thornview-grocery.web.app/',
    code: 'https://github.com/masudrana430/Thornview-Grocery-client',
    extra: 'https://github.com/masudrana430/Thornview-Grocery-server',
  },
  {
    name: 'BloodCare',
    description: 'Blood donation and funding platform with donor, volunteer, and admin workflows, request tracking, and Stripe payments.',
    live: 'https://give-a-life.netlify.app/',
    code: 'https://github.com/masudrana430/GIVE_A_LIFE_clint',
    extra: 'https://github.com/masudrana430/GIVE_A_LIFE_server',
  },
  {
    name: 'myDelivery',
    description: 'Parcel delivery platform with booking, tracking, regional coverage maps, role-based dashboards, and payment history.',
    live: 'https://my-delivery-4c099.web.app/',
    code: 'https://github.com/masudrana430/my-delivery-client',
    extra: 'https://github.com/masudrana430/my-delivery-server',
  },
  {
    name: 'WarmPaws',
    description: 'Winter pet-care and adoption experience with authentication, responsive layouts, animations, and interactive sections.',
    live: 'https://a09-category-rose.netlify.app/',
    code: 'https://github.com/masudrana430/a09-category-rose',
  },
  {
    name: 'HERO.IO',
    description: 'App discovery and installation showcase focused on clear product presentation and mobile-friendly design.',
    live: 'https://hero-apps-masud.netlify.app/',
    code: 'https://github.com/masudrana430/hero-app',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-9 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative grid items-center gap-7 md:grid-cols-[auto_1fr]">
          <Image src="/braket-logo.jpg" alt="BraKet logo" width={300} height={300} priority className="mx-auto h-44 w-44 rounded-3xl border border-white/10 object-cover shadow-2xl sm:h-56 sm:w-56" />
          <div>
            <span className="inline-flex rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">About the creator of BraKet</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Masud Rana</h1>
            <p className="mt-2 text-base font-semibold text-indigo-200">Full-Stack Developer & Product Engineer</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Junior Frontend & MERN Stack Developer who enjoys turning ideas into clean, responsive, and animated web applications. Focused on reliable architecture, data integrity, polished interfaces, and production-ready products.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-indigo-300" />Chattogram, Bangladesh</span>
              <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-3.5 w-3.5 text-indigo-300" />Open to remote collaboration</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="mailto:masud040502@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-400"><Mail className="h-4 w-4" />Contact me</a>
              <a href="https://drive.google.com/file/d/1etarj3H6FQBGSjCJPe73b3FaYpRkTG97/view" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10"><FileText className="h-4 w-4" />View resume</a>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['10+', 'Completed projects'],
          ['15+', 'Technologies'],
          ['4+', 'Certificates'],
          ['5+', 'Core areas'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-indigo-600">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><Code2 className="h-5 w-5 text-indigo-600" /><h2 className="text-lg font-bold text-slate-900">About Me</h2></div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>
              I’m a Full-Stack Developer and Product Engineer who likes turning complex product ideas into type-safe, optimized, and responsive digital solutions. I value clean component architecture, dependable data models, and thoughtful user experiences.
            </p>
            <p>
              My current development focus includes TypeScript, Next.js, React, Tailwind CSS, Node.js, Express.js, and MongoDB. I also explore AI-assisted development workflows and keep improving my DevOps, testing, and cloud deployment practices.
            </p>
            <p>
              I completed the Complete Web Development Course from Programming Hero and continue building real-world projects to strengthen problem-solving, product thinking, and code quality.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-indigo-600" /><h2 className="text-lg font-bold text-slate-900">Education</h2></div>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-900">Bachelor of Science — Engineering Physics</p>
              <p className="mt-1 text-xs text-slate-600">National University, Bangladesh</p>
              <p className="text-xs text-slate-500">Session: 2021–2022</p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm font-bold text-slate-900">Higher Secondary Certificate — Science</p>
              <p className="mt-1 text-xs text-slate-600">Chattogram Bandar College</p>
              <p className="text-xs text-slate-500">GPA 5.00 / 5.00 · 2021</p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm font-bold text-slate-900">Secondary School Certificate — Science</p>
              <p className="mt-1 text-xs text-slate-600">Chattogram City Corporation Hatey Khari School & College</p>
              <p className="text-xs text-slate-500">GPA 4.94 / 5.00 · 2019</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2"><Code2 className="h-5 w-5 text-indigo-600" /><h2 className="text-lg font-bold text-slate-900">Skills & Technologies</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-bold text-slate-900">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2"><BriefcaseBusiness className="h-5 w-5 text-indigo-600" /><h2 className="text-lg font-bold text-slate-900">Featured Projects</h2></div>
        <div className="grid gap-3 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">Live project <ExternalLink className="h-3 w-3" /></a>
                <a href={project.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600">Source code <ArrowUpRight className="h-3 w-3" /></a>
                {project.extra && <a href={project.extra} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600">Server code <ArrowUpRight className="h-3 w-3" /></a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">Social & Contact</h2>
        <p className="mt-1 text-sm text-slate-600">Find my work, connect with me, or reach out about a project or opportunity.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
              <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" />{label}</span><ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <a href="mailto:masud040502@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 hover:bg-indigo-50"><Mail className="h-4 w-4 text-indigo-600" />masud040502@gmail.com</a>
          <a href="tel:+8801878155256" className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 hover:bg-indigo-50"><Phone className="h-4 w-4 text-indigo-600" />+880 1878-155256</a>
          <a href="https://wa.me/8801878155256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 hover:bg-indigo-50"><MessageCircle className="h-4 w-4 text-indigo-600" />WhatsApp</a>
        </div>
      </section>
    </div>
  );
}
