import { ethers } from 'ethers'
import 'dotenv/config'

async function callQueueNewCuttingBoard(
  contractAddress,
  signer,
  validatorAddress,
  futureBlockNumber,
  recipients
) {
  const abi = [
    'function queueNewCuttingBoard(address,uint64,(address,uint96)[])',
  ]

  const contract = new ethers.Contract(contractAddress, abi, signer)

  try {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    // const estimatedGas = await contract.queueNewCuttingBoard.estimateGas(
    //   validatorAddress,
    //   BigInt(futureBlockNumber),
    //   recipients
    // )
    // console.log('Estimated gas:', estimatedGas.toString())

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>')
    const tx = await contract.queueNewCuttingBoard(
      validatorAddress,
      futureBlockNumber,
      recipients
    )
    console.log('Transaction sent:', tx.hash)
    const receipt = await tx.wait()
    console.log('Transaction confirmed in block:', receipt.blockNumber)
  } catch (error) {
    console.error('Error:', error)
  }
}

async function main() {
  const provider = new ethers.JsonRpcProvider(
    'https://berachain-testnet-el.contributiondao.com/'
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

  const RECIPIENTS = [
    ['0x2E8410239bB4b099EE2d5683e3EF9d6f04E321CC', BigInt('4000')],
    ['0xAD57d7d39a487C04a44D3522b910421888Fb9C6d', BigInt('3000')],
    ['0xC5Cb3459723B828B3974f7E58899249C2be3B33d', BigInt('3000')],
  ]

  await callQueueNewCuttingBoard(
    contractAddress,
    signer,
    VALIDATOR_ADDRESS,
    FUTURE_BLOCK_NUMBER,
    RECIPIENTS
  )
}

main().catch(console.error)
