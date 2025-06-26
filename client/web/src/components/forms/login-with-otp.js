"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import auth from "@/services/auth";
import { loginSchema } from "@/utils/schema/login";
import { otpSchema } from "@/utils/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import PhoneSelect from "../ui/phone-input";

export default function LoginWithOtp() {
  const [step, setStep] = useState("login");
  const [resendTimer, setResendTimer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile_number: "",
    },
  });
  const {
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    setValue: setOtpFormValue,
    control: otpFormControl,
    getValues: getOtpFormValues,
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "", request_id: "" },
  });
  const router = useRouter();

  // Timer effect for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const registerMutation = useMutation({
    mutationFn: auth.loginRequest,
    onSuccess: ({ data }) => {
      setOtpFormValue("request_id", data.request_id);
      toast({
        title: "OTP Sent Successful",
        description:
          "Please verify your account with the OTP sent to your mobile number.",
      });
      setStep("otp");
      setResendTimer(10);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: auth.loginVerify,
    onSuccess: ({ data }) => {
      console.log({ data });
      toast({
        title: "Verification Successful",
        description: "Your account has been verified successfully.",
      });
      delete data.user_data.password;
      localStorage.setItem("user", JSON.stringify(data.user_data));
      router.replace("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Invalid OTP. Please try again.",
      });
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  const onOtpSubmit = (data) => {
    const payload = {
      ...getValues(),
      otp: data.otp,
      request_id: getOtpFormValues().request_id,
    };
    verifyOtpMutation.mutate(payload);
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      registerMutation.mutate({ ...getValues() });
    }
  };

  const handleBackToRegister = () => {
    setValue("mobile_number", "");
    setStep("login");
  };

  if (step === "otp") {
    return (
      <form onSubmit={handleOtpSubmit(onOtpSubmit)}>
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Verify Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {"We've sent a 6-digit OTP to your mobile number"}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {watch("mobile_number")}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="block text-center">Enter OTP</Label>
              <Controller
                name="otp"
                control={otpFormControl}
                render={({ field }) => (
                  <div className="flex items-center justify-center">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="size-12" />
                        <InputOTPSlot index={1} className="size-12" />
                        <InputOTPSlot index={2} className="size-12" />
                        <InputOTPSlot index={3} className="size-12" />
                        <InputOTPSlot index={4} className="size-12" />
                        <InputOTPSlot index={5} className="size-12" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                )}
              />
              {otpErrors.otp && (
                <p className="text-center text-sm text-red-500">
                  {otpErrors.otp.message}
                </p>
              )}
            </div>

            <Button className="w-full" disabled={verifyOtpMutation.isPending}>
              {verifyOtpMutation.isPending && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Verify OTP
            </Button>

            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-600">
                {"Didn't receive the OTP?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || registerMutation.isPending}
                className="h-auto p-0 text-primary"
              >
                {registerMutation.isPending ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Resending...
                  </>
                ) : resendTimer > 0 ? (
                  `Resend OTP in ${resendTimer}s`
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleBackToRegister}
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="mx-auto w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login With OTP
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending && (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          )}
          Send OTP
        </Button>
      </form>
    </div>
  );
}
