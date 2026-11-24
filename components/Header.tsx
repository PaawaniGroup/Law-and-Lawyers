"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, reappear on scroll up; paper background after 40px.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (y > lastY.current + 4 && y > 120) setHidden(true);
        else if (y < lastY.current - 4 || y <= 120) setHidden(false);
        lastY.current = y;
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Menu: lock scroll, make the page inert, move focus in.
  useEffect(() => {
    if (!menuOpen) return;
    const shell = document.getElementById("site-shell-body");
    shell?.setAttribute("inert", "");
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      shell?.removeAttribute("inert");
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key !== "Tab" || !overlayRef.current) return;
    const items = overlayRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const { contact } = site;

  return (
    <>
      <header
        className="site-header"
        data-scrolled={scrolled}
        data-hidden={hidden && !menuOpen}
        onFocusCapture={() => setHidden(false)}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="wordmark" aria-label={`${site.name}, ${site.descriptor}. Home`}>
            <span className="wordmark-name">{site.name}</span>
            <span className="wordmark-sub">{site.descriptor.replace("and", "&")}</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-8">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="nav-link"
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={contact.phoneHref} className="link tnum hidden text-[0.9375rem] xl:inline-block">
              {contact.phoneDisplay}
            </a>
            <Link href="/contact" className="btn btn-outline">
              <span className="btn-label">{site.cta.enquiry}</span>
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="label flex min-h-[44px] items-center gap-3 border border-ink px-4 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
            <span aria-hidden="true" className="block h-[7px] w-5 border-y border-current" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          onKeyDown={onMenuKeyDown}
        >
          <div className="wrap flex h-[76px] shrink-0 items-center justify-between">
            <span className="wordmark">
              <span className="wordmark-name">{site.name}</span>
              <span className="wordmark-sub" style={{ color: "inherit", opacity: 0.85 }}>
                {site.descriptor.replace("and", "&")}
              </span>
            </span>
            <button
              ref={closeRef}
              type="button"
              className="label flex min-h-[44px] items-center gap-3 border border-current px-4"
              onClick={closeMenu}
            >
              Close
              <span aria-hidden="true" className="relative block h-3 w-3">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile" className="wrap mt-6 flex-1">
            <ol className="border-t border-[color-mix(in_srgb,var(--paper)_28%,transparent)]">
              {site.nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="menu-link"
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  >
                    <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="wrap shrink-0 pb-10 pt-12">
            <address className="not-italic text-[0.9375rem] leading-relaxed opacity-95">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a href={contact.phoneHref} className="link tnum mt-4 text-lg" style={{ color: "inherit" }}>
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
