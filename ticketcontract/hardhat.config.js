/** @type import('hardhat/config').HardhatUserConfig */

const { FANTOM_RPC_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "fantom",
    networks: {
      hardhat: {},
      fantom: {
        url: FANTOM_RPC_URL,
        chainId: 4002,
        gasPrice: 1000000000,
        accounts: [`0x${PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
