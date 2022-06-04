import articles from './routes/api.js'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const port = 8080;
const baseUri = "http://localhost:8080";
const contractAddress = '0x91F3923e2d0FA2A1E41bd97bB64b2555239D4D56';

const Web3 = require('web3');
console.log(__dirname)
const ArticleToken = require("../build/contracts/Article.json");
const web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:7545`));
const contract = new web3.eth.Contract(ArticleToken.abi, contractAddress);

const app = express();
app.use()

// Connect to the database
articleModel.connect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(express.static(path.join(__dirname, '/client')));

app.get("/api", (req, res) => {
    res.json( {users: ["apple", "pear", "banana"]});
});


app.get('/', function (req, res) {
    res.send('Hello from the server');
})

app.get('/contract', function (req, res) {
    res.send(contractAddress)
})

app.get('/articles/:id', (req, res) => {
    article_id = req.params.id;
    console.log(article_id)
    articleModel.Cursor.find().exec().then((result) => {console.log(result)})
    articleModel.Cursor.findOne({ publishId: article_id }).exec().then((result) => {
        content = result.content;
        res.send(content);
    });
});

app.listen(port, () => {
    console.log(__dirname + "/client/index.html");
    console.log(`API listening port ${port}`)
})