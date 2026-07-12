"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Share2, Check, ArrowRight, ExternalLink, Gift } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import {
  getMyReferralCode,
  getMyReferrals,
  type ReferralInfo,
  type ReferralEntry,
} from "../lib/api";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending first ride",
  credited: "Credited",
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ReferralHub() {
  const { user, isLoading } = useAuth();
  const [info, setInfo] = useState<ReferralInfo | null>(null);
  const [referrals, setReferrals] = useState<ReferralEntry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      setLoadingData(false);
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    setError("");
    Promise.allSettled([getMyReferralCode(token), getMyReferrals(token)]).then(
      ([codeRes, listRes]) => {
        if (codeRes.status === "fulfilled") {
          setInfo(codeRes.value);
        } else {
          setError(
            codeRes.reason instanceof Error
              ? codeRes.reason.message
              : "Couldn't load your referral code."
          );
        }
        if (listRes.status === "fulfilled") setReferrals(listRes.value);
        setLoadingData(false);
      }
    );
  }, [isLoading, user, retryTick]);

  async function copyText(text: string, which: "code" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // clipboard access can fail silently (permissions/insecure context) — no-op
    }
  }

  async function shareCode() {
    if (!info) return;
    const message = `Join me on Bogie! Use my referral code ${info.referral_code} when signing up. ${info.share_link}`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text: message, url: info.share_link });
        return;
      } catch {
        // user cancelled the share sheet — fall through to copy
      }
    }
    copyText(info.share_link, "link");
  }

  if (isLoading) {
    return (
      <div className="h-48 animate-pulse rounded-3xl bg-neutral-100" />
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Gift size={26} />
        </div>
        <h2 className="mt-4 text-xl font-bold text-neutral-900">
          Log in to get your referral code
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Every Bogie account gets its own code the moment you sign in.
        </p>
        <Link
          href="/login?redirect=/refer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
        >
          Log in to get your code
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (loadingData) {
    return <div className="h-48 animate-pulse rounded-3xl bg-neutral-100" />;
  }

  if (error && !info) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
        <p className="text-sm font-medium text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => setRetryTick((t) => t + 1)}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Your referral code
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <span className="text-3xl font-extrabold tracking-widest text-neutral-900">
            {info?.referral_code || "—"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => info && copyText(info.referral_code, "code")}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
            >
              {copied === "code" ? <Check size={16} /> : <Copy size={16} />}
              {copied === "code" ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={shareCode}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {copied === "link" ? <Check size={16} /> : <Share2 size={16} />}
              {copied === "link" ? "Link copied" : "Share"}
            </button>
          </div>
        </div>
        {info?.share_link && (
          <a
            href={info.share_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-primary"
          >
            Preview your referral page
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-neutral-100">
          <p className="text-xl font-extrabold text-neutral-900">
            {info?.total_referred ?? 0}
          </p>
          <p className="mt-1 text-xs text-neutral-500">Friends joined</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-neutral-100">
          <p className="text-xl font-extrabold text-neutral-900">
            ₹{Math.round(info?.total_earned ?? 0)}
          </p>
          <p className="mt-1 text-xs text-neutral-500">Earned</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-neutral-100">
          <p className="text-xl font-extrabold text-neutral-900">
            ₹{Math.round(info?.pending_rewards ?? 0)}
          </p>
          <p className="mt-1 text-xs text-neutral-500">Pending</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-neutral-900">My referrals</h3>
        {referrals.length === 0 ? (
          <div className="mt-3 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
            <p className="text-2xl">🎁</p>
            <p className="mt-2 font-semibold text-neutral-900">No referrals yet</p>
            <p className="mt-1 text-sm text-neutral-500">
              Share your code to start earning.
            </p>
          </div>
        ) : (
          <div className="mt-3 divide-y divide-neutral-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100">
            {referrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {r.name}
                    {r.level === 2 ? " (via your friend)" : ""}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Joined {formatDate(r.joined_date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">
                    +₹{Math.round(r.amount)}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      r.status === "credited" ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {STATUS_LABEL[r.status] || r.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
