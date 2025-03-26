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
import { useGetSectors } from "@/mutations/sector-mutation";
import { useGetAuthorities } from "@/mutations/authority-mutation";
import { useGetCities } from "@/mutations/city-mutation";
import { useGetKeywords } from "@/mutations/keyword-mutation";
import { useGetStates } from "@/mutations/state-mutation";
import { useFormattedOptions } from "@/hooks/use-formatted-options";
import ReactSelect from "react-select";
import MySelect from "../my-select";
import { H4 } from "../ui/typography";
import { Separator } from "../ui/separator";
import Dropzone from "../dropzone";
import { useCreateTender } from "@/mutations/tender-mutation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  consignee: "",
  delivery_days: "",
  distribution: "",
  pre_qualification_criteria: "",

  save_to_my_business: false,
  splitting_applied: false,
  mse_exemption_for_turnover: false,
  startup_exemption_for_turnover: false,
  bid_to_ra_enabled: false,

  authority_ids: [],
  city_ids: [],
  keyword_ids: [],
  sector_ids: [],
  state_ids: [],
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
};

export default function TenderForm() {
  const [files, setFiles] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({ resolver: zodResolver(TenderSchema), defaultValues });

  console.log({ errors });

  const createMutation = useCreateTender();

  const selectedAuthorities = watch("authorities");
  const selectedCities = watch("cities");
  const selectedKeywords = watch("keywords");
  const selectedSectors = watch("sectors");
  const selectedStates = watch("states");

  const { data: { authorities } = {} } = useGetAuthorities();
  const { data: { cities } = {} } = useGetCities();
  const { data: { keywords } = {} } = useGetKeywords();
  const { data: { sectors } = {} } = useGetSectors();
  const { data: { states } = {} } = useGetStates();

  const formattedAuthorities = useFormattedOptions(authorities);
  const formattedCities = useFormattedOptions(cities);
  const formattedKeywords = useFormattedOptions(keywords);
  const formattedSectors = useFormattedOptions(sectors);
  const formattedStates = useFormattedOptions(states);

  const onSubmit = (data) => {
    // console.log(data);
    // alert("Form submitted successfully!");
    const formData = new FormData();
    Object.entries(files).forEach(([key, files]) =>
      files.forEach((file) => formData.append(key, file))
    );
    Object.entries(data).forEach(([key, value]) => {
      Array.isArray(value)
        ? formData.append(key, JSON.stringify(value))
        : formData.append(key, value);
    });
    createMutation.mutate(formData);
    // console.log(formData.get("buyer_specification_document"));
  };

  const handleDrop = (name, acceptedFiles) => {
    setFiles((prev) => ({ ...prev, [name]: acceptedFiles }));
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="sr-only">Tender Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div>
              <H4></H4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* authorities */}
                <div>
                  <Label>Authorities</Label>
                  <Controller
                    control={control}
                    name="authorities"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MySelect
                          options={formattedAuthorities}
                          defaultValue={value}
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
                    name="cities"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MySelect
                          options={formattedCities}
                          defaultValue={value}
                          isMulti
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </div>

                {/* Keywords */}
                <div>
                  <Label>Keywords</Label>
                  <Controller
                    control={control}
                    name="keywords"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MySelect
                          options={formattedKeywords}
                          defaultValue={value}
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
                    name="sectors"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MySelect
                          options={formattedSectors}
                          defaultValue={value}
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
                    name="states"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MySelect
                          options={formattedStates}
                          defaultValue={value}
                          isMulti
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </div>

                {/* name */}
                <div className="space-y-1">
                  <Label htmlFor="name" className="block text-sm font-medium">
                    Tender name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter tender name"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* tender amount */}
                <div className="space-y-1">
                  <Label
                    htmlFor="tender_amount"
                    className="block text-sm font-medium"
                  >
                    Tender Amount
                  </Label>
                  <Input
                    type="number"
                    id="tender_amount"
                    {...register("tender_amount", { valueAsNumber: true })}
                    placeholder="Enter tender mount name"
                  />
                </div>

                {/* bid number */}
                <div className="space-y-1">
                  <Label
                    htmlFor="bid_number"
                    className="block text-sm font-medium"
                  >
                    Bid Number
                  </Label>
                  <Input
                    id="bid_number"
                    {...register("bid_number", {
                      required: "Bid number is required",
                    })}
                    placeholder="Enter bid number"
                  />
                  {errors.bid_number && (
                    <p className="text-red-500 text-sm">
                      {errors.bid_number.message}
                    </p>
                  )}
                </div>

                {/* dated */}
                <div className="space-y-1">
                  <Label htmlFor="dated" className="block text-sm font-medium">
                    Dated
                  </Label>
                  <Input
                    id="dated"
                    type="date"
                    {...register("dated")}
                    placeholder="Select date"
                  />
                </div>

                {/* bid end date time */}
                <div className="space-y-1">
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
                  />
                  {errors.bid_end_date_time && (
                    <p className="text-red-500 text-sm">
                      {errors.bid_end_date_time.message}
                    </p>
                  )}
                </div>

                {/* department */}
                <div className="space-y-1">
                  <Label
                    htmlFor="department"
                    className="block text-sm font-medium"
                  >
                    Department
                  </Label>
                  <Input
                    id="department"
                    {...register("department")}
                    placeholder="Enter department name"
                  />
                </div>

                {/* organisation */}
                <div className="space-y-1">
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
                  />
                </div>

                {/* office */}
                <div className="space-y-1">
                  <Label htmlFor="office" className="block text-sm font-medium">
                    Office
                  </Label>
                  <Input
                    id="office"
                    {...register("office")}
                    placeholder="Enter office details"
                  />
                </div>

                {/* item_gem_arpts */}
                <div className="space-y-1">
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
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-1">
                  <Label
                    htmlFor="quantity"
                    className="block text-sm font-medium"
                  >
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register("quantity")}
                    placeholder="Enter quantity"
                  />
                </div>

                {/* UoM */}
                <div className="space-y-1">
                  <Label htmlFor="uom" className="block text-sm font-medium">
                    UoM
                  </Label>
                  <Input
                    id="uom"
                    {...register("uom")}
                    placeholder="Enter unit of measurement"
                  />
                </div>

                {/* no_of_items */}
                <div className="space-y-1">
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
                  />
                </div>

                {/* minimum_average_annual_turnover */}
                <div className="space-y-1">
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
                  />
                </div>

                {/* years_of_past_experience */}
                <div className="space-y-1">
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
                  />
                </div>

                {/* evaluation_method */}
                <div className="space-y-1">
                  <Label
                    htmlFor="evaluation_method"
                    className="block text-sm font-medium"
                  >
                    Evaluation Method
                  </Label>
                  <Input
                    id="evaluation_method"
                    placeholder={"Enter evaluation method"}
                    {...register("evaluation_method")}
                  />
                </div>

                {/* emd_amount */}
                <div className="space-y-1">
                  <Label
                    htmlFor="emd_amount"
                    className="block text-sm font-medium"
                  >
                    EMD Amount
                  </Label>
                  <Input
                    id="emd_amount"
                    type="number"
                    {...register("emd_amount")}
                    placeholder="Enter EMD amount"
                  />
                </div>

                {/* tender_value */}
                <div className="space-y-1">
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
                  />
                </div>

                {/* ote_lte */}
                <div className="space-y-1">
                  <Label
                    htmlFor="ote_lte"
                    className="block text-sm font-medium"
                  >
                    OTE/LTE
                  </Label>
                  <Controller
                    control={control}
                    name="ote_lte"
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select OTE/LTE" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ote">OTE</SelectItem>
                          <SelectItem value="lte">LTE</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-1">
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
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="consignee"
                    className="block text-sm font-medium"
                  >
                    Consignee
                  </Label>
                  <Input
                    id="consignee"
                    {...register("consignee")}
                    placeholder="Enter consignee details"
                  />
                </div>

                <div className="space-y-1">
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
                  />
                </div>

                <div className="space-y-1">
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
                  />
                </div>

                <div className="space-y-1">
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
                    rows={3}
                  />
                </div>

                {/* save_to_my_business */}
                <div className="space-y-1">
                  <Label className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="save_to_my_business"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox onCheckedChange={onChange} checked={value} />
                      )}
                    />
                    <span className="text-sm font-medium">
                      Save to My Business
                    </span>
                  </Label>
                </div>

                {/* splitting_applied */}
                <div className="space-y-1">
                  <Label className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="splitting_applied"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox onCheckedChange={onChange} checked={value} />
                      )}
                    />
                    <span className="text-sm font-medium">
                      Splitting Applied
                    </span>
                  </Label>
                </div>

                {/* mse_exemption_for_turnover */}
                <div className="space-y-1">
                  <Label className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="mse_exemption_for_turnover"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox onCheckedChange={onChange} checked={value} />
                      )}
                    />
                    <span className="text-sm font-medium">
                      MSE Exemption for Turnover
                    </span>
                  </Label>
                </div>

                {/* startup_exemption_for_turnover */}
                <div className="space-y-1">
                  <Label className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="startup_exemption_for_turnover"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox onCheckedChange={onChange} checked={value} />
                      )}
                    />
                    <span className="text-sm font-medium">
                      Startup Exemption for Turnover
                    </span>
                  </Label>
                </div>

                {/* bid_to_ra_enabled */}
                <div className="space-y-1">
                  <Label className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="bid_to_ra_enabled"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox onCheckedChange={onChange} value={value} />
                      )}
                    />
                    <span className="text-sm font-medium">
                      Bid to RA enabled
                    </span>
                  </Label>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* files */}
            <div>
              <H4>Documents</H4>
              <div>
                <div className="space-y-1">
                  <Label
                    htmlFor="buyer_specification_document"
                    className="block text-sm font-medium"
                  >
                    Buyer Specification Document
                  </Label>
                  {/* <Input
                    id="buyer_specification_document"
                    {...register("buyer_specification_document")}
                    placeholder="Enter document details"
                    
                  /> */}

                  <Dropzone
                    onDropFiles={(selectedFiles) =>
                      handleDrop("buyer_specification_document", selectedFiles)
                    }
                    multiple
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="drawing"
                    className="block text-sm font-medium"
                  >
                    Drawing
                  </Label>
                  {/* <Input
                    id="drawing"
                    {...register("drawing")}
                    placeholder="Enter drawing details"
                    
                  /> */}
                  <Dropzone
                    onDropFiles={(selectedFiles) =>
                      handleDrop("drawing", selectedFiles)
                    }
                    multiple
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <H4>SEO</H4>
              <div>
                <div className="space-y-1">
                  <Label
                    htmlFor="meta_title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Title
                  </Label>
                  <Input
                    id="meta_title"
                    type="text"
                    placeholder="Enter meta title"
                    {...register("meta_title")}
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="meta_description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Description
                  </Label>
                  <Textarea
                    id="meta_description"
                    rows={3}
                    {...register("meta_description")}
                    placeholder="Enter meta description"
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="meta_keywords"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Keywords
                  </Label>
                  <Input
                    id="meta_keywords"
                    type="text"
                    placeholder="keyword1, keyword2, keyword3"
                    {...register("meta_keywords")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
