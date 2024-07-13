"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/newVerification";

import Spinner from "../icons/Spinner";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("User token does not exist.");
      return;
    }
    try {
      const response = await newVerification(token);
      if (response) {
        setSuccess(response?.success as string);
        setError(response?.error as string);
      }
    } catch (err) {
      setError("Something went wrong during verification. ");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verifying you email."
      backButtonLabel="Back to login."
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <Spinner />}
        <FormSuccess message={success as string} />
        {!success && <FormError message={error as string} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
