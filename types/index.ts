export enum Field {
  TIME = "Time",
  "OVER 1k" = "BTC / Addr Cnt of Bal ≥ $1K",
  "OVER 10k" = "BTC / Val in Addrs w/ Bal ≥ $10K USD",
  "OVER 100k" = "BTC / Val in Addrs w/ Bal ≥ $100K USD",
  "OVER 1M" = "BTC / Val in Addrs w/ Bal ≥ $1M USD",
  "OVER 10M" = "BTC / Val in Addrs w/ Bal ≥ $10M USD"
}

export type BTC_DATA = Record<Field, string | number>;
