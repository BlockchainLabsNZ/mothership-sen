# Static analysis
<br>

## SEN.sol SEN Token inherits from MiniMe token.
The contract has only constructor functions to initiate the token. No parent token, no history.
- **Test cases**
	- nothing to test

<!-- ----------------------------- -->
<br>

## MiniMeToken.sol SEN Token inherits from [Minime Token contracts](https://github.com/Giveth/minime). 
<br>There are some changes:

- Token Factory is removed
- process of token cloning is replaced with minting the only one
- transfer is always enabled
- finalisation is added together with a check if the crowd sale is finalised 
- it doesn't supposed to receive money (no fallback function)
- it has some differences with original contract in checking conditions - [View issue on Github](https://github.com/BlockchainLabsNZ/mothership-sen/issues/1)#### Security concerns

The original MiniMe token contract allows the contract controller to transfer tokens without token holders permission. In the current implementation of MiniMe it is also always allowed to transfer tokens after minting.
<hr>
<br>

#### Events
- `Transfer()` - when tokens are transfered from one account to another.
- `Approval()` - transfering of some amount of tokens is approved by token holder.
- `ClaimedTokens()` - can be used by the controller to extract mistakenly sent tokens to this contract.


<!-- ----------------------------- -->
<br>

	### MiniMeToken (constructor)
```
  function MiniMeToken(
    address _parentToken,
    uint _parentSnapShotBlock,
    string _tokenName,
    uint8 _decimalUnits,
    string _tokenSymbol
  ) public
```
It receives lists of parameters and initialises the contract variables.

<!-- ----------------------------- -->
<br>

### transfer

```
function transfer(address _to, uint256 _amount) public returns (bool success)
```

It forwards call to `doTransfer()`.

<!-- ----------------------------- -->
<br>

### transferFrom

```
function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success)
```

It checks some conditions and then calling `doTransfer()`.

Usually it's called by receiver. First of all it checks if the caller is authorised by the token holder (sender) to transfer money from his/her account to receiver account. If so, it forward calls to `doTransfer()` , else it returns fail.

If the caller is the contract controller, the function simply forwards the call to `doTransfer()` without other checks. 

- **Test cases**
	- should fail if the the sender didn't allow to transfer requested amount
	- should call `doTransfer()` if the transfer allowed
	- should call `doTransfer()` if the caller is the contract controller

	
<!-- ----------------------------- -->
<br>

### doTransfer

```
function doTransfer(address _from, address _to, uint _amount) internal returns(bool)
```

It transfers requested amount of tokens from the sender to receiver.

Pre-Conditions:

- The function can be called by other function of this contract only. 
- The requested amount should be greater than zero, otherwise it stops and returns TRUE. 
- `parentSnapShotBlock` (the block number from the Parent Token that was used to determine the initial distribution of the Clone Token) is less than the current block number. - **not relevant to Mothership's implementation of the MiniMe token because they don't clone tokens**.
- The receiver address is not the address of this contract and other than a zero.

The function checks the `balanceOfAt()` of the sender for the current block number. It returns FAIL if the balance is less than an amount requested to transfer. 

Then the function checks if the distibution period is not finalised - by checking if the controller is a distribution contract.
If so, it fails.

Otherwise, the function updates balances of the receiver and the sender (with checking for overflow error) and log the event `Transfer`.

- **Test cases**
	- should fail 
		- if called externally / publically
		- should fail if the parentSnapShotBlock is greater or equal the current block number
		- should fail if the receiver address is 0x0
		- should fail if the receiver's address is equal to the address of this contract
		- should fail if the requested amount is greater than the sender's balance
		- should fail if the controller of this contract is the distribution contract (distribution period is still going)
	- should pass
		- if the amount is zero
		- if the distribution period is over and the amount to transfer is less than the balance of sender

<!-- ----------------------------- -->
<br>

### balanceOf
```
function balanceOf(address _owner) public constant returns (uint256 balance)
```

It calls for the `balanceOfAt()` sending the checking address and the current block number.

<!-- ----------------------------- -->
<br>

### approve

```
function approve(address _spender, uint256 _amount) public returns (bool success)
```

To transfer tokens from one account to another you need to have an approval of the token holder (sender). 

Pre-Conditions:

 - amount is equal to zero or allowance already set to zero
 - contract controller is not a distribution contract

The function saves the allowed amount to the sender's allowances list and fires an `Approval` event.
Returns true.
 
- **Test cases**
	- should record a zero allowance
	- should fail if the contract's controller is the distribution contract
	- if the contract's controller is not the distribution contract
		- if amount is greater than zero
			- it should record new allowance if no previous allowance recorded
			- it should record new allowance if the recorded allowance set to zero
			- should fail if the recorded allowance is not equal to zero
			- should fire an `Approval` event


<!-- ----------------------------- -->
<br>

### allowance

```
function allowance(address _owner, address _spender) public constant returns (uint256 remaining)
```

It returns the amount allowed by sender to transfer to receiver.


- **Test cases**
	- should return the currently allowed amount if there is allowance record exist
	- should return 0 if there is no allowance record

<!-- ----------------------------- -->
<br>


### approveAndCall

```
function approveAndCall(address _spender, uint256 _amount, bytes _extraData) public returns (bool success)
```

Token holder approves `_spender` to send `_amount` tokens on
its behalf, and then a function is triggered in the contract that is
being approved, `_spender`. 

Pre Condition: `_spender` should be approved by the token holder to transfer specified `_amount`


- **Test cases**
	- nothing to test


#### Security concerns

The `_spender` is an **EXTERNAL** contract that can do anything in the function `receiveApproval()` which it should implement. There is no any control on that contract and the `ApproveAndCall()` always returns TRUE (unless the called function reverts).



<!-- ----------------------------- -->
<br>

### totalSupply

```
function totalSupply() public constant returns (uint)
```

It calls for the `totalSupplyAt()` with a current block number.



<!-- ----------------------------- -->
<br>

### balanceOfAt

```
function balanceOfAt(address _owner, uint _blockNumber) public constant returns (uint) 
```

The function queries the balance of `_owner` at a specific `_blockNumber`.

If there is no any record for the `_owner` it will check the parent token balance at the `_blockNumber`.
<br>
It also checks the parent token balance if the block number of the owner's first record is a greater than the `_blockNumber`.

It returns `_owner` balance at the specified block number, for the current token (if found) or the parent one.
<Br>It returns zero if there is no parent token.

- **Test cases**
	- if the first record of the owner balance is for the block number which is greater than a queried block OR there is no records at all for this owner
		- if the queried block number is less than the block number when the current token was created
			- should return the owner balance at the queried block number
		- otherwise
			- should return the owner balance at the block number when this token was created  
		- should returns zero if there is no parent tokens used


<!-- ----------------------------- -->
<br>

### totalSupplyAt

```
function totalSupplyAt(uint _blockNumber) public constant returns(uint)
```

This function returns the total amount of tokens at a specific `_blockNumber`.

If there is no any record for the Total Supply it will check the parent token Total Supply at the `_blockNumber`.
<br>
It also checks the parent token Total Supply if the block number of the first record is a greater than the `_blockNumber`.

It returns Total Supply at the specified block number, for the current token (if found) or the parent one.
<Br>It returns zero if there is no parent token.

- **Test cases**
	- if the first record with the Total Supply is for the block number which is greater than a queried block OR there is no records of Total Supply at all 
		- if the queried block number is less than the block number when the current token was created
			- should return the Total Supply at the queried block number
		- otherwise
			- should return the Total Supply at the block number when this token was created  
		- should returns zero if there is no parent tokens used



<!-- ----------------------------- -->
<br>

### mintTokens

```
function mintTokens(address _owner, uint _amount) public onlyController notFinalized returns (bool)
```

Mint `_amount` tokens that are assigned to `_owner`.

Pre Conditions:

- Can be called only by Controller
- Only when the distribution period is not finalized

The function update the checkpoints list with new Total Supply and increases the balance of the owner to the specified amount. It also checks for overflow.

- **Test cases**
	- should fail when called by normal user
	- when called by Controller
		- should mint tokens directly to the balance of specified owner
		- should fire a `Transfer` event
		- should fail if distribution period is finalized

<!-- ----------------------------- -->
<br>


### destroyTokens

```
function destroyTokens(address _owner, uint _amount) public onlyControllerOrBurner(_owner) returns (bool)
```

The function burns `_amount` tokens from `_owner`.
<br>Can be called only by the Controller or Burner (Contract creator becomes a Burner by default). 

Pre Conditions:

- The total amount of tokens should be greater than amount to destroy
- The balance of an owner should be greater than amount to destroy

Controller as caller can burn the specified amount of tokens of any account. 
<br>The contract deployer/creator can burn the specified amount of own tokens. 

The function updates the total balance of the tokens and the balance of the `_owner`, decreasing the specified `_amount` from that accounts. Then it fires a `Transfer` event about transfering `_amount` from the `_owner` account to 0x0.

Finally, it returns TRUE.


- **Test cases**
	- it should fail
		- if the total supply is less than an amount to destroy
		- if the owner balance is less than an amount to destroy
		- if called by any except Controller or Burner (contract deployer by default) 
	- when the amount to destroy is less than total supply AND amount to destroy is less than the `_owner` balance
		- when its called by Controller
			- it should destroy specified amount from specified account
			- it should `Transfer` event with 0x0 as a reciepient of that amount
		- when its called by Burner
			- it should destroy specified amount from burner's account
			- it should `Transfer` event with 0x0 as a reciepient of that amount



<!-- ----------------------------- -->
<br>

### getValueAt

```
function getValueAt(Checkpoint[] storage checkpoints, uint _block) constant internal returns (uint)
```

The function retrieves the number of tokens at a given block number.
<br>Can be called only by other functions of this contract.

It checks if there is token history available and returns 0 if not.

If the queried block is greater or equal to the block number of the last record in history, it returns the value for that block. 

If the queried block is less than the block number of the first record, it returns zero.

- **Test cases**
	- it should return 0 if there are no recorded checkpoints
	- it should return token amount at the last recorded checkpoint if the queried block number is greater or equal than block number from the last record in history
	- otherwise it should return the token amount from the last record that preceeds the queried block 





<!-- ----------------------------- -->
<br>

### updateValueAtNow

```
function updateValueAtNow(Checkpoint[] storage checkpoints, uint _value) internal 
```

This function used to update the `balances` map and the `totalSupplyHistory`.
<br>Can be called only by other functions of this contract.

The function receives a link to the checkpoints list (changes history of the amount of tokens) and the new amount for the current block.

If the last saved block number is the same as the current one, the function updates that last record with a new amount, otherwise it add new record with new (current) block number and specified amount.


- **Test cases**
	- should add new record with current block number and specified amount
		- if the checkpoints list is empty
		- if the last record in the list has the old block number
	- should overwrite the last record with current block number and specified amount
		- if the last record in the list has the same block number as the current one
		- if the last record in the list has the block number greater than the current one




<!-- ----------------------------- -->
<br>

### isContract

```
function isContract(address _addr) constant internal returns(bool)
```

Internal function to determine if an address is a contract. Returns TRUE if so.
Returns FALSE if the addres is equal to zero or not a contract's address.

- **Test cases**
	- should return fail if the address is a personal account
	- should return fail if the address is 0x0
	- should return true if the address is this contract address




<!-- ----------------------------- -->
<br>

### min

```
function min(uint a, uint b) pure internal returns (uint) 
```

Return the smaller from two numbers received. Can be called only by other contract's function. 




<!-- ----------------------------- -->
<br>

### claimTokens

```
function claimTokens(address _token) public onlyController
```

This method can be used by the controller to extract mistakenly sent tokens to this contract.

Pre Conditions:

- only controller can call this function

If the input parameter is equal to 0x0, then function send it's ether balance to the controller's account, otherwise it get the balance of token with that parameter's address, send all of that tokens to the controller and fire `ClaimedTokens` event.

- **Test cases**
	- should fail if the caller is not a controller
	- if the caller is a controller:
		- when the parameter is equal 0x0, should send all ETH to controller's account 
		- when the parameter is an address of a token, should send that tokens to the controller 
		- should fire a `ClaimedTokens` event



<!-- ----------------------------- -->
<br>

### finalize

```
function finalize() public onlyController notFinalized
```

The function set the `finalized` flag to TRUE.
<Br>Only controller can call this function. It requires `finalized` equal to FALSE.



- **Test cases**
	- should fail if called by anyone except the controller
	- should fail if `finalized` is equal to TRUE






<!-- ----------------------------- -->
<br>
<!-- ----------------------------- -->





## Distribution.sol 
Distribution contract inherits from TokenController and Controlled. It supports MiniMeToken interfaces.

	
### distribution

```
function Distribution(
    address _token,
    address _reserveWallet,
    uint256 _totalSupplyCap,
    uint256 _totalReserve
  ) public onlyController
```
 
The constructor.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### distributionCap

```
function distributionCap() public constant returns (uint256)
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### finalize

```
function finalize() public onlyController
```
Description.


- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### proxyMintTokens

```
  function proxyMintTokens(
    address _th,
    uint256 _amount,
    string _paidCurrency,
    string _paidTxID
  ) public onlyController returns (bool)
```
Description.


- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### onTransfer

```
function onTransfer(address, address, uint256) public returns (bool)
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### onApprove

```
function onApprove(address, address, uint256) public returns (bool)
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### claimTokens

```
function claimTokens(address _token) public onlyController
``` 

This method can be used by the controller to extract mistakenly sent tokens to this contract.

Pre Conditions:

- only controller can call this function

If the input parameter is equal to 0x0, then function send it's ether balance to the controller's account, otherwise it get the balance of token with that parameter's address, send all of that tokens to the controller and fire `ClaimedTokens` event.

- **Test cases**
	- should fail if the caller is not a controller
	- if the caller is a controller:
		- when the parameter is equal 0x0, should send all ETH to controller's account 
		- when the parameter is an address of a token, should send that tokens to the controller 
		- should fire a `ClaimedTokens` event


<!-- ----------------------------- -->
<br>

### totalTransactionCount

```
function totalTransactionCount(address _owner) public constant returns(uint)
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

### getTransactionAtIndex

```
  function getTransactionAtIndex(address _owner, uint index) public constant returns(
    uint256 _amount,
    string _paidCurrency,
    string _paidTxID
  )
``` 
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>


### addTransaction

```
function addTransaction(
    Transaction[] storage transactions,
    uint _amount,
    string _paidCurrency,
    string _paidTxID
    ) internal
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>


### doMint

```
function doMint(address _th, uint256 _amount) internal
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>


### getBlockNumber

```
function getBlockNumber() internal constant returns (uint256)
```
Description.

- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


<!-- ----------------------------- -->
<br>

