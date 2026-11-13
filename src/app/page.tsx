import type { Metadata } from "next";
import { ContentProvider } from "@/components/ContentProvider";
import { Site } from "@/components/Site";
import { getSiteContent } from "@/lib/siteContent";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  return { title: seo.title, description: seo.description };
}

export default async function Home() {
  const content = await getSiteContent();
  return (
    <ContentProvider content={content}>
      <Site />
    </ContentProvider>
  );
}
