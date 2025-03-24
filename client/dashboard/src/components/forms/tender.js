"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { TenderSchema } from "@/utils/schema/tender.schema";

const defaultValues = {
  name: "",
  tender_amount: "",
  bid_start_date: "",
  bid_end_date: "",
  bid_number: "",
  dated: "",
  bid_end_date_time: "",
  department: "",
  organisation: "",
  office: "",
  item_gem_parts: "",
  quantity: "",
  uom: "",
  no_of_items: "",
  minimum_average_annual_turnover: "",
  years_of_past_experience: "",
  evaluation_method: "",
  emd_amount: "",
  tender_value: "",
  ote_lte: "",
  epbg_percentage: "",
  buyer_specification_document: "",
  drawing: "",
  consignee: "",
  delivery_days: "",
  distribution: "",
  pre_qualification_criteria: "",
  mse_exemption_for_turnover: "",
  startup_exemption_for_turnover: "",
  bid_to_ra_enabled: "",
  splitting_applied: "",
  save_to_my_business: "",
  authority_ids: "",
  city_ids: "",
  keyword_ids: "",
  sector_ids: "",
  state_ids: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
};

export default function TenderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(TenderSchema), defaultValues });

  const onSubmit = (data) => {
    console.log(data);
    alert("Form submitted successfully!");
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="sr-only">Tender Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bid_number" className="block text-sm font-medium">
                Bid Number
              </Label>
              <Input
                id="bid_number"
                {...register("bid_number", {
                  required: "Bid number is required",
                })}
                placeholder="Enter bid number"
                className="w-full p-2 border rounded-md"
              />
              {errors.bid_number && (
                <p className="text-red-500 text-sm">
                  {errors.bid_number.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dated" className="block text-sm font-medium">
                Dated
              </Label>
              <Input
                id="dated"
                type="date"
                {...register("dated")}
                placeholder="Select date"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bid_end_date_time"
                className="block text-sm font-medium"
              >
                Bid End Date/Time
              </Label>
              <Input
                id="bid_end_date_time"
                type="datetime-local"
                {...register("bid_end_date_time")}
                placeholder="Select end date and time"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="block text-sm font-medium">
                Department
              </Label>
              <Input
                id="department"
                {...register("department")}
                placeholder="Enter department name"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="organisation"
                className="block text-sm font-medium"
              >
                Organisation
              </Label>
              <Input
                id="organisation"
                {...register("organisation")}
                placeholder="Enter organisation name"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="office" className="block text-sm font-medium">
                Office
              </Label>
              <Input
                id="office"
                {...register("office")}
                placeholder="Enter office details"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="item_gem_arpts"
                className="block text-sm font-medium"
              >
                Item GeMARPTS
              </Label>
              <Input
                id="item_gem_arpts"
                {...register("item_gem_arpts")}
                placeholder="Enter GeMARPTS details"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="block text-sm font-medium">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity")}
                placeholder="Enter quantity"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uom" className="block text-sm font-medium">
                UoM
              </Label>
              <Input
                id="uom"
                {...register("uom")}
                placeholder="Enter unit of measurement"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="no_of_items"
                className="block text-sm font-medium"
              >
                No. of Items
              </Label>
              <Input
                id="no_of_items"
                type="number"
                {...register("no_of_items")}
                placeholder="Enter number of items"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="minimum_average_annual_turnover"
                className="block text-sm font-medium"
              >
                Minimum Average Annual Turnover (For 3 Years)
              </Label>
              <Input
                id="minimum_average_annual_turnover"
                {...register("minimum_average_annual_turnover")}
                placeholder="Enter minimum turnover amount"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="years_of_past_experience"
                className="block text-sm font-medium"
              >
                Years of Past Experience Required
              </Label>
              <Input
                id="years_of_past_experience"
                {...register("years_of_past_experience")}
                placeholder="Enter required experience in years"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="evaluation_method"
                className="block text-sm font-medium"
              >
                Evaluation Method
              </Label>
              <select
                id="evaluation_method"
                {...register("evaluation_method")}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select method</option>
                <option value="item_wise">Item Wise</option>
                <option value="lot_wise">Lot Wise</option>
                <option value="consignee_wise">Consignee Wise</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emd_amount" className="block text-sm font-medium">
                EMD Amount
              </Label>
              <Input
                id="emd_amount"
                type="number"
                {...register("emd_amount")}
                placeholder="Enter EMD amount"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="tender_value"
                className="block text-sm font-medium"
              >
                Tender Value
              </Label>
              <Input
                id="tender_value"
                type="number"
                {...register("tender_value")}
                placeholder="Enter tender value"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ote_lte" className="block text-sm font-medium">
                OTE/LTE
              </Label>
              <select
                id="ote_lte"
                {...register("ote_lte")}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select option</option>
                <option value="ote">OTE</option>
                <option value="lte">LTE</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="epbg_percentage"
                className="block text-sm font-medium"
              >
                ePBG Percentage(%)
              </Label>
              <Input
                id="epbg_percentage"
                type="number"
                step="0.01"
                {...register("epbg_percentage")}
                placeholder="Enter percentage"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="buyer_specification_document"
                className="block text-sm font-medium"
              >
                Buyer Specification Document
              </Label>
              <Input
                id="buyer_specification_document"
                {...register("buyer_specification_document")}
                placeholder="Enter document details"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="drawing" className="block text-sm font-medium">
                Drawing
              </Label>
              <Input
                id="drawing"
                {...register("drawing")}
                placeholder="Enter drawing details"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consignee" className="block text-sm font-medium">
                Consignee
              </Label>
              <Input
                id="consignee"
                {...register("consignee")}
                placeholder="Enter consignee details"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="delivery_days"
                className="block text-sm font-medium"
              >
                Delivery Days
              </Label>
              <Input
                id="delivery_days"
                type="number"
                {...register("delivery_days")}
                placeholder="Enter number of days"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="distribution"
                className="block text-sm font-medium"
              >
                Distribution
              </Label>
              <Input
                id="distribution"
                {...register("distribution")}
                placeholder="Enter distribution details"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="pre_qualification_criteria"
                className="block text-sm font-medium"
              >
                Pre-Qualification Criteria
              </Label>
              <Textarea
                id="pre_qualification_criteria"
                {...register("pre_qualification_criteria")}
                placeholder="Enter pre-qualification criteria"
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="save_to_my_business"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      onCheckedChange={onChange}
                      value={value}
                      className="rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium">Save to My Business</span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="splitting_applied"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      onCheckedChange={onChange}
                      value={value}
                      className="rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium">Splitting Applied</span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="mse_exemption_for_turnover"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      onCheckedChange={onChange}
                      value={value}
                      className="rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium">
                  MSE Exemption for Turnover
                </span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="startup_exemption_for_turnover"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      onCheckedChange={onChange}
                      value={value}
                      className="rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium">
                  Startup Exemption for Turnover
                </span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="bid_to_ra_enabled"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      onCheckedChange={onChange}
                      value={value}
                      className="rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium">Bid to RA enabled</span>
              </Label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-6">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
