import chalk from 'chalk';
import net from 'net';
const client = new net.Socket();
import dotenv from 'dotenv';
import { sendNotification } from './notificationHandler.js';
dotenv.config();
export const port = process.env.PORT;
const ipAddress = process.env.IP;
export let alarmState = 0;

function connectClient(port, ipAddress){
    client.connect({ port: port, host: ipAddress }, () => {
        console.log(chalk.green('Client: connected to server!'));
    });

    client.on('data', (data) => {
        console.log(chalk.magenta('Server --> Client: current alarm state is:', data.toString()));
        alarmState = parseInt(data.toString());
        if(alarmState === 4){
            sendNotification();
            console.log('Sent notification');
        }
        client.end();
    });
    
    client.on('error', (err) => {
        console.error(chalk.red('Error connecting to server:'), err);
        client.end();
    });

    client.on('close', () => {
        console.log(chalk.redBright('TCP Connection closed'));
    });
}

connectClient(port, ipAddress);

export function sendData(data){
    if(client.readyState !== 'open'){
        client.connect(port, ipAddress, () => {
            console.log(chalk.green('Client: Connected to server again'));
        });
    }
    try {
        let uint8Array = new TextEncoder("utf-8").encode(data);
        client.write(uint8Array);
    } catch (error) {
        console.log('Error: ', error);
    }
};

