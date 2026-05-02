import { AppShell } from '@/components/layout/AppShell';
import { ConfirmRequiredFieldsGate } from '@/components/woc/ConfirmRequiredFieldsGate';

export default function ConfirmPage() {
  return (
    <AppShell title="Confirm" description="Confirm required extracted fields before continuing to Generate.">
      <ConfirmRequiredFieldsGate />
    </AppShell>
  );
}
