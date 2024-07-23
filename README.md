```js
yarn start

🚀 ~ main ~ blockNumber: 1826186
🚀 ~ main ~ privateKey: 0xAbcdef
🚀 ~ main ~ VALIDATOR_ADDRESS: 0x3CC1ADB0F1F0083251E91ED680EDE394703BEBDB
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>>>>>>>>>>>>>>>>>>>>>>>>>>
Error: Error: execution reverted (unknown custom error) (action="estimateGas", data="0xdafb6d91", reason=null, transaction={ "data": "0x6bf348ef0000000000000000000000003cc1adb0f1f0083251e91ed680ede394703bebdb00000000000000000000000000000000000000000000000000000000001bde84000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002e8410239bb4b099ee2d5683e3ef9d6f04e321cc0000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000ad57d7d39a487c04a44d3522b910421888fb9c6d0000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000c5cb3459723b828b3974f7e58899249c2be3b33d0000000000000000000000000000000000000000000000000000000000000bb8", "from": "0x516e5a64adf705c4Bb17Ee0d0ab440d74346249B", "to": "0xfb81E39E3970076ab2693fA5C45A07Cc724C93c2" }, invocation=null, revert=null, code=CALL_EXCEPTION, version=6.13.1)
    at makeError (file:///Users/phathdt/Documents/Dev/berachain-command/node_modules/ethers/lib.esm/utils/errors.js:124:21)
    at getBuiltinCallException (file:///Users/phathdt/Documents/Dev/berachain-command/node_modules/ethers/lib.esm/abi/abi-coder.js:102:12)
    at AbiCoder.getBuiltinCallException (file:///Users/phathdt/Documents/Dev/berachain-command/node_modules/ethers/lib.esm/abi/abi-coder.js:203:16)
    at JsonRpcProvider.getRpcError (file:///Users/phathdt/Documents/Dev/berachain-command/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js:672:32)
    at file:///Users/phathdt/Documents/Dev/berachain-command/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js:298:45
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'CALL_EXCEPTION',
  action: 'estimateGas',
  data: '0xdafb6d91',
  reason: null,
  transaction: {
    to: '0xfb81E39E3970076ab2693fA5C45A07Cc724C93c2',
    data: '0x6bf348ef0000000000000000000000003cc1adb0f1f0083251e91ed680ede394703bebdb00000000000000000000000000000000000000000000000000000000001bde84000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002e8410239bb4b099ee2d5683e3ef9d6f04e321cc0000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000ad57d7d39a487c04a44d3522b910421888fb9c6d0000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000c5cb3459723b828b3974f7e58899249c2be3b33d0000000000000000000000000000000000000000000000000000000000000bb8',
    from: '0x516e5a64adf705c4Bb17Ee0d0ab440d74346249B'
  },
  invocation: null,
  revert: null,
  shortMessage: 'execution reverted (unknown custom error)',
  info: {
    error: { code: 3, message: 'execution reverted', data: '0xdafb6d91' },
    payload: {
      method: 'eth_estimateGas',
      params: [Array],
      id: 5,
      jsonrpc: '2.0'
    }
  }
}

```

