import { Inter_Tight, Instrument_Serif } from "next/font/google";

/** Primary sans — headlines (700–800, tight tracking) and body (400–500). */
export const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

/** Editorial accent — italic words inside headlines (e.g. "stop" the scroll). */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const fontVariables = `${interTight.variable} ${instrumentSerif.variable}`;
