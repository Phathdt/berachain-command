import { ethers } from 'ethers'
import 'dotenv/config'

async function queueNewCuttingBoard(
  signer,
  contractAddress,
  valCoinbase,
  startBlock,
  weights
) {
  const abi = [
    'function queueNewCuttingBoard(address valCoinbase, uint64 startBlock, tuple(address receiver, uint96 percentageNumerator)[] weights) external',
  ]

  const contract = new ethers.Contract(contractAddress, abi, signer)

  try {
    const estimatedGas = await contract.queueNewCuttingBoard.estimateGas(
      valCoinbase,
      startBlock,
      weights
    )
    console.log('Estimated gas:', estimatedGas.toString())

    const tx = await contract.queueNewCuttingBoard(
      valCoinbase,
      startBlock,
      weights
    )

    console.log('Transaction sent:', tx.hash)

    const receipt = await tx.wait()
    console.log('Transaction confirmed in block:', receipt.blockNumber)
    console.log('Gas used:', receipt.gasUsed.toString())

    return receipt
  } catch (error) {
    console.error('Error queuing new cutting board:', error)
    return null
  }
}

async function main() {
  const provider = new ethers.JsonRpcProvider(
    'https://berachain-v2-testnet-evm-rpc.blacknodes.net/'
  )

  const blockNumber = await provider.getBlockNumber()
  console.log('🚀 ~ main ~ blockNumber:', blockNumber)

  const privateKey = process.env.PRIVATE_KEY
  console.log('🚀 ~ main ~ privateKey:', privateKey)
  const signer = new ethers.Wallet(privateKey, provider)

  const contractAddress = '0xfb81E39E3970076ab2693fA5C45A07Cc724C93c2'

  const VALIDATOR_ADDRESS = process.env.VALIDATOR_ADDRESS
  console.log('🚀 ~ main ~ VALIDATOR_ADDRESS:', VALIDATOR_ADDRESS)
  const FUTURE_BLOCK_NUMBER = BigInt(blockNumber + 250)

  const weights = [
    {
      receiver: '0x2E8410239bB4b099EE2d5683e3EF9d6f04E321CC',
      percentageNumerator: 4000n,
    },
    {
      receiver: '0xAD57d7d39a487C04a44D3522b910421888Fb9C6d',
      percentageNumerator: 3000n,
    },
    {
      receiver: '0xC5Cb3459723B828B3974f7E58899249C2be3B33d',
      percentageNumerator: 3000n,
    },
  ]

  await queueNewCuttingBoard(
    signer,
    contractAddress,
    VALIDATOR_ADDRESS,
    FUTURE_BLOCK_NUMBER,
    weights
  )
}

main().catch(console.error)
