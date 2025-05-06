"use client";

import { useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useGetAuthorities from "@/hooks/use-get-authorities";
import { useFormattedOptions } from "@/hooks/use-formatted-options";
import useGetStates from "@/hooks/use-get-states";
import useGetCities from "@/hooks/use-get-cities";
import useGetSectors from "@/hooks/use-get-sectors";
import { parseAsString, useQueryState } from "nuqs";
import { FilterBox } from "./filter-box";
import { DatePickerWithRange } from "./date-range-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetIndustries from "@/hooks/use-get-industries";
import { useAuth } from "@/providers/auth-provider";

export default function TendersFilters() {
  const { data: authoritiesData } = useGetAuthorities();
  const formattedAuthorities = useFormattedOptions(authoritiesData);

  const { data: industriesData } = useGetIndustries();
  const formattedKeywords = useFormattedOptions(industriesData);

  const { data: statesData } = useGetStates();
  const formattedStates = useFormattedOptions(statesData);

  const { data: citiesData } = useGetCities();
  const formattedCities = useFormattedOptions(citiesData);

  const { data: sectorsData } = useGetSectors();
  const formattedSectors = useFormattedOptions(sectorsData);

  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const [authorities, setAuthorities] = useQueryState(
    "authorities",
    parseAsString.withDefault(""),
  );
  const [industries, setIndustries] = useQueryState(
    "industries",
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
      !!industries ||
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
    industries,
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
    setIndustries("");
    setStates("");
    setCities("");
    setDateFrom("");
    setDateTo("");
    setAmountMin("");
    setAmountMax("");
  };

  const { user } = useAuth();
  console.log({ user });
  console.log(user?.plan_tier);
  return (
    user && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Tenders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {/* search */}
            <div className="col-span-full space-y-2">
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
            {["premium", "standard"].includes(user.plan_tier) && (
              <div className="space-y-2">
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
            )}

            {/* sectors */}
            {["premium", "standard"].includes(user.plan_tier) && (
              <div className="space-y-2">
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
            )}

            {/* keyword */}
            {["premium", "standard"].includes(user.plan_tier) && (
              <div className="space-y-2">
                <div>
                  <FilterBox
                    filterKey={"industries"}
                    options={formattedKeywords}
                    filterValue={industries}
                    setFilterValue={setIndustries}
                    title={"Industries"}
                  />
                </div>
              </div>
            )}

            {/* states */}
            {["premium", "standard"].includes(user.plan_tier) && (
              <div className="space-y-2">
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
            )}

            {/* cities */}
            {["premium"].includes(user.plan_tier) && (
              <div className="space-y-2">
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
            )}

            {/* tender range */}
            {["premium"].includes(user.plan_tier) && (
              <div className="col-span-full flex flex-wrap items-center justify-start gap-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tender Value Range
                  </label>
                  <div className="flex space-x-2">
                    <Select
                      onValueChange={(value) => setAmountMin(value)}
                      value={amountMin}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select minimum amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1000">1 thousand</SelectItem>
                        <SelectItem value="50000">50 thousand</SelectItem>
                        <SelectItem value="100000">1 Lac</SelectItem>
                        <SelectItem value="500000">5 Lac</SelectItem>
                        <SelectItem value="1000000">10 Lac</SelectItem>
                        <SelectItem value="2000000">20 Lac</SelectItem>
                        <SelectItem value="2500000">25 Lac</SelectItem>
                        <SelectItem value="5000000">50 Lac</SelectItem>
                        <SelectItem value="10000000">1 Crore</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) => setAmountMax(value)}
                      value={amountMax}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select maximum amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500000">5 Lac</SelectItem>
                        <SelectItem value="1000000">10 Lac</SelectItem>
                        <SelectItem value="5000000">50 Lac</SelectItem>
                        <SelectItem value="10000000">1 Crore</SelectItem>
                        <SelectItem value="20000000">2 Crore</SelectItem>
                        <SelectItem value="50000000">5 Crore</SelectItem>
                        <SelectItem value="100000000">10 Crore</SelectItem>
                        <SelectItem value="200000000">20 Crore</SelectItem>
                        <SelectItem value="250000000">25 Crore</SelectItem>
                        <SelectItem value="500000000">50 Crore</SelectItem>
                        <SelectItem value="1000000000">100 Crore</SelectItem>
                        <SelectItem value="5000000000">500 Crore</SelectItem>
                        <SelectItem value="10000000000">1000 Crore</SelectItem>
                        <SelectItem value="100000000000">
                          10000 Crore
                        </SelectItem>
                        <SelectItem value="1000000000000">
                          100000 Crore
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* tander date range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Bid End Date Range
                  </label>
                  <div className="flex space-x-2">
                    <DatePickerWithRange
                      startDate={dateFrom}
                      setStartDate={setDateFrom}
                      endDate={dateTo}
                      setEndDate={setDateTo}
                    />
                  </div>
                </div>
              </div>
            )}

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
    )
  );
}
