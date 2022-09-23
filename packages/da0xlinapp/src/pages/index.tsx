import Head from 'next/head'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>DA0xLIN</title>
        <meta name="description" content="Train your Web-Fu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`min-h-screen`}>
        <MainHeader />
        <div className={`mt-10 ml-20 text-red-300`}>
          Site is being remodeled!
        </div>  
        <div className={`mt-5`}>
        </div>      
        <div className={`px-20`}>
        </div>
        <MainFooter />
      </div>
    </>
  )
}
export default Home