"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bulkImportProducts, type BulkImportResult } from "./actions";

type Result = BulkImportResult & { ok: boolean };

export function BulkImportForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [json, setJson] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  function handleFileChange(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setJson(String(reader.result ?? ""));
      setResult(null);
    };
    reader.readAsText(file);
  }

  async function handleImport() {
    if (!json.trim()) {
      setResult({ ok: false, total: 0, imported: 0, updated: 0, skipped: 0, errors: ["JSON khali hai. File choose karo ya paste karo."] });
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const res = await bulkImportProducts({ json });
      setResult({ ...res, ok: res.errors.length === 0 });
    } catch (error) {
      setResult({
        ok: false,
        total: 0,
        imported: 0,
        updated: 0,
        skipped: 0,
        errors: [error instanceof Error ? error.message : "Import failed."],
      });
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
          className="block w-full max-w-sm text-sm file:mr-3 file:rounded-md file:border file:border-border file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
        <Button type="button" onClick={handleImport} disabled={busy}>
          {busy ? "Importing..." : "Import JSON"}
        </Button>
      </div>

      <div>
        <Label htmlFor="bulk-json">Ya phir JSON yahan paste karo</Label>
        <Textarea
          id="bulk-json"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder={`[\n  { "name": "Product 1", "category": "Mobiles", "originalPrice": 19999, "salePrice": 999, "stock": 10 },\n  { "name": "Product 2", "category": "Audio", "originalPrice": 4999, "salePrice": 899, "stock": 5 }\n]`}
          className="min-h-[160px] font-mono text-xs"
        />
      </div>

      {result ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            result.ok
              ? "border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400"
              : "border-amber-600/30 bg-amber-600/10 text-amber-700 dark:text-amber-400"
          }`}
        >
          <p className="font-bold">
            {result.total} products · {result.imported} new · {result.updated}{" "}
            updated · {result.skipped} skipped
          </p>
          {result.errors.length > 0 ? (
            <ul className="mt-2 max-h-40 list-inside list-disc space-y-1 overflow-auto text-xs">
              {result.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
