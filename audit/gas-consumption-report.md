# Gas consumption report
performed by Blockchain Labs, February 27, 2018


```
  Contract: ZipToken
    ✓ should put 1000000000 ZIP in the owner's account.
    ✓ should distribute all tokens.
    ✓ should fail to distribute too many tokens. (26432 gas)

  Contract: TokenVesting
    ✓ cannot be released before cliff (26472 gas)
    ✓ can be released after cliff (80816 gas)
    ✓ should release proper amount after cliff (80816 gas)
    ✓ should linearly release tokens during vesting period (217165 gas)
    ✓ should have released all after end (64717 gas)
    ✓ should be revoked by owner if revocable is set (52147 gas)
    ✓ should fail to be revoked by owner if revocable not set (1132732 gas)
    ✓ should return the non-vested tokens when revoked by owner (68805 gas)
    ✓ should keep the vested tokens when revoked by owner (68805 gas)
    ✓ should fail to be revoked a second time (92677 gas)

  Contract: PausableToken
    pause
      when the sender is the token owner
        when the token is unpaused
          ✓ pauses the token (28346 gas)
          ✓ emits a paused event (28346 gas)
        when the token is paused
          ✓ reverts (22248 gas)
      when the sender is not the token owner
        ✓ reverts (21936 gas)
    unpause
      when the sender is the token owner
        when the token is paused
          ✓ unpauses the token (28211 gas)
          ✓ emits an unpaused event (28211 gas)
        when the token is unpaused
          ✓ reverts (22113 gas)
      when the sender is not the token owner
        ✓ reverts (21804 gas)
    pausable token
      paused
        ✓ is not paused by default
        ✓ is paused after being paused (28346 gas)
        ✓ is not paused after being paused and then unpaused (56557 gas)
      transfer
        ✓ allows to transfer when unpaused (52033 gas)
        ✓ allows to transfer when paused and then unpaused (108590 gas)
        ✓ reverts when trying to transfer when paused (52051 gas)
      approve
        ✓ allows to approve when unpaused (45552 gas)
        ✓ allows to transfer when paused and then unpaused (102109 gas)
        ✓ reverts when trying to transfer when paused (51743 gas)
      transfer from
        ✓ allows to transfer from when unpaused (59302 gas)
        ✓ allows to transfer when paused and then unpaused (115859 gas)
        ✓ reverts when trying to transfer from when paused (53225 gas)
      decrease approval
        ✓ allows to decrease approval when unpaused (31649 gas)
        ✓ allows to decrease approval when paused and then unpaused (88206 gas)
        ✓ reverts when trying to transfer when paused (51941 gas)
      increase approval
        ✓ allows to increase approval when unpaused (31754 gas)
        ✓ allows to increase approval when paused and then unpaused (88311 gas)
        ✓ reverts when trying to increase approval when paused (52073 gas)

  Contract: ZipToken
    ✓ should return the correct totalSupply after construction
    ✓ should return the correct allowance amount after approval (45552 gas)
    ✓ should return correct balances after transfer (52033 gas)
    ✓ should throw an error when trying to transfer more than balance (1883301 gas)
    ✓ should return correct balances after transfering from another account (89854 gas)
    ✓ should throw an error when trying to transfer more than allowed (71235 gas)
    ✓ should throw an error when trying to transferFrom more than _from has (71400 gas)
    ✓ should increase by 50 then set to 0 when decreasing by more than 50 (62110 gas)
    ✓ should throw an error when trying to transfer to 0x0 (22493 gas)
    ✓ should throw an error when trying to transferFrom to 0x0 (69222 gas)
    validating allowance updates to spender
      ✓ should start with zero
      ✓ should increase by 50 then decrease by 10 (78403 gas)

·------------------------------------------------------------------------------|----------------------------·
│                                     Gas                                      ·  Block limit: 8000000 gas  │
···········································|···································|·····························
│  Methods                                 ·            21 gwei/gas            ·      1184.10 nzd/eth       │
·····················|·····················|···········|···········|···········|··············|··············
│  Contract          ·  Method             ·  Min      ·  Max      ·  Avg      ·  # calls     ·  nzd (avg)  │
·····················|·····················|···········|···········|···········|··············|··············
│  TokenVestingMock  ·  release            ·    34717  ·    80816  ·    63359  ·           7  ·       1.58  │
·····················|·····················|···········|···········|···········|··············|··············
│  TokenVestingMock  ·  revoke             ·    52147  ·    68805  ·    64641  ·           4  ·       1.61  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  approve            ·        -  ·        -  ·    45552  ·           8  ·       1.13  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  decreaseApproval   ·    16558  ·    31649  ·    27876  ·           4  ·       0.69  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  distributeTokens   ·        -  ·        -  ·        -  ·           0  ·          -  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  increaseApproval   ·    31754  ·    46754  ·    36754  ·           3  ·       0.91  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  pause              ·        -  ·        -  ·    28346  ·          14  ·       0.70  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  transfer           ·        -  ·        -  ·    52033  ·           3  ·       1.29  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  transferFrom       ·    44302  ·    59302  ·    54302  ·           3  ·       1.35  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  transferOwnership  ·        -  ·        -  ·        -  ·           0  ·          -  │
·····················|·····················|···········|···········|···········|··············|··············
│  ZipToken          ·  unpause            ·        -  ·        -  ·    28211  ·           8  ·       0.70  │
·····················|·····················|···········|···········|···········|··············|··············
│  Deployments                             ·                                   ·  % of limit  ·             │
···········································|···········|···········|···········|··············|··············
│  TokenVestingMock                        ·  1109212  ·  1124276  ·  1122907  ·        14 %  ·      27.92  │
···········································|···········|···········|···········|··············|··············
│  ZipToken                                ·        -  ·        -  ·  1858631  ·      23.2 %  ·      46.22  │
·------------------------------------------|-----------|-----------|-----------|--------------|-------------·

  51 passing (14m)
  
```

<br>

## Summary  
Upon finalization of the contracts to be used by Zipper, the contracts were assessed on the gas usage of each function to ensure there aren't any unforeseen issues with exceeding the block size GasLimit.

<br>
