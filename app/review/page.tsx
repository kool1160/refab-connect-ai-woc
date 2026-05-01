import { AppShell } from '@/components/layout/AppShell';
import { ConfirmationGatePlaceholder } from '@/components/woc/ConfirmationGatePlaceholder';

export default function ReviewPage() {
  return (
    <AppShell title="Review / Copy / Send" description="Placeholder: draft-first review gate before copy or send.">
      <ConfirmationGatePlaceholder />
    </AppShell>
  );
}
