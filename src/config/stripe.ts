// Stripe product and price configuration
// UPDATE these price IDs after creating prices in your Stripe dashboard

export const STRIPE_PRODUCTS = {
  premium: {
    product_id: "prod_U9GeQvBP0zf0jv",
    price_id: "PRICE_PREMIUM_PLACEHOLDER", // TODO: Replace with real price_id
    name: "Nexa Premium",
    price: 29,
    mode: "subscription" as const,
  },
  pro: {
    product_id: "prod_U9GeUOTFjUMgRq",
    price_id: "PRICE_PRO_PLACEHOLDER", // TODO: Replace with real price_id
    name: "Nexa PRO",
    price: 49,
    mode: "subscription" as const,
  },
  fundadora: {
    product_id: "prod_U9Gey3z2kOdaVp",
    price_id: "PRICE_FUNDADORA_PLACEHOLDER", // TODO: Replace with real price_id
    name: "Reserva Fundadora",
    price: 19,
    mode: "payment" as const,
  },
} as const;
