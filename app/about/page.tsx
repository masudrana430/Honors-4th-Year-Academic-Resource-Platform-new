import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Github, Linkedin, Facebook, Instagram, Youtube, Globe, Mail, Phone, MessageCircle,
  FileText, MapPin, ExternalLink, Code2, GraduationCap, BriefcaseBusiness, ArrowUpRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Masud Rana',
  description: 'Meet Masud Rana, an Engineering Physics student and Full-Stack Developer from Chattogram, Bangladesh. Explore his technology stack, recent projects, and contact links.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Masud Rana | BraKet ⟨φ|ψ⟩',
    description: 'Engineering Physics student & Full-Stack Developer · Chattogram, Bangladesh.',
    url: '/about',
    images: [{ url: '/braket-logo.jpg', width: 256, height: 256, alt: 'BraKet logo' }],
  },
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/masudrana430', Icon: Github },
  { label: 'Portfolio', href: 'https://masud-rana.dev/', Icon: Globe },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/masudrana430', Icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100069416914519', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/mas.ud430/', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@sukoonalqalb-c9v', Icon: Youtube },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1etarj3H6FQBGSjCJPe73b3FaYpRkTG97/view', Icon: FileText },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01bf8ead3f54ab2897', Icon: BriefcaseBusiness },
];

