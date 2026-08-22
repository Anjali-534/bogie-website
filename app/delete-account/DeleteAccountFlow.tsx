"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { deleteRiderAccount } from "../lib/api";

const CONFIRM_PHRASE = "DELETE";

type Status = "idle" | "confirming" | "deleting" | "error" | "done";

export default function DeleteAccountFlow() {
  const router = useRouter();
  const { user, isLoading, logout, getToken } = useAuth();

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [confirmText, setConfirmText] = useState("");

  if (isLoading) {
    return (
      <p className="text-sm text-neutral-500">Checking your session...</p>
    );
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <CheckCircle2 size={32} className="text-emerald-600" />
        <p className="text-sm font-semibold text-neutral-900">
          Your account has been deleted.
        </p>
        <p className="text-sm text-neutral-600">Redirecting you home...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <p className="text-sm text-neutral-600">
          Log in to your Bogie account to request deletion.
        </p>
        <Link
          href="/login?redirect=/delete-account"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
        >
          Log In to Continue
        </Link>
      </div>
    );
  }

  async function handleDelete() {
    const token = getToken();
    if (!token) {
      setError("Your session has expired. Please log in again.");
      setStatus("error");
      return;
    }

    setStatus("deleting");
    setError("");
    try {
      await deleteRiderAccount(token);
      logout();
      setStatus("done");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't delete your account. Please try again."
      );
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-neutral-600">
        Logged in as <span className="font-semibold text-neutral-900">{user.email}</span>
      </p>

      {status === "idle" ? (
        <button
          type="button"
          onClick={() => setStatus("confirming")}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Trash2 size={16} />
          Delete My Account
        </button>
      ) : (
        <div className="flex flex-col gap-3 rounded-2xl bg-red-50 p-5 ring-1 ring-red-100">
          <p className="text-sm font-semibold text-red-800">
            This cannot be undone. Type{" "}
            <span className="font-mono">{CONFIRM_PHRASE}</span> to confirm.
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            disabled={status === "deleting"}
            className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-red-500 disabled:opacity-60"
          />

          {status === "error" && (
            <p className="text-sm font-medium text-red-700">{error}</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={confirmText !== CONFIRM_PHRASE || status === "deleting"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {status === "deleting" ? (
                <>
                  Deleting...
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                "Permanently Delete My Account"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setConfirmText("");
                setError("");
              }}
              disabled={status === "deleting"}
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-7 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-300 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
