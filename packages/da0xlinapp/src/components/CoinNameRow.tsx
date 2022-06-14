import React from 'react'
import Image from 'next/image'
import btc from '../../public/assets/coins/btc.png'
import eth from '../../public/assets/coins/eth.png'
import usdc from '../../public/assets/coins/usdc.png'
import usdt from '../../public/assets/coins/usdt.png'
import xrp from '../../public/assets/coins/xrp.png'
import cardano from '../../public/assets/coins/cardano.png'
import terra from '../../public/assets/coins/terra.png'
import solana from '../../public/assets/coins/solana.png'
import avalanche from '../../public/assets/coins/avalanche.png'
import bnb from '../../public/assets/coins/bnb.png'

const styles = {
  coinNameRow: 'flex items-center',
  buyButton: `bg-[#1A1F3A] text-[#6188FF] p-1 px-3 text-sm rounded-lg cursor-pointer hover:opacity-50`,
}

const CoinNameRow = ({ name, icon, clicked }) => {
  
  const coinIcon = () => {
    switch (name) {
      case 'Bitcoin':
        return (
          <Image
            src={btc}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'Ethereum':
        return (
          <Image
            src={eth}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'Tether':
        return (
          <Image
            src={usdt}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'BNB':
        return (
          <Image
            src={bnb}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'USD Coin':
        return (
          <Image
            src={usdc}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'XRP':
        return (
          <Image
            src={xrp}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'Cardano':
        return (
          <Image
            src={cardano}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'Terra':
        return (
          <Image
            src={terra}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'Solana':
        return (
          <Image
            src={solana}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      case 'Avalanche':
        return (
          <Image
            src={avalanche}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )

      default:
        return (
          <Image
            src={btc}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
        )
    }
  }
  
  return ( 
    <div className={styles.coinNameRow}>
      <div className='mr-3 flex' onClick={clicked}>
        <div className='mr-2'>{coinIcon()}</div>
        {name}
      </div>
      <p>
        {name === 'Bitcoin' || name === 'Ethereum' || name === 'Tether' ? (
          <span className={styles.buyButton}>
            Buy
          </span>
        ) : (
            <></>
        )}
      </p>
    </div>
  )
}

export default CoinNameRow 