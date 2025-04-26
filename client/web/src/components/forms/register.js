"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PhoneSelect from "../ui/phone-input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "../ui/checkbox";
import auth from "@/services/auth";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { RiFacebookFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import { Separator } from "../ui/separator";
import { signIn } from "next-auth/react";

// Define the validation schema using Zod
const userFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50),
    email: z.string().email("Please enter a valid email address"),
    mobile_number: z
      .string({ required_error: "Mobile number is required." })
      .min(1, { message: "Mobile number is required." }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => isValidPhoneNumber(data.mobile_number), {
    path: ["mobile_number"],
    message: "Invalid phone number",
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      mobile_number: "",
      first_name: "",
      last_name: "",
      password: "",
      role: "user",
      terms: false,
    },
  });
  const router = useRouter();
  const registerMutation = useMutation({
    mutationFn: auth.register,
    onSuccess: (data) => {
      toast({
        title: "Success.",
        description: "You have successfully registered with us.",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error.",
        description:
          error?.response.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };
  return (
    <div className="mx-auto w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          User Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {"Already have an account? "}
          <Link href={`/login`} className={"font-medium text-primary"}>
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 gap-y-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="Enter your first name"
              {...register("first_name")}
              className={errors.first_name ? "border-red-500" : ""}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="Enter your last name"
              {...register("last_name")}
              className={errors.last_name ? "border-red-500" : ""}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="col-span-full space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="col-span-full space-y-2">
            <Label htmlFor="mobile_number">Mobile Number *</Label>
            <Controller
              control={control}
              name="mobile_number"
              render={({ field }) => (
                <PhoneSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your mobile number"
                  className={errors.mobile_number ? "border-red-500" : ""}
                />
              )}
            />
            {errors.mobile_number && (
              <p className="text-sm text-red-500">
                {errors.mobile_number.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
        {/* Terms and Conditions */}
        <div className="my-4">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <div
                className={cn(
                  "shadow-xs relative flex w-full items-start gap-2 rounded-md border border-input bg-white p-4 outline-none",
                  {
                    "border-primary bg-primary/10": field.value,
                  },
                )}
              >
                <Checkbox
                  className="order-1 after:absolute after:inset-0"
                  aria-describedby={`description`}
                  onCheckedChange={field.onChange}
                  value={field.value}
                />
                <div className="grid grow gap-2">
                  <Label htmlFor={`description`}>
                    I agree to the terms and conditions *
                  </Label>
                  <p
                    id={`description`}
                    className="text-xs text-muted-foreground"
                  >
                    Terms & Conditions Approval
                  </p>
                </div>
              </div>
            )}
          />
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending && (
            <LoaderCircle className="size-10 animate-spin" />
          )}
          Register
        </Button>

        {/* separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-50 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* social login */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            onClick={() => signIn("google")}
            variant="outline"
            aria-label="Login with Google"
            size="icon"
          >
            <RiGoogleFill
              className="text-[#DB4437] dark:text-primary"
              size={16}
              aria-hidden="true"
            />
          </Button>
          <Button
            type="button"
            onClick={() => signIn("google")}
            variant="outline"
            aria-label="Login with Facebook"
            size="icon"
          >
            <RiFacebookFill
              className="text-[#1877f2] dark:text-primary"
              size={16}
              aria-hidden="true"
            />
          </Button>
          <Button
            type="button"
            onClick={() => signIn("google")}
            variant="outline"
            aria-label="Login with X"
            size="icon"
          >
            <RiTwitterXFill
              className="text-[#14171a] dark:text-primary"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </div>
      </form>
    </div>
  );
}
