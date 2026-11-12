"use client";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="container-page py-32 text-center">
      <p className="eyebrow">Something broke</p>
      <h1 className="display-xl mt-4">An unexpected error occurred.</h1>
      <p className="mt-6 text-ink-soft">
        The page failed to load. You can try again, or head back home.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => retry()}
          className="inline-flex h-14 items-center justify-center rounded-full bg-ink px-7 text-paper transition-colors hover:bg-accent"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex h-14 items-center justify-center rounded-full border border-ink/20 px-7 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}