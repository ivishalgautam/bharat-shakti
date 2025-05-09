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
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import Spinner from "../spinner";
import ErrorMessage from "../ui/error";
import useGetCategories from "@/hooks/use-get-categories";

export default function PreferencesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    watch,
    setValue,
  } = useForm({ resolver: zodResolver(preferenceSchema) });
  console.log({ isDirty });
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["preferences"],
    queryFn: preference.get,
  });

  const createMutation = useMutation({
    mutationFn: preference.create,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Preferences added.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong.",
      });
    },
  });

  const { data: categories } = useGetCategories();
  const { data: subcategories } = useGetSubcategories();
  const { data: authorities } = useGetAuthorities();
  const { data: cities } = useGetCities();
  const { data: industries } = useGetIndustries();
  const { data: sectors } = useGetSectors();
  const { data: states } = useGetStates();

  const formattedCategories = useFormattedOptions(categories);
  const formattedSubcategories = useFormattedOptions(subcategories);
  const formattedAuthorities = useFormattedOptions(authorities);
  const formattedCities = useFormattedOptions(cities);
  const formattedIndustries = useFormattedOptions(industries);
  const formattedSectors = useFormattedOptions(sectors);
  const formattedStates = useFormattedOptions(states);

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      setValue(
        "category_ids",
        formattedCategories.filter((au) =>
          data.category_ids?.includes(au.value),
        ),
      );
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
    formattedCategories,
    formattedSubcategories,
    formattedAuthorities,
    formattedCities,
    formattedIndustries,
    formattedSectors,
    formattedStates,
  ]);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* categories */}
        <div>
          <Label>Categories</Label>
          <Controller
            control={control}
            name="category_ids"
            render={({ field: { onChange, value } }) => {
              return (
                <MySelect
                  options={formattedCategories}
                  value={value}
                  isMulti
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

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

      <div className="mt-4 text-end">
        <Button disabled={!isDirty || createMutation.isPending}>
          {createMutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
