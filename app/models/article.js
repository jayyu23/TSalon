const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ArticleSchema = new Schema({
    publishId: {type: String, required: true},
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    brief: { type: String },
    date: { type: Date},
});

const Article = mongoose.model('article', ArticleSchema);



function connect() {
    mongoose.connect('mongodb://localhost:27017/test').then(() => {
    });
}

module.exports = {Cursor: Article, connect: connect};
