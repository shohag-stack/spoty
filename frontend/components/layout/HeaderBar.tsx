"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/(core)/lib/utils";
import type { LinkData, MenuColor } from "@/types";

type Props = {
  siteName: string;
  links: (LinkData & { _key: string })[];
  button?: LinkData;
  menuColor: MenuColor;
};

export function HeaderBar({ siteName, links, button, menuColor }: Props) {
  const pathname = usePathname();
  // The menu remembers the path it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide after the first screen while scrolling down; any scroll up brings it back
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Once scrolled, the bar gets a light background, so text turns dark
  const light = menuColor === "light" && !scrolled;

  const isActive = (href?: string) => {
    if (!href) return false;
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,translate] duration-500 ease-out-expo",
        hidden && !open && "-translate-y-full",
        scrolled && "bg-canvas/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-site items-center justify-between px-4 transition-[height] duration-500 md:px-8 lg:px-13",
          scrolled ? "h-18" : "h-header",
          light ? "text-white" : "text-ink"
        )}
      >
        <Link href="/" className="text-3xl font-medium">
          {siteName}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-10">
            {links.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.href ?? "/"}
                  className={cn(
                    "relative text-base font-medium transition-opacity hover:opacity-70",
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-current after:transition-[width] after:duration-300",
                    isActive(link.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button link={button} variant={light ? "outline-light" : "outline-dark"} size="nav" />
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink px-4 pb-10 text-white transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        data-lenis-prevent
      >
        <div className="flex h-header items-center justify-between">
          <Link href="/" className="text-3xl">
            {siteName}
          </Link>
          <button type="button" className="-mr-2 p-2" onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-10 flex flex-1 flex-col">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li
                key={link._key}
                className={cn("transition-[opacity,transform] duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              >
                <Link href={link.href ?? "/"} className="block py-2 text-5xl">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Button link={button} variant="white" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
