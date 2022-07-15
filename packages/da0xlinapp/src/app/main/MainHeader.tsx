import React from 'react'
import styles from '../../styles/Globals'
import Image from 'next/image'
import Link from 'next/link'
import { LedgerSigner } from '@ethersproject/hardware-wallets'
import { getNetwork } from '@ethersproject/networks'
import z2savatarSmaller from '/public/assets/images/z2savatarSmaller.png'
import search from '/public/assets/icons/search.svg'

export const MainHeader = () => {
  return (
    <>
      <div className={`flex items-center justify-between ${styles.bgPrimary}`}>
        <div className={``}>
          <Link href='/'>
            <a>
              <Image className={`align-bottom`}
                src={z2savatarSmaller}
                alt='z2savatar'
                width={42}
                height={62}
              />
            </a>
          </Link>
        </div>
  
      </div>
    </>
  )
}

export default MainHeader


