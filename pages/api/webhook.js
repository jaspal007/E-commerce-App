import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Orders";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  const signingSecret =
    "whsec_64255c635497749ac8e1511f828314c1882bed88d19f76161f43962ec0dd791d";
  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );

  if (event?.type === "checkout.session.completed") {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === "paid") {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
    }
  }

  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
