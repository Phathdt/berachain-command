import { ethers } from 'ethers'
import 'dotenv/config'

async function getActiveCuttingBoard(
  provider,
  contractAddress,
  validatorAddress
) {
  const abi = [
    'function getActiveCuttingBoard(address valCoinbase) view returns (tuple(uint64 startBlock, tuple(address receiver, uint96 percentageNumerator)[] weights))',
  ]

  const contract = new ethers.Contract(contractAddress, abi, provider)

  try {
    const result = await contract.getActiveCuttingBoard.staticCall(
      validatorAddress
    )

    const hexData = ethers.AbiCoder.defaultAbiCoder().encode(
      [
        'tuple(uint64 startBlock, tuple(address receiver, uint96 percentageNumerator)[] weights)',
      ],
      [result]
    )

    console.log('Original Hex Data:')
    console.log(hexData)

    console.log('\nAnalyzing Raw Data:')
    const rawData = hexData.slice(2)
    const chunks = rawData.match(/.{1,64}/g)
    chunks.forEach((chunk, index) => {
      console.log(`Chunk ${index}: ${chunk}`)
      const decimal = BigInt(`0x${chunk}`).toString(10)
      console.log(`  Decimal: ${decimal}`)
      if (chunk.slice(0, 24).replace(/^0+/, '') === '') {
        console.log(`  Possible Address: 0x${chunk.slice(24)}`)
      }
    })

    console.log('\nDecoded Cutting Board Information:')
    console.log('Start Block:', result.startBlock.toString())
    console.log('Weights:')
    result.weights.forEach((weight, index) => {
      console.log(`  ${index + 1}. Receiver: ${weight.receiver}`)
      console.log(
        `     Percentage Numerator: ${weight.percentageNumerator.toString()}`
      )
      const percentage = (Number(weight.percentageNumerator) / 100).toFixed(2)
      console.log(`     Percentage: ${percentage}%`)
    })

    return result
  } catch (error) {
    console.error('Error fetching active cutting board:', error)
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

  const signer = new ethers.Wallet(privateKey, provider)

  const contractAddress = '0xfb81E39E3970076ab2693fA5C45A07Cc724C93c2'

  const VALIDATOR_ADDRESS = '0x99fC13a5b46491D84494165FFaa540fFE7AB78D1'
  console.log('🚀 ~ main ~ VALIDATOR_ADDRESS:', VALIDATOR_ADDRESS)

  await getActiveCuttingBoard(signer, contractAddress, VALIDATOR_ADDRESS)
}

main().catch(console.error)
