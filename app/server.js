const express = require('express')
const app = express()
const path = require('path')

const port = 8080;
const baseUri = "http://localhost:8080";
const contractAddress = '0x91F3923e2d0FA2A1E41bd97bB64b2555239D4D56';

const Web3 = require('web3');
console.log(__dirname)
const ArticleToken = require("../build/contracts/Article.json");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:7545`));
const contract = new web3.eth.Contract(ArticleToken.abi, contractAddress);

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/client/index.html", function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    });    
})

app.get('/contract', function (req, res) {
    res.send(contractAddress)
})

app.listen(port, () => {
    console.log(__dirname + "/client/index.html");
    console.log(`API listening port ${port}`)
})