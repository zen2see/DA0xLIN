import Head from 'next/head'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>DA0xLIN</title>
        <meta name="description" content="HackMoney 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bannerDa0xlin min-h-screen`}>
        <Navbar />
        <Header />
      </div>
    </>
  )
}
export default Home