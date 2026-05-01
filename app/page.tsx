import { APP_NAME, CORE_WORKFLOW } from '@/lib/constants';

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Applied Intelligence</p>
        <h1>{APP_NAME}</h1>
        <p className="lead">
          Structured build foundation for the Work Order Correction Agent.
        </p>
        <div className="workflow-card">
          <h2>Core Workflow</h2>
          <p>{CORE_WORKFLOW}</p>
        </div>
        <div className="status-card">
          <strong>Build Status:</strong> Clean chassis initialized. Prototype logic will be migrated by controlled tickets.
        </div>
      </section>
    </main>
  );
}
