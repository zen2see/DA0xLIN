const styles = {
  button: `bg-[#61881F] px-10 py-2 rounded-lg`,
}

const Button = ({ label, onPress }) => {
  return <button className={styles.button} onClick={onPress}>{label}</button>
}

export default Button
