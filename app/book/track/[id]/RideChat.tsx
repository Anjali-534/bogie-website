"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { getRideMessages, sendRideMessage, type RideMessage } from "../../../lib/api";

const POLL_MS = 4000;
// Same three canned messages as the mobile app's tracking/chat.tsx.
const QUICK_REPLIES = ["I'm waiting outside", "Please call me", "On my way down"];

function timeStr(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RideChat({ bookingId }: { bookingId: string }) {
  const [messages, setMessages] = useState<RideMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem("access_token");
    if (!token) return;

    async function fetchMessages() {
      try {
        const msgs = await getRideMessages(token as string, bookingId);
        if (cancelled) return;
        setMessages(msgs);
      } catch {
        // Polling — a transient failure just tries again next tick.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMessages();
    pollRef.current = setInterval(fetchMessages, POLL_MS);

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [bookingId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const token = localStorage.getItem("access_token");
    if (!token) return;
    setInput("");
    setSending(true);
    try {
      await sendRideMessage(token, bookingId, trimmed);
      setMessages(await getRideMessages(token, bookingId));
    } catch {
      // Leave the input cleared but silently fail — this is a lightweight
      // ride-chat, not a critical path; the next poll will resync state.
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
      <div
        ref={scrollRef}
        className="flex max-h-72 min-h-[140px] flex-col gap-3 overflow-y-auto p-4"
      >
        {loading ? (
          <div className="flex flex-1 items-center justify-center py-6">
            <Loader2 size={18} className="animate-spin text-neutral-400" />
          </div>
        ) : messages.length === 0 ? (
          <p className="my-auto text-center text-xs text-neutral-400">
            Send a message to your driver.
          </p>
        ) : (
          messages.map((m) => {
            const isMine = m.sender_type === "rider";
            return (
              <div
                key={m.id}
                className={`flex max-w-[80%] flex-col ${isMine ? "ml-auto items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    isMine
                      ? "rounded-br-md bg-primary text-white"
                      : "rounded-bl-md bg-white text-neutral-800 ring-1 ring-neutral-100"
                  }`}
                >
                  {m.message}
                </div>
                <span className="mt-1 px-1 text-[11px] text-neutral-400">
                  {timeStr(m.created_at)}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-neutral-100 bg-white pt-2.5">
        <div
          role="group"
          aria-label="Quick replies"
          className="flex gap-2 overflow-x-auto px-3 pb-2.5"
        >
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSend(q)}
              disabled={sending}
              className="shrink-0 whitespace-nowrap rounded-full border border-primary-light bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-dark transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2 px-3 pb-3"
        >
          <label htmlFor="ride-chat-input" className="sr-only">
            Message your driver
          </label>
          <input
            id="ride-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            maxLength={500}
            className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            aria-label="Send message"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
