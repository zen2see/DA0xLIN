// import 'tailwindcss/tailwind.css'
// import '../styles/Globals'
// import '../index.css'
// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import '../index.css'
import '../styles/Globals'
import { CoinMarketProvider } from '../context/context'

function App({ Component, pageProps }: AppProps) {
  return (
    <CoinMarketProvider>
      <Component {...pageProps} />
    </CoinMarketProvider>

  )
}

export default App