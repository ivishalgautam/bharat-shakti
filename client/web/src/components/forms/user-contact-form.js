"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import userKeyContact from "@/services/user-key-contact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../spinner";
import ErrorMessage from "../ui/error";

export function UserContactForm({ updateMutation, type, closeModal, id }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({});

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => userKeyContact.getById(id),
    queryKey: ["user-key-contacts", id],
    enabled: !!id && type === "edit",
  });

  const createMutation = useMutation({
    mutationFn: userKeyContact.create,
    onSuccess: () => {
      toast({ title: "Success", description: "Contact added successfully." });
      closeModal();
      queryClient.invalidateQueries(["user-key-contacts"]);
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

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => setValue(key, value));
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    type === "create"
      ? createMutation.mutate(data)
      : updateMutation.mutate(data);
  };

  if (type === "edit" && isLoading) return <Spinner />;
  if (type === "edit" && isError) return <ErrorMessage error={error} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="person_name">Name</Label>
          <Input
            id="person_name"
            {...register("person_name", { required: "Name is required" })}
            placeholder="Enter person name"
          />
          {errors.person_name && (
            <p className="text-sm text-red-500">{errors.person_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            {...register("designation", {
              required: "Designation is required",
            })}
            placeholder="Enter designation"
          />
          {errors.designation && (
            <p className="text-sm text-red-500">{errors.designation.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_number">Contact Number</Label>
          <Input
            id="contact_number"
            {...register("contact_number", {
              required: "Contact number is required",
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Please enter a valid phone number",
              },
            })}
            placeholder="Enter contact number"
          />
          {errors.contact_number && (
            <p className="text-sm text-red-500">
              {errors.contact_number.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={
            !isDirty ||
            (type === "edit" && updateMutation.isPending) ||
            (type === "create" && createMutation.isPending)
          }
        >
          {"Submit"}
        </Button>
      </div>
    </form>
  );
}
