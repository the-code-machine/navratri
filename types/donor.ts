// types/donor.ts

export interface Donor {
  id: string;
  series: string; // "A" | "B"
  jyotiNo: number;
  nameHindi: string;
  nameEnglish: string;
  city: string;
  receipt: number;
  mobile: string;
  type: string; // "Permanent" | "New"
  amount: number;
  status?: string;
  notes?: string;
}

export interface DonationFormData {
  name: string;
  mobile: string;
  city: string;
  amount: string;
  category: string;
  notes: string;
}

export type AlphaMode = "hindi" | "english";
export type SeriesFilter = "all" | "A" | "B";
export type TypeFilter = "all" | "Permanent" | "New";
