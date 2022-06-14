import React, { useState, useContext, useEffect, useCallback } from 'react'  
import btc from '../../../public/assets/coins/btc.png'
import { CoinMarketContext } from '../../context/context'
import CMCTableHeader from './CMCTableHeader'
import CMCTableRow from './CMCTableRow'

const CMCTable = () => {
  let { getTopTenCoins }: any = useContext(CoinMarketContext)
  let [coinData, setCoinData]: any = useState(null)
  
  useEffect(() => { setData() },)
  
  const setData = useCallback(async () => {
    try {
      let apiResponse = await getTopTenCoins()
      let filteredResponse: any = new Array()
      for (let i = 0; i < apiResponse.length; i++) {
        const element = apiResponse[i]
        if (element.cmc_rank <= 10) {
          filteredResponse.push(element)
        }
      }
      setCoinData(filteredResponse)
    } catch (e) {
      console.log(e)
    }
  }, [getTopTenCoins])
  console.log(coinData)
  return (
    <div className={`text-slate-300 font-bold text-sm`}>
      <div className={`mx-auto max-w-screen-2xl`}>
        <table className={`w-full `}>
          <CMCTableHeader />
          {coinData && coinData ? (
            coinData.map((coin, index) => {
              return (
                <CMCTableRow
                  key={index}
                  starNum={coin.cmc_rank}
                  coinName={coin.name}
                  coinSymbol={coin.symbol}
                  coinIcon={btc}
                  // showBuy={true}
                  hRate={coin.quote.USD.percent_change_24h}
                  dRate={coin.quote.USD.percent_change_7d}
                  hRateIsIncrement={true}
                  price={coin.quote.USD.price}
                  marketCapValue={coin.quote.USD.volume_24h}
                  volumeCryptoValue={coin.quote.USD.volume_24h}
                  volumeValue={coin.total_supply}
                  circulatingSupply={coin.circulating_supply} dRateIsIncrement={undefined}               />
              )
            })
          ) : (
              <></>
          )}
        </table>
      </div>
    </div>
  )
} 

export default CMCTable