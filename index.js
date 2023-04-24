const activate = document.getElementById('activate');
const deactivate = document.getElementById('deactivate');
const text = document.getElementById('state-output-text');

activate.addEventListener('click', () => {
    //getAlarmState();
    sendPostRequest("1");
});

deactivate.addEventListener('click', () => {
    //getAlarmState();
    sendPostRequest("0");
});

/*
async function getAlarmState(){
    try {
        const response = await fetch('/getState', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.text();
        console.log(data);
        text.innerHTML = data;
    } catch (error) {
        console.log(error);
    };
};
*/


async function sendPostRequest(value){
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: value,
            }),
        });
        const data = await response.json();
        console.log(`Sent: ${data} to TCP server`);
    } catch (error) {
        console.log(error);
    };
};
