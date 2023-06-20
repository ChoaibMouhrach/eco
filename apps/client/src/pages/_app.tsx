import "@/styles/globals.css";
import "ui/styles.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NextNProgress from "nextjs-progressbar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress
        color="#030712"
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
