import Head from 'next/head'
import styles from '../styles/Globals'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import { Billing, Business, Clients, CardDeal, CTA, Stats, Testimonials, Hero, } from './componentsjsm'

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
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`${styles.flexStart} ${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Business />
            <Billing />
            <CardDeal />
            <Testimonials />
            <Clients />
            <CTA />
          </div>
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