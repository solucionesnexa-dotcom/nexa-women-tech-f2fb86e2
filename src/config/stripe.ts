// Stripe product and price configuration
// UPDATE these price IDs after creating prices in your Stripe dashboard

export const STRIPE_PRODUCTS = {
  premium: {
    product_id: "prod_U9GeQvBP0zf0jv",
    price_id: "price_1TBLhGFBOT2ABsl3JoBN4zHQ",
    name: "Nexa Premium",
    price: 29,
    mode: "subscription" as const,
  },
  pro: {
    product_id: "prod_U9GeUOTFjUMgRq",
    price_id: "price_1TBLgrFBOT2ABsl3Yaj7R9ae",
    name: "Nexa PRO",
    price: 49,
    mode: "subscription" as const,
  },
  fundadora: {
    product_id: "prod_U707P4pSA2PRUu",
    price_id: "price_1TBLn0FBOT2ABsl3t9eJ6Cu0",
    name: "Reserva Fundadora",
    price: 19,
    mode: "payment" as const,
  },
} as const;
