"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import config from "@/config";
import { useFormattedOptions } from "@/hooks/use-formatted-options";
import { useGetAuthorities } from "@/mutations/authority-mutation";
import { useGetCategories } from "@/mutations/category-mutation";
import { useGetCitiesByState } from "@/mutations/city-mutation";
import { useGetIndustries } from "@/mutations/industry-mutation";
import { useGetSectors } from "@/mutations/sector-mutation";
import { useGetStates } from "@/mutations/state-mutation";
import {
  useGetSubCategoriesByCategory
} from "@/mutations/subcategory-mutation";
import { useCreateTender, useGetTender } from "@/mutations/tender-mutation";
import { TenderSchema } from "@/utils/schema/tender.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagInput } from "emblor";
import { Link2, Trash } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Dropzone from "../dropzone";
import MySelect from "../my-select";
import { Checkbox } from "../ui/checkbox";
import ErrorMessage from "../ui/error";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import Spinner from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { H4 } from "../ui/typography";

const defaultValues = {
  // name: "",
  tender_amount: 0,
  bid_start_date: "",
  bid_end_date: "",
  bid_number: "",
  dated: "",
  bid_start_date_time: "",
  bid_end_date_time: "",
  department: "",
  organisation: "",
  office: "",
  item_gem_arpts: "",
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

  state_id: "",
  city_id: "",
  category_id: "",
  subcategory_ids: [],
  authority_ids: [],
  industry_ids: [],
  sector_ids: [],

  keywords: [],
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
};

