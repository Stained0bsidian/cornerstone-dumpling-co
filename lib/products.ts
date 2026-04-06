export type Product = {
  id: string;
  name: string;
  priceCents: number;
  imageSrc: string | null;
  description: string;
};

export const products: Product[] = [
  {
    id: "gold-potato-farmer-cheese",
    name: "Gold Potato & Farmer Cheese Pierogi",
    priceCents: 1500,
    imageSrc: null,
    description:
      "Silky potato and tangy farmer cheese wrapped in a golden, hand-rolled dough.",
  },
  {
    id: "pork-napa-dumplings",
    name: "Pork & Napa Cabbage Dumplings",
    priceCents: 1500,
    imageSrc: null,
    description:
      "Savory pork and tender napa cabbage folded into delicate dumplings.",
  },
  {
    id: "queso-fundido-pierogi",
    name: "Queso Fundido Pierogi",
    priceCents: 1800,
    imageSrc: null,
    description:
      "Melty cheese and mild heat—comfort food with a Southwestern soul.",
  },
  {
    id: "ribeye-onion-dumplings",
    name: "Seared Ribeye & Caramelized Onion Dumplings",
    priceCents: 2400,
    imageSrc: null,
    description:
      "Rich ribeye and slow-caramelized onions for an indulgent bite.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
