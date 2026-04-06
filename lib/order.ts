export const LAST_ORDER_STORAGE_KEY = "cornerstone:lastOrder";

export type CheckoutOrder = {
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
