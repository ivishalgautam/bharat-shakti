"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import Spinner from "../ui/spinner";
import ErrorMessage from "../ui/error";
import { planSchema } from "@/utils/schema/plan.schema";
import {
  useCreatePlan,
  useGetPlan,
  useUpdatePlan,
} from "@/mutations/plan-mutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function PlanForm({ id, type = "create" }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(planSchema),
  });
  const tier = watch("plan_tier");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features", // expecting an array of { key, value }
  });

  const router = useRouter();
  const createMutation = useCreatePlan(() => {
    reset();
    router.replace("/plans?limit=10");
  });
  const updateMutation = useUpdatePlan(id);
  const { data, isLoading, isError, error } = useGetPlan(id);

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    if (type === "create") {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate(formData);
    }
  };

  if (type === "edit" && isLoading) return <Spinner />;
  if (type === "edit" && isError) return <ErrorMessage error={error} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* plan name */}
        <div className="space-y-1">
          <Label htmlFor="name">Plan Name</Label>
          <Input
            id="name"
            {...register("name")}
            className={cn({ "border-red-500": errors.name })}
            placeholder="e.g. Monthly, Quarterly"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* duration in months */}
        <div className="space-y-1">
          <Label htmlFor="duration_in_months">Duration (months)</Label>
          <Input
            id="duration_in_months"
            type="number"
            {...register("duration_in_months", { valueAsNumber: true })}
            className={cn({ "border-red-500": errors.duration_in_months })}
            placeholder="Duration in months"
          />
          {errors.duration_in_months && (
            <p className="text-sm text-red-500">
              {errors.duration_in_months.message}
            </p>
          )}
        </div>

        {/* price */}
        <div className="space-y-1">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className={cn({ "border-red-500": errors.price })}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* discount */}
        <div className="space-y-1">
          <Label htmlFor="discount_percentage">Discount (%)</Label>
          <Input
            id="discount_percentage"
            type="number"
            step="0.01"
            {...register("discount_percentage", { valueAsNumber: true })}
            className={cn({ "border-red-500": errors.discount_percentage })}
            placeholder="Enter discount in percent"
          />
        </div>

        {/* plan tier */}
        <div className="space-y-1">
          <Label htmlFor="tier">Plan Tier</Label>
          <Controller
            control={control}
            name="plan_tier"
            render={({ field }) => {
              return (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a plan tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {["free", "standard", "premium"].map((tier) => (
                      <SelectItem
                        key={tier}
                        value={tier}
                        className="capitalize"
                      >
                        {tier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />

          {errors.tier && (
            <p className="text-sm text-red-500">{errors.tier.message}</p>
          )}
        </div>

        <div className="col-span-full space-y-4">
          {/* is_popular */}
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="is_popular"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label>Is Popular</Label>
          </div>

          {/* is_active */}
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label>Is Active</Label>
          </div>
        </div>

        {/* features */}
        <div className="space-y-2 col-span-full">
          <Label>Features</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                placeholder="Feature Key"
                {...register(`features.${index}.key`)}
                className="w-1/2"
              />
              <Controller
                name={`features.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    className="size-6"
                  />
                )}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="h-8"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ key: "", value: true })}
            className="mt-2"
          >
            Add Feature
          </Button>
          {errors.features && (
            <p className="text-sm text-red-500">{errors.features.message}</p>
          )}
        </div>
      </div>
      {/* sub,it button */}
      <div className="text-end">
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {type === "create"
            ? createMutation.isPending
              ? "Creating..."
              : "Create"
            : updateMutation.isPending
              ? "Updating..."
              : "Update"}
        </Button>
      </div>
    </form>
  );
}
