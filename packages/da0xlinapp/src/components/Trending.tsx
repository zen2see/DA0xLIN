import React, { useState } from 'react'
import ReactSwitch from 'react-switch'
import styles from '../styles/Globals'
import Image from 'next/image'
import fire from '../../public/assets/coins/fire.png'
import btc from '../../public/assets/coins/btc.png'
import usdt from '../../public/assets/coins/usdt.png'
import gainers from '../../public/assets/coins/gainers.png'
import recent from '../../public/assets/coins/recent.png'
import Rate from './cmcTables/Rate'
import TrendingCard from './TrendingCard'

const trendingData = [
  {
    number: 1,
    symbol: "BTC",
    name: "Bitcoin",
    icon: btc,
    isIncrement: true,
    rate: "2.34%"
  },
  {
    number: 2,
    symbol: "USDT",
    name: "Tether",
    isIncrement: false,
    icon: usdt,
    rate: "9.23%"
  },
  {
    number: 3,
    symbol: "BTC",
    name: "Bitcoin",
    isIncrement: true,
    icon: btc,
    rate: "2.34%"
  },
  
]
const Trending = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className={`text-gray-400 font-ReggaeOne pt-5 px-20`}> 
      <div className={`${styles.trendingWrapper}`}>
        <div className={`flex justify-between`}>
          <h1 className={`${styles.h1}`}>Todays Cryptocurrency Prices by Market Cap</h1>
          <div className={`flex`}>
            <p className={`text-gray-400`}>Highlights &nbsp;</p>
            <ReactSwitch checked={checked} onChange={() => {setChecked(!checked)}} />
          </div>
        </div>
        <br />
        <div className={`flex`}>
          <p className={`text-gray-400 text-sm`}>The global crypto market cap is $1.74T, a &nbsp;</p>
            <span><Rate isIncrement={true} rate='0.53%' /></span>
          <p> &nbsp; decrease over the last day. <span className={`underline`}>Read More.</span></p>
        </div>
        <br />
        <div className={`${styles.trendingFlexCenter}`}>
          <TrendingCard
            title='Trending'
            icon={fire}
            trendingData={trendingData}
            recent={undefined} />
          <TrendingCard
            title='Biggest Gainers'
            icon={gainers}
            trendingData={trendingData}
            recent={undefined} />
          <TrendingCard 
            title='Recently Added'
            icon={recent}
            trendingData={trendingData}
            recent={undefined} />
        </div>
      </div>
    </div>
  )
}

export default Trending