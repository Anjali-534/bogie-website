import type { Metadata } from "next";
import TrackingView from "./TrackingView";

export const metadata: Metadata = {
  title: "Track your ride — bogie",
  robots: { index: false, follow: false },
};

export default async function TrackBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <TrackingView bookingId={id} />
    </main>
  );
}
