"use client";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useCreateAuthority } from "@/mutations/authority-mutation";
import { Textarea } from "../ui/textarea";
import Dropzone from "../dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { authoritySchema } from "@/utils/schema/authority.schema";

export default function AuthorityForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    setError,
  } = useForm({ resolver: zodResolver(authoritySchema) });

  const files = useWatch({ control, name: "files" }) ?? [];
  const handleSuccess = () => {
    reset();
  };
  const createMutation = useCreateAuthority(handleSuccess);
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    if (files && files?.length) {
      files.forEach((file) => formData.append("file", file));
    }
    console.log({ formData });
    createMutation.mutate(formData);
  };

  const handleDrop = (acceptedFiles) => {
    setValue("files", acceptedFiles);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <Label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </Label>

        <Dropzone onDropFiles={handleDrop} />

        <ul className="mt-4">
          {files.map((file, index) => (
            <li key={index} className="text-sm text-gray-600">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>

        {errors.files && (
          <p className="mt-1 text-sm text-red-500">{errors.files.message}</p>
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
            <Checkbox
              id="is_featured"
              type="checkbox"
              onCheckedChange={onChange}
              value={value}
            />
          )}
        />
        <Label
          htmlFor="is_featured"
          className="ml-2 block text-sm text-gray-700"
        >
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
          {createMutation.isPending ? "Creating..." : "Create Authority"}
        </Button>
      </div>
    </form>
  );
}
