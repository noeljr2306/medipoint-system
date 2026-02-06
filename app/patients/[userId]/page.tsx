import AppointmentForm from "@/components/forms/AppointmentForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";


type UserWithFirstName = {
  firstName?: string;
  [key: string]: unknown;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const firstName = session?.user.firstName ?? "user";
  const lastName = session?.user.lastName ?? "";
  const email = session?.user.email ?? "";
  return <AppointmentForm firstName={firstName} lastName={lastName} email={email} />;

}
export default page;