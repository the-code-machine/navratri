"use client";
// pages/index.tsx  (or app/page.tsx)
// ─────────────────────────────────────────────────────────────────────────────
//  माता बाग मंदिर कुरवाई  |  Navratri 2026  |  Final Version
//  SETUP:  npm install lucide-react
// ─────────────────────────────────────────────────────────────────────────────

import Head from "next/head";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import {
  Search,
  Phone,
  ReceiptText,
  MapPin,
  Tag,
  Type,
  Flame,
  Calendar,
  Star,
  Users,
  Heart,
  CheckCircle,
  Plus,
  RefreshCw,
  AlignJustify,
  Sparkles,
  Instagram,
  X,
  ChevronDown,
  AlertCircle,
  Info,
  Download,
  QrCode,
  Smartphone,
} from "lucide-react";

export type AlphaMode = "hindi" | "english";
export type SeriesFilter = "all" | "A" | "B";
export type TypeFilter = "all" | "Permanent" | "New";

export interface Donor {
  id: string;
  series: string;
  jyotiNo: number;
  nameHindi: string;
  nameEnglish: string;
  city: string;
  receipt: number;
  mobile: string;
  type: string;
  amount: number;
  status: string;
  notes: string;
}

export interface DonationFormData {
  name: string;
  mobile: string;
  city: string;
  amount: string;
  category: string;
  utr: string;
}

import { url } from "@/config"; // Adjust path if needed or define SCRIPT_URL directly below

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SCRIPT_URL = url || ""; // ← Google Apps Script Web App URL
const PHONEPE_LINK = ""; // ← e.g. https://phon.pe/ru_YOURCODE
const UPI_ID = "9238669830@okbizaxis"; // ← UPI ID
const PAYEE_NAME = "श्री माता बाग मंदिर समिति कुरवाई";
const PAGE_SIZE = 12;

// ── SPECIAL MENTIONS ─────────────────────────────────────────────────────────
const SPECIAL_MENTIONS = [
  "विशेष घृत ज्योति — श्री संजयवत्स जी (नई दिल्ली)",
  "विशेष घृत ज्योति — श्री हरिसिंह जी सप्रे, विधायक एवं संरक्षक कुरवाई",
];

// ── DONATION TYPES ────────────────────────────────────────────────────────────
const DONATION_TYPES = [
  {
    value: "tel-jyoti",
    label: "तेल ज्योति",
    amount: "701",
    hint: "₹701/- निर्धारित",
  },
  {
    value: "ghee-jyoti",
    label: "घी ज्योति",
    amount: "1801",
    hint: "₹1,801/- निर्धारित",
  },
  {
    value: "nirmaan",
    label: "निर्माण कार्य हेतु",
    amount: "",
    hint: "राशि दर्ज करें",
  },
  {
    value: "bhandara",
    label: "भंडारा हेतु",
    amount: "",
    hint: "राशि दर्ज करें",
  },
  { value: "anya-dan", label: "अन्य दान", amount: "", hint: "राशि दर्ज करें" },
];

