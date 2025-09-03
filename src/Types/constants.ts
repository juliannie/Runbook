export const FREQUENCIES = ["D", "W", "M", "Q", "Y"] as const;
export type Frequency = (typeof FREQUENCIES)[number];

export const STATUSES = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const;
export type Status = (typeof STATUSES)[number];
