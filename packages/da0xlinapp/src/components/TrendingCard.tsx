import React from 'react'
import Image from 'next/image'
import styles from '../styles/Globals'
import MoreButton from './MoreButton'
import TrendingCardRow from './TrendingCardRow'

const TrendingCard = ({title, icon, trendingData, recent}) => {
  return (
    <div className={`${styles.trendingCard}`}>
      <div className={`${styles.trendingCardWrapper}`}>
        <div className='flex'>
          {icon && <Image src={icon} width={27} height={27} alt='icon' />}
          &nbsp;&nbsp;
          <p className='font-bold'>{title}</p>
        </div>   
        <MoreButton />
      </div>
      <br />
      {trendingData.map((item, index) => {
        return (
          <TrendingCardRow
            key={index}
            number={item.number}
            symbol={item.symbol}
            name={item.name}
            icon={item.icon}
            alt={item.alt}
            isIncrement={item.isIncrement}
            rate={item.rate} 
          />
          )
        })}
    </div>
  )
}

export default TrendingCard