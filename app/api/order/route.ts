import { NextResponse } from "next/server";

export type OrderApiBody = {
  orderId: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  fulfillment: "pickup" | "delivery";
  deliveryAddress: string | null;
  preferredDateTime: string;
  specialInstructions: string;
  lines: { name: string; quantity: number; lineTotalCents: number }[];
  subtotalCents: number;
};

function isValidOrderBody(body: unknown): body is OrderApiBody {
  if (!body || typeof body !== "object") return false;
  const o = body as Record<string, unknown>;
  if (
    typeof o.orderId !== "string" ||
    typeof o.createdAt !== "string" ||
    typeof o.customerName !== "string" ||
    typeof o.email !== "string" ||
    typeof o.phone !== "string" ||
    (o.fulfillment !== "pickup" && o.fulfillment !== "delivery") ||
    (o.deliveryAddress !== null && typeof o.deliveryAddress !== "string") ||
    typeof o.preferredDateTime !== "string" ||
    typeof o.specialInstructions !== "string" ||
    typeof o.subtotalCents !== "number" ||
    !Array.isArray(o.lines)
  ) {
    return false;
  }
  return o.lines.every(
    (line) =>
      line &&
      typeof line === "object" &&
      typeof (line as { name?: unknown }).name === "string" &&
      typeof (line as { quantity?: unknown }).quantity === "number" &&
      typeof (line as { lineTotalCents?: unknown }).lineTotalCents ===
        "number",
  );
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!isValidOrderBody(json)) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid order fields" },
      { status: 400 },
    );
  }

  if (json.fulfillment === "delivery" && !json.deliveryAddress?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Delivery address required for delivery" },
      { status: 400 },
    );
  }

  // Log for fulfillment / email handoff (replace with DB + email in production)
  console.log("[order]", JSON.stringify(json, null, 2));

  // TODO: Stripe — create Checkout Session or PaymentIntent, persist order as pending, return client secret or redirect URL.

  return NextResponse.json({
    ok: true,
    orderId: json.orderId,
    message: "Order received. We'll confirm by email or phone.",
  });
}
