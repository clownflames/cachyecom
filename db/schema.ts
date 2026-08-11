import {
  index,
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull().default(""),
    category: text("category").notNull(),
    image: text("image").notNull().default(""),
    images: text("images").array().notNull().default([]),
    originalPrice: integer("original_price").notNull(),
    salePrice: integer("sale_price").notNull(),
    offerPrice: integer("offer_price"),
    discountPercentage: integer("discount_percentage").notNull().default(0),
    rating: real("rating").notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    stock: integer("stock").notNull().default(0),
    badge: text("badge"),
    features: text("features").array().notNull().default([]),
    specifications: jsonb("specifications").$type<Record<string, string>>()
      .notNull()
      .default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    index("products_category_idx").on(table.category),
    index("products_sale_price_idx").on(table.salePrice),
  ]
);

export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerEmail: text("customer_email").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pincode: text("pincode").notNull(),
    landmark: text("landmark"),
    subtotal: integer("subtotal").notNull(),
    discount: integer("discount").notNull().default(0),
    total: integer("total").notNull(),
    paymentMethod: text("payment_method").notNull(),
    paymentStatus: text("payment_status").notNull(),
    transactionId: text("transaction_id"),
    orderDate: text("order_date").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("orders_created_at_idx").on(table.createdAt),
    index("orders_payment_status_idx").on(table.paymentStatus),
    index("orders_customer_email_idx").on(table.customerEmail),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: text("product_id").notNull(),
    name: text("name").notNull(),
    quantity: integer("quantity").notNull(),
    unitPrice: integer("unit_price").notNull(),
    lineSubtotal: integer("line_subtotal").notNull(),
  },
  (table) => [index("order_items_order_id_idx").on(table.orderId)]
);

export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;

export type OrderRow = typeof orders.$inferSelect;
export type NewOrderRow = typeof orders.$inferInsert;

export type OrderItemRow = typeof orderItems.$inferSelect;
export type NewOrderItemRow = typeof orderItems.$inferInsert;
