"use client";

import type { ElementType } from "react";
import { useLanguage } from "./LanguageContext";

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Renders a single dictionary string leaf by dot path (e.g. "blog.pageTitle").
 * For use inside async server components that can't call useLanguage directly.
 */
export function T({
  path,
  as: As = "span",
  className,
}: {
  path: string;
  as?: ElementType;
  className?: string;
}) {
  const { dict } = useLanguage();
  const value = get(dict, path);
  return <As className={className}>{typeof value === "string" ? value : path}</As>;
}
