import { parse, type TomlTable } from "smol-toml";

import pricingSource from "../../pricing.toml?raw";

interface PricingSheet {
  instance: {
    free_cu_hours: number;
    rate_per_cu_minute_usd: number;
    calculation_note: string;
  };
  sqlite: {
    free_storage_gb: number;
    free_monthly_reads: number;
    free_monthly_writes: number;
    storage_per_gb_month_usd: number;
    reads_per_100k_usd: number;
    writes_per_50k_usd: number;
    calculation_note: string;
  };
}

function readPricingSheet(value: TomlTable): PricingSheet {
  const instance = value.instance;
  const sqlite = value.sqlite;

  if (instance == null || typeof instance !== "object") {
    throw new Error("pricing.toml must include an [instance] table.");
  }
  if (sqlite == null || typeof sqlite !== "object") {
    throw new Error("pricing.toml must include a [sqlite] table.");
  }

  const sheet = value as unknown as PricingSheet;
  const numbers = [
    sheet.instance.free_cu_hours,
    sheet.instance.rate_per_cu_minute_usd,
    sheet.sqlite.free_storage_gb,
    sheet.sqlite.free_monthly_reads,
    sheet.sqlite.free_monthly_writes,
    sheet.sqlite.storage_per_gb_month_usd,
    sheet.sqlite.reads_per_100k_usd,
    sheet.sqlite.writes_per_50k_usd,
  ];

  if (numbers.some((number) => !Number.isFinite(number) || number < 0)) {
    throw new Error(
      "pricing.toml must include a nonnegative numeric value for every allowance and price.",
    );
  }
  if (
    typeof sheet.instance.calculation_note !== "string" ||
    typeof sheet.sqlite.calculation_note !== "string"
  ) {
    throw new Error("pricing.toml must describe its instance and SQLite billing units.");
  }

  return sheet;
}

export const pricing = readPricingSheet(parse(pricingSource));
