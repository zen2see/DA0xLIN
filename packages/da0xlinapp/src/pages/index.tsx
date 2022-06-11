import Head from 'next/head'
import Header from '../components/Header'
import Trending from '../components/Trending'
import CMCTable from '../components/cmcTables/CMCTable'

export const Home = (): JSX.Element => {
  
  return (
    <>
      <Head>
        <title>DA0xLIN</title>
        <meta name="description" content="HackMoney 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bannerDa0xlin min-h-screen`}>
        <Header />
        <div className={`mt-10`} />
        <Trending />
        <div className={`mt-5`} /> 
        <div className={`px-20`}>
          <CMCTable />
        </div>
      </div>
    </>
  )
}
export default Home


