import { AppShell } from '@/components/layout/AppShell';
import { GenerateStatePreview } from '@/components/woc/GenerateStatePreview';

export default function GeneratePage() {
  return (
    <AppShell
      title="Generate"
      description="Generate the Engineering Work Order Correction report and Engineering email draft from confirmed values."
    >
      <GenerateStatePreview />
    </AppShell>
  );
}
