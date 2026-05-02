import { AppShell } from '@/components/layout/AppShell';
import { GenerateStatePreview } from '@/components/woc/GenerateStatePreview';

export default function GeneratePage() {
  return (
    <AppShell title="Generate" description="Placeholder: generate Engineering report and Engineering email draft.">
      <GenerateStatePreview />
    </AppShell>
  );
}
