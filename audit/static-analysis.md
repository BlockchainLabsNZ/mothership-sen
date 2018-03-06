# Static analysis
<br>
## SEN.sol SEN Token inherits from MiniMe token.
The contract has only constructor functions to initiate the token. No parent token, no history.
- **Test cases**
	- nothing to test
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


<br>	### MiniMeToken (constructor)
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

<br>### transfer

```
function transfer(address _to, uint256 _amount) public returns (bool success)
```

It forwards call to `doTransfer()`.

<br>
### transferFrom

```
function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success)
```

It checks some conditions and then calling `doTransfer()`.

Usually it's called by receiver. First of all it checks if the caller is authorised by the token holder (sender) to transfer money from his/her account to receiver account. If so, it forward calls to `doTransfer()` , else it returns fail.

It the caller is the contract controller, the function simply forwards the call to `doTransfer()` without other checks. 

- **Test cases**
	- should fail if the the sender doesn't allowed to transfer requested amount
	- should call `doTransfer()` if the transfer allowed
	- should call `doTransfer()` if the caller is the contract controller

	
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
	- should fail if called externally / publically
	- should return true if the amount is zero
	- should fail if the parentSnapShotBlock is greater or equal the current block number
	- should fail if the receiver address is 0x0
	- should fail if the receiver's address is equal to the address of this contract
	- should fail if the requested amount is greater than the sender's balance
	- should fail if the controller of this contract is the distribution contract (distribution period is still going)
	- should pass if the distribution period is over and the amount to transfer is less than the balance of sender

<br>
### balanceOf
```
function balanceOf(address _owner) public constant returns (uint256 balance)
```

It calls for the `balanceOfAt()` sending the checking address and the current block number.

<br>
### approve

```
function approve(address _spender, uint256 _amount) public returns (bool success)
```

To transfer tokens from one account to another you need to have an approval of the token holder (sender). 

Pre-Conditions:

 - amount is equal to zero or allowance already set to zero
 - contract controller is not a distribution contract

The function saves the allowed amount to the sender's allowances list and fires an event `Approval`.
Returns true.
 
- **Test cases**
	- should record a zero allowance
	- should fail if the contract's controller is the distribution contract
	- if the contract's controller is not the distribution contract
		- if amount is greater than zero
			- it should record new allowance if no previous allowance recorded
			- it should record new allowance if the recorded allowance set to zero
			- should fail if the recorded allowance is not equal to zero


<br>
### allowance

```
function allowance(address _owner, address _spender) public constant returns (uint256 remaining)
```

It returns the amount allowed by sender to transfer to receiver.


- **Test cases**
	- should return the currently allowed amount if there is allowance record exist
	- should return 0 if there is no allowance record

<br>
### approveAndCall

```
function approveAndCall(address _spender, uint256 _amount, bytes _extraData) public returns (bool success)
```

Function description


- **Test cases**
	- nothing to test


<br>
### totalSupply

```
function totalSupply() public constant returns (uint)
```

It calls for the `totalSupplyAt()` with a current block number.



<br>
### balanceOfAt

```
function balanceOfAt(address _owner, uint _blockNumber) public constant returns (uint) 
```

Function description


- **Test cases**
	- nothing to test

### totalSupplyAt

```
function totalSupplyAt(uint _blockNumber) public constant returns(uint)
```

Function description


- **Test cases**
	- nothing to test


<br>
### mintTokens

```
function mintTokens(address _owner, uint _amount) public onlyController notFinalized returns (bool)
```

Function description


- **Test cases**
	- nothing to test

<br>
### destroyTokens

```
function destroyTokens(address _owner, uint _amount) public onlyControllerOrBurner(_owner) returns (bool)
```

Function description


- **Test cases**
	- nothing to test

<br>
### getValueAt

```
function getValueAt(Checkpoint[] storage checkpoints, uint _block) constant internal returns (uint)
```

Function description


- **Test cases**
	- nothing to test

<br>
### updateValueAtNow

```
function updateValueAtNow(Checkpoint[] storage checkpoints, uint _value) internal 
```

Function description


- **Test cases**
	- nothing to test

<br>
### isContract

```
function isContract(address _addr) constant internal returns(bool)
```

Function description


- **Test cases**
	- nothing to test

<br>
### min

```
function min(uint a, uint b) pure internal returns (uint) 
```

Function description


- **Test cases**
	- nothing to test

<br>
### claimTokens

```
function claimTokens(address _token) public onlyController
```

Function description


- **Test cases**
	- nothing to test

<br>
### finalize

```
function finalize() public onlyController notFinalized
```

Only controller can call this function. It requires `finalized` equal to FALSE.
<Br>The function set the `finalized` flag to TRUE.


- **Test cases**
	- should fail if called by anyone except the controller
	- should fail if `finalized` is equal to TRUE


<br>
## Distribution.sol 
SEN Token inherits from MiniMe token.
The contract has only constructor functions to initiate the token.  

- **Test cases**
	- nothing to test
	
### distributeTokens(address[] addresses, uint[] values)
 
Only owner can call this function.
	
It receives two lists as parameters (accounts and amounts) and requires they have the same length. 
The function iterates through accounts, and then allocates balances with the specified amount.

<!--
- **Params**
	- List of address
	- List of amount of tokens
-->
- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting


