import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'AI Vision extraction route is not implemented yet. Migrate from prototype in a controlled ticket.',
    },
    { status: 501 },
  );
}
