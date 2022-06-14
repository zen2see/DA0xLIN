import ChevronDown from '../../../public/assets/svg/ChevronDown'

const styles = {
  dropdown: `flex items-center mr-2 rounded-md px-2 bg-blue-700 cursor-pointer`,
}

const DropdownBtn = ({ label }) => {
  return (
    <div className={styles.dropdown}>
      <p className='mr-2'>{label}</p>
      <ChevronDown />
    </div>
  )
}

export default DropdownBtn
