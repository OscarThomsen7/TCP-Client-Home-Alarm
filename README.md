A TCP client that connects to a friends TCP server that runs on a Pi Pico. Extremely basic HTML to be able to activate and deactivate the alarm through a browser.
An http post request containing either a 1 or a 0 is sent to an express api when the 'activate' or 'deactivate' button is clicked. (1 = activate, 0 = deativate)
The api then tells the tcp client to send the data to the server and recieves the alarms state in return.

If the alarm is tripped the alarm will update its state to 'tripped' and the TCP server will send a 4 to the client. The client then sends a notification about the tripped alarm to my friend who is using the alarm.
