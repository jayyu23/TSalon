import article from './routes/article.route.js'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const port = 8080;
const baseUri = "http://localhost:8080";
const contractAddress = '0x91F3923e2d0FA2A1E41bd97bB64b2555239D4D56';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/articles", article);

app.use("*", (req, res) => {
    res.status(404).json({error: "Not Found"});
});

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});