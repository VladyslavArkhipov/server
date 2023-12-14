const express = require("express");
const Mailjet = require("node-mailjet");
const cors = require("cors"); // Добавьте эту строку

const app = express();

app.use(cors()); // Добавьте эту строку

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.use(express.json()); // Добавьте эту строку для парсинга JSON-тела запроса

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC || "0cba6a8a1aa99e3c12507df0cac3a582",
  process.env.MJ_APIKEY_PRIVATE || "43e061e2317d086c79804b04c3a6e7d5"
);

app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "arhanich007@gmail.com",
          Name: "Mailjet Pilot",
        },
        To: [
          {
            Email: "arhanich007@gmail.com",
            Name: "Recipient",
          },
        ],
        Subject: "Your email flight plan!",
        TextPart: "Text",
        HTMLPart: `<h3>Dear recipient, welcome to Mailjet!</h3><br />${email}`,
      },
    ],
  });

  try {
    const result = await request;
    console.log(result.body);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err.statusCode);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.get("/test", (req, res) => {
  res.send("GET request received successfully");
});

app.listen(5000, console.log("Server is started on 5000"));