// ── DEMO DATA ─────────────────────────────────────────────────────────────────
const DONORS_DEMO: Donor[] = [
  {
    id: "A1",
    series: "A",
    jyotiNo: 1,
    nameHindi: "श्री प्रभूदयाल जी राठौर",
    nameEnglish: "Shri Prabhuduyal Rathore (Patron)",
    city: "Kurwai",
    receipt: 878,
    mobile: "",
    type: "Permanent",
    amount: 2121,
    status: "Registered",
    notes: "",
  },
  {
    id: "A2",
    series: "A",
    jyotiNo: 2,
    nameHindi: "श्री वीरसिंह जी पंवार",
    nameEnglish: "Shri Veersingh Panwar (Ex-MLA)",
    city: "Kurwai",
    receipt: 879,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A3",
    series: "A",
    jyotiNo: 3,
    nameHindi: "श्रीमति नीता ब्रजेश सप्रे",
    nameEnglish: "Smt. Neeta Brajesh Sapre (Sarpanch)",
    city: "Kurwai",
    receipt: 880,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A4",
    series: "A",
    jyotiNo: 4,
    nameHindi: "श्री कृष्णा सरिता निखलेश सक्सैना",
    nameEnglish: "Shri Krishna Nikhilesh Saxena",
    city: "Kurwai",
    receipt: 881,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A5",
    series: "A",
    jyotiNo: 5,
    nameHindi: "श्रीमति वैजयन्ति चंचल",
    nameEnglish: "Smt. Vaijayanti Chanchal (Teacher)",
    city: "Kurwai",
    receipt: 882,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A6",
    series: "A",
    jyotiNo: 6,
    nameHindi: "श्रीमति रेखा जगदीश साहू",
    nameEnglish: "Smt. Rekha Jagdish Sahu",
    city: "Kurwai",
    receipt: 883,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A7",
    series: "A",
    jyotiNo: 7,
    nameHindi: "श्रीमति मायादेवी पंचम लाल सप्रे",
    nameEnglish: "Smt. Mayadevi Panchamlal Sapre",
    city: "Kurwai",
    receipt: 884,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A8",
    series: "A",
    jyotiNo: 8,
    nameHindi: "श्री अखिलेश साहू",
    nameEnglish: "Shri Akhilesh Sahu (GM Railway)",
    city: "Kurwai",
    receipt: 885,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A9",
    series: "A",
    jyotiNo: 9,
    nameHindi: "श्रीमति रमन राजकुमार तिवारी",
    nameEnglish: "Smt. Raman Rajkumar Tiwari",
    city: "Sihora",
    receipt: 886,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A10",
    series: "A",
    jyotiNo: 10,
    nameHindi: "श्रीमति कमला सीताराम चैबे",
    nameEnglish: "Smt. Kamla Sitaram Chaube",
    city: "Kurwai",
    receipt: 887,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A11",
    series: "A",
    jyotiNo: 11,
    nameHindi: "श्रीमति रजनी रामगोपाल रघुवंशी",
    nameEnglish: "Smt. Rajni Ramgopal Raghuvanshi",
    city: "Kurwai",
    receipt: 888,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A12",
    series: "A",
    jyotiNo: 12,
    nameHindi: "श्रीमती प्रियंका राहुल सिंहल",
    nameEnglish: "Smt. Priyanka Rahul Singhal",
    city: "Kurwai",
    receipt: 889,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A13",
    series: "A",
    jyotiNo: 13,
    nameHindi: "श्री राजनसिंह लोधी",
    nameEnglish: "Shri Rajansingh Lodhi",
    city: "Kurwai",
    receipt: 890,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A14",
    series: "A",
    jyotiNo: 14,
    nameHindi: "श्रीमती श्रद्धा मुकेश शर्मा",
    nameEnglish: "Smt. Shraddha Mukesh Sharma",
    city: "Bhopal",
    receipt: 891,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A15",
    series: "A",
    jyotiNo: 15,
    nameHindi: "श्री रामसहाय जडिया",
    nameEnglish: "Shri Ramsahay Jadiya",
    city: "Dudhawari",
    receipt: 892,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A16",
    series: "A",
    jyotiNo: 16,
    nameHindi: "श्रीमति इंद्रा साहू",
    nameEnglish: "Smt. Indra Sahu",
    city: "Sironj",
    receipt: 893,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A17",
    series: "A",
    jyotiNo: 17,
    nameHindi: "श्री धमेन्द्रसिंह दाॅगी",
    nameEnglish: "Shri Dharmendrasingh Dangi",
    city: "Karai Berkhedi",
    receipt: 894,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A18",
    series: "A",
    jyotiNo: 18,
    nameHindi: "श्री रंजीत गोलू पंथी",
    nameEnglish: "Shri Ranjit / Golu Panthi",
    city: "Kurwai",
    receipt: 895,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A19",
    series: "A",
    jyotiNo: 19,
    nameHindi: "श्रीमति रानी रामप्रकाश अहिरवार",
    nameEnglish: "Smt. Rani Ramprakash Ahirwar",
    city: "Kurwai",
    receipt: 896,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A20",
    series: "A",
    jyotiNo: 20,
    nameHindi: "श्रीमति सपना संतोष श्रीवास्तव",
    nameEnglish: "Smt. Sapna Santosh Shrivastava",
    city: "Kurwai",
    receipt: 897,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A21",
    series: "A",
    jyotiNo: 21,
    nameHindi: "श्री गणेश राम प्रजापति",
    nameEnglish: "Shri Ganesh Ram Prajapati",
    city: "Kurwai",
    receipt: 898,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A22",
    series: "A",
    jyotiNo: 22,
    nameHindi: "श्री मंयक श्रीवास्तव",
    nameEnglish: "Shri Mayank Shrivastava",
    city: "Kurwai",
    receipt: 899,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A23",
    series: "A",
    jyotiNo: 23,
    nameHindi: "श्री सौरभ श्रीवास्तव",
    nameEnglish: "Shri Saurabh Shrivastava",
    city: "Kurwai",
    receipt: 900,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A24",
    series: "A",
    jyotiNo: 24,
    nameHindi: "श्री शैलेन्द्रसिंह शेखपुर",
    nameEnglish: "Shri Shailendrasingh Shekhpur",
    city: "Shekhpur",
    receipt: 901,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A25",
    series: "A",
    jyotiNo: 25,
    nameHindi: "श्री राजपालसिंह दाॅगी",
    nameEnglish: "Shri Rajpalsingh Dangi",
    city: "Mandi Bamora",
    receipt: 902,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A26",
    series: "A",
    jyotiNo: 26,
    nameHindi: "श्री विनायक मुकेश शर्मा",
    nameEnglish: "Shri Vinayak Mukesh Sharma",
    city: "Bhopal",
    receipt: 903,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A27",
    series: "A",
    jyotiNo: 27,
    nameHindi: "श्री भगवतसिंह जाट",
    nameEnglish: "Shri Bhagwatsingh Jat (CEO)",
    city: "Kurwai",
    receipt: 904,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A28",
    series: "A",
    jyotiNo: 28,
    nameHindi: "श्री डाॅ. हरिओम शर्मा",
    nameEnglish: "Dr. Hariom Sharma",
    city: "Kurwai",
    receipt: 905,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A29",
    series: "A",
    jyotiNo: 29,
    nameHindi: "कु. प्रिया शर्मा",
    nameEnglish: "Ku. Priya Sharma",
    city: "Kurwai",
    receipt: 906,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A30",
    series: "A",
    jyotiNo: 30,
    nameHindi: "श्रीमति जयश्री नीलेश कुशवाह",
    nameEnglish: "Smt. Jayashri Nilesh Kushwah",
    city: "Kurwai",
    receipt: 907,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A35",
    series: "A",
    jyotiNo: 35,
    nameHindi: "श्रीमति संध्या अशोक सोनी",
    nameEnglish: "Smt. Sandhya Ashok Soni",
    city: "Kurwai",
    receipt: 912,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A38",
    series: "A",
    jyotiNo: 38,
    nameHindi: "श्रीमति दीपिका भानू निगम",
    nameEnglish: "Smt. Deepika Bhanu Nigam",
    city: "Indore",
    receipt: 915,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A41",
    series: "A",
    jyotiNo: 41,
    nameHindi: "श्री जितेन्द्रसिंह दांगी",
    nameEnglish: "Shri Jitendrasingh Dangi (Sarpanch)",
    city: "Kankar",
    receipt: 918,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A44",
    series: "A",
    jyotiNo: 44,
    nameHindi: "श्री ऋषिल मीनाक्षी जैन",
    nameEnglish: "Shri Rushil / Meenakshi Jain",
    city: "Kaikhora",
    receipt: 921,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A47",
    series: "A",
    jyotiNo: 47,
    nameHindi: "श्रीमति प्रीति आशुतोष शर्मा",
    nameEnglish: "Smt. Preeti Ashutosh Sharma",
    city: "Sironj",
    receipt: 924,
    mobile: "",
    type: "New",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A48",
    series: "A",
    jyotiNo: 48,
    nameHindi: "कु. गौरवी नेहा अंकित दुबे",
    nameEnglish: "Ku. Gauravi / Neha / Ankit Dube",
    city: "Indore",
    receipt: 925,
    mobile: "",
    type: "New",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "A67",
    series: "A",
    jyotiNo: 67,
    nameHindi: "श्री अंकित सप्रे",
    nameEnglish: "Shri Ankit Sapre (Simba Construction)",
    city: "Kurwai",
    receipt: 944,
    mobile: "",
    type: "New",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B1",
    series: "B",
    jyotiNo: 1,
    nameHindi: "श्रीमति ऊषा अनिल चैबे",
    nameEnglish: "Smt. Usha Anil Chaube",
    city: "Kurwai",
    receipt: 526,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B2",
    series: "B",
    jyotiNo: 2,
    nameHindi: "श्रीमति श्यामदेवी चैबे",
    nameEnglish: "Smt. Shyamdevi Chaube",
    city: "Kurwai",
    receipt: 527,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B3",
    series: "B",
    jyotiNo: 3,
    nameHindi: "कु. मैथिली विनीता चैबे",
    nameEnglish: "Ku. Maithili / Vineeta Chaube",
    city: "Kurwai",
    receipt: 528,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B4",
    series: "B",
    jyotiNo: 4,
    nameHindi: "श्रीमति सरोज कोरी",
    nameEnglish: "Smt. Saroj Narayandas Kori (Teacher)",
    city: "Kurwai",
    receipt: 529,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B5",
    series: "B",
    jyotiNo: 5,
    nameHindi: "कु. दिव्या कुशवाह",
    nameEnglish: "Ku. Divya Kushwah",
    city: "Kurwai",
    receipt: 530,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B6",
    series: "B",
    jyotiNo: 6,
    nameHindi: "श्रीमति उमा ओमप्रकाश शर्मा",
    nameEnglish: "Smt. Uma Omprakash Sharma",
    city: "Kurwai",
    receipt: 531,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B7",
    series: "B",
    jyotiNo: 7,
    nameHindi: "श्री विशनसिंह राजपूत",
    nameEnglish: "Shri Vishansingh Rajput",
    city: "Vishanpur",
    receipt: 532,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B8",
    series: "B",
    jyotiNo: 8,
    nameHindi: "श्री रोहित सुखराज प्रजापति",
    nameEnglish: "Shri Rohit Sukhraj Prajapati",
    city: "Kurwai",
    receipt: 533,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B9",
    series: "B",
    jyotiNo: 9,
    nameHindi: "श्री सुनील मोतीलाल प्रजापति",
    nameEnglish: "Shri Sunil Motilal Prajapati",
    city: "Kurwai",
    receipt: 534,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B10",
    series: "B",
    jyotiNo: 10,
    nameHindi: "श्रीमति निर्मला खत्री",
    nameEnglish: "Smt. Nirmala Khatri",
    city: "Kurwai",
    receipt: 535,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B11",
    series: "B",
    jyotiNo: 11,
    nameHindi: "श्रीमती वैष्णवी शर्मा",
    nameEnglish: "Smt. Vaishnavi Sharma",
    city: "Ashtha",
    receipt: 643,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B12",
    series: "B",
    jyotiNo: 12,
    nameHindi: "श्रीमति नम्रता अंशुल यादव",
    nameEnglish: "Smt. Namrata Anshul Yadav",
    city: "Kurwai",
    receipt: 536,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B48",
    series: "B",
    jyotiNo: 48,
    nameHindi: "श्री मारूति",
    nameEnglish: "Shri Marruti",
    city: "Kurwai",
    receipt: 571,
    mobile: "9981139984",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B49",
    series: "B",
    jyotiNo: 49,
    nameHindi: "श्री गोविन्द शरण सोनी",
    nameEnglish: "Shri Govind Sharan Soni",
    city: "Kurwai",
    receipt: 572,
    mobile: "8085867267",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B50",
    series: "B",
    jyotiNo: 50,
    nameHindi: "श्रीमति द्रोपती नरेन्द्र पंथी",
    nameEnglish: "Smt. Dropati Narendra Panthi",
    city: "Kurwai",
    receipt: 799,
    mobile: "9993159360",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B60",
    series: "B",
    jyotiNo: 60,
    nameHindi: "श्री सुरेन्द्रसिंह ठाकुर",
    nameEnglish: "Shri Surendrasingh Thakur",
    city: "Mohli",
    receipt: 582,
    mobile: "8959259956",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B100",
    series: "B",
    jyotiNo: 100,
    nameHindi: "श्री निखिल श्यामलाल सप्रे",
    nameEnglish: "Shri Nikhil Shyamlal Sapre",
    city: "Kurwai",
    receipt: 619,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B150",
    series: "B",
    jyotiNo: 150,
    nameHindi: "श्रीमति गेंदावाई ईश्वरी पंथी",
    nameEnglish: "Smt. Gendawai Ishwari Panthi",
    city: "Kurwai",
    receipt: 668,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B222",
    series: "B",
    jyotiNo: 222,
    nameHindi: "डाॅ. सुरूचि कुशवाह",
    nameEnglish: "Dr. Suruchi Kushwah (Secretary)",
    city: "Kurwai",
    receipt: 726,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B271",
    series: "B",
    jyotiNo: 271,
    nameHindi: "श्री अवतारसिंह मूडरी",
    nameEnglish: "Shri Avtarsingh Mudri",
    city: "Mudri",
    receipt: 791,
    mobile: "9617424216",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B300",
    series: "B",
    jyotiNo: 300,
    nameHindi: "श्री राहुल यादव",
    nameEnglish: "Shri Rahul Yadav",
    city: "Mandi Bamora",
    receipt: 824,
    mobile: "",
    type: "New",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B351",
    series: "B",
    jyotiNo: 351,
    nameHindi: "श्री रघुवरदयाल साहू",
    nameEnglish: "Shri Raghuwarduyal Sahu",
    city: "Kurwai",
    receipt: 875,
    mobile: "",
    type: "Permanent",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B361",
    series: "B",
    jyotiNo: 361,
    nameHindi: "श्री बाबूलाल पंथी",
    nameEnglish: "Shri Baboolal Panthi (Singer)",
    city: "Bhopal",
    receipt: 960,
    mobile: "",
    type: "New",
    amount: 0,
    status: "Registered",
    notes: "",
  },
  {
    id: "B367",
    series: "B",
    jyotiNo: 367,
    nameHindi: "श्रीमति शीला पवन मेवाड़ा",
    nameEnglish: "Smt. Sheela Pawan Mewada",
    city: "Ashtha",
    receipt: 966,
    mobile: "",
    type: "New",
    amount: 0,
    status: "Registered",
    notes: "",
  },
];

