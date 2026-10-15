import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader menuColor="dark" />
      <main className="mx-auto flex min-h-[70svh] max-w-site flex-col items-start justify-end px-4 pt-40 md:px-8 lg:px-13">
        <p className="text-subtle">404</p>
        <h1 className="mt-2 text-5xl md:text-display">Out of bounds.</h1>
        <p className="mt-4 max-w-md text-lg text-muted">This page doesn&apos;t exist, or it has moved.</p>
        <Button link={{ label: "Back to home", href: "/" }} className="mt-8" />
      </main>
    </>
  );
}
