import React from "react";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

const SuccessPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-20 p-6">
      <Alert variant="default" className="mb-6">
        <AlertTitle>Appointment Booked Successfully</AlertTitle>
        <AlertDescription>
          Your appointment has been successfully booked. Thank you for choosing our service.
        </AlertDescription>
      </Alert>
      <Link
        href="/patients"
        className={buttonVariants({ variant: "default" })}
      >
        Back to Appointments
      </Link>
    </div>
  );
};

export default SuccessPage;
