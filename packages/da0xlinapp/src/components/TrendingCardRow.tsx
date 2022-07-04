import React from 'react'
import styles from '../styles/Globals'
import Rate from './cmcTables/Rate'
import Image from 'next/image'

const TrendingCardRow = ({ number, icon, name, symbol, isIncrement, rate}) => {
  return (
    <div className={`${styles.trendingCardRow}`}>
      <p className={`opacity-40`}>{number}</p>
      <div className='w-full flex'>
        <div className={`mx-5`}>
          {icon && <Image
            src={icon}
            alt={"icon"}
            width={20}
            height={20}
          />}
        </div>
        <p className={`font-bold`}>
          {name}
          <span className={`text-gray-400`}> {symbol}</span>
        </p>
      </div>
      <Rate isIncrement={rate > 0} rate={rate} />
    </div>
  )
}

export default TrendingCardRow