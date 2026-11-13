/**
 * Seed catalogue: categories, products and stock. Loaded by `pnpm db:seed`; the storefront reads the database.
 * Imagery: Unsplash (https://unsplash.com/license).
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type SeedCategory = {
  slug: string;
  name: string;
  featured?: boolean;
  position?: number;
  image?: { src: string; alt: string };
};

export type SeedProduct = {
  slug: string;
  name: string;
  categorySlug: string;
  priceCents: number;
  currency: string;
  image: { src: string; alt: string };
  badge?: string;
  description: string;
  details: string[];
  stock: number;
};

export const seedCategories: SeedCategory[] = [
  {
    slug: "bags",
    name: "Bags",
    featured: true,
    position: 1,
    image: { src: unsplash("1605733513597-a8f8341084e6"), alt: "Grey leather satchel with buckled straps" },
  },
  {
    slug: "shoes",
    name: "Shoes",
    featured: true,
    position: 2,
    image: { src: unsplash("1543163521-1bf539c55dd2"), alt: "Floral stiletto pumps" },
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    featured: true,
    position: 3,
    image: { src: unsplash("1515562141207-7a88fb7ce338"), alt: "Pearl necklace in a jewellery box" },
  },
  {
    slug: "ready-to-wear",
    name: "Ready-to-wear",
    featured: true,
    position: 4,
    image: { src: unsplash("1490481651871-ab68de25d43d"), alt: "Neutral-toned garments hanging on a rail" },
  },
  { slug: "knitwear", name: "Knitwear", position: 5 },
  { slug: "outerwear", name: "Outerwear", position: 6 },
  { slug: "watches", name: "Watches", position: 7 },
  { slug: "eyewear", name: "Eyewear", position: 8 },
];

const usd = "usd";

export const seedProducts: SeedProduct[] = [
  {
    slug: "pleated-leather-bag",
    name: "Pleated Leather Bag",
    categorySlug: "bags",
    priceCents: 235000,
    currency: usd,
    badge: "New",
    image: { src: unsplash("1564422170194-896b89110ef8"), alt: "Teal pleated leather bag with a round handle beside a grey pouch" },
    description:
      "Supple calfskin folded into deep pleats and gathered onto a sculpted round handle. Soft enough to carry under the arm, structured enough to stand on its own.",
    details: ["Calfskin leather, suede lining", "W 32 × H 24 × D 12 cm", "Magnetic closure, inner slip pocket", "Made in Italy"],
    stock: 6,
  },
  {
    slug: "fringed-cotton-poncho",
    name: "Fringed Cotton Poncho",
    categorySlug: "knitwear",
    priceCents: 69000,
    currency: usd,
    badge: "New",
    image: { src: unsplash("1434389677669-e08b4cac3105"), alt: "Cream open-knit poncho with fringe on a wooden hanger" },
    description:
      "An open-knit poncho in heavy organic cotton, finished with a hand-knotted fringe. Layer it over a shirt in spring or a fine knit in autumn.",
    details: ["100% organic cotton", "One size, relaxed fit", "Hand-knotted fringe", "Hand wash cold, dry flat", "Made in Portugal"],
    stock: 2,
  },
  {
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    categorySlug: "outerwear",
    priceCents: 245000,
    currency: usd,
    image: { src: unsplash("1551028719-00167b16eac5"), alt: "Black leather biker jacket laid flat on white linen" },
    description:
      "Our take on the classic biker: vegetable-tanned lambskin cut close to the body, with an asymmetric zip and quilted shoulders that soften with wear.",
    details: ["Lambskin leather, cupro lining", "Regular fit — take your usual size", "Antique silver hardware", "Specialist leather clean only", "Made in Spain"],
    stock: 9,
  },
  {
    slug: "nylon-bomber-jacket",
    name: "Nylon Bomber Jacket",
    categorySlug: "outerwear",
    priceCents: 128000,
    currency: usd,
    image: { src: unsplash("1591047139829-d91aecb6caea"), alt: "Rust nylon bomber jacket held up on a hanger" },
    description:
      "A lightweight bomber in recycled technical nylon with a fine rib collar, cuffs and hem. Water-repellent and packable without losing its shape.",
    details: ["Shell: 100% recycled nylon", "Lining: 100% cupro", "Water-repellent finish", "Relaxed fit", "Made in Japan"],
    stock: 0,
  },
  {
    slug: "woven-leather-tote",
    name: "Woven Leather Tote",
    categorySlug: "bags",
    priceCents: 189000,
    currency: usd,
    image: { src: unsplash("1598532163257-ae3c6b2524b6"), alt: "Cognac woven leather tote with a gold chain strap" },
    description:
      "Strips of cognac leather hand-woven on a wooden frame, then finished with a detachable gold-tone chain. Each tote takes two days to weave.",
    details: ["Hand-woven calfskin", "W 38 × H 30 × D 14 cm", "Detachable chain strap, 110 cm", "Made in Italy"],
    stock: 4,
  },
  {
    slug: "silk-jogger-trousers",
    name: "Silk Jogger Trousers",
    categorySlug: "ready-to-wear",
    priceCents: 89000,
    currency: usd,
    image: { src: unsplash("1594633312681-425c7b97ccd1"), alt: "Model wearing blush silk jogger trousers with heels" },
    description:
      "Fluid washed silk cut as an easy jogger, with a drawstring waist and gently tapered leg. As comfortable as they look, polished enough for evening.",
    details: ["100% silk crêpe de chine", "Elasticated drawstring waist", "Tapered leg, ankle length", "Dry clean", "Made in France"],
    stock: 12,
  },
  {
    slug: "floral-jacquard-pumps",
    name: "Floral Jacquard Pumps",
    categorySlug: "shoes",
    priceCents: 97000,
    currency: usd,
    image: { src: unsplash("1543163521-1bf539c55dd2"), alt: "Pair of floral jacquard stiletto pumps on a white plinth" },
    description:
      "A pointed pump in woven floral jacquard on a slim 95 mm heel, lined in soft kid leather and finished with a leather sole.",
    details: ["Jacquard upper, kid leather lining", "Heel height 95 mm", "Leather sole", "Made in Italy"],
    stock: 1,
  },
  {
    slug: "structured-satchel",
    name: "Structured Satchel",
    categorySlug: "bags",
    priceCents: 215000,
    currency: usd,
    image: { src: unsplash("1594223274512-ad4803739b7c"), alt: "Teal leather satchel with a gold push-lock" },
    description:
      "A compact satchel with a firm top-handle and a polished push-lock, built on an internal frame so it keeps its lines from the first day to the hundredth.",
    details: ["Box calf leather, lambskin lining", "W 24 × H 18 × D 9 cm", "Adjustable shoulder strap", "Made in France"],
    stock: 5,
  },
  {
    slug: "organic-cotton-t-shirt",
    name: "Organic Cotton T-Shirt",
    categorySlug: "ready-to-wear",
    priceCents: 29000,
    currency: usd,
    image: { src: unsplash("1521572163474-6864f9cf17ab"), alt: "Man wearing a plain white crew-neck t-shirt" },
    description:
      "The t-shirt we wear most: a mid-weight organic cotton jersey with a close crew neck that holds its shape wash after wash.",
    details: ["100% organic cotton, 220 gsm", "Regular fit", "Machine wash 30°", "Made in Portugal"],
    stock: 40,
  },
  {
    slug: "pearl-strand-necklace",
    name: "Pearl Strand Necklace",
    categorySlug: "jewellery",
    priceCents: 158000,
    currency: usd,
    image: { src: unsplash("1515562141207-7a88fb7ce338"), alt: "Pearl strand necklace resting in an open jewellery box" },
    description:
      "Hand-knotted freshwater pearls, graded by eye for an even lustre, finished with an 18k gold-plated clasp.",
    details: ["Freshwater pearls, 7–8 mm", "Length 45 cm", "18k gold-plated sterling silver clasp", "Presented in a lacquered box"],
    stock: 3,
  },
  {
    slug: "leather-strap-watch",
    name: "Leather Strap Watch",
    categorySlug: "watches",
    priceCents: 145000,
    currency: usd,
    image: { src: unsplash("1524592094714-0f0654e20314"), alt: "Hand holding a minimalist watch with a brown leather strap" },
    description:
      "A quiet, 38 mm dial with a slim steel case and a vegetable-tanned leather strap that darkens beautifully with time.",
    details: ["Stainless steel case, 38 mm", "Swiss quartz movement", "Sapphire crystal", "Water resistant to 50 m", "Two-year warranty"],
    stock: 7,
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    categorySlug: "eyewear",
    priceCents: 52000,
    currency: usd,
    image: { src: unsplash("1511499767150-a48a237f0083"), alt: "Round gold-frame sunglasses with green lenses" },
    description:
      "A fine round frame in gold-tone titanium with mineral-glass green lenses, weighted so they sit comfortably all day.",
    details: ["Titanium frame", "Mineral-glass lenses, 100% UV protection", "Adjustable nose pads", "Includes leather case", "Made in Japan"],
    stock: 0,
  },
  {
    slug: "crystal-drop-earrings",
    name: "Crystal Drop Earrings",
    categorySlug: "jewellery",
    priceCents: 112000,
    currency: usd,
    badge: "Limited",
    image: { src: unsplash("1535632066927-ab7c9ab60908"), alt: "Crystal and sapphire drop earrings on a monstera leaf" },
    description:
      "Faceted crystals set around a sapphire-blue centre stone, each pair assembled by hand in a limited run of two hundred.",
    details: ["Crystal and synthetic sapphire", "Drop length 4.5 cm", "Gold-plated brass, hypoallergenic posts", "Limited to 200 pairs"],
    stock: 2,
  },
  {
    slug: "chain-link-bracelet",
    name: "Chain Link Bracelet",
    categorySlug: "jewellery",
    priceCents: 86000,
    currency: usd,
    image: { src: unsplash("1611591437281-460bfbe1220a"), alt: "Rose-gold chain link bracelet on a blush background" },
    description:
      "Polished oval links in rose-gold vermeil with a concealed box clasp — substantial enough to wear alone, fine enough to stack.",
    details: ["18k rose-gold vermeil on sterling silver", "Length 18 cm", "Concealed box clasp"],
    stock: 8,
  },
  {
    slug: "technical-runner",
    name: "Technical Runner",
    categorySlug: "shoes",
    priceCents: 79000,
    currency: usd,
    image: { src: unsplash("1491553895911-0055eca6402d"), alt: "Black technical running sneaker suspended mid-air" },
    description:
      "A lightweight runner with a breathable knit upper and a responsive recycled-rubber sole, designed for city miles rather than the track.",
    details: ["Recycled polyester knit upper", "EVA midsole, recycled rubber outsole", "True to size", "Made in Portugal"],
    stock: 15,
  },
];
