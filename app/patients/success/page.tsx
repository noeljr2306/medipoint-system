"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const RequestSuccess = () => {
  const searchParams = useSearchParams();
  const doctor = searchParams.get("doctor") || "N/A";
  const preferredDate = searchParams.get("preferredDate") || "N/A";
  const preferredTime = searchParams.get("preferredTime") || "N/A";

  return (
    <div className="flex h-screen max-h-screen px-[5%] bg-white text-gray-900">
      <div className=" w-full flex flex-col justify-between py-10 items-center">
        <Image
          src="/logo.png"
          height={200}
          width={200}
          alt="logo"
          className="h-10 w-auto mb-6"
        />

        <section className="flex flex-col items-center text-center">
          <CheckCircle className="mb-6 h-20 w-20 text-blue-500" />
          <h2 className="text-2xl font-semibold mb-4 max-w-xl">
            Your <span className="text-blue-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-sm text-gray-600">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>

        <section className=" flex w-full flex-col items-center gap-8 border-y-2 border-dark-400 py-8 md:w-fit md:flex-row">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap">{doctor}</p>
          </div>
          <div className="flex gap-2">
            <Calendar />
            <p>{preferredDate} - {preferredTime}</p>
          </div>
        </section>
        <Button
          variant="outline"
          className="mt-6 bg-blue-600 text-white"
          asChild
        >
          <Link href={`/patients/$[userId]`}>New Appointment</Link>
        </Button>

        <p className="text-xs text-gray-400 mt-10">© 2025 MediPoint</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
