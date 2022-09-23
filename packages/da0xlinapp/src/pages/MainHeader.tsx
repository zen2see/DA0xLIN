import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import z2savatarSmaller from '../../public/assets/images/z2savatarSmaller.png'
import Wallet from './Wallet'

export const MainHeader = () => {
  return (
    <>
      <div className={`flex items-center justify-between banner02`}>
        <div className={`ml-10 mt-1`}>
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
        <Wallet />
      </div>
    </>
  )
}

export default MainHeader


