import { redirect } from "next/navigation";

export default function Home() {
  redirect("/Auth/Login");
  return null;
}
