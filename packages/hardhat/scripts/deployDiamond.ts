/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-array-constructor */
import { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'
// import { TransactionResponse } from '@ethersproject/abstract-provider'

// https://docs.chain.link/docs/vrf-contracts/
// Here are the details for Polygon mainnet (let's see if we can make this name stick):
// LINK Token: 0x514910771af9ca656af840dff83e8264ecf986ca
// VRF Coordinator: 0x271682DEB8C4E0901D1a1550aD2e64D568E69909
// ChildChainManager (library RLPReader): 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa
// KeyHash: 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da
// Fee: 100000000000000 (0.0001 LINK)

// VRF CoordinatorOLD? 0x3d2341ADb2D31f1c5530cDC622016af293177AE0
// LINK Buffer library? 0xb0897686c545045aFc77CF20eC7A532E3120E0F1

const hre = require('hardhat')
const diamond = require('./diamond-util/index.ts')

function addCommas(nStr) {
  nStr += ''
  const x = nStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

function strDisplay(str) {
  return addCommas(str.toString())
}

async function main(scriptName?) {
  console.log('SCRIPT NAME:', scriptName)

  const accounts = await ethers.getSigners()
  const account = await accounts[0].getAddress()
  // const secondAccount = await accounts[1].getAddress()
  console.log('Account: ' + account)
  console.log('---')
  let tx: { wait: () => any; hash: string }
  let totalGasUsed = ethers.BigNumber.from('0')
  let receipt
  let vrfCoordinator
  let linkAddress
  let linkContract
  let keyHash
  let fee
  let childChainManager
  let DA0TokenContract
  // let DA0StakingDiamond
  // eslint-disable-next-line no-unused-vars
  const gasLimit = 12300000

  if (hre.network.name === 'hardhat') {
    childChainManager = account
    // DA0StakingDiamond = account
    // const LinkTokenMock = await ethers.getContractFactory('LinkTokenMock')
    // linkContract = await LinkTokenMock.deploy()
    // await linkContract.deployed()
    // linkAddress = linkContract.address
    vrfCoordinator = account
    keyHash =
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    fee = ethers.utils.parseEther('0.0001')
  } else if (hre.network.name === 'matic') {
    childChainManager = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa' // RLPReader Library
    vrfCoordinator = '0x271682DEB8C4E0901D1a1550aD2e64D568E69909'
    linkAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1' // Buffer library /PreCoordinator
    keyHash =
      '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da'
    fee = ethers.utils.parseEther('0.0001')
    // Matic DA0 token address
    // DA0TokenContract = await ethers.getContractAt(
    //   'DA0Facet',
    //   '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7' // Change to the matic address
    // )
    // DA0StakingDiamond = '0xA02d547512Bb90002807499F05495Fe9C4C3943f' // Change to the matic address
  } else if (hre.network.name === 'kovan') {
    childChainManager = account
    vrfCoordinator = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'
    linkAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'
    keyHash =
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    fee = ethers.utils.parseEther('0.1')
    // DA0TokenContract = await ethers.getContractAt(
    //   'DA0Facet',
    //   '0xeDaA788Ee96a0749a2De48738f5dF0AA88E99ab5' // Change to kovan address
    // )
    // DA0StakingDiamond = '0xA4fF399Aa1BB21aBdd3FC689f46CCE0729d58DEd'
  } else if (hre.network.name === 'mumbai') {
    childChainManager = '0xb5505a6d998549090530911180f38aC5130101c6'
    vrfCoordinator = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9' // wrong one
    linkAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
    keyHash =
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4' // wrong one
    fee = ethers.utils.parseEther('0.0001')
    // DA0TokenContract = await ethers.getContractAt(
    //   'DA0Facet',
    //   '0xea1447BA5190f1250F10F6C7D09A56982433D617' // mumbai address
    // )
    // DA0StakingDiamond = '0xA02d547512Bb90002807499F05495Fe9C4C3943f' // mumbai address
  } else {
    throw Error('No network settings for ' + hre.network.name)
  }

  async function deployFacets(...facets: string[]) {
    const instances = Array()
    for (let facet of facets) {
      let constructorArgs = []
      if (Array.isArray(facet)) {
        ;[facet, constructorArgs] = facet
      }
      const factory = await ethers.getContractFactory(facet)
      const facetInstance = await factory.deploy(...constructorArgs)
      await facetInstance.deployed()
      const tx = facetInstance.deployTransaction
      const receipt = await tx.wait()
      console.log(`${facet} deploy gas used:` + strDisplay(receipt.gasUsed))
      totalGasUsed = totalGasUsed.add(receipt.gasUsed)
      instances.push(facetInstance)
    }
    return instances
  }

  let [DA0Facet] = await deployFacets(
    'contracts/DA0/facets/DA0Facet.sol:DA0Facet'
  )

  if (hre.network.name === 'hardhat') {
    DA0TokenContract = await diamond.deploy({
      diamondName: 'DA0Diamond',
      initDiamond: 'contracts/DA0/InitDiamond.sol:InitDiamond',
      facets: ['DA0Facet'],
      owner: account,
    })
    DA0TokenContract = await ethers.getContractAt(
      'DA0Facet',
      DA0TokenContract.address
    )
    console.log('DA0 diamond address:' + DA0TokenContract.address)
  }

  // eslint-disable-next-line no-unused-vars
  const DA0Diamond = await diamond.deploy({
    diamondName: 'DA0Diamond',
    initDiamond: 'contracts/DA0/InitDiamond.sol:InitDiamond',
    facets: [['DA0Facet', DA0Facet]],
    owner: account,
    // args: [[]],
  })
  console.log('DA0 diamond address:' + DA0Diamond.address)

  tx = DA0Diamond.deployTransaction
  receipt = await tx.wait()
  console.log('DA0 diamond deploy gas used:' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)
  console.log('Total gas used: ' + strDisplay(totalGasUsed))

  // deploy DA0 token
  console.log('Deploying mint funciton on mumbai')
  DA0Facet = await ethers.getContractAt('DA0Facet', DA0Diamond.address)
  tx = await DA0Facet.mint()
  receipt = await tx.wait()
  console.log('Mint transaction complete ' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  const diamondLoupeFacet = await ethers.getContractAt(
    'DiamondLoupeFacet',
    DA0Diamond.address
  )

  console.log('Total gas used: ' + strDisplay(totalGasUsed))

  return {
    account: account,
    DA0Diamond: DA0Diamond,
    diamondLoupeFacet: diamondLoupeFacet,
    DA0TokenContract: DA0TokenContract,
    DA0Facet: DA0Facet,
    linkAddress: linkAddress,
    linkContract: linkContract,
    // secondAccount: secondAccount,
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main()
    // eslint-disable-next-line no-process-exit
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      // eslint-disable-next-line no-process-exit
      process.exit(1)
    })
}

exports.deployProject = main
