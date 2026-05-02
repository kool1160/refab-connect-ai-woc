import { AppShell } from '@/components/layout/AppShell';
import { ReviewStatePreview } from '@/components/woc/ReviewStatePreview';

export default function ReviewPage() {
  return (
    <AppShell
      title="Review / Copy / Send"
      description="Review generated Engineering Correction Report and Engineering Email Draft before copy/send actions."
    >
      <ReviewStatePreview />
    </AppShell>
  );
}
