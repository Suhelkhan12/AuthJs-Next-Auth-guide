"use client";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginSchema, LoginSchemaType } from "@/schemas/indes";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import Spinner from "../icons/Spinner";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use."
      : "";
  // use transition hooks
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFActor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // defining shadcn form
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  // creating a form submission handler
  function onSubmit(values: LoginSchemaType) {
    setError("");
    // here passing login server action to startTransition in a callback
    startTransition(async () => {
      const response = await login(values);
      if (response?.success) {
        setSuccess(response.success);
        form.reset();
      }
      if (response?.error) {
        setError(response?.error);
        form.reset();
      }
      if (response?.twoFactor) {
        setShowTwoFActor(true);
      }
    });
  }
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className=" space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter 2FA code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        {...field}
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      We have sent 2FA code to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@example.com"
                          {...field}
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size={"sm"}
                        variant="link"
                        asChild
                        className="px-0 font-normal "
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm" : isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
