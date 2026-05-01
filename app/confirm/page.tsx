import { AppShell } from '@/components/layout/AppShell';
import { ConfirmationGatePlaceholder } from '@/components/woc/ConfirmationGatePlaceholder';

export default function ConfirmPage() {
  return (
    <AppShell title="Confirm" description="Placeholder: confirm work order, part, operation, and process accuracy.">
      <ConfirmationGatePlaceholder />
    </AppShell>
  );
}
