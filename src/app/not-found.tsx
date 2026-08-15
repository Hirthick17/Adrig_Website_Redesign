import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-[13px] font-bold uppercase tracking-[.2em] text-adrig-blue">404</p>
      <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-adrig-ink">Page not found</h1>
      <Link href="/" className="mt-2 inline-flex items-center gap-2 rounded-full bg-adrig-navy px-6 py-3 text-[14.5px] font-semibold text-white">
        Back to home
      </Link>
    </div>
  );
}