export default function TenderForm({ type, updateMutation, id }) {
  const [files, setFiles] = useState({
    buyer_specification_document: [],
    drawing: [],
  });
  const [fileUrls, setFileUrls] = useState({
    buyer_specification_document_urls: [],
    drawing_urls: [],
  });
  const keywordsInputId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({ resolver: zodResolver(TenderSchema), defaultValues });
  const router = useRouter();
  const keywordsArray = watch("keywords");
  const state = watch("state_id");
  const category = watch("category_id");
  const [exampleTags, setExampleTags] = useState(keywordsArray ?? []);
  const [activeTagIndex, setActiveTagIndex] = useState(null);
  const createMutation = useCreateTender(function () {
    router.push("/tenders?page=1&limit=10");
  });
  const { data, isLoading, isError, error } = useGetTender(id);
  const { data: { categories } = {} } = useGetCategories();
  const { data: { subcategories } = {} } = useGetSubCategoriesByCategory(
    category?.value
  );
  const { data: { authorities } = {} } = useGetAuthorities();
  const { data: { states } = {} } = useGetStates();
  const { data: { cities } = {} } = useGetCitiesByState(state?.value);
  const { data: { industries } = {} } = useGetIndustries();
  const { data: { sectors } = {} } = useGetSectors();

  const formattedCategories = useFormattedOptions(categories);
  const formattedSubcategories = useFormattedOptions(subcategories);
  const formattedAuthorities = useFormattedOptions(authorities);
  const formattedCities = useFormattedOptions(cities);
  const formattedIndustries = useFormattedOptions(industries);
  const formattedSectors = useFormattedOptions(sectors);
  const formattedStates = useFormattedOptions(states);
  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(files).forEach(([key, files]) =>
      files.forEach((file) => formData.append(key, file))
    );
    Object.entries(data).forEach(([key, value]) => {
      Array.isArray(value)
        ? formData.append(key, JSON.stringify(value))
        : formData.append(key, value);
    });
    if (type === "create") {
      createMutation.mutate(formData);
    }
    if (type === "edit") {
      Object.entries(fileUrls).forEach(([key, value]) =>
        formData.append(key, JSON.stringify(value))
      );
      updateMutation.mutate(formData);
    }
  };
  useEffect(() => {
    if (data) {
      console.log({ data });
      // setValue("name", data.name);
      setValue("tender_amount", data.tender_amount);
      data.bid_start_date_time &&
        setValue(
          "bid_start_date_time",
          moment(data.bid_start_date_time).format("YYYY-MM-DDTHH:mm")
        );
      data.bid_end_date_time &&
        setValue(
          "bid_end_date_time",
          moment(data.bid_end_date_time).format("YYYY-MM-DDTHH:mm")
        );
      setValue("bid_number", data.bid_number);
      data.dated && setValue("dated", data.dated.split("T").shift());
      setValue("department", data.department);
      setValue("organisation", data.organisation);
      setValue("office", data.office);
      setValue("item_gem_arpts", data.item_gem_arpts);
      setValue("quantity", data.quantity);
      setValue("uom", data.uom);
      setValue("no_of_items", data.no_of_items);
      setValue(
        "minimum_average_annual_turnover",
        data.minimum_average_annual_turnover
      );
      setValue("years_of_past_experience", data.years_of_past_experience);
      setValue("evaluation_method", data.evaluation_method);
      setValue("emd_amount", data.emd_amount);
      setValue("tender_value", data.tender_value);
      setValue("ote_lte", data.ote_lte);
      setValue("epbg_percentage", data.epbg_percentage);
      setValue("consignee", data.consignee);
      setValue("delivery_days", data.delivery_days);
      setValue("distribution", data.distribution);
      setValue("pre_qualification_criteria", data.pre_qualification_criteria);
      setValue("save_to_my_business", data.save_to_my_business);
      setValue("splitting_applied", data.splitting_applied);
      setValue("mse_exemption_for_turnover", data.mse_exemption_for_turnover);
      setValue(
        "startup_exemption_for_turnover",
        data.startup_exemption_for_turnover
      );
      setValue("bid_to_ra_enabled", data.bid_to_ra_enabled);
      setValue("keywords", data.keywords ?? []);

      setValue("meta_title", data.meta_title);
      setValue("meta_description", data.meta_description);
      setValue("meta_keywords", data.meta_keywords);

      setValue(
        "state_id",
        formattedStates.find((au) => data.state_id === au.value)
      );
      setValue(
        "category_id",
        formattedCategories.find((au) => data.category_id === au.value)
      );
      setValue(
        "authority_ids",
        formattedAuthorities.filter((au) =>
          data.authority_ids?.includes(au.value)
        )
      );
      setValue(
        "industry_ids",
        formattedIndustries.filter((au) =>
          data.industry_ids?.includes(au.value)
        )
      );
      setValue(
        "sector_ids",
        formattedSectors.filter((au) => data.sector_ids?.includes(au.value))
      );
      setFileUrls((prev) => ({
        ...prev,
        buyer_specification_document_urls:
          data?.buyer_specification_document ?? [],
      }));
      setExampleTags(
        data?.keywords?.map((tag) => ({ id: tag, text: tag })) ?? []
      );
      setFileUrls((prev) => ({
        ...prev,
        drawing_urls: data?.drawing ?? [],
      }));
      // rerender((prev) => prev + 1);
    }
  }, [
    data,
    setValue,
    formattedCategories,
    formattedAuthorities,
    formattedIndustries,
    formattedSectors,
    formattedStates,
  ]);

  useEffect(() => {
    if (data) {
      setValue(
        "city_id",
        formattedCities.find((au) => data.city_id === au.value)
      );
    }
  }, [setValue, data, formattedCities]);

  useEffect(() => {
    if (data) {
      setValue(
        "subcategory_ids",
        formattedSubcategories.filter((au) =>
          data.subcategory_ids?.includes(au.value)
        )
      );
    }
  }, [setValue, data, formattedSubcategories]);

  const handleDrop = (name, acceptedFiles) => {
    setFiles((prev) => ({ ...prev, [name]: acceptedFiles }));
  };
  console.log({ errors });

  const isFormPending =
    (type === "create" && createMutation.isPending) ||
    (type === "edit" && updateMutation.isPending);

  if (type === "edit" && isLoading) return <Spinner />;
  if (type === "edit" && isError) return <ErrorMessage error={error} />;

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="sr-only">Tender Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*  categories */}
              <div>
                <Label>Category</Label>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <MySelect
                        options={formattedCategories}
                        value={value}
                        onChange={(value) => {
                          onChange(value);
                          setValue("subcategory_ids", []);
                        }}
                      />
                    );
                  }}
                />
                {errors.category_id && (
                  <span className="text-sm text-red-500">
                    {errors.category_id.message}
                  </span>
                )}
              </div>

              {/* sub categories */}
              {category && (
                <div>
                  <Label>Classifications</Label>
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
                  {errors.subcategory_ids && (
                    <span className="text-sm text-red-500">
                      {errors.subcategory_ids.message}
                    </span>
                  )}
                </div>
              )}

              {/* State */}
              <div>
                <Label>State</Label>
                <Controller
                  control={control}
                  name="state_id"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <MySelect
                        options={formattedStates}
                        value={value}
                        onChange={(value) => {
                          onChange(value);
                          setValue("city_id", "");
                        }}
                      />
                    );
                  }}
                />
                {errors.state_id && (
                  <span className="text-sm text-red-500">
                    {errors.state_id.message}
                  </span>
                )}
              </div>

              {/* City */}
              {state && (
                <div>
                  <Label>City</Label>
                  <Controller
                    control={control}
                    name="city_id"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MySelect
                          options={formattedCities}
                          value={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                  {errors.city_id && (
                    <span className="text-sm text-red-500">
                      {errors.city_id.message}
                    </span>
                  )}
                </div>
              )}

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

              {/* tender_value */}
              <div className="space-y-1">
                <Label
                  htmlFor="tender_value"
                  className="block text-sm font-medium"
                >
                  Tender Value
                </Label>
                <Input
                  type="number"
                  id="tender_value"
                  step="0.01"
                  {...register("tender_value", { valueAsNumber: true })}
                  placeholder="Enter tender value"
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
                <Label htmlFor="quantity" className="block text-sm font-medium">
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

              {/* ote_lte */}
              <div className="space-y-1">
                <Label htmlFor="ote_lte" className="block text-sm font-medium">
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

              {/* ePBG Percentage(%) */}
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

              {/* Consignee */}
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

              {/*  Delivery Days */}
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

              {/* distribution */}
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

              {/*  Pre-Qualification Criteria */}
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
                  <span className="text-sm font-medium">Splitting Applied</span>
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
                      <Checkbox onCheckedChange={onChange} checked={value} />
                    )}
                  />
                  <span className="text-sm font-medium">Bid to RA enabled</span>
                </Label>
              </div>

              {/* keywords */}
              <div className="space-y-1 col-span-full">
                <Label className="block text-sm font-medium">Keywords</Label>
                <TagInput
                  id={keywordsInputId}
                  tags={exampleTags}
                  setTags={(newTags) => {
                    setExampleTags(newTags);
                    setValue(
                      "keywords",
                      newTags.map(({ text }) => text)
                    );
                  }}
                  placeholder="Add a tag"
                  styleClasses={{
                    tagList: {
                      container: "gap-1 mt-2",
                    },
                    input:
                      "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    tag: {
                      body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 text-black pe-7",
                      closeButton:
                        "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                    },
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  inlineTags={false}
                  inputFieldPosition="top"
                />
                {errors.keywords && (
                  <span className="text-red-500 text-sm">
                    {errors.keywords.message}
                  </span>
                )}
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

                  <Dropzone
                    onDropFiles={(selectedFiles) =>
                      handleDrop("buyer_specification_document", selectedFiles)
                    }
                    multiple
                  />

                  {type === "edit" &&
                    fileUrls.buyer_specification_document_urls?.length > 0 && (
                      <ul className="mt-4 flex items-center justify-start gap-2 flex-wrap">
                        {fileUrls.buyer_specification_document_urls.map(
                          (file, index) => {
                            const fileName = file.split("\\").pop();
                            return (
                              <li
                                key={index}
                                className="text-sm text-gray-600 p-2 border-dashed border-2 rounded-lg space-y-1 flex items-center justify-start gap-2"
                              >
                                <span>{fileName}</span>
                                <div className="flex items-start justify-center gap-2">
                                  <a
                                    href={`${config.file_base}${file}`}
                                    download={fileName}
                                    target="_blank"
                                    className={buttonVariants({
                                      size: "icon",
                                      variant: "outline",
                                    })}
                                  >
                                    <Link2 />
                                  </a>

                                  <Button
                                    type="button"
                                    variant="destructive"
                                    className="shadow-none"
                                    size="icon"
                                    onClick={() =>
                                      setFileUrls((prev) => ({
                                        ...prev,
                                        buyer_specification_document_urls:
                                          prev.buyer_specification_document_urls.filter(
                                            (f) => f !== file
                                          ),
                                      }))
                                    }
                                  >
                                    <Trash />
                                  </Button>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-1">
                  <Label
                    htmlFor="drawing"
                    className="block text-sm font-medium"
                  >
                    Drawing
                  </Label>
                  <Dropzone
                    onDropFiles={(selectedFiles) =>
                      handleDrop("drawing", selectedFiles)
                    }
                    multiple
                  />
                </div>

                {type === "edit" && fileUrls.drawing_urls?.length > 0 && (
                  <ul className="mt-4 flex items-center justify-start gap-2 flex-wrap">
                    {fileUrls.drawing_urls.map((file, index) => {
                      const fileName = file.split("\\").pop();

                      return (
                        <li
                          key={index}
                          className="text-sm text-gray-600 p-2 border-dashed border-2 rounded-lg space-y-1 flex items-center justify-start gap-2"
                        >
                          <span>{fileName}</span>
                          <div className="flex items-start justify-center gap-2">
                            <a
                              href={`${config.file_base}${file}`}
                              download={fileName}
                              target="_blank"
                              className={buttonVariants({
                                size: "icon",
                                variant: "outline",
                              })}
                            >
                              <Link2 />
                            </a>

                            <Button
                              type="button"
                              variant="destructive"
                              className="shadow-none"
                              size="icon"
                              onClick={() =>
                                setFileUrls((prev) => ({
                                  ...prev,
                                  drawing_urls: prev.drawing_urls.filter(
                                    (f) => f !== file
                                  ),
                                }))
                              }
                            >
                              <Trash />
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
            <Button type="submit" disabled={isFormPending}>
              {isFormPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
