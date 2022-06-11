import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import '../index.css'
import { CoinMarketProvider } from '../context/context'

function App({ Component, pageProps }: AppProps) {
  return (
    <CoinMarketProvider>
      <Component {...pageProps} />
    </CoinMarketProvider>

  ) 
}

export default App
      