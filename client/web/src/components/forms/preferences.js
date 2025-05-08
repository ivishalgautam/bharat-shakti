import { useFormattedOptions } from "@/hooks/use-formatted-options";
import useGetAuthorities from "@/hooks/use-get-authorities";
import useGetCities from "@/hooks/use-get-cities";
import useGetIndustries from "@/hooks/use-get-industries";
import useGetSectors from "@/hooks/use-get-sectors";
import useGetStates from "@/hooks/use-get-states";
import useGetSubcategories from "@/hooks/use-get-subcategories";
import { preferenceSchema } from "@/utils/schema/preference";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import MySelect from "../my-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import preference from "@/services/preference";

export default function PreferencesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({ resolver: zodResolver(preferenceSchema) });

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["preferences"],
    queryFn: preference.get,
  });

  const createMutation = useMutation({
    mutationFn: () => {},
    onSuccess: () => {},
    onError: (error) => {},
  });

  const { data: { subcategories } = {} } = useGetSubcategories();
  const { data: authorities } = useGetAuthorities();
  const { data: cities } = useGetCities();
  const { data: industries } = useGetIndustries();
  const { data: sectors } = useGetSectors();
  const { data: states } = useGetStates();
  const formattedSubcategories = useFormattedOptions(subcategories);
  const formattedAuthorities = useFormattedOptions(authorities);
  const formattedCities = useFormattedOptions(cities);
  const formattedIndustries = useFormattedOptions(industries);
  const formattedSectors = useFormattedOptions(sectors);
  const formattedStates = useFormattedOptions(states);

  const onSubmit = (data) => {};

  useEffect(() => {
    if (data) {
      console.log({ data });
      setValue(
        "subcategory_ids",
        formattedSubcategories.filter((au) =>
          data.subcategory_ids?.includes(au.value),
        ),
      );
      setValue(
        "authority_ids",
        formattedAuthorities.filter((au) =>
          data.authority_ids?.includes(au.value),
        ),
      );
      setValue(
        "city_ids",
        formattedCities.filter((au) => data.city_ids?.includes(au.value)),
      );
      setValue(
        "industry_ids",
        formattedIndustries.filter((au) =>
          data.industry_ids?.includes(au.value),
        ),
      );
      setValue(
        "sector_ids",
        formattedSectors.filter((au) => data.sector_ids?.includes(au.value)),
      );
      setValue(
        "state_ids",
        formattedStates.filter((au) => data.state_ids?.includes(au.value)),
      );
    }
  }, [
    data,
    setValue,
    formattedSubcategories,
    formattedAuthorities,
    formattedCities,
    formattedIndustries,
    formattedSectors,
    formattedStates,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* sub categories */}
        <div>
          <Label>Sub categories</Label>
          <Controller
            control={control}
            name="subcategory_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedSubcategories}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        {/* authorities */}
        <div>
          <Label>Authorities</Label>
          <Controller
            control={control}
            name="authority_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedAuthorities}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        {/* Cities */}
        <div>
          <Label>Cities</Label>
          <Controller
            control={control}
            name="city_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedCities}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        {/* Industry */}
        <div>
          <Label>Industries</Label>
          <Controller
            control={control}
            name="industry_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedIndustries}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        {/* Sectors */}
        <div>
          <Label>Sectors</Label>
          <Controller
            control={control}
            name="sector_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedSectors}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        {/* States */}
        <div>
          <Label>States</Label>
          <Controller
            control={control}
            name="state_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedStates}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>
      </div>
    </form>
  );
}
