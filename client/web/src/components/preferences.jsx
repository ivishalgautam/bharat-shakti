"use client";

import PreferencesForm from "@/components/forms/preferences";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error";
import { H2 } from "@/components/ui/typography";
import { toast } from "@/hooks/use-toast";
import preference from "@/services/preference";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, X } from "lucide-react";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export default function Preferences({
  setId,
  id,
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
  const [selectedPreference, setSelectedPreference] = useState("");
  const queryClient = useQueryClient();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["preferences"],
    queryFn: preference.get,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => preference.update(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Preferences added.",
      });
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

  const handlePreferenceClick = (id) => {
    setId((prev) => (id === prev ? "" : id));
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-4 rounded-lg bg-white">
      <H2>Preferences</H2>

      {isSaveFilter && (
        <PreferencesForm
          type="create"
          {...{
            isSaveFilter,
            setIsSaveFilter,
            selectedCategories: categories,
            selectedSubcategories: subcategories,
            selectedAuthorities: authorities,
            selectedIndustries: industries,
            selectedSectors: sectors,
            selectedStates: states,
            selectedCities: cities,
            selectedDateFrom: dateFrom,
            selectedDateTo: dateTo,
            selectedAmountMin: amountMin,
            selectedAmountMax: amountMax,
          }}
        />
      )}

      {!isSaveFilter && (
        <div className="space-y-2">
          <RadioGroup
            onValueChange={(value) => {
              // setSelectedPreference(value);
              handlePreferenceClick(value);
              setIsApplyFilter(false);
            }}
            value={id}
          >
            <div className="flex items-center space-x-2"></div>
            {data?.preferences?.map((preference) => {
              const isActive = preference.id === selectedPreference;
              return (
                <div
                  key={preference.id}
                  className="cursor-pointer rounded-lg border px-2"
                >
                  <div className="flex items-center justify-start gap-2">
                    <RadioGroupItem value={preference.id} id={preference.id} />
                    <Label htmlFor={preference.id} className="w-full py-4">
                      {preference.name}
                    </Label>

                    <Button
                      variant={isActive ? "default" : "outline"}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        //   handlePreferenceClick(preference.id);
                        setSelectedPreference((prev) =>
                          prev === preference.id ? "" : preference.id,
                        );
                      }}
                      className="ml-auto h-7"
                    >
                      {isActive ? (
                        <>
                          <X size={15} /> Close
                        </>
                      ) : (
                        <>
                          <Edit size={15} /> Edit
                        </>
                      )}
                    </Button>
                  </div>
                  {isActive && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <PreferencesForm
                        updateMutation={updateMutation}
                        id={preference.id}
                        type={"edit"}
                        {...{
                          isSaveFilter,
                          setIsSaveFilter,
                          selectedCategories: categories,
                          selectedSubcategories: subcategories,
                          selectedAuthorities: authorities,
                          selectedIndustries: industries,
                          selectedSectors: sectors,
                          selectedStates: states,
                          selectedCities: cities,
                          selectedDateFrom: dateFrom,
                          selectedDateTo: dateTo,
                          selectedAmountMin: amountMin,
                          selectedAmountMax: amountMax,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>

          <div>
            <Button type="button" onClick={() => setIsApplyFilter(true)}>
              Apply Preference
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
