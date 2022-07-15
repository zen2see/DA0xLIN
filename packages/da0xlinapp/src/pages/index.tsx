import Head from 'next/head'
import MainHeader from '../app/main/MainHeader'

export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>DA0xLIN</title>
        <meta name="description" content="Train your Web-Fu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bannerDa0xlin min-h-screen`}>
        <MainHeader />
        <div className={`mt-10`} />
    
        <div className={`mt-5`} />
        <div className={`px-20`}>
      
        </div>
      </div>
    </>
  )
}
export default Home