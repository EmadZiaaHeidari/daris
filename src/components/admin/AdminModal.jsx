"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function AdminModal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-600 bg-white p-4 shadow-xl">
        <div className="mb-2 flex items-center justify-between border-b border-slate-600 pb-2">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            className="rounded-lg p-1 hover:bg-slate-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-slate-900" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-1 py-1 text-sm text-slate-900">{children}</div>
        {footer && <div className="mt-3 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