const skillGroups = [
  { title: 'Languages & Core', skills: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SQL'] },
  { title: 'Frontend & UI', skills: ['React', 'Next.js', 'Tailwind CSS 3 & 4', 'Radix UI', 'TanStack Query', 'React Hook Form', 'Zod', 'Axios', 'Recharts', 'Sonner', 'Lucide React'] },
  { title: 'Animation & 3D', skills: ['Motion', 'GSAP', 'Three.js', 'React Three Fiber', 'OGL', 'Matter.js'] },
  { title: 'Backend & APIs', skills: ['Node.js', 'Express 5', 'REST APIs', 'JWT', 'Google Authentication', 'bcryptjs', 'Cloudinary', 'Multer', 'Nodemailer', 'CORS', 'Helmet', 'Rate Limiting', 'cookie-parser', 'node-cron', 'EJS'] },
  { title: 'Database & ORM', skills: ['PostgreSQL', 'Prisma ORM', 'pg', 'Redis'] },
  { title: 'AI, Payments & Integrations', skills: ['Gemini API', 'Google APIs', 'Google Drive API', 'Stripe', 'Paymently'] },
  { title: 'Documentation & Utilities', skills: ['Swagger / OpenAPI', 'PDFKit', 'KaTeX', 'date-fns'] },
  { title: 'Developer Tools & Deployment', skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Netlify', 'Postman', 'Playwright', 'GitHub Actions', 'Biome', 'TSX', 'dotenv', 'PostCSS', 'Autoprefixer'] },
];

const projects = [
  {
    name: 'Developer Assessment Platform',
    category: 'Full-stack · Assessment & Evaluation',
    description: 'A role-based assessment platform with candidate, reviewer, and admin workflows. It supports assessment creation, timed attempts, MCQ and written questions, reviewer grading, analytics, and paid assessments through Stripe Checkout.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Express 5', 'PostgreSQL', 'Prisma', 'Redis', 'Stripe'],
    links: [
      { label: 'Live application', href: 'https://developer-assessment-platform-front.vercel.app' },
      { label: 'Frontend code', href: 'https://github.com/masudrana430/Developer-Assessment-Platform-Frontend' },
      { label: 'Backend code', href: 'https://github.com/masudrana430/Developer-Assessment-Platform' },
      { label: 'API documentation', href: 'https://developer-assessment-platform.onrender.com/api-docs' },
    ],
  },
  {
    name: 'EventFlow',
    category: 'Full-stack · Event Management & Ticketing',
    description: 'An event discovery and ticketing platform designed for attendees, organizers, event staff, admins, and super admins. The product covers event publishing, ticket checkout, digital passes, QR check-in, announcements, refunds, payouts, and role-aware dashboards.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Express 5', 'PostgreSQL', 'Prisma', 'Redis', 'Paymently / Stripe'],
    links: [
      { label: 'Live application', href: 'https://event-flow-frontend-nu.vercel.app' },
      { label: 'Frontend code', href: 'https://github.com/masudrana430/EventFlow-frontend' },
      { label: 'Backend code', href: 'https://github.com/masudrana430/EventFlow' },
      { label: 'API documentation', href: 'https://eventflow-ln9q.onrender.com/api-docs' },
    ],
  },
  {
    name: 'BraKet ⟨φ|ψ⟩',
    category: 'Full-stack · Academic Learning Platform',
    description: 'A physics learning hub for Honours 4th-Year students, with subject and chapter resources, searchable study notes, chapter-wise YouTube classes, Google Drive file uploads, and a multilingual AI assistant for finding relevant academic materials.',
    stack: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Gemini API', 'Google Drive API'],
    links: [
      { label: 'Live application', href: 'https://honors-4th-year-physics.vercel.app' },
      { label: 'Source code', href: 'https://github.com/masudrana430/Honors-4th-Year-Academic-Resource-Platform-new' },
    ],
  },
  {
    name: 'DoctorHub',
    category: 'Backend · Healthcare API · Early build',
    description: 'A backend foundation for a doctor–patient appointment platform. The current working scope includes patient registration, login, and authenticated profile retrieval with Express, TypeScript, Prisma, PostgreSQL, and JWT authentication. Appointment scheduling, doctor schedules, and payments are documented as future work.',
    stack: ['Node.js', 'Express 5', 'TypeScript', 'Prisma 7', 'PostgreSQL', 'JWT', 'Google Auth', 'Redis', 'Cloudinary'],
    links: [
      { label: 'Backend repository', href: 'https://github.com/masudrana430/DoctorHub' },
    ],
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
            <p className="mt-2 text-base font-semibold text-indigo-200">Full-Stack Developer & Engineering Physics Student</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              I build practical web products, from responsive interfaces and interactive experiences to secure APIs, database-driven workflows, and third-party integrations. I enjoy turning complex ideas into useful, polished applications.
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

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['3', 'Full-stack applications'],
          ['1', 'Backend API project in progress'],
          ['4', 'Featured projects'],
          ['Full-stack', 'Main development focus'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xl font-extrabold text-indigo-600">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><Code2 className="h-5 w-5 text-indigo-600" /><h2 className="text-lg font-bold text-slate-900">About Me</h2></div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>
              I’m an Engineering Physics student at National University, Bangladesh, and a Full-Stack Developer who enjoys building complete digital products. My recent GitHub work includes a developer assessment platform, an event-management and ticketing system, a healthcare API foundation, and BraKet — a physics learning platform.
            </p>
            <p>
              I work across the stack: building interfaces with React and Next.js, developing TypeScript and Node.js APIs with Express, and designing PostgreSQL data models with Prisma. My projects also use Redis, JWT and Google authentication, file and email services, API documentation, and payment integrations.
            </p>
            <p>
              I’m interested in reliable architecture, secure role-based workflows, performance, and thoughtful user experience. I also enjoy exploring AI integrations, interactive interfaces, animation, and 3D web experiences while continuing to grow as an engineer.
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
              <p className="text-xs text-slate-500">2021</p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm font-bold text-slate-900">Secondary School Certificate — Science</p>
              <p className="mt-1 text-xs text-slate-600">Chattogram City Corporation Hatey Khari School & College</p>
              <p className="text-xs text-slate-500">2019</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2"><Code2 className="h-5 w-5 text-indigo-600" /><h2 className="text-lg font-bold text-slate-900">Skills & Technologies</h2></div>
        <p className="mb-4 text-sm leading-6 text-slate-600">Technologies reflected in the frontend, backend, and academic platform repositories on my GitHub.</p>
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
              <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">{project.category}</p>
              <h3 className="mt-2 text-base font-bold text-slate-900">{project.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((skill) => <span key={skill} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">{skill}</span>)}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                    {link.label} <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
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
