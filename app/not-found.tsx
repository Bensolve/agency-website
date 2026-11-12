import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-xl mt-4">Page not found.</h1>
      <p className="mt-6 text-ink-soft">
        The page you're looking for doesn't exist, or it may have moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-ink px-7 text-paper transition-colors hover:bg-accent"
      >
        Back to home
      </Link>
    </div>
  );
}