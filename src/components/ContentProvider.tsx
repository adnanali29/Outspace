"use client";

import { createContext, use, useMemo, type ReactNode } from "react";
import { withLinks, type Content, type SiteContent } from "@/content";

const ContentContext = createContext<Content | null>(null);

// Hands the page content (defaults plus admin edits) to every component.
export function ContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  const value = useMemo(() => withLinks(content), [content]);
  return <ContentContext value={value}>{children}</ContentContext>;
}

export function useContent() {
  const content = use(ContentContext);
  if (!content) throw new Error("useContent must be used inside ContentProvider");
  return content;
}
