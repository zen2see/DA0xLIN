import CMCPriceConverter from '../../components/CMCPriceConverter'
import Header from '../../components/Header'
import solana from '../../../public/assets/coins/solana.png'
import Usd from '../../../public/assets/coins/svg/usd'
import { useEffect, useState } from 'react'
// import Chat from '../../components/chat'

const stylesInfo = {
  activeTab: `p-1 px-2 mr-2 rounded-lg bg-[#171924]`,
  tabItem: `px-2`,
  tabContainer: `flex items-center p-2 rounded-xl bg-[#222531] border border-gray-500/10 text-sm`,
  info: `min-h-screen`,
  main: `text-white ml-20 max-w-screen-2xl bg-primary`,
  flexStart: `flex items-start`,
  flexBetween: `flex justify-between`,
  flexBetweenCenter: `flex justify-between items-center`,
  tabContainerWrapper: `p-10 pl-0 pr-0 w-2/3`,
  flexCenter: `flex items-center`,
}
  
const Currencies = () => {
  const [coinName, setCoinName] = useState('')
  const [coinSymbol, setCoinSymbol] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    getURLData()
  }, [], )

  const getURLData = async () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)  

    setCoinName(urlParams.get('coinName'))
    setPrice(Number(urlParams.get('price')).toLocaleString())
    setCoinSymbol(urlParams.get('coinSymbol'))
  }

  return (
    <div className={`stylesInfo.info bannerDa0xlin min-h-screen`}>
      <Header />
      <main className={stylesInfo.main}>
        <div className={stylesInfo.flexStart}>
          <div className={stylesInfo.tabContainerWrapper}>
            <div className={stylesInfo.flexBetween}>
              <div className={stylesInfo.tabContainer}>
                <p className={stylesInfo.activeTab}>Price</p>
                <p className={stylesInfo.tabItem}>Market Cap</p>
                <p className={stylesInfo.tabItem}>Trading View</p>
                <p className={stylesInfo.tabItem}>History</p>
              </div>

              <div className={stylesInfo.tabContainer}>
                <p className={stylesInfo.activeTab}>1D</p>
                <p className={stylesInfo.tabItem}>2D</p>
                <p className={stylesInfo.tabItem}>1M</p>
                <p className={stylesInfo.tabItem}>3M</p>
                <p className={stylesInfo.tabItem}>1Y</p>
                <p className={stylesInfo.tabItem}>YTD</p>
                <p className={stylesInfo.tabItem}>ALL</p>
                <p className={stylesInfo.tabItem}>LOG</p>
              </div>
            </div>
            <br />
            {/* <Graph /> */}
            <br />
            <div className={stylesInfo.flexBetweenCenter}>
              <div className='flex'>
                <div className={stylesInfo.flexCenter}>
                  <input className='outline-none' type='checkbox' /> &nbsp; USD
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className={stylesInfo.flexCenter}>
                  <input type='checkbox' /> &nbsp; BTC
                </div>
              </div>

              <p>
                Want more data?{' '}
                <span className='text-[#6188FF]'>Check out our API</span>
              </p>
            </div>
            <br />
            <br />
            <CMCPriceConverter
              from={coinName}
              fromSymbol={coinSymbol}
              fromLogo={solana}
              toLogo={<Usd />}
              price={price}
              to='United States Dollars'
              toSymbol='USD'
            />
          </div>

          <div className='pt-10 ml-5'>
            {/* <Chat /> */}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Currencies