const HINDI_ALPHA = [
  "अ",
  "आ",
  "इ",
  "ई",
  "उ",
  "ऊ",
  "ए",
  "ऐ",
  "ओ",
  "औ",
  "क",
  "ख",
  "ग",
  "घ",
  "च",
  "छ",
  "ज",
  "झ",
  "त",
  "थ",
  "द",
  "ध",
  "न",
  "प",
  "फ",
  "ब",
  "भ",
  "म",
  "य",
  "र",
  "ल",
  "व",
  "श",
  "स",
  "ह",
];
const ENG_ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function normalizeType(t: string): "Permanent" | "New" {
  const s = (t || "").trim();
  if (s === "स्थाई" || s === "Permanent" || s.toLowerCase() === "permanent") {
    return "Permanent";
  }
  return "New";
}

function getEffectiveAmount(donor: Donor): number {
  if (donor.amount && donor.amount > 0) return donor.amount;
  if (donor.series === "A") return 1801;
  if (donor.series === "B") return 701;
  return 0;
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info";
interface ToastItem {
  id: number;
  msg: string;
  type: ToastType;
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const show = useCallback((msg: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4500);
  }, []);
  return { toasts, show };
}

function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  if (!toasts.length) return null;
  const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={15} />,
    error: <AlertCircle size={15} />,
    info: <Info size={15} />,
  };
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {icons[t.type]} {t.msg}
        </div>
      ))}
    </div>
  );
}

