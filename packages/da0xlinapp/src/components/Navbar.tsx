import Head from 'next/head'
import { ethers, providers } from 'ethers'
import { useEffect, useState, useCallback, useReducer } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { ellipseAddress, getChainData } from '../config/chaindata'
// import { bl0xckgardenfacetaddress } from '../config/contractContext'
// import Bl0xckGardenFacet from '../../../hardhat/artifacts/contracts/Bl0xckGardenFacet.sol/Bl0xckGardenFacet.json'
import styles from '../styles/Globals'
import Image from 'next/image'
import da0xlinlogo2 from '../../public/assets/da0xlinlogo2.svg'
import search from '../../public/assets/coins/svg/search.svg'
const INFURA_ID = process.env.INFURA_PID

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraID: INFURA_ID
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'DA0xLIN', // Your app name
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
      await provider.enable()
      return provider
    },
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

export const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()


    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
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
      <div className={`${styles.bgPrimary} ${styles.walletHeader}`}>
        <Image
          src={da0xlinlogo2}
          alt='da0xlinlogo2'
          width={160}
          height={100}
        />
        {/* <Image
          src={da0xlinlogo}
          alt='da0xlinlogo'
          width={160}
          height={100}
        /> */}

        <div className={`${styles.walletHeaderWrapper}`}>
          <nav className={`${styles.headerNav}`}>
            <div className={`${styles.headerNavItem}`}>
              <div className={`${styles.navLink}`}>
                Cryptocurrencies
                <div className={`${styles.navBadge}`} />
              </div>
            </div>
            <div className={`${styles.headerNavItem}`}>
              <div className={`${styles.navLink}`}>
                Exchanges
              </div>
            </div>
            <div className={`${styles.headerNavItem}`}>
              <div className={`${styles.navLink}`}>
                NFT
                <div className={`${styles.navBadge}`} />
              </div>
            </div>
            <div className={`${styles.headerNavItem}`}>
              <div className={`${styles.navLink}`}>
                Cryptown
                <div className={`${styles.navBadge}`} />
              </div>
            </div>
            <div className={`${styles.headerNavItem}`}>
              <div className={`${styles.navLink}`}>
                Portfolio
              </div>
            </div>
            <div className={`${styles.headerNavItem}`}>
              <div className={`${styles.navLink}`}>
                Watchlist
              </div>
            </div>


            <div className={`${styles.searchContainer}`}>
              <Image
                src={search}
                alt='search'
                width={20}
                height={20}
              />
              <input className={styles.input} placeholder='Search' />
            </div>

            <div className={`flex shrink-0`}>
              <div className={`${styles.whiteText} absolute top-4 right-142`}>
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
                <div className={`gap-[1px] pl-5 absolute top-2 right-5 `}>
                  <div
                    className={`text-amber-400 text-sm`}
                    placeholder='Network'>{chainData?.name}
                  </div>
                  <div
                    className={`text-amber-200`}
                    placeholder='Address'>{ellipseAddress(address)}
                  </div>
                </div>
              ) : <p className={`${styles.bgPrimary} `} > </p>}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header


