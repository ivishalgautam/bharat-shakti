"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import invoiceMaster from "@/services/invoice-master";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceMasterSchema } from "@/utils/schema/invoice-master";
import { useRouter, useSearchParams } from "next/navigation";

export function InvoiceMasterForm({ updateMutation, type, id }) {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("aid");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(invoiceMasterSchema),
    defaultValues: {
      application_id: applicationId,
      date: "",
      delivery_date_with_ld: "",
      delivery_date_without_ld: "",
      payment_date: "",
    },
  });

  const router = useRouter();
  const date = watch();
  const createMutation = useMutation({
    mutationFn: invoiceMaster.create,
    onSuccess: () => {
      reset();
      toast({ title: "Success", description: "Record added successfully." });
      router.push("/dashboard/invoice-master?page=1&limit=10");
    },
    onError: (error) =>
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong.",
      }),
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            {...register("unit", { required: "required*" })}
            placeholder="Enter unit"
          />
          {errors.unit && (
            <p className="text-sm text-red-500">{errors.unit.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="internal_order_no">Internal Order No</Label>
          <Input
            id="internal_order_no"
            {...register("internal_order_no", { required: "required*" })}
            placeholder="Enter internal order no"
          />
          {errors.internal_order_no && (
            <p className="text-sm text-red-500">
              {errors.internal_order_no.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_no">Invoice No</Label>
          <Input
            id="invoice_no"
            {...register("invoice_no", { required: "required*" })}
            placeholder="Enter invoice no"
          />
          {errors.invoice_no && (
            <p className="text-sm text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date.date}
                    className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {date.date ? (
                      format(date.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date.date}
                    onSelect={(selected) => setValue("date", selected)}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_quantity">Invoice Quantity</Label>
          <Input
            id="invoice_quantity"
            type="number"
            {...register("invoice_quantity", { valueAsNumber: true })}
            placeholder="Enter invoice quantity"
          />
          {errors.invoice_quantity && (
            <p className="text-sm text-red-500">
              {errors.invoice_quantity.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery_date_with_ld">Delivery Date (With LD)</Label>
          <Controller
            control={control}
            name="delivery_date_with_ld"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date.delivery_date_with_ld}
                    className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {date.delivery_date_with_ld ? (
                      format(date.delivery_date_with_ld, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date.delivery_date_with_ld}
                    onSelect={(selected) =>
                      setValue("delivery_date_with_ld", selected)
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.delivery_date_with_ld && (
            <p className="text-sm text-red-500">
              {errors.delivery_date_with_ld.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery_date_without_ld">
            Delivery Date (Without LD)
          </Label>
          <Controller
            control={control}
            name="delivery_date_without_ld"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date.delivery_date_without_ld}
                    className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {date.delivery_date_without_ld ? (
                      format(date.delivery_date_without_ld, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date.delivery_date_without_ld}
                    onSelect={(selected) =>
                      setValue("delivery_date_without_ld", selected)
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.delivery_date_without_ld && (
            <p className="text-sm text-red-500">
              {errors.delivery_date_without_ld.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplied_quantity">Supplied Quantity</Label>
          <Input
            id="supplied_quantity"
            type="number"
            {...register("supplied_quantity", { valueAsNumber: true })}
            placeholder="Enter supplied quantity"
          />
          {errors.supplied_quantity && (
            <p className="text-sm text-red-500">
              {errors.supplied_quantity.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rejected_quantity">Rejected Quantity</Label>
          <Input
            id="rejected_quantity"
            type="number"
            {...register("rejected_quantity", { valueAsNumber: true })}
            placeholder="Enter rejected quantity"
          />
          {errors.rejected_quantity && (
            <p className="text-sm text-red-500">
              {errors.rejected_quantity.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="accepted_quantity">Accepted Quantity</Label>
          <Input
            id="accepted_quantity"
            type="number"
            {...register("accepted_quantity", { valueAsNumber: true })}
            placeholder="Enter accepted quantity"
          />
          {errors.accepted_quantity && (
            <p className="text-sm text-red-500">
              {errors.accepted_quantity.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ld_deduction">LD Deduction</Label>
          <Input
            id="ld_deduction"
            type="number"
            {...register("ld_deduction", { valueAsNumber: true })}
            placeholder="Enter LD deduction"
          />
          {errors.ld_deduction && (
            <p className="text-sm text-red-500">
              {errors.ld_deduction.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment_received">Payment Received</Label>
          <Input
            id="payment_received"
            type="number"
            {...register("payment_received", { valueAsNumber: true })}
            placeholder="Enter payment received"
          />
          {errors.payment_received && (
            <p className="text-sm text-red-500">
              {errors.payment_received.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment_date">Payment Date</Label>
          <Controller
            control={control}
            name="payment_date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date.payment_date}
                    className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {date.payment_date ? (
                      format(date.payment_date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date.payment_date}
                    onSelect={(selected) => setValue("payment_date", selected)}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.payment_date && (
            <p className="text-sm text-red-500">
              {errors.payment_date.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="days">Days</Label>
          <Input
            id="days"
            type="number"
            {...register("days", { valueAsNumber: true })}
            placeholder="Enter days"
          />
          {errors.days && (
            <p className="text-sm text-red-500">{errors.days.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={!isDirty || createMutation.isPending}>
          Submit
        </Button>
      </div>
    </form>
  );
}
