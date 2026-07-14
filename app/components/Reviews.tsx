import { getPlatformReviewsPublic } from "../lib/api";
import ReviewsCarousel from "./ReviewsCarousel";

// Home page testimonials band, fed by real platform reviews. Server
// component: fetches with hourly revalidation, hides entirely if there's
// nothing to show yet rather than rendering an empty carousel.
export default async function Reviews() {
  const reviews = await getPlatformReviewsPublic();
  if (reviews.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
          Testimonials
        </span>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          What riders are saying
        </h2>
      </div>

      <div className="mt-10">
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
