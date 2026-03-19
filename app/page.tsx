// pages/index.tsx
// ────────────────────────────────────────────────────────────────────────────
//  माता बाग मंदिर कुरवाई — Navratri 2026
//
//  SETUP:
//    npm install lucide-react
//
//  GOOGLE SHEETS:
//    1. Deploy APPS_SCRIPT.js as Google Apps Script Web App (Anyone access)
//    2. Set SCRIPT_URL below
// ────────────────────────────────────────────────────────────────────────────
"use client";
import Head from "next/head";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  FC,
  ReactNode,
  useRef,
} from "react";
import {
  Search,
  Phone,
  ReceiptText,
  MapPin,
  FileText,
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
  Building,
  Sparkles,
  Instagram,
  X,
  ChevronDown,
  AlertCircle,
  Info,
} from "lucide-react";
import type {
  Donor,
  DonationFormData,
  AlphaMode,
  SeriesFilter,
  TypeFilter,
} from "@/types/donor";
import { url } from "@/config";

// ── CONFIG ───────────────────────────────────────────────────────────────────
const SCRIPT_URL = url; // ← paste your Apps Script Web App URL here
const PAGE_SIZE = 12; // cards shown per load

// ── DEMO DATA (matching actual API shape) ────────────────────────────────────
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
    nameHindi: "श्री जितेेन्द्रसिंह दांगी",
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
  // Series B
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

// ── TOAST ────────────────────────────────────────────────────────────────────
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
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  }, []);
  return { toasts, show };
}

const ToastIcon: FC<{ type: ToastType }> = ({ type }) => {
  if (type === "success") return <CheckCircle size={16} />;
  if (type === "error") return <AlertCircle size={16} />;
  return <Info size={16} />;
};

