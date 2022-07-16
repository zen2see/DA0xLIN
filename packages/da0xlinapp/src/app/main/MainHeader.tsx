import React from 'react'
import styles from '../../styles/Globals'
import Image from 'next/image'
import Link from 'next/link'
import { LedgerSigner } from '@ethersproject/hardware-wallets'
import { getNetwork } from '@ethersproject/networks'
import z2savatarSmaller from '/public/assets/images/z2savatarSmaller.png'


export const MainHeader = () => {
  return (
    <>
      <div className={`flex items-center justify-between ${styles.bgDkEmerald} banner02`}>
        <div className={``}>
          <Link href='/'>
            <a>
              <Image className={`align-bottom`}
                src={z2savatarSmaller}
                alt='z2savatar'
                width={36}
                height={50}
              />
            </a>
          </Link>
        </div>
        <div>Sight is being remodeled!</div> 
      </div>
    </>
  )
}

export default MainHeader


