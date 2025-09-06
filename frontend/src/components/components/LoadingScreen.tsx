import { Loader2 } from "lucide-react";

/**
 * Full-screen loading overlay (modern look)
 * - White background, black spinner
 * - Minimal, clean typography
 * - Uses Tailwind only (no heavy libraries)
 *
 * Props:
 *  - show?: boolean (default true)
 *  - message?: string (default "Loading…")
 *  - blur?: boolean (default false) to toggle backdrop blur
 */

export default function LoadingScreen({
  message = "Loading…",
}: {
  message?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`fixed inset-0 z-50 grid place-items-center bg-white transition-opacity duration-300 `}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <Loader2 className="h-20 w-20 animate-spin text-black" />
        <p className="text-base font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