function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <ToastIcon type={t.type} />
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ── FLOATING PETALS ───────────────────────────────────────────────────────────
function FloatingPetals() {
  const items = ["🌸", "🌺", "🌼", "🌻"].map((e, i) => ({
    e,
    left: `${i * 24 + 4}%`,
    delay: `${i * 2.1}s`,
    duration: `${10 + i * 1.5}s`,
  }));
  return (
    <>
      {items.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
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
        {/* Replace with: <img src="/temple.jpg" alt="Mata Bag Mandir" /> */}
        <div className="img-slot">
          <img src="matarani.png" alt="" />
        </div>
        <div className="ht">
          <h1 className="h1">माता बाग मंदिर कुरवाई</h1>
          <p className="h2">सर्व मनोकामना पूर्ति अखंड ज्योति सूची 2026</p>
        </div>
        <div className="diya">
          <img src="./diya.png" alt="" width={50} height={50} />
        </div>
      </div>
      <div className="date-bar">
        <Calendar size={13} color="rgba(255,248,220,.7)" />
        गुरूवार 19 मार्च 2026 — शुक्रवार 27 मार्च 2026 &nbsp;|&nbsp; संवत् 2083
        &nbsp;|&nbsp; चैत्रीय नवरात्रि
      </div>
    </header>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee({ donors }: { donors: Donor[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    if (!trackRef.current) return;
    // measure half the track (one copy) and run at ~80px/second
    const halfWidth = trackRef.current.scrollWidth / 2;
    setDuration(Math.max(30, halfWidth / 80));
  }, [donors]); // recalculate whenever donors list changes

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
            <Flame size={12} color="#FF6B00" />
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
          <MapPin size={12} color="rgba(255,248,220,.5)" />
          {donor.city || "—"}
        </span>
        <span className="card-receipt">
          <FileText size={11} color="#B8860B" />
          {donor.receipt}
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
          Series {donor.series}
        </span>
        {donor.mobile && (
          <span className="tag tag-phone">
            <Phone size={10} />
          </span>
        )}
      </div>
    </div>
  );
}

// ── DONOR DETAIL MODAL ────────────────────────────────────────────────────────
function DonorModal({ donor, onClose }: { donor: Donor; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  type ModalRow = [ReactNode, string, string | number];
  const rows: ModalRow[] = [
    [
      <MapPin key="city" size={13} color="rgba(255,248,220,.5)" />,
      "शहर / City",
      donor.city || "—",
    ],
    [
      <FileText key="rec" size={13} color="rgba(255,248,220,.5)" />,
      "रसीद नं.",
      donor.receipt,
    ],
    [
      <Phone key="mob" size={13} color="rgba(255,248,220,.5)" />,
      "मोबाइल",
      donor.mobile || "उपलब्ध नहीं",
    ],
    [
      <Tag key="type" size={13} color="rgba(255,248,220,.5)" />,
      "प्रकार",
      donor.type === "Permanent" ? "स्थाई" : "नए",
    ],
    [
      <AlignJustify key="ser" size={13} color="rgba(255,248,220,.5)" />,
      "सूची",
      donor.series === "A" ? "Dyuti (A)" : "Tail New (B)",
    ],
    [
      <Star key="status" size={13} color="rgba(255,248,220,.5)" />,
      "स्थिति / Status",
      donor.status || "Registered",
    ],
    ...(donor.amount
      ? [
          [
            <Heart key="amt" size={13} color="rgba(255,248,220,.5)" />,
            "राशि / Amount",
            "₹" + donor.amount.toLocaleString("hi-IN"),
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
          <X size={15} />
        </button>
        <div className="modal-flame-wrap">
          <Flame size={28} color="#fff" />
        </div>
        <div className="modal-jno">
          ज्योति संख्या {donor.jyotiNo} —{" "}
          {donor.series === "A" ? "Dyuti" : "Tail New"} Series
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
    amount: "",
    category: "dyuti",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validation
    if (!fd.name.trim()) {
      showToast("कृपया नाम दर्ज करें", "error");
      setSubmitting(false);
      return;
    }
    if (fd.mobile.length !== 10) {
      showToast("10 अंकों का मोबाइल नंबर दर्ज करें", "error");
      setSubmitting(false);
      return;
    }

    try {
      if (SCRIPT_URL) {
        // Use no-cors mode to avoid CORS preflight error
        // The response won't be readable, but the data IS saved to the sheet
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // ← fixes CORS error with Apps Script
          headers: { "Content-Type": "text/plain" }, // text/plain avoids preflight
          body: JSON.stringify({ ...fd, timestamp: new Date().toISOString() }),
        });
      } else {
        // Demo mode — simulate delay
        await new Promise((r) => setTimeout(r, 1200));
      }
      setSuccess(true);
      showToast("दान सफलतापूर्वक दर्ज हो गया! 🙏", "success");
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      console.error("Submission error:", err);
      showToast("कुछ गलत हुआ, कृपया पुनः प्रयास करें", "error");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal form-modal">
        <button className="modal-close" onClick={onClose}>
          <X size={15} />
        </button>
        {success ? (
          <div className="success-banner">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0.6rem",
              }}
            >
              <CheckCircle size={44} color="#81C784" />
            </div>
            <p>आपका दान सफलतापूर्वक दर्ज हो गया!</p>
            <p style={{ marginTop: "0.5rem" }}>
              माता आपकी सभी मनोकामनाएं पूर्ण करें।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">
              <Flame size={20} color="#FF6B00" /> नया दान / New Donation
            </h2>

            <div className="form-group">
              <label>पूरा नाम * / Full Name</label>
              <input
                className="form-input"
                type="text"
                required
                placeholder="आपका पूरा नाम / Your full name"
                value={fd.name}
                onChange={(e) => setFd({ ...fd, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>मोबाइल नंबर * / Mobile No.</label>
              <input
                className="form-input"
                type="tel"
                required
                maxLength={10}
                placeholder="10 अंकों का मोबाइल नंबर"
                value={fd.mobile}
                onChange={(e) => setFd({ ...fd, mobile: e.target.value })}
              />
            </div>
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
            <div className="form-group">
              <label>दान राशि (₹) / Amount</label>
              <input
                className="form-input"
                type="number"
                min="1"
                placeholder="₹ राशि दर्ज करें"
                value={fd.amount}
                onChange={(e) => setFd({ ...fd, amount: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>श्रेणी / Category</label>
              <select
                className="form-select"
                value={fd.category}
                onChange={(e) => setFd({ ...fd, category: e.target.value })}
              >
                <option value="dyuti">Dyuti — Akhand Jyoti</option>
                <option value="samgri">Samgri — सामग्री</option>
                <option value="ghee">Ghee — घी</option>
                <option value="kapdha">Kapdha — कपड़ा</option>
                <option value="other">Other — अन्य</option>
              </select>
            </div>
            <div className="form-group">
              <label>संदेश / Note (ऑप्शनल)</label>
              <textarea
                className="form-textarea"
                placeholder="कोई संदेश हो तो लिखें..."
                value={fd.notes}
                onChange={(e) => setFd({ ...fd, notes: e.target.value })}
              />
            </div>

            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <RefreshCw size={16} className="spin" /> दर्ज हो रहा है...
                </>
              ) : (
                <>
                  <Heart size={16} /> दान दर्ज करें
                </>
              )}
            </button>
            {!SCRIPT_URL && (
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,200,0,.45)",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                Demo mode — set SCRIPT_URL in index.tsx to save to Google Sheets
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

// ── BLESSINGS SECTION ─────────────────────────────────────────────────────────
function BlessingsSection() {
  return (
    <div className="blessings-section">
      <div className="photo-grid">
        {/* Replace with <img src="/jyoti.jpg" alt="Akhand Jyoti" /> */}
        <div className="photo-frame">
          <img src="./jyoti.png" alt="" />
        </div>
        {/* Replace with <img src="/durga.jpg" alt="Mata Bhagwati" /> */}
        <div className="photo-frame">
          <img src="matarani.png" alt="" />
        </div>
      </div>
      <p className="blessing-text">
        🌺 माता बाग वाली मैया आपकी सभी मनोकामनाएं पूर्ण करें 🌺
      </p>
      <p className="jai-text">जय माता दी।।</p>
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
          marginBottom: "0.7rem",
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
        <Heart size={11} color="#FF6B00" />
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

  // Search
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchReceipt, setSearchReceipt] = useState("");

  // Filters
  const [series, setSeries] = useState<SeriesFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [alpha, setAlpha] = useState("");
  const [alphaMode, setAlphaMode] = useState<AlphaMode>("hindi");

  // Pagination
  const [page, setPage] = useState(1);

  // Modals
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showForm, setShowForm] = useState(false);

  // ── Fetch live data
  useEffect(() => {
    if (!SCRIPT_URL) return;
    setLoading(true);
    fetch(SCRIPT_URL)
      .then((r) => r.json())
      .then((data: unknown) => {
        if (Array.isArray(data) && data.length > 0) {
          setDonors(data as Donor[]);
          showToast(`${data.length} भक्त लोड हुए`, "success");
        }
      })
      .catch(() =>
        showToast("डेटा लोड नहीं हुआ, Demo mode में देख रहे हैं", "info"),
      )
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchName, searchMobile, searchReceipt, series, type, alpha, alphaMode]);

  // ── Filter
  const filtered = useMemo<Donor[]>(() => {
    return donors.filter((d) => {
      // Guard: skip malformed rows
      if (!d || !d.nameHindi || !d.nameEnglish) return false;

      if (searchName) {
        const q = searchName.toLowerCase().trim();
        if (
          !d.nameHindi.includes(searchName.trim()) &&
          !d.nameEnglish.toLowerCase().includes(q)
        )
          return false;
      }
      if (searchMobile && !d.mobile.includes(searchMobile.trim())) return false;
      if (searchReceipt && !String(d.receipt).includes(searchReceipt.trim()))
        return false;
      if (series !== "all" && d.series !== series) return false;
      if (type !== "all" && d.type !== type) return false;
      if (alpha) {
        if (alphaMode === "hindi" && !d.nameHindi.startsWith(alpha))
          return false;
        if (
          alphaMode === "english" &&
          !d.nameEnglish.toUpperCase().startsWith(alpha)
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
  const hasFilter =
    searchName ||
    searchMobile ||
    searchReceipt ||
    series !== "all" ||
    type !== "all" ||
    alpha;

  const resetAll = () => {
    setSearchName("");
    setSearchMobile("");
    setSearchReceipt("");
    setSeries("all");
    setType("all");
    setAlpha("");
    setPage(1);
  };

  const seriesOpts: { v: SeriesFilter; l: string }[] = [
    { v: "all", l: "सभी" },
    { v: "A", l: "Dyuti (A)" },
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
          content="सर्व मनोकामना पूर्ति अखंड ज्योति सूची — चैत्रीय नवरात्रि 2026"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer toasts={toasts} />
      <FloatingPetals />
      <Header />
      <Marquee donors={donors} />

      <main className="main">
        {/* ── SEARCH ── */}
        <div className="search-box">
          <div className="search-title">
            <Search size={18} color="#FFD700" />
            कृपया नाम सर्च करें
          </div>
          <div className="search-grid">
            <div className="search-field">
              <label>नाम / Name</label>
              <span className="field-icon">
                <Search size={15} />
              </span>
              <input
                className="search-input"
                placeholder="हिंदी या English में नाम..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
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
                <Phone size={15} />
              </span>
              <input
                className="search-input"
                type="tel"
                maxLength={10}
                placeholder="Mobile number..."
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
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
                <ReceiptText size={15} />
              </span>
              <input
                className="search-input"
                type="number"
                placeholder="Receipt number..."
                value={searchReceipt}
                onChange={(e) => setSearchReceipt(e.target.value)}
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

        {/* ── FILTERS ── */}
        <div className="filters">
          {/* Series */}
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
                  {series === o.v && <CheckCircle size={12} color="#fff" />}
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
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
                  {type === o.v && <CheckCircle size={12} color="#fff" />}
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabet */}
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
                  <X size={12} /> Clear
                </button>
              )}
            </div>
            <div className="alpha-scroll">
              <div className="alpha-pills">
                {(alphaMode === "hindi" ? HINDI_ALPHA : ENG_ALPHA).map((a) => (
                  <button
                    key={a}
                    className={`${alphaMode === "hindi" ? "alpha-pill-hi" : "alpha-pill-en"}${alpha === a ? " active" : ""}`}
                    onClick={() => setAlpha(alpha === a ? "" : a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RESULT COUNT ── */}
        <div className="result-count">
          <Users size={14} color="#FFD700" />
          &nbsp;<strong>{filtered.length}</strong> / {donors.length} भक्त मिले
          {hasFilter && (
            <span className="reset-link" onClick={resetAll}>
              <RefreshCw size={12} /> सभी दिखाएं
            </span>
          )}
        </div>

        {/* ── GRID ── */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "rgba(255,248,220,.5)",
            }}
          >
            <RefreshCw size={32} color="#FF6B00" className="spin" />
            <p style={{ marginTop: "0.8rem", fontFamily: "Mukta, sans-serif" }}>
              लोड हो रहा है...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0.6rem",
              }}
            >
              <Search size={40} color="rgba(255,248,220,.2)" />
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

            {/* Load More */}
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
                  {!hasMore && " — सभी दिख रहे हैं"}
                </p>
              </div>
            )}
          </>
        )}

        <BlessingsSection />
      </main>

      <Footer />

      {/* ── MODALS ── */}
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

      {/* ── FAB ── */}
      <button className="fab" onClick={() => setShowForm(true)}>
        <Plus size={17} color="#fff" /> दान करें
      </button>
    </>
  );
}