// ── DIGITAL RECEIPT ───────────────────────────────────────────────────────────
async function openDigitalReceipt(donor: Donor): Promise<void> {
  const now = new Date();
  const date = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;

  let signatureSrc = "";
  try {
    const res = await fetch("/signature.png");
    const blob = await res.blob();
    signatureSrc = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    signatureSrc = "";
  }

  const effectiveAmt = getEffectiveAmount(donor);
  const amtStr =
    effectiveAmt > 0 ? `₹${effectiveAmt.toLocaleString("hi-IN")}/-` : "";

  const cat = (donor.notes || "").toLowerCase();
  const isGhee =
    cat.includes("ghee") || donor.amount === 1801 || donor.series === "A";
  const isTel =
    cat.includes("tel") || donor.amount === 701 || donor.series === "B";

  const gheeCircle = isGhee
    ? "background:#8B1A1A;border-color:#8B1A1A;"
    : "background:#fff;border-color:#8B1A1A;";
  const gheeTxt = isGhee ? "color:#FFD700;" : "color:#8B1A1A;";
  const telCircle = isTel
    ? "background:#8B1A1A;border-color:#8B1A1A;"
    : "background:#fff;border-color:#8B1A1A;";
  const telTxt = isTel ? "color:#FFD700;" : "color:#8B1A1A;";
  const gheeAmt = isGhee && amtStr ? amtStr : "1801/-";
  const telAmt = isTel && amtStr ? amtStr : "701/-";

  const safeName = donor.nameEnglish
    .replace(/[^a-zA-Z0-9]/g, "-")
    .substring(0, 20);
  const filename = `receipt-${donor.jyotiNo}-${safeName}.png`;

  const html = `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>रसीद — ${donor.nameHindi}</title>
<link href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit:ital@0;1&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#f0ece4;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;font-family:'DM Sans',sans-serif}
  .receipt{width:420px;max-width:100%;background:#FFF9EE;border:3px solid #8B1A1A;border-radius:4px;box-shadow:0 6px 24px rgba(0,0,0,.2);overflow:hidden}
  .top-strip{background:#8B1A1A;padding:.32rem .6rem;display:flex;justify-content:space-between;align-items:center}
  .top-strip span{color:#FFD700;font-size:.62rem;letter-spacing:.06em;font-weight:700;font-family:'DM Sans',sans-serif}
  .title-row{background:#FFF3E0;padding:.5rem .75rem .28rem;text-align:center;border-bottom:2px solid #8B1A1A}
  .title-hi{font-family:'Tiro Devanagari Sanskrit',serif;font-size:1.18rem;color:#8B1A1A;font-weight:700;line-height:1.3}
  .main-row{display:flex;align-items:center;justify-content:space-between;padding:.5rem .7rem;border-bottom:2px dashed #C0892A;background:#FFF9EE;gap:.5rem}
  .circle-badge{width:56px;height:56px;border-radius:50%;border:2.5px solid #8B1A1A;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;padding:.2rem}
  .circle-badge .cb-lbl{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.65rem;font-weight:700;line-height:1.2}
  .circle-badge .cb-amt{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700}
  .temple-center{text-align:center;flex:1;padding:0 .3rem}
  .temple-name{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.95rem;color:#8B1A1A;font-weight:700;line-height:1.4}
  .temple-navratri{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.58rem;color:#8B1A1A;margin-top:.18rem;line-height:1.45;text-align:center}
  .meta-row{display:flex;justify-content:space-between;align-items:center;padding:.4rem .75rem;border-bottom:1px solid #E8D5A0;background:#FFFDF5}
  .kra-wrap{display:flex;align-items:baseline;gap:.3rem}
  .kra-label{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.7rem;color:#666}
  .kra-num{font-family:'DM Sans',sans-serif;font-size:1.25rem;color:#8B1A1A;font-weight:700}
  .date-wrap{text-align:right}
  .date-label{font-size:.62rem;color:#666;font-family:'Tiro Devanagari Sanskrit',serif}
  .date-val{font-size:.88rem;font-weight:700;color:#1a1a1a;font-family:'DM Sans',sans-serif}
  .field-row{padding:.3rem .75rem;border-bottom:1px solid #EEE0C0;display:flex;align-items:baseline;gap:.35rem;background:#FFF9EE}
  .f-label{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.65rem;color:#8B1A1A;font-weight:700;white-space:nowrap;flex-shrink:0}
  .f-val{flex:1;border-bottom:1px dotted #8B1A1A;font-family:'Tiro Devanagari Sanskrit',serif;font-size:.88rem;color:#1a1a1a;padding-bottom:1px;min-height:1.45rem;display:flex;align-items:flex-end}
  .amount-note{padding:.3rem .75rem;font-size:.65rem;color:#555;line-height:1.5;border-bottom:1px solid #EEE0C0;background:#FFFDF5;font-family:'DM Sans',sans-serif}
  .thankyou{text-align:center;padding:.38rem .5rem;font-size:.75rem;color:#8B1A1A;font-weight:700;font-family:'Tiro Devanagari Sanskrit',serif;border-bottom:1px dashed #C0892A;background:#FFF3E0}
  .sig-row{display:flex;justify-content:space-between;align-items:flex-end;padding:.55rem .75rem;background:#FFF9EE}
  .sig-left{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.75rem;color:#8B1A1A;line-height:1.6}
  .sig-right{text-align:right;display:flex;flex-direction:column;align-items:flex-end}
  .sig-img{width:100px;height:42px;object-fit:contain;display:block;margin-bottom:-2px}
  .sig-line{width:100px;border-bottom:1.5px solid #8B1A1A}
  .sig-label{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.68rem;color:#8B1A1A;margin-top:.15rem}
  .sig-sublabel{font-family:'Tiro Devanagari Sanskrit',serif;font-size:.6rem;color:#888;margin-top:.05rem}
  .bot-strip{background:#8B1A1A;padding:.28rem .5rem;text-align:center;color:rgba(255,215,0,.85);font-size:.6rem;letter-spacing:.04em;font-family:'DM Sans',sans-serif}
  .btn-row{display:flex;gap:.55rem;margin-top:.9rem;justify-content:center;flex-wrap:wrap}
  .btn{padding:.58rem 1.1rem;border:none;border-radius:8px;font-size:.82rem;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:700;display:flex;align-items:center;gap:.35rem;transition:opacity .15s}
  .btn-pdf{background:#8B1A1A;color:#fff}
  .btn-img{background:#1a6b3c;color:#fff}
  .btn-close{background:#e5e7eb;color:#374151}
  .btn:hover{opacity:.85}
  .btn:disabled{opacity:.55;cursor:not-allowed}
  @media print{body{background:#fff;padding:0;display:block}.btn-row{display:none!important}.receipt{box-shadow:none;width:100%;max-width:none}}
  @media(max-width:480px){.receipt{width:100%}.btn-row{gap:.4rem}.btn{padding:.55rem .85rem;font-size:.78rem}}
</style>
</head>
<body>
<div class="receipt" id="receiptEl">
  <div class="top-strip">
    <span>जय माता दी</span><span>जय मां बीजासन</span><span>जय माता दी</span>
  </div>
  <div class="title-row">
    <div class="title-hi">सर्वमनोकामना पूर्ति अखंड ज्योति</div>
  </div>
  <div class="main-row">
    <div class="circle-badge" style="${gheeCircle}">
      <span class="cb-lbl" style="${gheeTxt}">घृत</span>
      <span class="cb-amt" style="${gheeTxt}">${gheeAmt}</span>
    </div>
    <div class="temple-center">
      <div class="temple-name">श्री माता बाग मंदिर कुरवाई</div>
      <div class="temple-navratri">
        रौद्र नाम संवत्सरीयम् चैत्रीय नवरात्रि<br/>
        19/03/2026 से 27/03/2026
      </div>
    </div>
    <div class="circle-badge" style="${telCircle}">
      <span class="cb-lbl" style="${telTxt}">तेल</span>
      <span class="cb-amt" style="${telTxt}">${telAmt}</span>
    </div>
  </div>
  <div class="meta-row">
    <div class="kra-wrap">
      <span class="kra-label">कं.</span>
      <span class="kra-num" style="${donor.jyotiNo === "Pending" ? "font-size:.8rem; color:#888" : ""}">${donor.jyotiNo}</span>
    </div>
    <div class="date-wrap">
      <div class="date-label">दिनांक</div>
      <div class="date-val">${date}</div>
    </div>
  </div>
  <div class="field-row">
    <span class="f-label">सु/श्री/श्रीमति</span>
    <span class="f-val">${donor.nameHindi}</span>
  </div>
  <div class="field-row" style="gap:.5rem">
    <span class="f-label">शहर</span>
    <span class="f-val" style="max-width:110px">${donor.city || "—"}</span>
    <span class="f-label" style="margin-left:.5rem">मोबाइल नं.</span>
    <span class="f-val" style="font-family:'DM Sans',sans-serif;font-size:.82rem">${donor.mobile || "—"}</span>
  </div>
  <div class="field-row">
    <span class="f-label">रसीद नं.</span>
    <span class="f-val" style="font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:700; ${donor.receipt === "Pending" ? "color:#888; font-size:.7rem" : ""}">${donor.receipt}</span>
    <span class="f-label" style="margin-left:.5rem">ज्योति क्र.</span>
    <span class="f-val" style="font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:700; ${donor.jyotiNo === "Pending" ? "color:#888; font-size:.7rem" : ""}">${donor.jyotiNo}</span>
  </div>
  <div class="amount-note">
    अन्य राशि (विवरण जैसे घृत, सामग्री, निर्माण कार्य, मंदिर, नवरात्र महोत्सव) ...
    अन्य कार्य— <strong>${amtStr || "—"}</strong>
  </div>
  <div class="thankyou">!!मंदिर हेतु दान स्वरूप राशि सधन्यवाद प्राप्त किये!!</div>
  <div class="sig-row">
    <div class="sig-left">
      <div style="${donor.jyotiNo === "Pending" ? "font-size:.65rem; color:#888" : ""}">ज्योति क्र. &nbsp;<strong>${donor.jyotiNo}</strong></div>
      <div style="margin-top:.2rem">ज्योति राशि — <strong>${amtStr || "—"}</strong></div>
    </div>
    <div class="sig-right">
      ${
        signatureSrc
          ? `<img src="${signatureSrc}" alt="Signature" class="sig-img" />`
          : `<div style="width:100px;height:42px;"></div>`
      }
      <div class="sig-line"></div>
      <div class="sig-label">प्राप्त कर्ता</div>
      <div class="sig-sublabel">अध्यक्ष, माता बाग मंदिर समिति</div>
    </div>
  </div>
  <div class="bot-strip">matabaagmandir.com &nbsp;·&nbsp; जय माता दी 🙏</div>
</div>

<div class="btn-row">
  <button class="btn btn-pdf" onclick="window.print()">📄 PDF / Print</button>
  <button class="btn btn-img" id="imgBtn" onclick="downloadAsImage()">🖼️ Image Download</button>
  <button class="btn btn-close" onclick="window.close()">✕ Close</button>
</div>

<script>
  async function downloadAsImage() {
    const btn = document.getElementById('imgBtn');
    const orig = btn.textContent;
    btn.textContent = '⏳ Please wait...';
    btn.disabled = true;
    try {
      await document.fonts.ready;
      const receipt = document.getElementById('receiptEl');
      const canvas  = await html2canvas(receipt, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFF9EE',
        logging: false,
        onclone: (clonedDoc) => {
          const row = clonedDoc.querySelector('.btn-row');
          if (row) row.style.display = 'none';
        }
      });
      const link    = document.createElement('a');
      link.download = '${filename}';
      link.href     = canvas.toDataURL('image/png');
      link.click();
    } catch(e) {
      alert('Image generation failed. Please use PDF / Print instead.');
    }
    btn.textContent = orig;
    btn.disabled    = false;
  }
<\/script>
</body>
</html>`;

  const receiptBlob = new Blob([html], { type: "text/html" });
  const receiptUrl = URL.createObjectURL(receiptBlob);
  const win = window.open(receiptUrl, "_blank", "width=520,height=800");
  if (win) win.onload = () => URL.revokeObjectURL(receiptUrl);
}

// ── QR MODAL ──────────────────────────────────────────────────────────────────
function QRModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = async () => {
    try {
      const res = await fetch("/qr.png");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "MatabagMandir-UPI-QR.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open("/qr.png", "_blank");
    }
  };

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 9999 }}
    >
      <div
        className="modal"
        style={{
          maxWidth: "340px",
          padding: "1.5rem 1.25rem 1.25rem",
          textAlign: "center",
        }}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={14} />
        </button>

        {/* Header */}
        <div
          style={{
            background: "#8B1A1A",
            borderRadius: "10px 10px 0 0",
            padding: ".6rem .75rem",
            margin: "-1.5rem -1.25rem 1rem",
          }}
        >
          <p
            style={{
              color: "#FFD700",
              fontFamily: "'Tiro Devanagari Sanskrit', serif",
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            🙏 UPI QR कोड स्कैन करें
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: ".72rem",
              marginTop: ".2rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            किसी भी UPI App से भुगतान करें
          </p>
        </div>

        {/* QR Image */}
        <div
          style={{
            border: "3px solid #8B1A1A",
            borderRadius: "12px",
            overflow: "hidden",
            display: "inline-block",
            marginBottom: ".9rem",
          }}
        >
          <img
            src="./qr.png"
            alt="UPI QR Code — माता बाग मंदिर कुरवाई"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "contain",
              display: "block",
              background: "#fff",
            }}
          />
        </div>

        {/* UPI ID */}
        <div
          style={{
            background: "#FFF7ED",
            border: "1px solid #FED7AA",
            borderRadius: "8px",
            padding: ".5rem .75rem",
            marginBottom: ".9rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <p
            style={{
              fontSize: ".65rem",
              color: "#92400E",
              marginBottom: ".2rem",
            }}
          >
            UPI ID
          </p>
          <p
            style={{
              fontSize: ".9rem",
              fontWeight: 700,
              color: "#7C2D12",
              letterSpacing: ".03em",
              userSelect: "all",
            }}
          >
            {UPI_ID}
          </p>
        </div>

        {/* Payee */}
        <p
          style={{
            fontSize: ".72rem",
            color: "#78350F",
            marginBottom: "1rem",
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            lineHeight: 1.5,
          }}
        >
          {PAYEE_NAME}
        </p>

        {/* Download button */}
        <button
          onClick={handleDownload}
          style={{
            width: "100%",
            padding: ".62rem",
            background: "#8B1A1A",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: ".88rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".45rem",
            marginBottom: ".55rem",
          }}
        >
          <Download size={16} /> QR Image Download करें
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: ".55rem",
            background: "#F3F4F6",
            color: "#374151",
            border: "none",
            borderRadius: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: ".85rem",
            cursor: "pointer",
          }}
        >
          बंद करें / Close
        </button>
      </div>
    </div>
  );
}

