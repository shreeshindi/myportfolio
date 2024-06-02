// pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/Home.module.css";
import "@/styles/Eye.module.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
