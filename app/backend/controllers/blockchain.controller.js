import dotenv from "dotenv";
import Web3 from "web3";
import fs from "fs";

// Read ABI JSON
const abiFile = fs.readFileSync("./backend/abi/TBookFactory.json");
const TBookFactory = JSON.parse(abiFile);

dotenv.config();

class BlockchainController {
  constructor() {
    this.init = false;
    this.initWeb3();
  }

  initWeb3() {
    this.networkId = 4; // Rinkeby
    this.defaultWallet = process.env.DEFAULT_WALLET;
    this.infuraToken = process.env.INFURA_PROJECT_ID;
    this.contractAddress = process.env.CONTRACT_ADDRESS;
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/" + this.infuraToken
      )
    );
    this.contract = new this.web3.eth.Contract(
      TBookFactory.abi,
      TBookFactory.networks[this.networkId].address
    );
    this.init = true;
  }
}

let bcController = new BlockchainController();
console.log(bcController.init);