// ── FLOATING PETALS ───────────────────────────────────────────────────────────
function FloatingPetals() {
  const items = [
    { e: "🌸", l: "4%", d: "0s", t: "12s" },
    { e: "🌺", l: "28%", d: "3.2s", t: "15s" },
    { e: "🌼", l: "55%", d: "1.5s", t: "11s" },
    { e: "🌻", l: "78%", d: "4.8s", t: "13s" },
  ];
  return (
    <>
      {items.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.l,
            animationDelay: p.d,
            animationDuration: p.t,
            fontSize: "1rem",
          }}
        >
          {p.e}
        </div>
      ))}
    </>
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="hdr">
      <div className="hdr-in">
        <div className="img-slot">
          <img src="./matarani.png" alt="" />
        </div>
        <div className="ht">
          <h1 className="h1">माता बाग मंदिर कुरवाई</h1>
          <p className="h2">सर्व मनोकामना पूर्ति अखंड ज्योति सूची 2026</p>
        </div>
        <div className="diya-wrap">
          <img src="./diya.png" alt="" width={50} height={50} />
        </div>
      </div>
      <div className="date-bar">
        <Calendar size={13} />
        गुरूवार 19 मार्च 2026 — शुक्रवार 27 मार्च 2026 &nbsp;|&nbsp; संवत् 2083
        &nbsp;|&nbsp; चैत्रीय नवरात्रि
      </div>
    </header>
  );
}

