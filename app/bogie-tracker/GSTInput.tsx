"use client";

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export function isValidGSTIN(value: string): boolean {
  return GSTIN_REGEX.test(value.trim().toUpperCase());
}

export default function GSTInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const trimmed = value.trim();
  const showError = trimmed.length > 0 && !isValidGSTIN(trimmed);

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">GSTIN (optional)</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="22AAAAA0000A1Z5"
        maxLength={15}
        disabled={disabled}
        className={`rounded-xl border px-4 py-2.5 text-sm uppercase outline-none transition-colors disabled:opacity-60 ${
          showError
            ? "border-red-300 focus:border-red-400"
            : "border-neutral-200 focus:border-primary"
        }`}
      />
      {showError && (
        <span className="text-xs font-medium text-red-600">
          Enter a valid 15-character GSTIN, or leave this blank.
        </span>
      )}
      <span className="text-xs text-neutral-500">
        Add your GSTIN to get e-way bill support and a GST-compliant invoice.
      </span>
    </label>
  );
}
