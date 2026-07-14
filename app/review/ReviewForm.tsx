"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { submitPlatformReview } from "../lib/api";

const MAX_LEN = 500;
type Status = "idle" | "loading" | "success" | "error";

export default function ReviewForm() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?redirect=/review");
    }
  }, [isLoading, user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const trimmed = reviewText.trim();
    if (rating < 1) {
      setError("Please select a star rating.");
      setStatus("error");
      return;
    }
    if (!trimmed) {
      setError("Please write a short review.");
      setStatus("error");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login?redirect=/review");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      await submitPlatformReview(token, rating, trimmed);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (isLoading || !user) {
    return <div className="h-72 animate-pulse rounded-3xl bg-neutral-100" />;
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="mt-4 text-xl font-bold text-neutral-900">Thanks for your review!</h2>
        <p className="mt-2 text-sm text-neutral-600">
          It&apos;s live on our home page now. You can come back and submit again anytime
          to update it.
        </p>
      </div>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-neutral-700">Your rating</span>
        <div
          role="radiogroup"
          aria-label="Star rating"
          className="flex items-center gap-1"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onMouseEnter={() => setHoverRating(n)}
              onClick={() => setRating(n)}
              disabled={status === "loading"}
              className="p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed"
            >
              <Star
                size={32}
                className={
                  n <= displayRating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-neutral-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-neutral-700">Your review</span>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value.slice(0, MAX_LEN))}
          maxLength={MAX_LEN}
          rows={5}
          placeholder="Tell us about your experience with Bogie…"
          disabled={status === "loading"}
          className="resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
        />
        <span className="self-end text-xs text-neutral-400">
          {reviewText.length}/{MAX_LEN}
        </span>
      </label>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "loading" ? (
          <>
            Submitting...
            <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          "Submit review"
        )}
      </button>
    </form>
  );
}
