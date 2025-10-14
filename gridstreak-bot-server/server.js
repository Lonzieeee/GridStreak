const WebSocket = require('ws');


const PORT = process.env.PORT || 3002;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket Server running on ws://localhost:${PORT}`);
});

wss.on('connection', (ws) => {
  console.log("New client connected");

  ws.send("Hey! I'm StreakBot. Want to learn how we turn plastic into power?");

  ws.on('message', (message) => {
    console.log("User said:", message.toString());

    let response = "I'm not sure I understand yet";

    try {
      const data = JSON.parse(message.toString());

      if (data.type === "faq") {
        const faqResponses = {
          why_gridstreak: "GridStreak offers a carbon-negative, low-cost, and scalable energy storage solution using plastic waste helping the planet while saving money.",
          what_does_gridstreak_do: "GridStreak converts plastic waste into thermal bricks that store clean energy, helping stabilize grids and reduce fossil fuel use.",
          who_can_use_gridstreak: "Governments, businesses, and industries looking to improve energy stability, cut carbon emissions, and eliminate plastic waste.",
          where_is_gridstreak_located: "GridStreak operates globally with its roots in Kenya.",
          how_to_contact: "I'll take you to our contact page right now!",
        };

        response = faqResponses[data.id] || response;
      }
    } catch (err) {
      const userMessage = message.toString().toLowerCase();

      if (userMessage.includes("plastic")) {
        response = "We use pyrolysis to convert plastic waste into heat energy stored in thermal bricks.";
      } else if (userMessage.includes("how") || userMessage.includes("work")) {
        response = "GridStreak's thermal bricks store heat from plastic and release it to stabilize energy grids.";
      } else if (userMessage.includes("demo")) {
        response = "Cool! Please leave your email or reach us through the contact form.";
      } else if (userMessage.includes("thanks")) {
        response = "You're welcome!";
      }
    }

    ws.send(response);
  });

  ws.on('close', () => {
    console.log("Client disconnected");
  });
});
