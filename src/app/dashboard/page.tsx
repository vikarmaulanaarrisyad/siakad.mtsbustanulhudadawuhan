import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const role = session.user.role?.toLowerCase() || "siswa";
  
  // Redirect to their specific dashboard based on role
  redirect(`/dashboard/${role}`);
}
