'use strict'

const bodyParser = require('body-parser')
const express = require('express');
const mongo = require('mongodb')

const DB_NAME = 'word_database';
const DB_HOST = process.env.DB_HOST || 'localhost:27017';
const COLLECTION_NAME = 'words';
const SERVER_PORT = 8000;

const app = express();
const dbUri = `mongodb://${DB_HOST}/${DB_NAME}`;

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({
    extended: false
}))

function loadWordsFromDatabase() {
    return mongo.connect(dbUri, {
            useNewUrlParser: true
        }).then(client => {
            return client.db(DB_NAME).collection(COLLECTION_NAME).find({}).toArray();
        })
        .then((docs) => {
            return docs.map(doc => doc.word);
        });
}

app.get('/', (req, res) => {
    console.info("Loading data from database...");
    loadWordsFromDatabase().then(words => {
        console.info("Data loaded, showing the result...");
        res.render('index', {
            words: words
        });
    });
});

app.post('/new', (req, res) => {
    const word = req.body.word;

    console.info(`Got word: ${word}`);
    if (word) {
        mongo.connect(dbUri, {
            useNewUrlParser: true
        }).then(client => {
            client.db(DB_NAME).collection(COLLECTION_NAME).insertOne({
                word
            }, () => {
                client.close();
            });
        });
    }

    res.redirect('/');
});

app.listen(SERVER_PORT, () => {
    console.info("Server started on port %d...", SERVER_PORT);
});