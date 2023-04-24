const activate = document.getElementById('activate');
const deactivate = document.getElementById('deactivate');

activate.addEventListener('click', () => {
    sendPostRequest("1");
});

deactivate.addEventListener('click', () => {
    sendPostRequest("0");
});

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
