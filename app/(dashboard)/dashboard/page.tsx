import { FC } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/app/lib/db";
import RequestApiKey from "@/app/components/RequestApiKey";
import ApiDashboard from "@/components/ApiDashboard";

export const metadata: Metadata = {
  title: "Relativyze | Dashboard",
  description: "Free text similarity API for developers.",
};

const page = async ({}) => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  });
  return (
    <div className="max-w-7xl mx-auto mt-16">
      {/* @ts-expect-error Server Component */}
      {apiKey ? <ApiDashboard /> : <RequestApiKey />}
    </div>
  );
};

export default page;
