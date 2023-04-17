import store from "@/features/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import localFont from "next/font/local"

const myFont = localFont({ src: "../../public/Inter.ttf" })

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} >
      <div className={`${myFont.className} min-h-screen`} >
        <Component {...pageProps} style={{ backgroundColor: "red" }} />
      </div>
    </Provider>
  );
}

export default App;
