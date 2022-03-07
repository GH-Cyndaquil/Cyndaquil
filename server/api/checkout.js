const router = require("express").Router();
const stripe = require("stripe")(
  "pk_test_51Ka8iVAc34Ww7kdgb4I6whU3wBlukLywBU3r7pdBhjjluvlLbM9iwANGkKFY0MBLbvIYG2lIcdm22FnbqcMWs2fi00ysi68RoY"
);
const express = require("express");
const app = express();

app.use(express.static("public"));

// const Order = require("../db/models/Order");
// const Product = require("../db/models/Product");
// const OrderDetails = require("../db/models/OrderDetails");
// const {
//   default: StripeContainer,
// } = require("../../client/components/CheckoutUser");

const localDomain = "http://localhost:4242";

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // price info should come from server to avoid manipulation
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${localDomain}?success=true`,
    cancel_url: `${localDomain}?canceled=true`,
  });
  //redirects client to url returned from response
  res.redirect(303, session.url);
});

module.exports = router;
