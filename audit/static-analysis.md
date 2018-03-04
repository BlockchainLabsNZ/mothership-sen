# Static analysis

<br>
## Open Zeppelin contractsZipper uses standard zeppelin-solidity framework contracts such as Pausable.sol, ERC20.sol and others. They are downloaded automatically during project setup from Github repository version 1.6.0.We didn’t test those contracts as we verified the source is from Open Zeppelin libraries. <br>
## ZipToken.sol ZipToken inherits from PausableToken.
The contract has only two functions: the constructor, ZipToken() to initiate the contract and setup total token supply, and the distributeTokens() which is used to distribute tokens among the list of accounts.  ### ZipToken()
It sets up the total supply and put that initial amount on the balance of the contract deployer.

- **Test cases**
	- Contract should be deployed
	- Total supply should be set with an initial amount
	### distributeTokens(address[] addresses, uint[] values)
 Only owner can call this function.
	It receives two lists as parameters (accounts and amounts) and requires they have the same length. 
The function iterates through accounts, and then allocates balances with the specified amount.<!--
- **Params**
	- List of address
	- List of amount of tokens
-->- **Test cases**
	- Owner should be able to call the function
	- No one except the owner can call the function   
	- Invalid address in the list should cause reverting