
/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
  //console.log(process.env.REACT_PUBLIC_RPC_URL);
})

const privateKey = `68a1b6943ae634b8fbc3e09ab4fcf2a9152f88cedda3059dce48fa8ded356ded`;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon:{
      url:`https://polygon-amoy.infura.io/v3/18f04d8205624e6d870b85beeff0fb97`,
      accounts:[privateKey]
    }
    
  }
};