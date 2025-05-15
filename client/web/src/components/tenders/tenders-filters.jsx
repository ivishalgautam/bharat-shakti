"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Filter, X, Bell } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import preference from "@/services/preference";
import useGetSubcategories from "@/hooks/use-get-subcategories";
import useGetCategories from "@/hooks/use-get-categories";
import { Small } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { formatNumber } from "@/lib/format-number";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Preferences from "../preferences";

export default function TendersFilters() {
  const { user, isUserLoading } = useAuth();
  const [preferenceId, setPreferenceId] = useState("");
  const [isApplyFilter, setIsApplyFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveFilter, setIsSaveFilter] = useState(false);

  const { data: categoriesData } = useGetCategories();
  const formattedCategories = useFormattedOptions(categoriesData);

  const { data: subcategoriesData } = useGetSubcategories();
  const formattedSubcategories = useFormattedOptions(subcategoriesData);

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

  const { data, isError, error, isLoading, isFetched } = useQuery({
    queryKey: ["preferences", preferenceId],
    queryFn: () => preference.getById(preferenceId),
    enabled: !!user && !!preferenceId && isApplyFilter,
  });

  useEffect(() => {
    if (isFetched) {
      setIsOpen(false);
    }
  }, [isFetched]);

  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsString.withDefault(""),
  );
  const [subcategories, setSubcategories] = useQueryState(
    "subcategories",
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
      !!categories ||
      !!subcategories ||
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
    categories,
    subcategories,
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

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategories("");
    setSubcategories("");
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

  useEffect(() => {
    if (data) {
      data?.authority_ids && setAuthorities(data.authority_ids.join("."));
      data?.city_ids && setCities(data.city_ids.join("."));
      data?.industry_ids && setIndustries(data.industry_ids.join("."));
      data?.sector_ids && setSectors(data.sector_ids.join("."));
      data?.state_ids && setStates(data.state_ids.join("."));
      data?.subcategory_ids && setSubcategories(data.subcategory_ids.join("."));
      data?.category_ids && setCategories(data.category_ids.join("."));
    }
  }, [data]);

  const getSelectedOptions = (value, options) => {
    if (!value) return [];
    const values = value.split(".");
    return options.filter((opt) => values.includes(opt.value));
  };
  console.log({ isSaveFilter });
  // if (isUserLoading) return <Skeleton className={"h-52 w-full bg-gray-300"} />;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Tenders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
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

            {(!user || ["premium", "standard"].includes(user.plan_tier)) && (
              <div className="col-span-full flex items-center justify-start gap-2">
                <SavedPreferences
                  {...{
                    isOpen,
                    setIsOpen,
                    setPreferenceId,
                    preferenceId,
                    isApplyFilter,
                    setIsApplyFilter,
                    isSaveFilter,
                    setIsSaveFilter,
                    categories,
                    subcategories,
                    authorities,
                    industries,
                    sectors,
                    states,
                    cities,
                    dateFrom,
                    dateTo,
                    amountMin,
                    amountMax,
                  }}
                />

                {isAnyFilterActive && (
                  <Button
                    type="button"
                    onClick={() => {
                      setIsSaveFilter(true);
                      setIsOpen(true);
                    }}
                  >
                    Save filter
                  </Button>
                )}
              </div>
            )}

            {/* categories */}
            {(!user || ["premium", "standard"].includes(user.plan_tier)) && (
              <div className="space-y-2">
                <div>
                  <FilterBox
                    filterKey={"categories"}
                    options={formattedCategories}
                    filterValue={categories}
                    setFilterValue={setCategories}
                    title={"Categories"}
                  />
                </div>
              </div>
            )}

            {/* sub categories */}
            {(!user || ["premium"].includes(user.plan_tier)) && (
              <div className="space-y-2">
                <div>
                  <FilterBox
                    filterKey={"subcategories"}
                    options={formattedSubcategories}
                    filterValue={subcategories}
                    setFilterValue={setSubcategories}
                    title={"Sub categories"}
                  />
                </div>
              </div>
            )}

            {/* authorities */}
            {(!user || ["premium", "standard"].includes(user.plan_tier)) && (
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
            {(!user || ["premium", "standard"].includes(user.plan_tier)) && (
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

            {/* industries */}
            {(!user || ["premium", "standard"].includes(user.plan_tier)) && (
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
            {(!user || ["premium", "standard"].includes(user.plan_tier)) && (
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
            {(!user || ["premium"].includes(user.plan_tier)) && (
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
            {(!user || ["premium"].includes(user.plan_tier)) && (
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
          </div>
        </CardContent>
      </Card>

      {/* select filters */}
      {isAnyFilterActive && (
        <div className="col-span-full mt-4">
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-1 p-4">
              <Button variant="destructive" onClick={resetFilters}>
                Reset All
              </Button>

              {/* categories */}
              {categories.length > 0 &&
                getSelectedOptions(categories, formattedCategories).map(
                  (item) => (
                    <div
                      key={`category-${item.value}`}
                      className={
                        "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                      }
                      variant={"outline"}
                      onClick={() =>
                        setCategories(
                          categories
                            .split(".")
                            .filter((v) => v !== item.value)
                            .join("."),
                        )
                      }
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{item.label}</span>
                        <button
                          className="ml-1 text-red-500 hover:text-red-700"
                          type="button"
                        >
                          <X size={13} />
                        </button>
                      </div>
                      <Small className="text-[10px] text-primary">
                        Category
                      </Small>
                    </div>
                  ),
                )}

              {/*sub categories */}
              {subcategories.length > 0 &&
                getSelectedOptions(subcategories, formattedSubcategories).map(
                  (item) => (
                    <div
                      key={`subcategory-${item.value}`}
                      className={
                        "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                      }
                      variant={"outline"}
                      onClick={() =>
                        setSubcategories(
                          subcategories
                            .split(".")
                            .filter((v) => v !== item.value)
                            .join("."),
                        )
                      }
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{item.label}</span>
                        <button
                          className="ml-1 text-red-500 hover:text-red-700"
                          type="button"
                        >
                          <X size={13} />
                        </button>
                      </div>
                      <Small className="text-[10px] text-primary">
                        Sub Category
                      </Small>
                    </div>
                  ),
                )}

              {/* authorities */}
              {authorities.length > 0 &&
                getSelectedOptions(authorities, formattedAuthorities).map(
                  (item) => (
                    <div
                      key={`authority-${item.value}`}
                      className={
                        "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                      }
                      variant={"outline"}
                      onClick={() =>
                        setAuthorities(
                          authorities
                            .split(".")
                            .filter((v) => v !== item.value)
                            .join("."),
                        )
                      }
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{item.label}</span>
                        <button
                          className="ml-1 text-red-500 hover:text-red-700"
                          type="button"
                        >
                          <X size={13} />
                        </button>
                      </div>
                      <Small className="text-[10px] text-primary">
                        Authority
                      </Small>
                    </div>
                  ),
                )}

              {/* sectors */}
              {sectors.length > 0 &&
                getSelectedOptions(sectors, formattedSectors).map((item) => (
                  <div
                    key={`sector-${item.value}`}
                    className={
                      "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                    }
                    variant={"outline"}
                    onClick={() =>
                      setSectors(
                        sectors
                          .split(".")
                          .filter((v) => v !== item.value)
                          .join("."),
                      )
                    }
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span>{item.label}</span>
                      <button
                        className="ml-1 text-red-500 hover:text-red-700"
                        type="button"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <Small className="text-[10px] text-primary">Sector</Small>
                  </div>
                ))}

              {/* industries */}
              {industries.length > 0 &&
                getSelectedOptions(industries, formattedKeywords).map(
                  (item) => (
                    <div
                      key={`industry-${item.value}`}
                      className={
                        "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                      }
                      variant={"outline"}
                      onClick={() =>
                        setIndustries(
                          industries
                            .split(".")
                            .filter((v) => v !== item.value)
                            .join("."),
                        )
                      }
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{item.label}</span>
                        <button
                          className="ml-1 text-red-500 hover:text-red-700"
                          type="button"
                        >
                          <X size={13} />
                        </button>
                      </div>
                      <Small className="text-[10px] text-primary">
                        Industry
                      </Small>
                    </div>
                  ),
                )}

              {/* states */}
              {states.length > 0 &&
                getSelectedOptions(states, formattedStates).map((item) => (
                  <div
                    key={`state-${item.value}`}
                    className={
                      "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                    }
                    variant={"outline"}
                    onClick={() =>
                      setStates(
                        states
                          .split(".")
                          .filter((v) => v !== item.value)
                          .join("."),
                      )
                    }
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span>{item.label}</span>
                      <button
                        className="ml-1 text-red-500 hover:text-red-700"
                        type="button"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <Small className="text-[10px] text-primary">State</Small>
                  </div>
                ))}

              {/* cities */}
              {cities.length > 0 &&
                getSelectedOptions(cities, formattedCities).map((item) => (
                  <div
                    key={`state-${item.value}`}
                    className={
                      "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                    }
                    variant={"outline"}
                    onClick={() =>
                      setCities(
                        cities
                          .split(".")
                          .filter((v) => v !== item.value)
                          .join("."),
                      )
                    }
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span>{item.label}</span>
                      <button
                        className="ml-1 text-red-500 hover:text-red-700"
                        type="button"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <Small className="text-[10px] text-primary">City</Small>
                  </div>
                ))}

              {/* dateFrom */}
              {dateFrom && (
                <div
                  className={
                    "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                  }
                  variant={"outline"}
                  onClick={() => setDateFrom("")}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>{dateFrom}</span>
                    <button
                      className="ml-1 text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <Small className="text-[10px] text-primary">Date from</Small>
                </div>
              )}

              {/* date to */}
              {dateTo && (
                <div
                  className={
                    "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                  }
                  variant={"outline"}
                  onClick={() => setDateTo("")}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>{dateTo}</span>
                    <button
                      className="ml-1 text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <Small className="text-[10px] text-primary">Date to</Small>
                </div>
              )}

              {/* amount min */}
              {amountMin && (
                <div
                  className={
                    "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                  }
                  variant={"outline"}
                  onClick={() => setAmountMin("")}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>{formatNumber.format(amountMin)}</span>
                    <button
                      className="ml-1 text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <Small className="text-[10px] text-primary">Amount Min</Small>
                </div>
              )}

              {/* amount max */}
              {amountMax && (
                <div
                  className={
                    "flex shrink-0 cursor-pointer flex-col items-start rounded-lg border bg-white p-1 px-2"
                  }
                  variant={"outline"}
                  onClick={() => setAmountMax("")}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>{formatNumber.format(amountMax)}</span>
                    <button
                      className="ml-1 text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <Small className="text-[10px] text-primary">Amount Max</Small>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

function SavedPreferences({
  isOpen,
  setIsOpen,
  setPreferenceId,
  preferenceId,
  isApplyFilter,
  setIsApplyFilter,
  isSaveFilter,
  setIsSaveFilter,
  categories,
  subcategories,
  authorities,
  industries,
  sectors,
  states,
  cities,
  dateFrom,
  dateTo,
  amountMin,
  amountMax,
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Bell /> Saved Filters
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Preferences</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Preferences
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <ScrollArea className="h-[400px] p-3">
            <Preferences
              setId={setPreferenceId}
              id={preferenceId}
              isApplyFilter={isApplyFilter}
              setIsApplyFilter={setIsApplyFilter}
              isSaveFilter={isSaveFilter}
              setIsSaveFilter={setIsSaveFilter}
              categories={categories}
              subcategories={subcategories}
              authorities={authorities}
              industries={industries}
              sectors={sectors}
              states={states}
              cities={cities}
              dateFrom={dateFrom}
              dateTo={dateTo}
              amountMin={amountMin}
              amountMax={amountMax}
            />
          </ScrollArea>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
