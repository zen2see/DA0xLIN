import chevronDown from "../../assets/svg/chevronDown.svg"
import info from "../../../public/assets/svg/info.svg"

const styles = {
    textIcon: `flex items-center`
}

const CMCtableHeader = () => {
    return <tbody>
        <tr>
            <th></th>
            <th className="flex items-center"><b># &nbsp;</b>{chevronDown}</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>7d %</th>
            <th><div className={styles.textIcon}><p className="mr-2">Market Cap</p>{info}</div></th>
            <th><div className={styles.textIcon}><p className="mr-2">Volume(24h)</p>{info}</div></th>
            <th><div className={styles.textIcon}><p className="mr-2">Circulating Supply</p>{info}</div></th>
            <th>Last 7 days</th>
        </tr>
    </tbody>
}

export default CMCtableHeader