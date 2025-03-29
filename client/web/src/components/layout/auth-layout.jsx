// pages/auth.js
"use client";
import Image from "next/image";
import Logo from "@/components/logo";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Image Section */}
        <div className="hidden flex-col items-center justify-center bg-blue-600 p-12 text-white lg:flex lg:w-1/2">
          <div className="max-w-md">
            <Image
              src="/login.svg"
              alt="Tender bidding process"
              width={200}
              height={200}
              className="mb-8"
            />
            <h2 className="mb-4 text-3xl font-bold">
              Streamline Your Bidding Process
            </h2>
            <p className="mb-6 text-lg">
              Access thousands of tender opportunities and manage your bids
              efficiently on our secure platform.
            </p>
            <div className="mb-8 flex space-x-4">
              <div className="flex-1 rounded-lg bg-blue-500 p-4">
                <h3 className="mb-2 font-bold">10,000+</h3>
                <p className="text-sm">Active Tenders</p>
              </div>
              <div className="flex-1 rounded-lg bg-blue-500 p-4">
                <h3 className="mb-2 font-bold">5,000+</h3>
                <p className="text-sm">Companies</p>
              </div>
              <div className="flex-1 rounded-lg bg-blue-500 p-4">
                <h3 className="mb-2 font-bold">98%</h3>
                <p className="text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          <div className="w-full max-w-md space-y-8">
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
