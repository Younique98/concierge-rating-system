'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Explore', href: 'https://www.point.me/explore' },
  { label: 'Search', href: 'https://www.point.me/our-services', icon: '🔒' },
  { label: 'Concierge', href: 'https://www.point.me/our-services#concierge' },
  {
    label: 'Earn points',
    href: 'https://onemileatatime.com/pointme/best-travel-credit-cards/?omaatid=pmnavbar',
    className: 'bg-primary-200 p-1 rounded text-primary-700 font-extrabold',
  },
  { label: 'Pricing', href: 'https://www.point.me/our-services' },
  { label: 'FAQ', href: 'https://www.point.me/faq' },
  { label: 'Blog', href: 'https://www.point.me/c/insights' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold tracking-tight pr-2">
          point<span className="text-primary-600">.</span>me
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map(({ label, href, icon, className }) => (
            <Link
              key={`href-${label}`}
              href={href}
              className={clsx(
                className,
                'text-black-700 font-semibold text hover:text-primary-700 dark:text-gray-300 dark:hover:text-white transition',
              )}
            >
              {label}
              {icon && <span className="ml-1">{icon}</span>}
            </Link>
          ))}
        </nav>

        {/* Sign-Up & Login */}
        <div className="hidden md:flex items-center space-x-4 ">
          <Button className="p-5 bg-primary-600 hover:bg-primary-700" asChild>
            <Link href="/signup" className="bg-primary-600  text-xl ml-3">
              Sign up
            </Link>
          </Button>
          <Link href="/login" className="font-semibold text-lg pr-2">
            Login
          </Link>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              className="md:hidden hover:bg-primary-700"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="mt-4 space-y-3">
              {NAV_ITEMS.map(({ label, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="block p-2 rounded hover:bg-primary-100 dark:hover:bg-primary-700"
                  onClick={() => setOpen(false)}
                >
                  {icon && <span className="mr-1">{icon}</span>}
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full hover:bg-primary-700"
              >
                <Link href="/https://auth.point.me/u/login">Login</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-primary-500 hover:bg-primary-700"
              >
                <Link href="/https://auth.point.me/u/signup">Sign up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
