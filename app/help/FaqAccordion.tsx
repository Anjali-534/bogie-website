"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqSection } from "./data";

export default function FaqAccordion({ data }: { data: FaqSection[] }) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-10">
      {data.map((section) => (
        <div key={section.section}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            {section.section}
          </h2>
          <div className="mt-4 divide-y divide-neutral-100 overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-100">
            {section.items.map((item, i) => {
              const key = `${section.section}-${i}`;
              const isOpen = openKeys.has(key);
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-neutral-900">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 text-neutral-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
