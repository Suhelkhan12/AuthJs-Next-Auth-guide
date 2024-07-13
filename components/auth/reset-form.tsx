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

import { ResetSchema, ResetSchemaType } from "@/schemas/indes";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Spinner from "../icons/Spinner";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  // use transition hooks
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // defining shadcn form
  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  // creating a form submission handler
  function onSubmit(values: ResetSchemaType) {
    setError("");
    console.log(values);
    // here passing login server action to startTransition in a callback
    startTransition(async () => {
      const response = await reset(values);
      setSuccess(response?.success);
      setError(response?.error);
      form.reset();
    });
  }
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className=" space-y-4">
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
