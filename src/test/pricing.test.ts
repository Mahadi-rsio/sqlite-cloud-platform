import { describe, expect, it } from "vitest";

import { pricing } from "@/lib/pricing";

describe("the editable pricing sheet", () => {
  it("includes the requested 50 free compute unit-hours", () => {
    expect(pricing.instance.free_cu_hours).toBe(50);
  });

  it("includes the requested free one-gigabyte SQLite database", () => {
    expect(pricing.sqlite.free_storage_gb).toBe(1);
  });

  it("includes the requested 100,000 free monthly reads", () => {
    expect(pricing.sqlite.free_monthly_reads).toBe(100_000);
  });

  it("includes the requested 50,000 free monthly writes", () => {
    expect(pricing.sqlite.free_monthly_writes).toBe(50_000);
  });

  it("exposes rates per CU-minute and concrete sample SQLite rates", () => {
    expect(pricing.instance.rate_per_cu_minute_usd).toBe(0.0002);
    expect(pricing.sqlite.storage_per_gb_month_usd).toBe(0.12);
    expect(pricing.sqlite.reads_per_100k_usd).toBe(0.04);
    expect(pricing.sqlite.writes_per_50k_usd).toBe(0.12);
  });
});
