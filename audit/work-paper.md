# Work paper

Feb 28, 2018, Blockchain Labs, NZ


| Contract |            Function            | Visibility | Constant | Returns | Modifiers |              Static Analysis              |   Test Coverage    | Functional Analysis |
|----------|--------------------------------|------------|----------|---------|-----------|-------------------------------------------|--------------------|---------------------|
| ZipToken | ZipToken()                     | public     | false    |         |           | :white_check_mark: | :white_check_mark: | :white_check_mark:  |
| ZipToken | distributeTokens(address,uint) | public     | false    |         | onlyOwner | :white_check_mark: | :white_check_mark: | :white_check_mark:  |
