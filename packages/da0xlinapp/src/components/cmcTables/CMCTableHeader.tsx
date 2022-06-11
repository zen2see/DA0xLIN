import React from 'react'
import ChevronDown from '../../../public/assets/coins/svg/chevronDown'
import Info from '../../../public/assets/coins/svg/info'
import styles from '../../styles/Globals'

const CMCTableHeader = () => {
  return (
    <tbody>
      <tr className={`text-gray-400`}>
        <th></th>
        <th className={`flex items-center`}><b># &nbsp;</b><ChevronDown fill={undefined} /></th>
        <th>Name</th>
        <th>Price</th>
        <th>24h %</th>
        <th>7d %</th>
        <th><div className={`${styles.textIcon}`}><p className={`mr-2`}>Market Cap</p><Info/></div></th>
        <th><div className={`${styles.textIcon}`}><p className={`mr-2`}>Volume</p><Info/></div></th>
        <th><div className={`${styles.textIcon}`}><p className={`mr-2`}>Circulating Supply</p><Info/></div></th>
        <th>Last 7 days</th>
      </tr>
    </tbody>
  )
}

export default CMCTableHeader