import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export type CheckoutRequestBody = {
  lines: { productId: string; quantity: number }[];
  customerName: string;
  email: string;
  phone: string;
  fulfillment: "pickup" | "delivery";
  deliveryAddress: string | null;
  preferredDateTime: string;
  specialInstructions: string;
};

export async function POST(request: Request) {
  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lines, customerName, email, phone, fulfillment, deliveryAddress, preferredDateTime, specialInstructions } = body;

  if (!lines?.length || !customerName || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Build Stripe line items from our product catalog
  const stripeLineItems = lines.map((line) => {
    const product = products.find((p) => p.id === line.productId);
    if (!product) throw new Error(`Unknown product: ${line.productId}`);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.priceCents,
      },
      quantity: line.quantity,
    };
  });

  const origin = request.headers.get("origin") ?? "https://cornerstone-dumpling.vercel.app";

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: email,
    success_url: `${origin}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    metadata: {
      customerName,
      phone,
      fulfillment,
      deliveryAddress: deliveryAddress ?? "",
      preferredDateTime,
      specialInstructions: specialInstructions.slice(0, 500),
    },
  });

  return NextResponse.json({ url: session.url });
}
