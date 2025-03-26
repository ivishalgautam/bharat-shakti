"use client";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import Dropzone from "../dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectorSchema } from "@/utils/schema/sector.schema";
import {
  useCreateSector,
  useGetSector,
  useUpdateSector,
} from "@/mutations/sector-mutation";
import { useRouter } from "next/navigation";
import { useGetKeyword } from "@/mutations/keyword-mutation";
import { useEffect, useState } from "react";
import Spinner from "../ui/spinner";
import ErrorMessage from "../ui/error";
import Image from "next/image";
import config from "@/config";

export default function SectorForm({ id, type = "create" }) {
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({ resolver: zodResolver(sectorSchema) });

  const files = useWatch({ control, name: "files" }) ?? [];
  const router = useRouter();
  const handleSuccess = () => {
    reset();
    router.replace("/sectors?limit=10");
  };

  const createMutation = useCreateSector(handleSuccess);
  const updateMutation = useUpdateSector(id);
  const { data, isLoading, isError, error } = useGetSector(id);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    if (files && files?.length) {
      files.forEach((file) => formData.append("file", file));
    }

    if (type === "create") {
      createMutation.mutate(formData);
    }
    if (type === "edit") {
      formData.append("image", JSON.stringify(images));
      updateMutation.mutate(formData);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setValue("files", acceptedFiles);
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("is_featured", data.is_featured);
      setValue("meta_title", data.meta_title);
      setValue("meta_keywords", data.meta_keywords);
      setValue("meta_description", data.meta_description);
      setImages(data.image);
    }
  }, [data, setValue, setImages]);

  if (type === "edit" && isLoading) return <Spinner />;
  if (type === "edit" && isError) return <ErrorMessage error={error} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <Label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </Label>

        {type === "edit" && images?.length ? (
          <ul className="mt-4 flex items-center justify-start">
            {images.map((file, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 p-2 border shadow rounded-lg space-y-1"
              >
                <Image
                  src={`${config.file_base}/${file}`}
                  width={50}
                  height={50}
                  alt="file"
                  className="mx-auto"
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="h-4 shadow-none text-[10px]"
                  onClick={() =>
                    setImages((prev) => prev.filter((i) => file !== i))
                  }
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <Dropzone onDropFiles={handleDrop} />
            <ul className="mt-4">
              {files.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  {errors.files?.[index]?.type && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.files?.[index]?.type.message}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            {errors.files && (
              <p className="mt-1 text-sm text-red-500">
                {errors.files.message}
              </p>
            )}
          </>
        )}
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </Label>
        <Input
          id="name"
          type="text"
          className={cn({
            "border-red-500 ": errors.name,
          })}
          {...register("name", { required: "Name is required" })}
          placeholder="Enter name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <Controller
          control={control}
          name="is_featured"
          render={({ field: { onChange, value } }) => (
            <Checkbox onCheckedChange={onChange} checked={value} />
          )}
        />
        <Label className="ml-2 block text-sm text-gray-700">
          Featured content
        </Label>
      </div>

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
          className={cn({
            "border-red-500 ": errors.meta_title,
          })}
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
          className={cn({
            "border-red-500 ": errors.meta_description,
          })}
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
          className={cn({
            "border-red-500 ": errors.meta_keywords,
          })}
          {...register("meta_keywords")}
        />
      </div>
      <div className="text-end">
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
