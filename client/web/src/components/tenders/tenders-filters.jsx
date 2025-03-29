"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockTenders } from "@/lib/mock-data";
import useGetAuthorities from "@/hooks/use-get-authorities";
import { useFormattedOptions } from "@/hooks/use-formatted-options";
import useGetKeywords from "@/hooks/use-get-keywords";
import useGetStates from "@/hooks/use-get-states";
import useGetCities from "@/hooks/use-get-cities";
import useGetSectors from "@/hooks/use-get-sectors";
import { parseAsString, useQueryState } from "nuqs";
import { FilterBox } from "./filter-box";
import { DatePickerWithRange } from "./date-range-selector";

export default function TendersFilters({ setFilteredTenders }) {
  const { data: authoritiesData } = useGetAuthorities();
  const formattedAuthorities = useFormattedOptions(authoritiesData);

  const { data: keywordsData } = useGetKeywords();
  const formattedKeywords = useFormattedOptions(keywordsData);

  const { data: statesData } = useGetStates();
  const formattedStates = useFormattedOptions(statesData);

  const { data: citiesData } = useGetCities();
  const formattedCities = useFormattedOptions(citiesData);

  const { data: sectorsData } = useGetSectors();
  const formattedSectors = useFormattedOptions(sectorsData);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const [authorities, setAuthorities] = useQueryState(
    "authorities",
    parseAsString.withDefault(""),
  );
  const [keywords, setKeywords] = useQueryState(
    "keywords",
    parseAsString.withDefault(""),
  );
  const [sectors, setSectors] = useQueryState(
    "sectors",
    parseAsString.withDefault(""),
  );
  const [states, setStates] = useQueryState(
    "states",
    parseAsString.withDefault(""),
  );
  const [cities, setCities] = useQueryState(
    "cities",
    parseAsString.withDefault(""),
  );
  const [dateFrom, setDateFrom] = useQueryState(
    "start_date",
    parseAsString.withDefault(""),
  );
  const [dateTo, setDateTo] = useQueryState(
    "end_date",
    parseAsString.withDefault(""),
  );
  const [amountMin, setAmountMin] = useQueryState(
    "amount_min",
    parseAsString.withDefault(""),
  );
  const [amountMax, setAmountMax] = useQueryState(
    "amount_max",
    parseAsString.withDefault(""),
  );

  const isAnyFilterActive = useMemo(() => {
    return (
      !!searchTerm ||
      !!authorities ||
      !!keywords ||
      !!sectors ||
      !!states ||
      !!cities ||
      !!dateFrom ||
      !!dateTo ||
      !!amountMin ||
      !!amountMax
    );
  }, [
    searchTerm,
    authorities,
    keywords,
    sectors,
    states,
    cities,
    dateFrom,
    dateTo,
    amountMin,
    amountMax,
  ]);

  const itemsPerPage = 5;

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setAuthorities("");
    setSectors("");
    setKeywords("");
    setStates("");
    setCities("");
    setDateFrom("");
    setDateTo("");
    setAmountMin("");
    setAmountMax("");
  };
  console.log({ isAnyFilterActive });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filter Tenders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* search */}
          <div className="col-span-full space-y-2">
            {/* <label htmlFor="search" className="text-sm font-medium">
              Search
            </label> */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or bid number"
                className="rounded-full bg-gray-100 p-6 pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* authorities */}
          <div className="space-y-2">
            {/* <label htmlFor="authorities" className="text-sm font-medium">
              Authorities
            </label> */}
            <div>
              <FilterBox
                filterKey={"authorities"}
                options={formattedAuthorities}
                filterValue={authorities}
                setFilterValue={setAuthorities}
                title={"Authorities"}
              />
            </div>
          </div>

          {/* sectors */}
          <div className="space-y-2">
            {/* <label htmlFor="sectors" className="text-sm font-medium">
              Sectors
            </label> */}
            <div>
              <FilterBox
                filterKey={"sectors"}
                options={formattedSectors}
                filterValue={sectors}
                setFilterValue={setSectors}
                title={"Sectors"}
              />
            </div>
          </div>

          {/* keyword */}
          <div className="space-y-2">
            {/* <label htmlFor="keywords" className="text-sm font-medium">
              Keyword
            </label> */}
            <div>
              <FilterBox
                filterKey={"keywords"}
                options={formattedKeywords}
                filterValue={keywords}
                setFilterValue={setKeywords}
                title={"Keywords"}
              />
            </div>
          </div>

          {/* states */}
          <div className="space-y-2">
            {/* <label htmlFor="states" className="text-sm font-medium">
              States
            </label> */}
            <div>
              <FilterBox
                filterKey={"states"}
                options={formattedStates}
                filterValue={states}
                setFilterValue={setStates}
                title={"States"}
              />
            </div>
          </div>

          {/* cities */}
          <div className="space-y-2">
            {/* <label htmlFor="cities" className="text-sm font-medium">
              Cities
            </label> */}
            <div>
              <FilterBox
                filterKey={"cities"}
                options={formattedCities}
                filterValue={cities}
                setFilterValue={setCities}
                title={"Cities"}
              />
            </div>
          </div>

          {/* tender range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tender Value Range</label>
            <div className="flex space-x-2">
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={amountMin}
                  onChange={(e) => setAmountMin(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={amountMax}
                  onChange={(e) => setAmountMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* tander date range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bid End Date Range</label>
            <div className="flex space-x-2">
              <DatePickerWithRange
                startDate={dateFrom}
                setStartDate={setDateFrom}
                endDate={dateTo}
                setEndDate={setDateTo}
              />
            </div>
          </div>

          {isAnyFilterActive && (
            <div className="flex items-end">
              <Button variant="destructive" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
