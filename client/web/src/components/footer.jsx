"use client";

import { companyDetails } from "@/data/constants";
import {
  RiFacebookBoxFill,
  RiLinkedinBoxFill,
  RiTwitterXLine,
} from "@remixicon/react";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { navItems } from "./header";
import LogoWhite from "./logo-white";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-200">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="min-h-[120px]">
            <LogoWhite />
            <p className="text-sm text-slate-400">
              Your trusted partner for finding and winning tender opportunities
              across the country.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <RiFacebookBoxFill className="size-6" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <RiTwitterXLine className="size-6" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <RiLinkedinBoxFill className="size-6" />
              </Link>
            </div>
          </div>

          {/* quick links */}
          <div className="min-h-[120px] space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((nav, ind) => (
                <li key={ind}>
                  <Link
                    href={nav.href}
                    className="text-slate-400 hover:text-white"
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* policies */}
          <div className="min-h-[120px] space-y-4">
            <h3 className="text-lg font-medium">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-slate-400 hover:text-white"
                >
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/return-refund-policy"
                  className="text-slate-400 hover:text-white"
                >
                  Return and refund
                </Link>
              </li>
            </ul>
          </div>

          {/* address */}
          <div className="min-h-[120px] space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start justify-start gap-1">
                <Phone className="shrink-0" size={20} />
                <span className="text-slate-400">{companyDetails.contact}</span>
              </li>
              <li className="flex items-start justify-start gap-1">
                <Mail className="shrink-0" size={20} />
                <span className="text-slate-400">{companyDetails.mail}</span>
              </li>
              <li className="flex items-start justify-start gap-1">
                <MapPin className="shrink-0" size={20} />
                <span className="text-slate-400">{companyDetails.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} Bharat Shakti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
