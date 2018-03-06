# Functional tests
Tests are conducted on the Kovan test network. The following contract has been verified on Etherscan.

## SEN.sol [`0x9578bb`](https://kovan.etherscan.io/address/0x9578bbc4d83c31ae61013339d9645a3bcbf74a23#code)

## Accounts

* Owner: [0x00a55ee49d3471282fe8bbe89b6f8d8a58ff4674](https://kovan.etherscan.io/address/0x00a55ee49d3471282fe8bbe89b6f8d8a58ff4674)

## Expected behaviour tests

  - [x] Change controller of SEN to Distribution [`0xdd35a7`](https://kovan.etherscan.io/tx/0xdd35a7ce50ae58e0a1abf25c1f8256051215a0c7e03d61615b677a1372a5fe6f)
  - [x] Cannot mint tokens after finalize has been called [`0x08021e`](https://kovan.etherscan.io/tx/0x08021ea613bfde67e12cace53af6ddcb93fb7c795013307fa6de55dbd9c011b5)
  - [x] Cannot send tokens before finalize has been called [`0xdd35a7`](https://kovan.etherscan.io/tx/0x2817292dd27272f73b9864289931a5aa7700b55ea5c93fc15229bfa5f8e86e3c)
  - [x] Transfer minted tokens after finalize has been called by owner. [`0xf6d0af`](https://kovan.etherscan.io/tx/0xf6d0af260d88f214225a27d9dfd93a9e568422d4c6bca1142388aa4f9e9bb88c)


## Distribution.sol [`0x86c6ee`](https://kovan.etherscan.io/address/0x86c6eeaca5ae56ebc0ea5a7834ababd71aaa78e5#code)

## Accounts

* Owner: [0x00a55ee49d3471282fe8bbe89b6f8d8a58ff4674](https://kovan.etherscan.io/address/0x00a55ee49d3471282fe8bbe89b6f8d8a58ff4674)

## Expected behaviour tests

 - [x] Finalize fails when distribution cap is not reached [`0xc01ffb`](https://kovan.etherscan.io/tx/0xc01ffbe29c2eb71a413a1aa38d136a5b823e4ee9a5438f19fbcc6740b9d7d154)
 - [x] Successfully mint tokens [`0x0aaf46`](https://kovan.etherscan.io/tx/0x0aaf46bdfd816abfce3ad520a7025ba2cd1abf237a7321009f061c9433bafe00)
 - [x] Fails to mint tokens exceeding distribution cap [`0xeae236`](https://kovan.etherscan.io/tx/0xeae2364d7661953802066bdbf669262e052b9a9d7708632fcc8b469c24acf708)
 - [x] Successfully finalize and transfer reserve tokens to reserve wallet [`0x0b9878`](https://kovan.etherscan.io/tx/0x0b987883128c6c2cfcfb26fa5b0fd53273afc83f262c4b85d291cd5738164ba4)
