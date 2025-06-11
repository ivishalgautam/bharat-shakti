"use client";

import Link from "next/link";
import React from "react";
import { companyDetails } from "@/data/constants";
import { Mail, MapPin, Phone } from "lucide-react";
import LogoWhite from "./logo-white";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-200">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <LogoWhite />
            <p className="text-sm text-slate-400">
              Your trusted partner for finding and winning tender opportunities
              across the country.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tenders"
                  className="text-slate-400 hover:text-white"
                >
                  Tenders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-400 hover:text-white"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* policies */}
          <div className="space-y-4">
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

          {/* <div className="space-y-4">
            <h3 className="text-lg font-medium">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Tender Alerts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Bid Preparation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Document Verification
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Competitor Analysis
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Legal Consultation
                </Link>
              </li>
            </ul>
          </div> */}

          <div className="space-y-4">
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
