import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as tenderly from "@tenderly/hardhat-tenderly";

tenderly.setup({ automaticVerifications: false });

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "tenderly",
  networks: {
    tenderly: {
      url: "https://rpc.vnet.tenderly.co/devnet/mini-multisig-tests/8d614b6a-6c44-42ce-a191-7bc1855e29f2",
      chainId: 736031,
    },
  },
  tenderly: {
    username: "joseramirezseba",
    project: "mini-multisig",
  },
};

task("verifyExistingMS", "Verifies deployed MultiSigWallet instance")
  .addParam("address")
  .setAction(async (args, hre) => {
    await hre.run("compile");
    console.log("Verifying MS", args.address);
    await hre.tenderly.verify({
      name: "MultiSigWallet",
      address: args.address,
    });
  });

export default config;
