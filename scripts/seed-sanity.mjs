import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "zqr51v91",
  dataset: "production",
  token: "skYyUGh1iI2nwLUWuj1RTpv73BiOSdkIgzxCY0EuJ5zp9kalLlvs6fZPjZHXxdVSZBuQwMQ58nQBQOEjUSs9zmm1isGa1I4tRAP0drpmLYsItvsNjVApB9Sch95rmW3yhc2WqFUQVVOQKQD1bxggAkllYmQ8ASRyRG3EEtHZDPVXiDFlneGt",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const products = [
  {
    _id: "product-gold-potato",
    _type: "product",
    name: "Gold Potato & Farmer Cheese Pierogi",
    slug: { _type: "slug", current: "gold-potato-farmer-cheese-pierogi" },
    description: "Silky potato and tangy farmer cheese wrapped in a golden, hand-rolled dough.",
    priceCents: 1500,
    inStock: true,
    order: 1,
  },
  {
    _id: "product-pork-napa",
    _type: "product",
    name: "Pork & Napa Cabbage Dumplings",
    slug: { _type: "slug", current: "pork-napa-cabbage-dumplings" },
    description: "Savory pork and tender napa cabbage folded into delicate dumplings.",
    priceCents: 1500,
    inStock: true,
    order: 2,
  },
  {
    _id: "product-queso-fundido",
    _type: "product",
    name: "Queso Fundido Pierogi",
    slug: { _type: "slug", current: "queso-fundido-pierogi" },
    description: "Melty cheese and mild heat — comfort food with a Southwestern soul.",
    priceCents: 1800,
    inStock: true,
    order: 3,
  },
  {
    _id: "product-ribeye-onion",
    _type: "product",
    name: "Seared Ribeye & Caramelized Onion Dumplings",
    slug: { _type: "slug", current: "seared-ribeye-caramelized-onion-dumplings" },
    description: "Rich ribeye and slow-caramelized onions for an indulgent bite.",
    priceCents: 2400,
    inStock: true,
    order: 4,
  },
];

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  businessName: "Cornerstone Dumpling Co",
  tagline: "Handcrafted Dumplings Worth Savoring",
  heroSubtext: "Made with care in Cornelius, NC. Available for local pickup and delivery.",
  aboutText: "At Cornerstone, every dumpling is handmade from scratch using premium ingredients. From classic pierogis to bold fusion flavors, each batch is crafted with intention — food you can feel good about sharing.",
  location: "Cornelius, NC",
  orderNote: "We offer local pickup and delivery only — no shipping. We'll confirm your order by phone or email.",
};

async function seed() {
  console.log("Seeding Sanity dataset...");

  for (const product of products) {
    await client.createOrReplace(product);
    console.log(`✓ ${product.name}`);
  }

  await client.createOrReplace(siteSettings);
  console.log("✓ Site Settings");

  console.log("\nDone! All content seeded to Sanity.");
}

seed().catch(console.error);
