import type { ReactNode } from 'react';
import Link from 'next/link';

const workflowSteps = [
  { href: '/', label: 'Home' },
  { href: '/capture', label: 'Capture' },
  { href: '/confirm', label: 'Confirm' },
  { href: '/issue', label: 'Issue' },
  { href: '/generate', label: 'Generate' },
  { href: '/review', label: 'Review' },
];

export function AppShell({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Refab Connect / AI-WOC</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        <nav aria-label="AI-WOC workflow">
          <ul className="workflow-nav">
            {workflowSteps.map((step) => (
              <li key={step.href}>
                <Link href={step.href}>{step.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </section>
    </main>
  );
}
