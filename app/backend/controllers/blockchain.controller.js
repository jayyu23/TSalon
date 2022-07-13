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
    console.log("init called")
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

  async publish(req, res, next) {
    // Get the author address
    let pub = req.publication;
    assert(pub, "Error – Bad TBSN")
    const author = pub.author
    const authorQuery = await tsalonuserModel.findOne({ username: author });
    const authorAddress = authorQuery.walletAddress;
    assert(author, "Error – Invalid author wallet address")
    let estimatedGas = await instance.contract.methods
      .publish(tbsn, authorAddress)
      .estimateGas({ from: instance.defaultWallet });
    console.log(estimatedGas);
    await instance.contract.methods
      .publish(tbsn, authorAddress)
      .send({ from: instance.defaultWallet, gas: Math.round(estimatedGas * 1.2) });
    console.log("Publication successful");
  }

  async getPrice(req, res, next) {
    try {
      let pub = req.publication;
      let tbsn = pub.tbsn;

      let priceFinney = await instance.contract.methods.getPrice(tbsn).call();
      let priceWei = instance.web3.utils.toWei(priceFinney, "finney");
      let priceETH = instance.web3.utils.fromWei(priceWei, "ether");

      let exchangeData = (await axios.get(instance.exchangeAPI)).data[0];
      let eth_usd = exchangeData.current_price;
      let priceUSD = priceETH * eth_usd;

      let data = { tbsn: tbsn, priceETH: priceETH, priceUSD: priceUSD.toFixed(2) }
      return res.status(200).json({ success: true, priceData: data })
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err })
    }
  }

  async getUserCollection(req, res, next, username) {
    await mongoose.connect(config.mongoUri);
    const userQuery = await tsalonuserModel.findOne({ username: username });
    assert(userQuery, "User Not Found");
    const walletAddress = userQuery.walletAddress;
    let rawUserData = await instance.contract.methods.getUserInfo(walletAddress).call();
    let parseUserData = instance.parseUserInfo(rawUserData);
    // Begin array loop
    let dataArray = []
    let currentBook = parseUserData.firstBook;
    while (currentBook != 0) {
      let bookInfo = await instance.contract.methods.getCopyInfo(currentBook).call();
      let pBookInfo = instance.parseBookInfo(bookInfo);
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

const instance = new BlockchainController();

// bcController.getUserCollection(null, null, null, "TSalon Foundation");
export default instance;
