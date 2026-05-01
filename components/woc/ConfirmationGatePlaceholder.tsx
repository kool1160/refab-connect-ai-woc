import { confirmationLabels } from '@/features/woc/defaults';

export function ConfirmationGatePlaceholder() {
  return (
    <section className="status-card" aria-label="Confirmation gate placeholder">
      <strong>Confirmation Gate (placeholder)</strong>
      <ul>
        {confirmationLabels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </section>
  );
}
