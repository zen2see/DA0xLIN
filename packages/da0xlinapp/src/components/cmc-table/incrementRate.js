import ChevronDown from "../../..public/assets/svg/chevronDown"
import ChevronUp from "../../../public/assets/svg/chevronUp"

const RateRow = ({ isIncrement, rate }) => {
    return <div className="flex">
        {isIncrement ? <ChevronUp /> : <ChevronDown />}
        <p>{rate}</p>
    </div>
}

export default RateRow
