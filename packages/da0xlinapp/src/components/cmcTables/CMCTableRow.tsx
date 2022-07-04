import React from 'react'
import Image from 'next/image'
import More from '../../../public/assets/coins/svg/more'
import Star from '../../../public/assets/coins/svg/star'
import Rate from './Rate'
import { useRouter } from 'next/router'
import CoinNameRow from '../CoinNameRow'

const CMCTableRow = ({
  starNum,
  coinName,
  coinIcon,
  coinSymbol = '...',
  price = 0,
  hRate = 0,
  dRate = 0,
  hRateIsIncrement,
  dRateIsIncrement,
  marketCapValue = 0,    
  volumeValue = 0,
  volumeCryptoValue = 0,
  circulatingSupply = 0,

}): JSX.Element => {

  const graphImages = [
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7129.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3957.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/328.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2416.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1765.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2099.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7653.svg',
  ]

  const getRandomGraph = () => {
    const rndInt = Math.floor(Math.random() * 10) + 1
    return graphImages[rndInt]
  }

  const router = useRouter()
 
  const viewCoinDetails = () => {
    router.push(
      `/currencies/info?symbol=${coinSymbol}&coin=${coinName}&price=${price}`,
    )  
  }

  const viewPrice = () => {
    router.push(
      `/currencies/price?symbol=${coinSymbol}&coin=${coinName}&price=${price}`
    )
  }

  const formatNum = (num: number) => {
    return Number(num).toFixed(2).toLocaleString()
  }

  return (
    <tbody className={`styles.cmcTableRow`}>
      <tr>
        <td>
          <Star />
        </td>
        <td>{starNum}</td>

        {coinIcon && coinIcon ? (
          <td className={`cursor-pointer`}>
            <CoinNameRow
              name={coinName}
              icon={coinIcon}
              clicked={viewCoinDetails}
            />
          </td>
        ) : (
            coinName
        )}

        <td className={`cursor-pointer`} onClick={viewPrice}>
          <p>${formatNum(price)}</p>
        </td>
        <td>
          <Rate isIncrement = {hRate > 0} rate = {`${formatNum(hRate)}%`} />
        </td>
        <td>
          <Rate isIncrement ={ dRate > 0} rate = {`${formatNum(dRate)}%`} />
        </td>
        <td>
          <div>
            <p>{formatNum(marketCapValue)}</p>
          </div>
        </td>
        <td>
          <div>
            <p>{formatNum(volumeValue)}</p> 
            {/* <p className={`text-gray-400`}>
              {formatNum(volumeCryptoValue)} {coinSymbol}
            </p> */}
          </div>
        </td>
        <td>
          <div>
            <p>{formatNum(circulatingSupply)} </p>
          </div>
        </td>
        <td>
          <Image src={getRandomGraph()} width={150} height={60} alt='graph'/>
        </td>
        <td>
          <More />
        </td>
      </tr>
    </tbody>
  )
}

export default CMCTableRow