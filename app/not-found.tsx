import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-black text-blue-500 font-mono tracking-wider">404</h1>
        <h2 className="text-2xl font-bold tracking-tight">Security Node Off-grid</h2>
        <p className="text-slate-400 text-sm">
          The requested analytical resource or endpoint does not exist. Redirecting traffic to the centralized perimeter matrix.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-blue-500/10 cursor-pointer"
        >
          Return to Command Matrix
        </Link>
      </div>
    </div>
  );
}
