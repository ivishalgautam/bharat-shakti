"use client";
import React, { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { useAuth } from "@/providers/auth-provider";
import Spinner from "../spinner";

export default function UserProfileForm({ updateMutation }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const { user, isUserLoading } = useAuth();

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };
    updateMutation.mutate(payload);
  };

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("username", user.username);
      //   setValue("mobile_number", user.mobile_number);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const isButtonLoading = updateMutation.isPending;
  if (isUserLoading) return <Spinner />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
      {/* basic info (user) */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {/* first_name */}
          <div>
            <Label>Full Name</Label>
            <Input
              {...register("first_name")}
              placeholder="Enter Your First Name"
              className=""
            />
            {errors.first_name && (
              <span className="text-red-500">{errors.first_name.message}</span>
            )}
          </div>

          {/* last name */}
          <div>
            <Label>Last name</Label>
            <Input
              {...register("last_name")}
              placeholder="Enter Your Last Name"
              className=""
            />
            {errors.last_name && (
              <span className="text-red-500">{errors.last_name.message}</span>
            )}
          </div>

          {/* Username */}
          <div>
            <Label>Username</Label>
            <Input
              {...register("username")}
              placeholder="Enter Username"
              className=""
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          {/* email */}
          <div>
            <Label>Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter Email"
              className=""
              disabled
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="text-end">
          <Button className="" disabled={isButtonLoading}>
            Submit
            {isButtonLoading && (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