// ── SPECIAL MENTION BANNER ────────────────────────────────────────────────────
function SpecialMentionBanner() {
  return (
    <div className="special-mention">
      <div className="sm-inner">
        <span className="sm-label">✦ विशेष घृत ज्योति ✦</span>
        {SPECIAL_MENTIONS.map((m, i) => (
          <span key={i} className="sm-item">
            <Flame size={13} color="#D97706" />
            {m}
            {i < SPECIAL_MENTIONS.length - 1 && (
              <span className="sm-sep">|</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee({ donors }: { donors: Donor[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    setDuration(Math.max(30, halfWidth / 80));
  }, [donors]);

  const doubled = [...donors, ...donors];
  return (
    <div className="mq" title="Hover to pause">
      <div
        ref={trackRef}
        className="mq-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((d, i) => (
          <span key={i} className="mq-item">
            <Flame size={12} color="#C2410C" />
            {d.nameHindi}
            <span className="mq-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── DONOR CARD ────────────────────────────────────────────────────────────────
interface DonorCardProps {
  donor: Donor;
  onSelect: (d: Donor) => void;
  delay?: number;
}

function DonorCard({ donor, onSelect, delay = 0 }: DonorCardProps) {
  const effectiveAmt = getEffectiveAmount(donor);
  return (
    <div
      className="donor-card"
      style={{ animationDelay: `${delay}s` }}
      onClick={() => onSelect(donor)}
    >
      <div className="card-top">
        <div className="jyoti-badge">{donor.jyotiNo}</div>
        <div className="card-names">
          <div className="name-hindi">{donor.nameHindi}</div>
          <div className="name-english">{donor.nameEnglish}</div>
        </div>
      </div>
      <div className="card-footer">
        <span className="card-city">
          <MapPin size={12} />
          {donor.city || "—"}
        </span>
        <span className="card-receipt">
          <ReceiptText size={11} />
          रसीद {donor.receipt}
        </span>
      </div>
      <div className="pill-row" style={{ marginTop: "0.5rem", gap: "0.3rem" }}>
        <span
          className={`tag ${donor.type === "Permanent" ? "tag-perm" : "tag-new"}`}
        >
          {donor.type === "Permanent" ? (
            <>
              <Star size={10} /> स्थाई
            </>
          ) : (
            <>
              <Sparkles size={10} /> नए
            </>
          )}
        </span>
        <span
          className={`tag ${donor.series === "A" ? "tag-serA" : "tag-serB"}`}
        >
          {donor.series === "A" ? "Ghee (A)" : "Tail New (B)"}
        </span>
        {effectiveAmt > 0 && (
          <span
            className="tag tag-perm"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 700,
              letterSpacing: ".01em",
            }}
          >
            ₹{effectiveAmt.toLocaleString("hi-IN")}/-
          </span>
        )}
        {donor.mobile && (
          <span className="tag tag-phone">
            <Phone size={10} />
          </span>
        )}
      </div>
    </div>
  );
}

// ── DONOR MODAL ───────────────────────────────────────────────────────────────
function DonorModal({ donor, onClose }: { donor: Donor; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const effectiveAmt = getEffectiveAmount(donor);

  type ModalRow = [ReactNode, string, string | number];
  const rows: ModalRow[] = [
    [
      <MapPin key="c" size={13} color="#A87D4A" />,
      "शहर / City",
      donor.city || "—",
    ],
    [
      <ReceiptText key="r" size={13} color="#A87D4A" />,
      "रसीद नं.",
      donor.receipt,
    ],
    [
      <Phone key="m" size={13} color="#A87D4A" />,
      "मोबाइल",
      donor.mobile || "उपलब्ध नहीं",
    ],
    [
      <Tag key="t" size={13} color="#A87D4A" />,
      "प्रकार",
      donor.type === "Permanent" ? "स्थाई" : "नए",
    ],
    [
      <AlignJustify key="s" size={13} color="#A87D4A" />,
      "सूची",
      donor.series === "A" ? "Ghee (A)" : "Tail New (B)",
    ],
    [
      <Star key="st" size={13} color="#A87D4A" />,
      "स्थिति / Status",
      donor.status || "Registered",
    ],
    ...(effectiveAmt > 0
      ? [
          [
            <Heart key="a" size={13} color="#A87D4A" />,
            "राशि / Amount",
            `₹${effectiveAmt.toLocaleString("hi-IN")}`,
          ] as ModalRow,
        ]
      : []),
  ];

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <X size={14} />
        </button>
        <div className="modal-flame-wrap">
          <Flame size={26} color="#fff" />
        </div>
        <div className="modal-jno">
          ज्योति संख्या {donor.jyotiNo} ·{" "}
          {donor.series === "A" ? "Ghee" : "Tail New"} Series
        </div>
        <h2 className="modal-name">{donor.nameHindi}</h2>
        <p className="modal-eng">{donor.nameEnglish}</p>
        <hr className="modal-divider" />
        {rows.map(([icon, label, value], i) => (
          <div key={i} className="modal-row">
            <span className="modal-key">
              {icon}&nbsp;{label}
            </span>
            <span className="modal-val">{value}</span>
          </div>
        ))}
        <div className="modal-blessing">
          🌺 माता बाग वाली मैया आपकी सभी मनोकामनाएं पूर्ण करें 🌺
          <br />
          जय माता दी 🙏
        </div>
        <button
          className="receipt-btn"
          onClick={() => {
            void openDigitalReceipt(donor);
          }}
        >
          <Download size={15} /> डिजिटल रसीद देखें / डाउनलोड करें
        </button>
      </div>
    </div>
  );
}

// ── DONATION FORM ─────────────────────────────────────────────────────────────
interface DonationFormProps {
  onClose: () => void;
  showToast: (msg: string, type: ToastType) => void;
}

function DonationForm({ onClose, showToast }: DonationFormProps) {
  const [fd, setFd] = useState<DonationFormData>({
    name: "",
    mobile: "",
    city: "",
    amount: "701",
    category: "tel-jyoti",
    utr: "",
  });
  const [utrError, setUtrError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCategoryChange = (value: string) => {
    const found = DONATION_TYPES.find((d) => d.value === value);
    setFd((prev) => ({
      ...prev,
      category: value,
      amount: found?.amount || "",
    }));
  };

  const selectedType = DONATION_TYPES.find((d) => d.value === fd.category);
  const isFixed = !!selectedType?.amount;

  function validateUTR(utr: string): { valid: boolean; message: string } {
    const trimmed = utr.trim();
    if (!trimmed)
      return { valid: false, message: "कृपया UTR / Transaction ID दर्ज करें" };
    if (trimmed.length < 8)
      return { valid: false, message: "UTR कम से कम 8 अक्षर का होना चाहिए" };
    if (trimmed.length > 22)
      return { valid: false, message: "UTR अधिकतम 22 अक्षर का होना चाहिए" };
    if (!/^[a-zA-Z0-9]+$/.test(trimmed))
      return {
        valid: false,
        message:
          "UTR में केवल अक्षर और अंक होने चाहिए (कोई स्पेस या चिह्न नहीं)",
      };
    return { valid: true, message: "" };
  }

  const handleUtrChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9]/g, "");
    setFd((prev) => ({ ...prev, utr: cleaned }));
    if (cleaned.length > 0) {
      const { message } = validateUTR(cleaned);
      setUtrError(message);
    } else {
      setUtrError("");
    }
  };

  const handleUPIPayment = () => {
    const amt = fd.amount || "0";
    const donorName = fd.name.trim() || "भक्त";
    const tnMsg = `Thank You ${donorName} for Your Donation - Mata Bag Mandir Kurwai`;

    if (PHONEPE_LINK) {
      window.open(PHONEPE_LINK, "_blank");
      return;
    }
    if (UPI_ID) {
      const link = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amt}&cu=INR&tn=${encodeURIComponent(tnMsg)}`;
      window.location.href = link;
    } else {
      showToast("UPI ID not configured. Please contact admin.", "info");
    }
  };

  // --- NEW: Download Temporary Receipt Function ---
  const handleDownloadTempReceipt = () => {
    const tempDonor: Donor = {
      id: "temp",
      series: fd.category === "ghee-jyoti" ? "A" : "B",
      jyotiNo: "Pending" as unknown as number, // Typescript workaround for the temporary receipt
      nameHindi: fd.name,
      nameEnglish: fd.name,
      city: fd.city,
      receipt: "Pending" as unknown as number,
      mobile: fd.mobile,
      type: "New",
      amount: Number(fd.amount) || (fd.category === "ghee-jyoti" ? 1801 : 701),
      status: "Verification Pending",
      notes: fd.utr,
    };
    void openDigitalReceipt(tempDonor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fd.name.trim()) {
      showToast("कृपया नाम दर्ज करें", "error");
      return;
    }
    if (fd.mobile.length !== 10) {
      showToast("10 अंकों का सही मोबाइल नंबर दर्ज करें", "error");
      return;
    }
    if (!fd.amount) {
      showToast("कृपया दान राशि दर्ज करें", "error");
      return;
    }
    const utrCheck = validateUTR(fd.utr);
    if (!utrCheck.valid) {
      setUtrError(utrCheck.message);
      showToast(utrCheck.message, "error");
      return;
    }

    setSubmitting(true);
    try {
      if (SCRIPT_URL) {
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            ...fd,
            notes: fd.utr,
            timestamp: new Date().toISOString(),
          }),
        });
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
      setSuccess(true);
      showToast("दान पंजीकरण सफल! Admin जल्द सत्यापित करेंगे 🙏", "success");
      // REMOVED: Auto-close timeout so user has time to download the receipt
      // setTimeout(() => onClose(), 4000);
    } catch {
      showToast("कुछ गलत हुआ, कृपया पुनः प्रयास करें", "error");
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* QR Modal — opens on top of donation form */}
      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      <div
        className="overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal form-modal">
          <button className="modal-close" onClick={onClose}>
            <X size={14} />
          </button>

          {success ? (
            <div
              className="success-banner"
              style={{ textAlign: "center", padding: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: ".7rem",
                }}
              >
                <CheckCircle size={48} color="#15803D" />
              </div>
              <p style={{ fontWeight: 700, fontSize: "1rem" }}>
                आपका दान पंजीकरण सफल हुआ!
              </p>
              <p style={{ marginTop: ".4rem", fontSize: ".88rem" }}>
                Admin द्वारा भुगतान सत्यापन के बाद
                <br />
                आपकी रसीद पक्की हो जाएगी।
              </p>

              {/* --- NEW: DOWNLOAD BUTTON SECTION --- */}
              <div
                style={{
                  background: "#FFF9EE",
                  border: "2px dashed #D97706",
                  padding: "1rem",
                  borderRadius: "12px",
                  margin: "1rem 0",
                }}
              >
                <p
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 700,
                    color: "#8B1A1A",
                    marginBottom: ".6rem",
                  }}
                >
                  अस्थाई डिजिटल रसीद (Provisional)
                </p>
                <button
                  onClick={handleDownloadTempReceipt}
                  className="receipt-btn"
                  style={{ width: "100%", margin: 0 }}
                >
                  <Download size={16} /> रसीद डाउनलोड करें
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                style={{
                  width: "100%",
                  padding: ".55rem",
                  background: "#F3F4F6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: ".85rem",
                  cursor: "pointer",
                }}
              >
                बंद करें / Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">
                <Flame size={20} color="#C2410C" /> नया दान / New Donation
              </h2>

              {/* Name + Mobile */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: ".65rem",
                }}
              >
                <div className="form-group">
                  <label>पूरा नाम *</label>
                  <input
                    className="form-input"
                    type="text"
                    required
                    placeholder="आपका पूरा नाम"
                    value={fd.name}
                    onChange={(e) => setFd({ ...fd, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>मोबाइल नं. *</label>
                  <input
                    className="form-input"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10 अंक"
                    value={fd.mobile}
                    onChange={(e) => setFd({ ...fd, mobile: e.target.value })}
                  />
                </div>
              </div>

              {/* City */}
              <div className="form-group">
                <label>शहर / City</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="आपका शहर / Your city"
                  value={fd.city}
                  onChange={(e) => setFd({ ...fd, city: e.target.value })}
                />
              </div>

              {/* Donation type radio cards */}
              <div className="form-group">
                <label>दान का प्रकार *</label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".4rem",
                    marginTop: ".25rem",
                  }}
                >
                  {DONATION_TYPES.map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: ".55rem .9rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: `1.5px solid ${fd.category === opt.value ? "var(--primary)" : "var(--border)"}`,
                        background:
                          fd.category === opt.value ? "#FFF7F5" : "#FAFAFA",
                        transition: "all .15s",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".5rem",
                        }}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={opt.value}
                          checked={fd.category === opt.value}
                          onChange={() => handleCategoryChange(opt.value)}
                          style={{
                            accentColor: "var(--primary)",
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Tiro Devanagari Sanskrit', serif",
                            fontSize: ".93rem",
                            color: "var(--text)",
                            fontWeight: 600,
                          }}
                        >
                          {opt.label}
                        </span>
                      </span>
                      {opt.amount ? (
                        <span
                          style={{
                            background: "var(--primary)",
                            color: "#fff",
                            padding: ".2rem .65rem",
                            borderRadius: "999px",
                            fontSize: ".73rem",
                            fontWeight: 700,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          ₹{Number(opt.amount).toLocaleString("hi-IN")}/-
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: ".72rem",
                            color: "var(--text-muted)",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {opt.hint}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className="form-group">
                <label>दान राशि (₹) / Amount</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  placeholder="₹ राशि दर्ज करें"
                  value={fd.amount}
                  readOnly={isFixed}
                  style={
                    isFixed
                      ? {
                          background: "#F0FDF4",
                          borderColor: "#86EFAC",
                          color: "#15803D",
                          fontWeight: 700,
                        }
                      : {}
                  }
                  onChange={(e) => {
                    if (!isFixed) setFd({ ...fd, amount: e.target.value });
                  }}
                />
                {isFixed && (
                  <p
                    style={{
                      fontSize: ".7rem",
                      color: "#15803D",
                      marginTop: ".25rem",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    ✓ यह राशि निर्धारित है
                  </p>
                )}
              </div>

              {/* ── PAYMENT OPTIONS SECTION ───────────────────────────── */}
              <div className="payment-section">
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'Tiro Devanagari Sanskrit', serif",
                    fontSize: ".88rem",
                    color: "#7C2D12",
                    fontWeight: 700,
                    marginBottom: ".75rem",
                  }}
                >
                  भुगतान का तरीका चुनें
                </p>

                {/* Two option buttons */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: ".65rem",
                    marginBottom: ".75rem",
                  }}
                >
                  {/* UPI App Button */}
                  <button
                    type="button"
                    onClick={handleUPIPayment}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: ".35rem",
                      padding: ".85rem .5rem",
                      background:
                        "linear-gradient(135deg, #8B1A1A 0%, #B91C1C 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: ".8rem",
                      boxShadow: "0 2px 8px rgba(139,26,26,0.3)",
                      transition: "opacity .15s",
                    }}
                  >
                    <Smartphone size={22} />
                    <span>UPI से भुगतान</span>
                    <span
                      style={{
                        fontSize: ".65rem",
                        fontWeight: 400,
                        opacity: 0.85,
                      }}
                    >
                      PhonePe / GPay / Paytm
                    </span>
                  </button>

                  {/* QR Code Button */}
                  <button
                    type="button"
                    onClick={() => setShowQR(true)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: ".35rem",
                      padding: ".85rem .5rem",
                      background:
                        "linear-gradient(135deg, #1a5c3a 0%, #15803D 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: ".8rem",
                      boxShadow: "0 2px 8px rgba(21,128,61,0.3)",
                      transition: "opacity .15s",
                    }}
                  >
                    <QrCode size={22} />
                    <span>QR से भुगतान</span>
                    <span
                      style={{
                        fontSize: ".65rem",
                        fontWeight: 400,
                        opacity: 0.85,
                      }}
                    >
                      QR Code स्कैन करें
                    </span>
                  </button>
                </div>

                {/* Note: if UPI doesn't work use QR */}
                <div
                  style={{
                    background: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    borderRadius: "8px",
                    padding: ".5rem .75rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: ".4rem",
                  }}
                >
                  <AlertCircle
                    size={14}
                    color="#D97706"
                    style={{ marginTop: "1px", flexShrink: 0 }}
                  />
                  <p
                    style={{
                      fontSize: ".7rem",
                      color: "#92400E",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    <strong>नोट:</strong> यदि UPI App से भुगतान नहीं हो रहा तो{" "}
                    <span
                      style={{
                        color: "#1a5c3a",
                        cursor: "pointer",
                        fontWeight: 700,
                        textDecoration: "underline",
                      }}
                      onClick={() => setShowQR(true)}
                    >
                      QR Code
                    </span>{" "}
                    से भुगतान करें।
                  </p>
                </div>

                <div className="payment-divider" />
                <p className="payment-note">
                  <strong>📌 Step 1:</strong> ऊपर दिए विकल्प से भुगतान करें।
                  <br />
                  <strong>📌 Step 2:</strong> भुगतान के बाद मिला UTR /
                  Transaction ID नीचे दर्ज करें।
                </p>
              </div>

              {/* UTR / Transaction ID */}
              <div className="form-group" style={{ marginTop: ".75rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  UTR / Transaction ID *
                  <span
                    style={{
                      fontSize: ".62rem",
                      background: "#FEF2F2",
                      color: "#B91C1C",
                      padding: ".1rem .45rem",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif",
                      border: "1px solid #FECACA",
                    }}
                  >
                    आवश्यक / Required
                  </span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. 425318762345 या UPI ref number"
                  value={fd.utr}
                  maxLength={22}
                  onChange={(e) => handleUtrChange(e.target.value)}
                  style={{
                    borderColor: utrError
                      ? "#EF4444"
                      : fd.utr && !utrError
                        ? "#22C55E"
                        : undefined,
                    background: utrError
                      ? "#FEF2F2"
                      : fd.utr && !utrError
                        ? "#F0FDF4"
                        : undefined,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    letterSpacing: ".04em",
                  }}
                />
                {utrError && (
                  <p
                    style={{
                      fontSize: ".72rem",
                      color: "#B91C1C",
                      marginTop: ".28rem",
                      fontFamily: "'DM Sans', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: ".3rem",
                    }}
                  >
                    <AlertCircle size={13} /> {utrError}
                  </p>
                )}
                {fd.utr && !utrError && (
                  <p
                    style={{
                      fontSize: ".72rem",
                      color: "#15803D",
                      marginTop: ".28rem",
                      fontFamily: "'DM Sans', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: ".3rem",
                    }}
                  >
                    <CheckCircle size={13} /> UTR सत्यापित — {fd.utr.length}{" "}
                    अक्षर
                  </p>
                )}
                <p
                  style={{
                    fontSize: ".68rem",
                    color: "var(--text-muted)",
                    marginTop: ".25rem",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  PhonePe / GPay / Paytm में भुगतान के बाद Transaction ID या UTR
                  नंबर मिलता है। यह 8–22 अक्षर का अंक/अक्षर होता है।
                </p>
              </div>

              <button
                className="submit-btn"
                type="submit"
                disabled={submitting || !!utrError || !fd.utr}
              >
                {submitting ? (
                  <>
                    <RefreshCw size={16} className="spin" /> पंजीकरण हो रहा
                    है...
                  </>
                ) : (
                  <>
                    <Heart size={16} /> दान पंजीकरण करें
                  </>
                )}
              </button>
              {!fd.utr && (
                <p
                  style={{
                    fontSize: ".72rem",
                    color: "#92400E",
                    textAlign: "center",
                    marginTop: ".4rem",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ⚠️ UTR / Transaction ID दर्ज करने के बाद ही Submit होगा
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// ── BLESSINGS SECTION ─────────────────────────────────────────────────────────
function BlessingsSection() {
  return (
    <div className="blessings-section">
      <div className="photo-grid">
        <div className="photo-frame">
          <img src="./jyoti.png" alt="" />
        </div>
        <div className="photo-frame">
          <img src="./matarani.png" alt="" />
        </div>
      </div>
      <p className="blessing-text">
        🌺 माता बाग वाली मैया आपकी सभी मनोकामनाएं पूर्ण करें 🌺
      </p>
      <p className="jai-text">जय माता दी।।</p>
    </div>
  );
}

// ── ADHYAKSH SECTION ─────────────────────────────────────────────────────────
function AdhyakshSection() {
  return (
    <div className="adhyaksh-section">
      <div className="adhyaksh-inner">
        <div className="adhyaksh-img">
          <img src="./main.png" alt="" />
        </div>
        <div className="adhyaksh-text">
          <div className="adhyaksh-name">पं. श्री अनिल कुमार चौबे</div>
          <div className="adhyaksh-title">(ज्योतिर्विद तंत्राचार्य)</div>
          <div
            className="adhyaksh-title"
            style={{ marginTop: ".2rem", fontSize: ".9rem", opacity: 0.95 }}
          >
            अध्यक्ष
          </div>
          <div className="adhyaksh-org">श्री माता बाग मंदिर समिति कुरवाई</div>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: ".7rem",
        }}
      >
        <img src="./diya.png" alt="" width={50} height={50} />
      </div>
      <div className="footer-title">माता बाग मंदिर समिति कुरवाई</div>
      <div className="footer-sub">
        माता बाग मंदिर समिति माँ भगवती से प्रार्थना करती है
        <br />
        सभी भक्तों की मनोकामनाएं पूर्ण करें 🙏
      </div>
      <hr className="footer-hr" />
      <div className="footer-credit">
        Website crafted with&nbsp;
        <Heart size={11} color="#C2410C" />
        &nbsp;by&nbsp;
        <a
          href="https://www.instagram.com/sarthak_io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={11} />
          &nbsp;@sarthak_io
        </a>
        &nbsp;|&nbsp;जय माता दी 🙏
      </div>
    </footer>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { toasts, show: showToast } = useToast();

  const [donors, setDonors] = useState<Donor[]>(DONORS_DEMO);
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchReceipt, setSearchReceipt] = useState("");
  const [series, setSeries] = useState<SeriesFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [alpha, setAlpha] = useState("");
  const [alphaMode, setAlphaMode] = useState<AlphaMode>("hindi");
  const [page, setPage] = useState(1);

  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showForm, setShowForm] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SCRIPT_URL) return;
    setLoading(true);
    fetch(SCRIPT_URL)
      .then((r) => r.json())
      .then((data: unknown) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = (data as Donor[]).map((d) => ({
            ...d,
            type: normalizeType(d.type),
          }));
          setDonors(normalized);
          showToast(`${normalized.length} भक्त लोड हुए`, "success");
        }
      })
      .catch(() =>
        showToast("Demo mode — Google Sheets से कनेक्ट नहीं हुआ", "info"),
      )
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPage(1);
  }, [searchName, searchMobile, searchReceipt, series, type, alpha, alphaMode]);

  const filtered = useMemo<Donor[]>(() => {
    return donors.filter((d) => {
      if (!d?.nameHindi || !d?.nameEnglish) return false;
      if (searchName) {
        const q = searchName.trim().toLowerCase();
        const words = q.split(/\s+/).filter(Boolean);
        const nh = d.nameHindi.toLowerCase();
        const ne = d.nameEnglish.toLowerCase();
        const direct = nh.includes(q) || ne.includes(q);
        const allWords =
          words.length > 1
            ? words.every((w) => nh.includes(w) || ne.includes(w))
            : false;
        if (!direct && !allWords) return false;
      }
      if (searchMobile && !d.mobile.includes(searchMobile.trim())) return false;
      if (searchReceipt && !String(d.receipt).includes(searchReceipt.trim()))
        return false;
      if (series !== "all" && d.series !== series) return false;
      if (type !== "all" && d.type !== type) return false;
      if (alpha) {
        if (alphaMode === "hindi" && !d.nameHindi.includes(alpha)) return false;
        if (
          alphaMode === "english" &&
          !d.nameEnglish.toUpperCase().includes(alpha)
        )
          return false;
      }
      return true;
    });
  }, [
    donors,
    searchName,
    searchMobile,
    searchReceipt,
    series,
    type,
    alpha,
    alphaMode,
  ]);

  const visibleDonors = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visibleDonors.length < filtered.length;
  const hasFilter = !!(
    searchName ||
    searchMobile ||
    searchReceipt ||
    series !== "all" ||
    type !== "all" ||
    alpha
  );

  const resetAll = () => {
    setSearchName("");
    setSearchMobile("");
    setSearchReceipt("");
    setSeries("all");
    setType("all");
    setAlpha("");
    setPage(1);
  };

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }, []);

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") scrollToResults();
  };

  const seriesOpts: { v: SeriesFilter; l: string }[] = [
    { v: "all", l: "सभी" },
    { v: "A", l: "Ghee (A)" },
    { v: "B", l: "Tail New (B)" },
  ];
  const typeOpts: { v: TypeFilter; l: string }[] = [
    { v: "all", l: "सभी" },
    { v: "Permanent", l: "स्थाई" },
    { v: "New", l: "नए" },
  ];

  return (
    <>
      <Head>
        <title>माता बाग मंदिर कुरवाई — अखंड ज्योति सूची 2026</title>
        <meta
          name="description"
          content="सर्व मनोकामना पूर्ति अखंड ज्योति सूची — चैत्रीय नवरात्रि 2026 | श्री माता बाग मंदिर कुरवाई"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="माता बाग मंदिर कुरवाई — अखंड ज्योति सूची 2026"
        />
        <meta
          property="og:description"
          content="सर्व मनोकामना पूर्ति अखंड ज्योति सूची — चैत्रीय नवरात्रि 2026"
        />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>

      <ToastContainer toasts={toasts} />
      <FloatingPetals />
      <Header />
      <SpecialMentionBanner />
      <Marquee donors={donors} />

      <main className="main">
        {/* SEARCH */}
        <div className="search-box">
          <div className="search-title">
            <Search size={18} color="#C2410C" /> कृपया नाम सर्च करें
          </div>
          <div className="search-grid">
            <div className="search-field">
              <label>नाम / Name</label>
              <span className="field-icon">
                <Search size={14} />
              </span>
              <input
                className="search-input"
                placeholder="हिंदी या English में नाम..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={handleSearchKey}
              />
              {searchName && (
                <button className="clear-btn" onClick={() => setSearchName("")}>
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="search-field">
              <label>कृपया मोबाइल नो. डाले (ऑप्शनल)</label>
              <span className="field-icon">
                <Phone size={14} />
              </span>
              <input
                className="search-input"
                type="tel"
                maxLength={10}
                placeholder="Mobile number..."
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
                onKeyDown={handleSearchKey}
              />
              {searchMobile && (
                <button
                  className="clear-btn"
                  onClick={() => setSearchMobile("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="search-field">
              <label>रसीद नंबर / Receipt No.</label>
              <span className="field-icon">
                <ReceiptText size={14} />
              </span>
              <input
                className="search-input"
                type="number"
                placeholder="Receipt number..."
                value={searchReceipt}
                onChange={(e) => setSearchReceipt(e.target.value)}
                onKeyDown={handleSearchKey}
              />
              {searchReceipt && (
                <button
                  className="clear-btn"
                  onClick={() => setSearchReceipt("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <div className="filter-group">
            <div className="filter-label">
              <AlignJustify size={12} /> सूची — Series
            </div>
            <div className="pill-row">
              {seriesOpts.map((o) => (
                <button
                  key={o.v}
                  className={`pill ${series === o.v ? "active" : ""}`}
                  onClick={() => setSeries(o.v)}
                >
                  {series === o.v && <CheckCircle size={11} />} {o.l}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <div className="filter-label">
              <Tag size={12} /> प्रकार — Type
            </div>
            <div className="pill-row">
              {typeOpts.map((o) => (
                <button
                  key={o.v}
                  className={`pill ${type === o.v ? "active" : ""}`}
                  onClick={() => setType(o.v)}
                >
                  {type === o.v && <CheckCircle size={11} />} {o.l}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <div className="filter-label">
              <Type size={12} /> अक्षर — Alphabet
            </div>
            <div className="alpha-mode-row">
              <button
                className={`mode-btn ${alphaMode === "hindi" ? "active" : ""}`}
                onClick={() => {
                  setAlphaMode("hindi");
                  setAlpha("");
                }}
              >
                हिंदी
              </button>
              <button
                className={`mode-btn ${alphaMode === "english" ? "active" : ""}`}
                onClick={() => {
                  setAlphaMode("english");
                  setAlpha("");
                }}
              >
                English
              </button>
              {alpha && (
                <button
                  className="mode-btn clear-btn-mode"
                  onClick={() => setAlpha("")}
                >
                  <X size={11} /> Clear
                </button>
              )}
            </div>
            <div className="alpha-scroll">
              <div className="alpha-pills">
                {(alphaMode === "hindi" ? HINDI_ALPHA : ENG_ALPHA).map((a) => (
                  <button
                    key={a}
                    className={`${alphaMode === "hindi" ? "alpha-pill-hi" : "alpha-pill-en"}${alpha === a ? " active" : ""}`}
                    onClick={() => {
                      setAlpha(alpha === a ? "" : a);
                      scrollToResults();
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULT COUNT */}
        <div className="result-count" ref={resultsRef}>
          <Users size={14} color="#C2410C" />
          &nbsp;<strong>{filtered.length}</strong> / {donors.length} भक्त मिले
          {hasFilter && (
            <span className="reset-link" onClick={resetAll}>
              <RefreshCw size={11} /> सभी दिखाएं
            </span>
          )}
        </div>

        {/* GRID */}
        {loading ? (
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#A87D4A" }}
          >
            <RefreshCw size={32} color="#C2410C" className="spin" />
            <p
              style={{
                marginTop: ".8rem",
                fontFamily: "Mukta, sans-serif",
                color: "#78532A",
              }}
            >
              लोड हो रहा है...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: ".6rem",
              }}
            >
              <Search size={44} color="#E9D49A" />
            </div>
            <p>कोई परिणाम नहीं मिला</p>
            <p className="sub">अलग नाम या रसीद नंबर से खोजें</p>
          </div>
        ) : (
          <>
            <div className="donor-grid">
              {visibleDonors.map((d, i) => (
                <DonorCard
                  key={d.id}
                  donor={d}
                  onSelect={setSelectedDonor}
                  delay={(i % PAGE_SIZE) * 0.04}
                />
              ))}
            </div>
            {(hasMore || page > 1) && (
              <div className="load-more-wrap">
                {hasMore && (
                  <button
                    className="load-more-btn"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronDown size={18} /> और देखें
                  </button>
                )}
                <p className="load-more-info">
                  दिख रहे हैं: {visibleDonors.length} / {filtered.length}
                  {!hasMore && " — सभी दिख रहे हैं ✓"}
                </p>
              </div>
            )}
          </>
        )}

        <BlessingsSection />
      </main>

      <AdhyakshSection />
      <Footer />

      {selectedDonor && (
        <DonorModal
          donor={selectedDonor}
          onClose={() => setSelectedDonor(null)}
        />
      )}
      {showForm && (
        <DonationForm
          onClose={() => setShowForm(false)}
          showToast={showToast}
        />
      )}

      <button className="fab" onClick={() => setShowForm(true)}>
        <Plus size={17} /> दान करें
      </button>
    </>
  );
}
