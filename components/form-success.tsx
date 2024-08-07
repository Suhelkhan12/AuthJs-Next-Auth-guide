import { CheckCircledIcon } from "@radix-ui/react-icons";

interface formErrorProps {
  message?: string | undefined;
}

export const FormSuccess = ({ message }: formErrorProps) => {
  if (!message) return undefined;

  return (
    <div className=" flex items-center gap-x-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-500">
      <CheckCircledIcon className=" size-4" />
      <p>{message}</p>
    </div>
  );
};
