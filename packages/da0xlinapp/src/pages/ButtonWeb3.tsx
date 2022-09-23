import styles from '../styles/Globals'

const ButtonWeb3 = ({ web3Provider, disconnect, connect, address, chainData, ellipseAddress }) => {
  <>
    <div className={`text-slate-200 absolute top-4 right-40 w-100`}>
      {web3Provider ? (
        <button className={`${styles.btnDisconnect}`} onClick={disconnect}>
          Disconnect wallet
        </button>
      ) : (
        <button className={`${styles.btnConnect}`} onClick={connect}>
          Connect wallet
        </button>
      )}
    </div>
    {address ? (
      <div className={` gap-[1px] pl-5 absolute top-2 right-6`}>
        <div
          className={`text-amber-400 text-sm`}
          placeholder='Network'>{chainData?.name}
        </div>
        <div
          className={`text-amber-200`}
          placeholder='Address'>{ellipseAddress(address)}
        </div>
      </div>
    ) : <p className={``} > </p>}
  </>
  
}

export default ButtonWeb3
