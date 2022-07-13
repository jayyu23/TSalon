import dotenv from "dotenv";
import Web3 from "web3";
import fs from "fs";
import tbookpubModel from "../models/tbookpub.model.js";
import config from "../../config/config.js";
import mongoose from "mongoose";
import { assert } from "console";
import tsalonuserModel from "../models/tsalonuser.model.js";
import HDWalletProvider from "@truffle/hdwallet-provider";
import axios from "axios"

// Read ABI JSON
const abiFile = fs.readFileSync("./backend/abi/TBookFactory.json");
const TBookFactory = JSON.parse(abiFile);

dotenv.config();

class BlockchainController {
  constructor() {
    this.init = false;
    this.exchangeAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum";
    this.initWeb3();
  }

  initWeb3() {

    this.networkId = 4; // Rinkeby
    this.defaultWallet = process.env.DEFAULT_WALLET;
    this.infuraToken = process.env.INFURA_PROJECT_ID;
    this.contractAddress = TBookFactory.networks[this.networkId].address;

    this.provider = new HDWalletProvider(process.env.PRIVATE_KEY, "https://rinkeby.infura.io/v3/" + this.infuraToken)
    this.web3 = new Web3(this.provider);
    this.contract = new this.web3.eth.Contract(
      TBookFactory.abi,
      TBookFactory.networks[this.networkId].address
    );
    this.init = true;
  }

  async publish(req, res, next, tbsn) {
    // Get the author address
    await mongoose.connect(config.mongoUri);
    const tbsnQuery = await tbookpubModel.findOne({ tbsn: tbsn });
    assert(tbsnQuery, "Error – Bad TBSN")
    const author = tbsnQuery.author
    const authorQuery = await tsalonuserModel.findOne({ username: author });
    const authorAddress = authorQuery.walletAddress;
    assert(author, "Error – Invalid author wallet address")
    let estimatedGas = await this.contract.methods
      .publish(tbsn, authorAddress)
      .estimateGas({ from: this.defaultWallet });
    console.log(estimatedGas);
    await this.contract.methods
      .publish(tbsn, authorAddress)
      .send({ from: this.defaultWallet, gas: Math.round(estimatedGas * 1.2) });
    console.log("Publication successful");
  }

  async getPrice(req, res, next, tbsn) {
    try {
      let priceFinney = await this.contract.methods.getPrice(tbsn).call();
      let priceWei = this.web3.utils.toWei(priceFinney, "finney");
      let priceETH = this.web3.utils.fromWei(priceWei, "ether");

      let exchangeData = (await axios.get(this.exchangeAPI)).data[0];
      let eth_usd = exchangeData.current_price;
      let priceUSD = priceETH * eth_usd;

      let data = { tbsn: tbsn, priceETH: priceETH, priceUSD: priceUSD }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async getUserCollection(req, res, next, username) {
    await mongoose.connect(config.mongoUri);
    const userQuery = await tsalonuserModel.findOne({ username: username });
    assert(userQuery, "User Not Found");
    const walletAddress = userQuery.walletAddress;
    let rawUserData = await this.contract.methods.getUserInfo(walletAddress).call();
    let parseUserData = this.parseUserInfo(rawUserData);
    // Begin array loop
    let dataArray = []
    let currentBook = parseUserData.firstBook;
    while (currentBook != 0) {
      let bookInfo = await this.contract.methods.getCopyInfo(currentBook).call();
      let pBookInfo = this.parseBookInfo(bookInfo);
      dataArray.push(pBookInfo);
      currentBook = pBookInfo.nextLinkId;
    }
    console.log(dataArray);
  }

  parseUserInfo = (data) => {
    return {
      exists: data[0],
      bookNum: data[1],
      firstBook: data[2].toString(),
      lastBook: data[3].toString(),
    };
  };

  parseBookInfo = (data) => {
    return {
      exists: data[0],
      tbsn: data[1],
      copyNumber: data[2],
      numTransactions: data[3],
      nextLinkId: data[4],
      prevLinkId: data[5],
      initHolder: data[6],
      currentHolder: data[7],
      lastHolder: data[8],
    };
  };

}

let bcController = new BlockchainController();

bcController.getUserCollection(null, null, null, "TSalon Foundation");


// export default bcController;
