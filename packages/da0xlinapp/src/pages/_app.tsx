import 'tailwindcss/tailwind.css'
import '../styles/Globals'
import '../index.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
