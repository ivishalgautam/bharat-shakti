"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { LoaderCircle } from "lucide-react";
import auth from "@/services/auth";

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      );
    },
  });

  async function onSubmit(data) {
    loginMutation.mutate(data);
  }

  return (
    <div>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {"Don't have an account? "}
          <Link href={`/register`} className={"font-medium text-primary"}>
            Register
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              placeholder="username"
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        {/* 
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      {...register("rememberMe")}
                    />
                    <Label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              )} */}

        <div>
          <Button
            disabled={loginMutation.isPending}
            type="submit"
            className="w-full"
          >
            {loginMutation.isPending && (
              <LoaderCircle className="size-10 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
