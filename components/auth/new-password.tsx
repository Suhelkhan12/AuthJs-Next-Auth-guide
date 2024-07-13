"use client";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas/indes";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Spinner from "../icons/Spinner";
import { newPassword } from "@/actions/newPassword";
import { useSearchParams } from "next/navigation";

export const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // use transition hooks
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // defining shadcn form
  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // creating a form submission handler
  function onSubmit(values: NewPasswordSchemaType) {
    setError("");
    console.log(values);
    // here passing login server action to startTransition in a callback
    startTransition(async () => {
      const response = await newPassword(values, token);
      setSuccess(response?.success);
      setError(response?.error);
      form.reset();
    });
  }
  return (
    <CardWrapper
      headerLabel="Enter new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Send reset email"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
