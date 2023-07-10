import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextProgress from "nextjs-progressbar";
import { Toaster } from "@/components/ui/toaster";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextProgress options={{ showSpinner: false }} color="#030712" />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
