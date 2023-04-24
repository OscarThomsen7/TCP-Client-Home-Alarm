import express from 'express';
import { sendData, port, alarmState } from './tcpConnection.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import * as fs from 'fs';
import * as cheerio from 'cheerio';
const alarmStates = ['Activated', 'Deactivated', 'Something option 3', 'Tripped'];

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true})); 

app.get('/', (req, res) => {
  
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const $ = cheerio.load(data);
    const paragraph = $('#state-output-text');

    for (const [index, state] of alarmStates.entries()) {
      if (alarmState ===  index + 1) {
        paragraph.text(state);
      }
    }

    res.setHeader('Content-Type', 'text/html');
    res.send($.html());
  });
});

app.get('/style.css', function(req, res) {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(__dirname + '/style.css');
});

app.get('/index.js', function(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/index.js');
});

app.post('/', (req, res) => {
  const data = req.body.data;
    try {
      sendData(data);
    } catch (error) {
        throw new Error(error);
    }
    res.send(data);
});

app.listen(port, () => {console.log(`App: Listening on port: ${port}`)});