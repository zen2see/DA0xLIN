import React from 'react'
import RightArrow from '../../public/assets/coins/svg/rightArrow'
import styles from '../styles/Globals'

const MoreButton = () => {
  return (
    <div className={`${styles.moreButton}`}>More<RightArrow/></div>
  )
}

export default MoreButton