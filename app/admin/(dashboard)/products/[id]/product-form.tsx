"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveProduct, type SaveProductState } from "../actions";
import type { ProductRow } from "@/db/schema";
import { CATEGORIES } from "@/lib/products";

function LineField({
  label,
  id,
  value,
  hint,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={id} rows={3} defaultValue={value} placeholder={placeholder} />
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function ProductForm({ product }: { product: ProductRow | null }) {
  const [state, formAction, pending] = useActionState<SaveProductState, FormData>(
    saveProduct,
    null
  );

  // Prebuilt categories + current product's category (agar list mein nahi hai)
  const categoryOptions = Array.from(
    new Set([
      ...(product?.category ? [product.category] : []),
      ...CATEGORIES,
    ])
  );

  const specs = product?.specifications ?? {};
  const specsJson = Object.keys(specs).length
    ? JSON.stringify(specs, null, 2)
    : "";

  return (
    <form action={formAction} className="space-y-4">
      {state?.error ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <input type="hidden" name="id" value={product?.id ?? ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input id="name" name="name" required defaultValue={product?.name ?? ""} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={product?.slug ?? ""} placeholder="auto-generate ho jayega" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            name="category"
            required
            defaultValue={product?.category ?? CATEGORIES[0]}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="badge">Badge</Label>
          <Input id="badge" name="badge" defaultValue={product?.badge ?? ""} placeholder="e.g. Hot Deal" />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} defaultValue={product?.description ?? ""} />
      </div>

      <div>
        <Label htmlFor="image">Main Image URL</Label>
        <Input id="image" name="image" defaultValue={product?.image ?? ""} />
      </div>

      <LineField
        label="Additional Images (har line par ek URL)"
        id="images"
        value={(product?.images ?? []).join("\n")}
        placeholder={"https://example.com/img-1.jpg\nhttps://example.com/img-2.jpg"}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="originalPrice">Original Price *</Label>
          <Input id="originalPrice" name="originalPrice" type="number" min={0} required defaultValue={product?.originalPrice ?? 0} />
        </div>
        <div>
          <Label htmlFor="salePrice">Sale Price *</Label>
          <Input id="salePrice" name="salePrice" type="number" min={0} required defaultValue={product?.salePrice ?? 0} />
        </div>
        <div>
          <Label htmlFor="offerPrice">Offer Price</Label>
          <Input id="offerPrice" name="offerPrice" type="number" min={0} defaultValue={product?.offerPrice ?? ""} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="stock">Stock *</Label>
          <Input id="stock" name="stock" type="number" min={0} required defaultValue={product?.stock ?? 0} />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input id="rating" name="rating" type="number" min={0} max={5} step={0.1} defaultValue={product?.rating ?? 0} />
        </div>
        <div>
          <Label htmlFor="reviewCount">Review Count</Label>
          <Input id="reviewCount" name="reviewCount" type="number" min={0} defaultValue={product?.reviewCount ?? 0} />
        </div>
      </div>

      <LineField
        label="Features (har line par ek)"
        id="features"
        value={(product?.features ?? []).join("\n")}
        placeholder={"Feature 1\nFeature 2"}
      />

      <div>
        <Label htmlFor="specifications">Specifications (JSON)</Label>
        <Textarea
          id="specifications"
          name="specifications"
          rows={5}
          defaultValue={specsJson}
          className="font-mono text-xs"
          placeholder={'{\n  "Brand": "Samsung",\n  "RAM": "8GB"\n}'}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
