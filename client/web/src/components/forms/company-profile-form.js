"use client";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import companyProfile from "@/services/company-profile";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/components/ui/error";
import { useEffect, useState } from "react";

const companyTypes = [
  "Proprietorship",
  "Partnership",
  "Private Limited",
  "Public Limited",
  "LLP",
  "Other",
];

const turnoverRanges = [
  "Less than 1 Crore",
  "1-10 Crore",
  "10-50 Crore",
  "50-100 Crore",
  "More than 100 Crore",
];

export function CompanyProfileForm({}) {
  const queryClient = useQueryClient();
  const [formKey, setFormKey] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({});
  console.log(watch());
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: companyProfile.get,
    queryKey: ["company-profile"],
  });

  const updateMutation = useMutation({
    mutationFn: companyProfile.update,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Company profile updated successfully.",
      });
      queryClient.invalidateQueries(["company-profile"]);
    },
    onError: (error) => {
      toast({
        vaiant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  useEffect(() => {
    if (profileData) {
      reset();
      Object.entries(profileData).forEach(([key, value]) =>
        setValue(key, value),
      );
      setFormKey((prev) => prev + 1);
    }
  }, [profileData, setValue, reset]);

  if (isLoading) return <Skeleton className={"h-[75vh] w-full bg-gray-200"} />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Update your company information</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          key={formKey}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                {...register("company_name", {
                  required: "Company name is required",
                })}
              />
              {errors.company_name && (
                <p className="text-sm text-red-500">
                  {errors.company_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_gst">GST Number</Label>
              <Input id="company_gst" {...register("company_gst")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_type">Company Type</Label>
              <Controller
                name="company_type"
                control={control}
                render={({ field }) => {
                  console.log(field.value);
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        {companyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year_of_establishment">
                Year of Establishment
              </Label>
              <Input
                id="year_of_establishment"
                {...register("year_of_establishment")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_types">Business Types</Label>
              <Textarea
                id="business_types"
                placeholder="Enter business types separated by commas"
                {...register("business_types")}
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple business types separated by commas
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="turnover">Annual Turnover</Label>
              <Controller
                name="turnover"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select turnover range" />
                    </SelectTrigger>
                    <SelectContent>
                      {turnoverRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operating_locations">Operating Locations</Label>
              <Textarea
                id="operating_locations"
                placeholder="Enter locations separated by commas"
                {...register("operating_locations")}
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple locations separated by commas
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website_link">Website</Label>
              <Input
                id="website_link"
                type="url"
                {...register("website_link")}
              />
            </div>
          </div>

          <Button type="submit" disabled={!isDirty || updateMutation.isPending}>
            {updateMutation.isPending
              ? "Company profile updating..."
              : "Update Company Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
