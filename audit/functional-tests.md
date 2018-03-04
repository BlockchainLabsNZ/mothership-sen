# Functional tests
Tests are conducted on the Kovan test network. The following contract has been verified on Etherscan.

## ZipToken.sol [`0xa52ec0`](https://kovan.etherscan.io/address/0xa52ec0fc83329f4f8672a3cd4ad745715631ed95#code)

### Contract owner can:

* Mint tokens upon deployment of the contract to owners address
* Distribute tokens balances for list of specified addresses
* Pause/unpause transfers of Zipper Token
* Transfer ownership of contract to a new address

### Contributor can:

* Transfer tokens between accounts

## Periods
* Tokens are minted with a fixed supply upon the contract being deployed
* Pause/unpause is controlled manually by the contract owner

## Accounts

* Owner: [0x00f6cf14a82c9f43490e287dff420be026796512](https://kovan.etherscan.io/address/0x00f6cf14a82c9f43490e287dff420be026796512)

* Contributor: [0x005422fc8135d87f49ee4b561cd287eb62b024bb](https://kovan.etherscan.io/address/0x005422fc8135d87f49ee4b561cd287eb62b024bb)

## Expected behaviour tests

### Contract owner
 - [x] 1 Billion ZIPT minted upon contract deployment [`0x4fea9e`](https://kovan.etherscan.io/tx/0x4fea9ef4a316bad1af297de95bbed2d1c627574619d7ff2f4500cdc5795573de)
 - [x] Distribute tokens to list of addresses with corresponding balances [`0x5383ea`](https://kovan.etherscan.io/tx/0x5383ea2d184a0420861003a41b7760db04b01f04b39be775e4825f69958df41d)
 - [x] Pause token transfers  [`0xd371de`](https://kovan.etherscan.io/tx/0xd371de0149e12cc3afee688d0f5a01f7af496419c142cebb3f2cd99e65414d2a)
 - [x] Unpause token transfers  [`0x73bc7e`](https://kovan.etherscan.io/tx/0x73bc7e8cb25acbbecf6d0d11253d3631e38097c219c3d1c7bfe050c1ccba1d7c)
 - [x] Transfer ownership of contract to another address  [`0xfe953b`](https://kovan.etherscan.io/tx/0xfe953b57025f5aa087c33179237476bd2200d12a46bfafa8e5f505730835dc6a)

### Contributor
 - [x] Transfer tokens successfully [`0x2639d7`](https://kovan.etherscan.io/tx/0x2639d73e01b905c34e5af73132a0d3f18509a62153cc94931ea4fca83bd30d88)