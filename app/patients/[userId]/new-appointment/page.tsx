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
  console.log("Session:", session);
  const firstName = session?.user.firstName ?? "user";
  const lastName = session?.user.lastName ?? "user";
  const email = session?.user.email ?? "";
  console.log("FirstName:", firstName);
  console.log("LastName:", lastName);
  console.log("Email:", email);
  return <AppointmentForm firstName={firstName} lastName={lastName} email={email} />;

}
export default page;