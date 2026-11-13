/**
 * Storefront view types plus editorial content (hero, collections, story, navigation) that still lives in code.
 * Products, categories and stock come from the database — see `src/lib/products.ts`.
 * Imagery: Unsplash (https://unsplash.com/license).
 */

export type Img = { src: string; alt: string };

export type CatalogProduct = {
  slug: string;
  name: string;
  /** Category display name, e.g. "Ready-to-wear". */
  category: string;
  /** Category slug for `/collections/[slug]` links. */
  categorySlug: string;
  priceCents: number;
  currency: string;
  image: Img;
  badge?: string;
};

export type Collection = {
  slug: string;
  title: string;
  eyebrow?: string;
  description?: string;
  image: Img;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const hero = {
  eyebrow: "Autumn–Winter 2026",
  title: "City Layers",
  cta: { label: "Discover the collection", href: "/collections/autumn-winter-2026" },
  images: [
    {
      src: unsplash("1539109136881-3be0616acf4b"),
      alt: "Woman in a pale blue wool coat standing in a historic city square",
    },
    {
      src: unsplash("1617137968427-85924c800a22"),
      alt: "Man in a navy tailored suit walking past a glass building",
    },
  ] satisfies Img[],
};

export const featuredCollections: Collection[] = [
  {
    slug: "women",
    title: "Women",
    eyebrow: "New season",
    image: {
      src: unsplash("1581044777550-4cfa60707c03"),
      alt: "Woman in a ruffled blush dress in a golden field",
    },
  },
  {
    slug: "men",
    title: "Men",
    eyebrow: "New season",
    image: {
      src: unsplash("1552374196-1ab2a1c593e8"),
      alt: "Man in a camel overcoat seated on a wooden stool",
    },
  },
];

export const editorialTile: Collection = {
  slug: "the-resort-edit",
  title: "The Resort Edit",
  eyebrow: "Collection",
  image: {
    src: unsplash("1496747611176-843222e1e57c"),
    alt: "Woman in a floral wrap dress by the sea",
  },
};

/** Curated homepage rails. Product data (name, price, stock…) comes from the database via `src/lib/products.ts`. */
export const newArrivalSlugs = [
  "pleated-leather-bag",
  "fringed-cotton-poncho",
  "leather-biker-jacket",
  "nylon-bomber-jacket",
  "woven-leather-tote",
  "silk-jogger-trousers",
  "floral-jacquard-pumps",
  "structured-satchel",
  "organic-cotton-t-shirt",
  "pearl-strand-necklace",
];

export const finishingTouchSlugs = [
  "leather-strap-watch",
  "round-metal-sunglasses",
  "crystal-drop-earrings",
  "chain-link-bracelet",
  "technical-runner",
];

export const story = {
  eyebrow: "The atelier",
  title: "Made slowly, worn for decades",
  body: "Every piece begins in a small workshop — cut by hand, finished by the same artisan who started it, and produced in runs of a few hundred at most.",
  cta: { label: "Read the story", href: "/stories/the-atelier" },
  image: {
    src: unsplash("1558769132-cb1aea458c5e"),
    alt: "Rail of knitwear in natural tones beside dried pampas grass",
  },
};

export const services = [
  {
    title: "Complimentary shipping",
    body: "Free express delivery and returns on every order, wrapped in our signature packaging.",
    link: { label: "Delivery & returns", href: "/services/shipping" },
  },
  {
    title: "Personalisation",
    body: "Add initials to leather goods and selected ready-to-wear, embossed by hand in our workshop.",
    link: { label: "Discover", href: "/services/personalisation" },
  },
  {
    title: "Book an appointment",
    body: "Shop with a client advisor in store or by video call, at a time that suits you.",
    link: { label: "Book now", href: "/services/appointments" },
  },
];

export const navigation = {
  primary: [
    { label: "New In", href: "/collections/new-in" },
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Bags", href: "/collections/bags" },
    { label: "Jewellery", href: "/collections/jewellery" },
    { label: "Gifts", href: "/collections/gifts" },
  ],
  secondary: [
    { label: "My account", href: "/account" },
    { label: "Client services", href: "/services" },
    { label: "Store locator", href: "/stores" },
  ],
};

export const footerColumns = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "/services/contact" },
      { label: "Delivery & returns", href: "/services/shipping" },
      { label: "Care guide", href: "/services/care" },
      { label: "FAQ", href: "/services/faq" },
    ],
  },
  {
    title: "The house",
    links: [
      { label: "Our story", href: "/stories/the-atelier" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Stores", href: "/stores" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of sale", href: "/legal/terms" },
      { label: "Cookie settings", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Product detail
   ------------------------------------------------------------------------ */

export type StockState = "in-stock" | "low-stock" | "sold-out";

export type ProductDetail = CatalogProduct & {
  description: string;
  /** Bullet points for the "Details" panel (materials, dimensions, origin). */
  details: string[];
  /** Units available. 0 = sold out. */
  stock: number;
  /** Gallery; the card image always comes first. */
  images: Img[];
};

/** At or below this many units the PDP says "Only N left". */
export const LOW_STOCK_THRESHOLD = 3;

export function stockState(stock: number): StockState {
  if (stock <= 0) return "sold-out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}
