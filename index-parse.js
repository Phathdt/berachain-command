import { ethers } from 'ethers'
import 'dotenv/config'

function decodeCuttingBoardData(data) {
  // ABI cho hàm getActiveCuttingBoard
  const abi = [
    'function getActiveCuttingBoard(address) view returns (tuple(uint64 startBlock, tuple(address receiver, uint96 percentageNumerator)[] weights))',
  ]

  // Tạo interface từ ABI
  const iface = new ethers.Interface(abi)

  // Giải mã data
  const decodedData = iface.decodeFunctionResult('getActiveCuttingBoard', data)

  // Lấy CuttingBoard từ kết quả giải mã
  const cuttingBoard = decodedData[0]

  // Xử lý và hiển thị thông tin
  console.log('Cutting Board Information:')
  console.log('Start Block:', cuttingBoard.startBlock.toString())
  console.log('Weights:')
  cuttingBoard.weights.forEach((weight, index) => {
    console.log(`  ${index + 1}. Receiver: ${weight.receiver}`)
    console.log(
      `     Percentage Numerator: ${weight.percentageNumerator.toString()}`
    )
    // Chuyển đổi percentageNumerator thành phần trăm thực tế
    const percentage = (Number(weight.percentageNumerator) / 100).toFixed(2)
    console.log(`     Percentage: ${percentage}%`)
  })

  return cuttingBoard
}

// // // Sử dụng hàm
// const hexData =
//   '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001bc114000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000002e8410239bb4b099ee2d5683e3ef9d6f04e321cc0000000000000000000000000000000000000000000000000000000000002710'

const hexData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001c0b3e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002e8410239bb4b099ee2d5683e3ef9d6f04e321cc0000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000ad57d7d39a487c04a44d3522b910421888fb9c6d0000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000c5cb3459723b828b3974f7e58899249c2be3b33d0000000000000000000000000000000000000000000000000000000000000bb8'
console.log('🚀 ~ hexData:', hexData.length)

const decodedCuttingBoard = decodeCuttingBoardData(hexData)
