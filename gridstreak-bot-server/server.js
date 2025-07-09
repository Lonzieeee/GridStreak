
const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 3001 }, () => {
  console.log("WebSocket Server running on ws://localhost:3001");
});

wss.on('connection', (ws) => {
  console.log("🔌 New client connected");


  ws.send("Hey! I'm StreakBot. Want to learn how we turn plastic into power?");

  ws.on('message', (message) => {
    console.log("📩 User said:", message.toString());

    const userMessage = message.toString().toLowerCase();
    let response = "I'm not sure I understand yet 🤖";

    if (userMessage.includes("plastic")) {
      response = "We use pyrolysis to convert plastic waste into heat energy stored in thermal bricks ";
    } else if (userMessage.includes("how") || userMessage.includes("work")) {
      response = "GridStreak's thermal bricks store heat from plastic and release it to stabilize energy grids ";
    } else if (userMessage.includes("demo")) {
      response = "Cool! Please leave your email or reach us through the contact form ";
    } else if (userMessage.includes("thanks")) {
      response = "You're welcome!";
    }

    // Send the bot's reply
    ws.send(response);
  });

  ws.on('close', () => {
    console.log(" Client disconnected");
  });
});
