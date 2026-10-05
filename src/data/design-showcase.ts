import type { DesignShowcase } from "./types";

/**
 * Social media design showcase boards — each image collects several post
 * designs made for one industry. Exported from Canva as 1000×750 WebP.
 *
 * Files: public/images/work/social-media-design/<slug>-social-media-design.webp
 * Alt text describes the work by industry (not by brand names shown in the
 * mock-ups) so it never implies an unconfirmed client relationship.
 */
export const designShowcaseSource =
  "https://www.canva.com/design/DAHKZqJqnDA/Zf2Q0FcJUvlTwxupO0wxuA/view";

const DIR = "/images/work/social-media-design";

/** Boards that share an industry group with another board. */
const SECTOR: Record<string, string> = {
  "luxury-med-spa": "med-spa",
  "hair-care-products": "hair-care",
  "hair-care-brand": "hair-care",
  "makeup-brand": "beauty-products",
  "makeup-content-creation": "beauty-products",
  "cosmetics-store": "beauty-products",
};

function board(slug: string, industry: string, alt: string, featured = false): DesignShowcase {
  return {
    slug,
    industry,
    sector: SECTOR[slug] ?? slug,
    featured,
    image: {
      type: "image",
      src: `${DIR}/${slug}-social-media-design.webp`,
      alt,
      width: 1000,
      height: 750,
    },
  };
}

// Order = display order. `true` = featured on the homepage.
export const designShowcase: DesignShowcase[] = [
  board(
    "spa",
    "Spa",
    "Luxury spa social media designs: massage, facial and special-offer posts in dark gold tones",
    true,
  ),
  board(
    "restaurant",
    "Restaurant",
    "Restaurant social media designs: menu, special combo and buy-one-get-one food posts in red and black",
    true,
  ),
  board(
    "gym",
    "Gym and fitness",
    "Gym social media designs: workout motivation, supplement and membership offer posts",
    true,
  ),
  board(
    "real-estate",
    "Real estate",
    "Real estate social media designs: just listed, open house and sold property posts",
    true,
  ),
  board(
    "med-spa",
    "Med spa",
    "Med spa social media designs: relaxation massage, facial serum and HydraFacial treatment posts",
    true,
  ),
  board(
    "fashion",
    "Fashion",
    "Fashion retail social media designs: sale, new arrival and collection launch posts",
    true,
  ),
  board(
    "dental",
    "Dental clinic",
    "Dental clinic social media designs: smile makeover, check-up offer and before-and-after posts",
    true,
  ),
  board(
    "travel",
    "Travel",
    "Travel agency social media designs: destination posts for South Africa, Japan and Ireland",
    true,
  ),
  board(
    "makeup-brand",
    "Makeup brand",
    "Makeup brand social media portfolio: product launch, sale and beauty tip posts in soft pink",
  ),
  board(
    "luxury-med-spa",
    "Luxury med spa",
    "Luxury med spa social media portfolio: signature body rituals, client reviews and treatment posts",
  ),
  board(
    "yoga",
    "Yoga studio",
    "Yoga studio social media portfolio: retreat, wellness and class promotion posts",
  ),
  board(
    "hair-care-brand",
    "Hair care",
    "Hair care brand social media designs: damaged-hair solutions, new products and booking posts",
  ),
  board(
    "hair-care-products",
    "Hair care products",
    "Hair care product social media designs in gold: shampoo, serum and buy-one-get-one offers",
  ),
  board(
    "beauty-salon",
    "Beauty salon",
    "Beauty salon social media portfolio: hair, nail and salon service posts in neutral tones",
  ),
  board(
    "cosmetics-store",
    "Cosmetics",
    "Cosmetics store social media designs: skincare, grooming and makeup product posts",
  ),
  board(
    "makeup-content-creation",
    "Makeup and skincare",
    "Makeup and skincare content creation: foundation, lipstick and beauty routine posts",
  ),
  board(
    "furniture-interior",
    "Furniture and interiors",
    "Furniture and interior design social media posts: armchair, bed and sofa promotions",
  ),
  board(
    "law-firm",
    "Law firm",
    "Law firm social media designs: legal services, attorney profile and client trust posts",
  ),
  board(
    "sports",
    "Sports",
    "Sports club social media designs: match day, tournament and training camp posts in blue",
  ),
  board(
    "pet-care",
    "Pet care",
    "Pet care social media content: pet health, supplements and grooming posts with dogs and cats",
  ),
];
