const express = require("express");
const cors = require("cors"); // Require CORS

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/create-account-session", async (req, res) => {
  const { stripeSecretKey, connectedAccountId } = req.body;

  const stripe = require("stripe")(stripeSecretKey);

  try {
    const accountSession = await stripe.accountSessions.create({
      account: connectedAccountId,
      components: {
        payments: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
          },
        },
      },
    });

    res.json({ clientSecret: accountSession.client_secret });
  } catch (error) {
    console.error("Error creating account session:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
