"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { IconStar } from "@tabler/icons-react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NavbarProps {}

const navLinks = [
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Accommodations", href: "/accommodations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
];

const Stars = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-1 text-ivory/60", className)}>
    <IconStar size={18} />
    <IconStar size={18} />
    <IconStar size={18} />
    <IconStar size={18} />
  </div>
);

const Navbar: FC<NavbarProps> = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top strip */}
      <div className="bg-forest/95 supports-backdrop-filter:bg-forest/80 backdrop-blur border-b border-ivory/10">
        <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 flex items-center justify-center gap-4 md:gap-8">
          {/* Left */}
          <div className="hidden sm:flex items-center gap-3 text-ivory/60">
            <span className="text-sm tracking-wider">2010</span>
            {/* <Separator orientation="vertical" className="h-5 bg-ivory/15" />
            <span className="text-xs tracking-[0.22em] uppercase">
              Coastal Retreat
            </span> */}
          </div>

          {/* Center */}
          <div className="flex-1 sm:flex-none md:text-center">
            <div className="text-ivory font-sans tracking-[0.18em] text-xl sm:text-2xl">
              SILVER WAVES
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 ">
              <Stars />
            </div>

            {/* Mobile menu (ShadCN Sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden border-ivory/20 bg-ivory/5 hover:bg-ivory/10 text-ivory">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-[86%] max-w-sm bg-forest text-ivory border-l border-ivory/10 p-0">
                <SheetHeader className="h-16 px-4 flex-row items-center justify-between border-b border-ivory/10">
                  <SheetTitle className="text-ivory font-sans tracking-[0.18em]">
                    SILVER WAVES
                  </SheetTitle>

                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-ivory/20 bg-ivory/5 hover:bg-ivory/10 text-ivory">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </SheetHeader>

                <div className="px-4 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <Stars />
                    <span className="text-ivory/60 text-xs tracking-wider">
                      EST. 2010
                    </span>
                  </div>

                  <Separator className="bg-ivory/10 mb-4" />

                  <nav className="grid gap-2">
                    {navLinks.map((l) => (
                      <SheetClose asChild key={l.href}>
                        <Link
                          href={l.href}
                          className="rounded-xl px-4 py-3 border border-ivory/15 bg-ivory/5 hover:bg-ivory/10 transition uppercase tracking-wider text-sm">
                          {l.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="mt-6">
                    <Separator className="bg-ivory/10 mb-4" />
                    <div className="text-xs text-ivory/60 leading-relaxed">
                      {mounted ? (
                        <>
                          Tap a section to jump. You can also add{" "}
                          <span className="text-ivory/80">Book Now</span> here
                          as a primary CTA.
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop category bar */}
      <nav className="hidden md:block bg-moss/80 supports-backdrop-filter:bg-moss/70 backdrop-blur border-y border-ivory">
        <div className="mx-auto max-w-7xl h-10 px-6 flex items-center justify-center gap-10 lg:gap-16 text-ivory font-sans text-xs lg:text-sm tracking-wider">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="uppercase hover:text-ivory/80 transition">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Spacer so page content doesn't hide under fixed header */}
      <div className="h-16 md:h-26" />
    </header>
  );
};

export default Navbar;
