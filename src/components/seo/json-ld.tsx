import { serializeJsonLd } from "@/lib/seo";

/**
 * Renders schema.org structured data. A native <script> is correct here —
 * JSON-LD is data, not executable code, so next/script is not needed.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
