import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Opps! Something went wrong."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className=" flex w-full items-center justify-center">
        <ExclamationTriangleIcon className=" text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
