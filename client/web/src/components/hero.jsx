"use client";

import { useMemo, useState } from "react";
import { Search, ArrowRight, Building2, MapPin, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TenderSearchResults } from "@/components/tender-search-results";
import useGetAuthorities from "@/hooks/use-get-authorities";
import { useFormattedOptions } from "@/hooks/use-formatted-options";
import useGetStates from "@/hooks/use-get-states";
import { parseAsString, useQueryState } from "nuqs";
import { FilterBox } from "./tenders/filter-box";

export function Hero() {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { data: authoritiesData } = useGetAuthorities();
  const formattedAuthorities = useFormattedOptions(authoritiesData);
  const { data: statesData } = useGetStates();
  const formattedStates = useFormattedOptions(statesData);

  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ throttleMs: 500 }),
  );
  const [authorities, setAuthorities] = useQueryState(
    "authorities",
    parseAsString.withDefault(""),
  );
  const [states, setStates] = useQueryState(
    "states",
    parseAsString.withDefault(""),
  );

  const isFilterActive = useMemo(() => {
    return !!searchTerm || !!authorities || !!states;
  }, [searchTerm, authorities, states]);

  const handleSearch = () => {
    // Simulate API call
    if (isFilterActive) {
      setIsSearching(true);
      setIsSearching(false);
      setShowResults(true);
    }
  };

  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
      {/* Hero Background */}
      {/* <div className="absolute inset-0 -z-10" /> */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="space-y-6 md:col-span-5 lg:col-span-4">
              <div className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
                {"India's Leading Tender Search Platform"}
              </div>
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                The Smarter Way to Find & Bid on Tenders
              </h1>
              <p className="text-slate-300">
                Our advanced search platform helps businesses find relevant
                tender opportunities across government and private sectors
                worldwide.
              </p>
            </div>
            <div className="space-y-2 md:col-span-7 lg:col-span-8">
              <div className="col-span-8 rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Search Tenders
                </h2>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by keyword, tender ID or description"
                      className="border-slate-700 bg-white/5 pl-10 text-white placeholder:text-slate-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative">
                      <FilterBox
                        filterKey={"authorities"}
                        options={formattedAuthorities}
                        filterValue={authorities}
                        setFilterValue={setAuthorities}
                        title={"Authorities"}
                      />
                    </div>

                    <div className="relative">
                      <FilterBox
                        filterKey={"states"}
                        options={formattedStates}
                        filterValue={states}
                        setFilterValue={setStates}
                        title={"States"}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? "Searching..." : "Search Tenders"}
                    {!isSearching && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-white">
                  <div className="rounded-full bg-primary/20 p-1.5">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">10,000+ Tenders</span>
                </div>

                <div className="flex items-center gap-2 text-white">
                  <div className="rounded-full bg-primary/20 p-1.5">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">All Industries</span>
                </div>

                <div className="flex items-center gap-2 text-white">
                  <div className="rounded-full bg-primary/20 p-1.5">
                    <Handshake className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Post-Bid Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showResults && (
        <TenderSearchResults onClose={() => setShowResults(false)} />
      )}
    </div>
  );
}
