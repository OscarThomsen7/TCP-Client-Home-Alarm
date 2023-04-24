import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const data = { "message": "Alarm tripped" }
const url = process.env.URL;

export function sendNotification(){
    axios({
        method: 'POST',
        url, 
        data: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json; charset=utf-8'}
    }) 
      .then((res) => {
        console.log(`statusCode: ${res.status}`)
      })
      .catch((error) => {
        console.error(error)
      })
};