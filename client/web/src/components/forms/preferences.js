import { useFormattedOptions } from "@/hooks/use-formatted-options";
import useGetAuthorities from "@/hooks/use-get-authorities";
import useGetCities, { useGetCitiesByStateIds } from "@/hooks/use-get-cities";
import useGetIndustries from "@/hooks/use-get-industries";
import useGetSectors from "@/hooks/use-get-sectors";
import useGetStates from "@/hooks/use-get-states";
import useGetSubcategories, {
  useGetSubcategoriesByCategory,
} from "@/hooks/use-get-subcategories";
import { preferenceSchema } from "@/utils/schema/preference";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import MySelect from "../my-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import preference from "@/services/preference";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import Spinner from "../spinner";
import ErrorMessage from "../ui/error";
import useGetCategories from "@/hooks/use-get-categories";
import { Input } from "../ui/input";

export default function PreferencesForm({
  id,
  updateMutation,
  type = "create",
  isSaveFilter,
  setIsSaveFilter,
  selectedCategories,
  selectedSubcategories,
  selectedAuthorities,
  selectedIndustries,
  selectedSectors,
  selectedStates,
  selectedCities,
  selectedDateFrom,
  selectedDateTo,
  selectedAmountMin,
  selectedAmountMax,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    watch,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(preferenceSchema) });
  const [isReset, setIsReset] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["preferences", id],
    queryFn: () => preference.getById(id),
    enabled: type === "edit" && !!id,
  });

  const createMutation = useMutation({
    mutationFn: preference.create,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Preferences added.",
      });
      console.log(typeof setIsSaveFilter);
      typeof setIsSaveFilter === "function" && setIsSaveFilter(false);
      queryClient.invalidateQueries(["preferences"]);
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

  const { data: states } = useGetStates();
  const { data: cities } = useGetCitiesByStateIds(selectedStates);
  const { data: categories } = useGetCategories();
  const { data: subcategories } =
    useGetSubcategoriesByCategory(selectedCategories);
  const { data: authorities } = useGetAuthorities();
  const { data: industries } = useGetIndustries();
  const { data: sectors } = useGetSectors();

  const formattedCategories = useFormattedOptions(categories);
  const formattedSubcategories = useFormattedOptions(subcategories);
  const formattedAuthorities = useFormattedOptions(authorities);
  const formattedCities = useFormattedOptions(cities);
  const formattedIndustries = useFormattedOptions(industries);
  const formattedSectors = useFormattedOptions(sectors);
  const formattedStates = useFormattedOptions(states);

  const onSubmit = (data) => {
    type === "edit" ? updateMutation.mutate(data) : createMutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      console.log({ data });
      setValue("name", data.name);
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

  useEffect(() => {
    if (isSaveFilter) {
      selectedCategories &&
        setValue(
          "category_ids",
          formattedCategories.filter((so) =>
            selectedCategories.includes(so.value),
          ),
        );
      selectedSubcategories &&
        setValue(
          "subcategory_ids",
          formattedSubcategories.filter((so) =>
            selectedSubcategories.includes(so.value),
          ),
        );
      selectedAuthorities &&
        setValue(
          "authority_ids",
          formattedAuthorities.filter((so) =>
            selectedAuthorities.includes(so.value),
          ),
        );
      selectedIndustries &&
        setValue(
          "industry_ids",
          formattedIndustries.filter((so) =>
            selectedIndustries.includes(so.value),
          ),
        );
      selectedSectors &&
        setValue(
          "sector_ids",
          formattedSectors.filter((so) => selectedSectors.includes(so.value)),
        );
      selectedStates &&
        setValue(
          "state_ids",
          formattedStates.filter((so) => selectedStates.includes(so.value)),
        );
      selectedCities &&
        setValue(
          "city_ids",
          formattedCities.filter((so) => selectedCities.includes(so.value)),
        );
      // selectedDateFrom.length && setValue("");
      // selectedDateTo.length && setValue();
      // selectedAmountMin.length && setValue();
      // selectedAmountMax.length && setValue();
    }
  }, [
    setValue,
    isSaveFilter,
    formattedCategories,
    formattedSubcategories,
    formattedAuthorities,
    formattedIndustries,
    formattedSectors,
    formattedStates,
    formattedCities,
    selectedCategories,
    selectedSubcategories,
    selectedAuthorities,
    selectedIndustries,
    selectedSectors,
    selectedStates,
    selectedCities,
  ]);

  const isFormLoading =
    (type === "create" && createMutation.isPending) ||
    (type === "edit" && updateMutation.isPending);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {isReset && (
        <div className="text-center">
          <p>
            Are you sure you want to reset{" "}
            <span className="text-primary">{watch("name")}</span> filter ?
          </p>
          <p className="mt-1">
            It will clear all filter settings in saved filter and you will stop
            getting tender alerts based on your preferences
          </p>
          <div className="mt-6 space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsReset(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                reset();
                setIsReset(false);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      {!isReset && (
        <>
          <div>
            {type === "edit" && (
              <Button
                type="button"
                onClick={() => setIsReset(true)}
                className="h-7"
                variant="destructive"
              >
                Reset
              </Button>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
              <div className="col-span-full">
                <Label>Name</Label>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Enter preference name"
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
            </div>
          </div>

          <div className="mt-4 text-end">
            <Button disabled={!isDirty || isFormLoading}>
              {isFormLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
