import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import z2savatarSmaller from '../../public/assets/images/z2savatarSmaller.png'
import Wallet from './Wallet'
import { navLinks } from '../constants'
 
export const MainHeader = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className={`flex items-center banner02`}>
      {/* <nav className={'w-full flex py-6 justify-between items-center navbar'}> */}
        <div className={`flex initial w-1/3 pl-10 mt-1`}>
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
          <ul className={`list-none md:flex flex-1 hidden items-center`}>
            {navLinks.map((nav, index) => (
              <li key={nav.id} className={`cursor-pointer 
                  text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}  text-slate-300`}>
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
          {/* <div className={`md:hidden flex flex-1 justify-end items-center`}>
            <img src={toggle ? close : menu}
              alt='menu'
              className={`w-[28px] h-[28px] object-contain`}
              onClick={() => setToggle((prev) => !prev)}
            />
          </div> */}
        <div><Wallet /></div>   
        
      </div>
    </>
  )
}

export default MainHeader


