import type { Thing, WithContext } from "schema-dts";
import { serializeJsonLd } from "@/lib/seo";

/**
 * Renders schema.org structured data. A native <script> is correct here —
 * JSON-LD is data, not executable code, so next/script is not needed.
 */
type Props = { data: WithContext<Thing> | WithContext<Thing>[] };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
