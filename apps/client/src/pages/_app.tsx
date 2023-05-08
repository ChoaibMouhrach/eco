import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/features/store'
import * as Toast from '@radix-ui/react-toast'
import localFont from 'next/font/local'
import Toaster from '@/components/Toast/Toaster'

const myFont = localFont({ src: '../../public/Inter.ttf' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toast.Provider swipeDirection="right">
        <div className={`${myFont.className} min-h-screen`}>
          <Component {...pageProps} style={{ backgroundColor: 'red' }} />
        </div>
        <Toaster />
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </Provider>
  )
}
