import React from 'react'
import ChevronDown from '../../../public/assets/coins/svg/chevronDown'
import ChevronUp from '../../../public/assets/coins/svg/chevronUp'
import styles from '../../styles/Globals'

const Rate = ({isIncrement, rate}) => {
  
  return (
    <div className={`${styles.rate}`}>
      {isIncrement ? (
        <ChevronUp fill='#17C784'/>
      ) : (
        <ChevronDown fill='#EA3943'/>
      )}
      {isIncrement ? (
        <p className={`${styles.trendingGreen}`}>{rate}</p>
      ) : (
          <p className={`${styles.trendingRed}`}>{rate}</p> 
      )}
    </div>
  )
}
export default Rate