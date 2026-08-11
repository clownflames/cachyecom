"use client";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "./actions";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        onClick={(e) => {
          if (!confirm(`Delete "${name}"? Ye wapas nahi aayega.`)) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </Button>
    </form>
  );
}
