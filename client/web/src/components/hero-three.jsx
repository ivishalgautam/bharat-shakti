"use client";

import { useState } from "react";
import {
  Search,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TenderSearchResults } from "@/components/tender-search-results";

export default function HeroThree() {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="relative overflow-hidden rounded-xl">
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 -z-10 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="space-y-6 md:col-span-5 lg:col-span-4">
            <div className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
              Tender Search Platform
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              The Smarter Way to Find & Bid on Tenders
            </h1>
            <p className="text-slate-300">
              Our advanced search platform helps businesses find relevant tender
              opportunities across government and private sectors worldwide.
            </p>

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
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Global Coverage</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="mb-6 grid grid-cols-4">
                  <TabsTrigger value="all">All Tenders</TabsTrigger>
                  <TabsTrigger value="government">Government</TabsTrigger>
                  <TabsTrigger value="private">Private</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="Search by keyword, tender ID, or description"
                        className="border-slate-700 bg-white/5 py-6 pl-10 text-white placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Category
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Categories</option>
                          <option value="construction">Construction</option>
                          <option value="it">IT & Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Location
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Locations</option>
                          <option value="national">National</option>
                          <option value="international">International</option>
                          <option value="local">Local</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Deadline
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">Any Deadline</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="quarter">This Quarter</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                      <div className="flex items-center gap-2 text-white">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Updated Daily</span>
                      </div>

                      <div className="flex items-center gap-2 text-white">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">All Budget Sizes</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? "Searching..." : "Search Tenders"}
                      {!isSearching && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="government" className="mt-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="Search government tenders"
                        className="border-slate-700 bg-white/5 py-6 pl-10 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Department
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Departments</option>
                          <option value="defense">Defense</option>
                          <option value="health">Health</option>
                          <option value="education">Education</option>
                          <option value="transport">Transport</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">Level</label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Levels</option>
                          <option value="federal">Federal</option>
                          <option value="state">State/Provincial</option>
                          <option value="local">Local</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">Value</label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">Any Value</option>
                          <option value="small">Small (&lt;$100k)</option>
                          <option value="medium">Medium ($100k-$1M)</option>
                          <option value="large">{"Large (>$1M)"}</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Search Governmentnt Tenders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="private" className="mt-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="Search private sector tenders"
                        className="border-slate-700 bg-white/5 py-6 pl-10 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Industry
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Industries</option>
                          <option value="tech">Technology</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="energy">Energy</option>
                          <option value="retail">Retail</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Company Size
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">Any Size</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Project Type
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Types</option>
                          <option value="services">Services</option>
                          <option value="goods">Goods</option>
                          <option value="works">Works</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Search Private Tenders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="international" className="mt-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="Search international tenders"
                        className="border-slate-700 bg-white/5 py-6 pl-10 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">Region</label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Regions</option>
                          <option value="europe">Europe</option>
                          <option value="asia">Asia</option>
                          <option value="americas">Americas</option>
                          <option value="africa">Africa</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Funding Source
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Sources</option>
                          <option value="wb">World Bank</option>
                          <option value="un">United Nations</option>
                          <option value="adb">Asian Development Bank</option>
                          <option value="eu">European Union</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-slate-300">
                          Language
                        </label>
                        <select className="w-full rounded-md border-slate-700 bg-white/5 px-3 py-2 text-white">
                          <option value="">All Languages</option>
                          <option value="english">English</option>
                          <option value="french">French</option>
                          <option value="spanish">Spanish</option>
                          <option value="arabic">Arabic</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Search International Tenders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
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
