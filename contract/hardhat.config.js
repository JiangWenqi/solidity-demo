require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.13',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/42aDohn1Vea5rwDd5jRjTmI6tYFC_Vvp',
      accounts: ['c302b3a63c329ba7777a019b7d1887c9adedbbb9b16b5dab55c7a8fb3453d1c9']
    }
  }
}