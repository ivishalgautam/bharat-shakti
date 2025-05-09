"use client";

import { useEffect, useMemo } from "react";
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
import { useQuery } from "@tanstack/react-query";
import preference from "@/services/preference";
import useGetSubcategories from "@/hooks/use-get-subcategories";
import useGetCategories from "@/hooks/use-get-categories";
import { Small } from "../ui/typography";
import { Badge } from "../ui/badge";

export default function TendersFilters() {
  const { user } = useAuth();

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

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["preferences"],
    queryFn: preference.get,
    enabled: !!user,
  });

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
      console.log({ data });
      setAuthorities(data.authority_ids.join("."));
      setCities(data.city_ids.join("."));
      setIndustries(data.industry_ids.join("."));
      setSectors(data.sector_ids.join("."));
      setStates(data.state_ids.join("."));
      setSubcategories(data.subcategory_ids.join("."));
      setCategories(data.category_ids.join("."));
    }
  }, [data]);

  const getSelectedOptions = (value, options) => {
    if (!value) return [];
    const values = value.split(".");
    return options.filter((opt) => values.includes(opt.value));
  };

  return (
    <div>
      {user && (
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

              {/* sub categories */}
              {["premium", "standard"].includes(user.plan_tier) && (
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
              {["premium", "standard"].includes(user.plan_tier) && (
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
                          <SelectItem value="10000000000">
                            1000 Crore
                          </SelectItem>
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
                <div className="col-span-full mt-4">
                  <label className="mb-2 block text-sm font-medium">
                    Selected Filters:
                  </label>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
                    {/* categories */}
                    {categories.length > 0 && (
                      <div>
                        <Small>Categories</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(
                            categories,
                            formattedCategories,
                          ).map((item) => (
                            <Badge
                              key={`category-${item.value}`}
                              className={"cursor-pointer"}
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
                              {item.label}
                              <button
                                className="ml-1 text-red-500 hover:text-red-700"
                                type="button"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/*sub categories */}
                    {subcategories.length > 0 && (
                      <div>
                        <Small>Sub categories</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(
                            subcategories,
                            formattedSubcategories,
                          ).map((item) => (
                            <Badge
                              key={`subcategory-${item.value}`}
                              className={"cursor-pointer"}
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
                              {item.label}
                              <button
                                className="ml-1 text-red-500 hover:text-red-700"
                                type="button"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* authorities */}
                    {authorities.length > 0 && (
                      <div>
                        <Small>Authorities</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(
                            authorities,
                            formattedAuthorities,
                          ).map((item) => (
                            <Badge
                              key={`authority-${item.value}`}
                              className={"cursor-pointer"}
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
                              {item.label}
                              <button
                                className="ml-1 text-red-500 hover:text-red-700"
                                type="button"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* sectors */}
                    {sectors.length > 0 && (
                      <div>
                        <Small>Sectors</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(sectors, formattedSectors).map(
                            (item) => (
                              <Badge
                                key={`sector-${item.value}`}
                                className={"cursor-pointer"}
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
                                {item.label}
                                <button
                                  className="ml-1 text-red-500 hover:text-red-700"
                                  type="button"
                                >
                                  ×
                                </button>
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* industries */}
                    {industries.length > 0 && (
                      <div className="space-y-1">
                        <Small>Industries</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(
                            industries,
                            formattedKeywords,
                          ).map((item) => (
                            <Badge
                              key={`industry-${item.value}`}
                              className={"cursor-pointer"}
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
                              {item.label}
                              <button className="ml-1 text-red-500 hover:text-red-700">
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* states */}
                    {states.length > 0 && (
                      <div className="space-y-1">
                        <Small>States</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(states, formattedStates).map(
                            (item) => (
                              <Badge
                                key={`state-${item.value}`}
                                className={"cursor-pointer"}
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
                                {item.label}
                                <button className="ml-1 text-red-500 hover:text-red-700">
                                  ×
                                </button>
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* cities */}
                    {cities.length > 0 && (
                      <div className="space-y-1">
                        <Small>Cities</Small>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedOptions(cities, formattedCities).map(
                            (item) => (
                              <Badge
                                key={`state-${item.value}`}
                                className={"cursor-pointer"}
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
                                {item.label}
                                <button className="ml-1 text-red-500 hover:text-red-700">
                                  ×
                                </button>
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Repeat for sectors, states, cities, etc. */}
                    {searchTerm && (
                      <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                        {searchTerm}
                        <button
                          className="ml-1 text-red-500 hover:text-red-700"
                          onClick={() => setSearchTerm("")}
                        >
                          ×
                        </button>
                      </div>
                    )}
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
      )}
    </div>
  );
}
