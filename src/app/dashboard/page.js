import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout />;
}
