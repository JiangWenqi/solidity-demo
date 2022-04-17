# solidity-demo


# Preparation
## Web Client init
## init project
```bash
cd client

npm create vite@latest

npm install

```

## install CSS Framework

Flow these [instructions](https://tailwindcss.com/docs/guides/create-react-app)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

## install react and ethers

```bash
npm install react-icons ethers
```



## Contract init

```bash
cd ../contract
npm init -y

npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

npx hardhat
npx hardhat test

```

## Create account
create account on MetaMask, which is a browser extension

1. Get a wallet address
2. Go `Settings` - `advanced` and open `Show test networks`
3. Select `Ropsten`, and copy the address
4. Search "Ropsten faucet" on Google
   - https://faucet.egorfine.com/
   - https://faucet.dimensions.network/
5. Paste the address, and click `Give me Ropsten ETH!`
6. Wait for minutes, and see the balance on MetaMask

## [Alchemy](https://www.alchemy.com/)

1. Create a new account on Alchemy
2. Create your app -- `Solidity Demo` on Alchemy, and chose `Ropsten` as network
3. Click `VIEW KEY`, and copy the `HTTP` key
4. Paste the `HTTP` key into `hardhat.config.js`

## Hardhat config
The account in `hardhat.config.js` is from MetaMask private key
And then We need to run `npx hardhat run scripts/deploy.js --network ropsten` to deploy the contract.
Here is the output

```
Downloading compiler 0.8.13
Compiled 1 Solidity file successfully
Transactions deployed to: 0xd450CC5a996Bb6023C971E3b7fb203184Fa1c1F8
```

And you can check your balance in MetaMask, it may subtract the gas fee.

# Copy the contract configures to Web `client`

## 1. Copy `contract/artifacts/contracts/Transactions.sol/Transactions.json` to `client/src/utils`
## 2. `client/src/utils/constants.js`
   ```js
   import abi from './Transactions.json'
   export const contractABI = abi.abi
   export const contractAddress = '0xd450CC5a996Bb6023C971E3b7fb203184Fa1c1F8';
   ```


# References
[JavaScript Mastery](https://www.youtube.com/watch?v=Wn_Kb3MR_cU)