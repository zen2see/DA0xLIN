import Head from 'next/head'
import Header from '../components/Header'

export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>DA0xLIN</title>
        <meta name="description" content="Train your Web-Fu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bannerDa0xlin min-h-screen`}>
        <Header />
        <div className={`mt-10`} />
    
        <div className={`mt-5`} />
        <div className={`px-20`}>
      
        </div>
      </div>
    </>
  )
}
export default Home