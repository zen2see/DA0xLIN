import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers, providers } from 'ethers'
import { useEffect, useState, useCallback, useReducer } from 'react'
import { ellipseAddress, getChainData } from '../config/chaindata'
import Web3Modal from 'web3Modal'
import styles from '../styles/Globals'

const INFURA_ID = process.env.INFURA_PID

const providerOptions = {
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     infuraID: INFURA_ID
  //   },
  // },
    'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Scan with Coinbase Wallet to connect',
    },
    options: {
      appName: 'the0x0address', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: CoinbaseWalletSDK,
    connector: async (_: any, options: { appName: any; networkUrl: any; chainId: any }) => {
      const { appName, networkUrl, chainId } = options
      const coinbaseWalletSDK = new CoinbaseWalletSDK({
        appName,
      })
      const provider = coinbaseWalletSDK.makeWeb3Provider(networkUrl, chainId)
      console.log('PROVIDER ' + provider)
      try {
        await provider.enable()
        return provider
      } catch (e) {
        console.error(e)
      }
    },
    // package: WalletConnectProvider,
    // connector: async (_: any, options: { infuraId: string }) => {
    //   const { infuraId: INFURA_ID } = options
    //   const walletConnect = new WalletConnectProvider({
    //     infuraId: `${INFURA_ID}`,
    //     // qrcodeModalOptions: {
    //     //   desktopLinks: [
    //     //     'ledger',
    //     //     'punkWallet',
    //     //     'trustwallet',
    //     //     'metamask',
    //     //     'argemt',
    //     //     'crypto.com',
    //     //     'bitpay'
    //     //   ],
    //     // }
    //  })
      // const provider = walletConnect
      // await provider.enable()
      // return provider
  },
}
let web3Modal: Web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: false,
    providerOptions, // required
  })
}

type StateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
}

type ActionType =
  | {
    type: 'SET_WEB3_PROVIDER'
    provider?: StateType['provider']
    web3Provider?: StateType['web3Provider']
    address?: StateType['address']
    chainId?: StateType['chainId']
  }
  | {
    type: 'SET_ADDRESS'
    address?: StateType['address']
  }
  | {
    type: 'SET_CHAIN_ID'
    chainId?: StateType['chainId']
  }
  | {
    type: 'RESET_WEB3_PROVIDER'
  }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: 1,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}

export const Wallet = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect().catch(error => {
      console.log("Error getting provider")
      { disconnect }
    })
    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    console.log("about to connect web3Provider")
    // try {
      
    // } catch (error) {
    //   return
    // }
    if (!provider) return 
    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()
    const network = await web3Provider.getNetwork()
    
    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  const chainData = getChainData(chainId)
  const [loadingState, setLoadingState] = useState('not-loaded')
  // const [mood, setMood] = useState()

  console.log(loadingState)
  console.log(chainData)
  console.log(state)

  return (
    <>
      <div className={`text-slate-200`}>
        {address ? (
          <div className={` gap-[1px] pl-5 absolute top-2 right-40`}>
            <div
              className={`text-amber-400 text-sm mr-10`}
              placeholder='Network'>{chainData?.name}
            </div>
            <div
              className={`text-amber-200`}
              placeholder='Address'>{ellipseAddress(address)}
            </div>
          </div>
        ) :
          <p className={``}></p>
        }
        {web3Provider ? (
          <div className={`absolute top-4 right-5 w-100`}>
            <button className={`${styles.btnDisconnect} mr-10 `} onClick={disconnect}>
              Disconnect wallet
            </button>
          </div>
        ) : (
          <div className={`absolute top-4 right-5 w-100`}>
            <button className={`${styles.btnConnect} mr-10 `} onClick={connect}>
              Connect wallet
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Wallet