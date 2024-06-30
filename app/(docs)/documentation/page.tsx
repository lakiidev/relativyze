import { FC } from "react";
import type { Metadata } from "next";
import LargeHeading from "@/app/components/ui/LargeHeading";
import Paragraph from "@/app/components/ui/Paragraph";
import DocumentationTabs from "@/app/components/DocumentationTabs";

export const metadata: Metadata = {
  title: "Relativyze API | Documentation",
  description: "Free text similarity API for developers.",
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
