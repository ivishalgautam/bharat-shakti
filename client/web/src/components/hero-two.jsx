"use client";

import { useState } from "react";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TenderSearchResults } from "@/components/tender-search-results";

export function HeroTwo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-primary to-secondary">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 to-slate-100" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Find the Right Tenders for Your Business
          </h1>
          <p className="text-lg text-white">
            Access thousands of public and private tenders from around the
            world. Filter by category, location, and budget to find the perfect
            opportunities.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-xl bg-white p-4 shadow-lg md:p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search tenders by keyword or ID"
                className="py-6 pl-10 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Tenders</SheetTitle>
                  <SheetDescription>
                    Narrow down your search with specific criteria
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction">
                          Construction
                        </SelectItem>
                        <SelectItem value="it">IT & Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">
                          International
                        </SelectItem>
                        <SelectItem value="local">Local Government</SelectItem>
                        <SelectItem value="state">State/Province</SelectItem>
                        <SelectItem value="federal">Federal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget Range</label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under50k">Under $50,000</SelectItem>
                        <SelectItem value="50k-200k">
                          $50,000 - $200,000
                        </SelectItem>
                        <SelectItem value="200k-1m">
                          $200,000 - $1 Million
                        </SelectItem>
                        <SelectItem value="over1m">Over $1 Million</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button
              size="lg"
              onClick={handleSearch}
              disabled={isSearching}
              className="gap-2"
            >
              {isSearching ? "Searching..." : "Search"}
              {!isSearching && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Find Opportunities</h3>
            <p className="text-slate-600">
              Search through thousands of tenders from government and private
              sectors.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Filter Results</h3>
            <p className="text-slate-600">
              Narrow down your search with powerful filtering options to find
              relevant tenders.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Apply Now</h3>
            <p className="text-slate-600">
              Submit your bids directly through our platform and track your
              applications.
            </p>
          </div>
        </div>
      </div>

      {showResults && (
        <TenderSearchResults onClose={() => setShowResults(false)} />
      )}
    </div>
  );
}
