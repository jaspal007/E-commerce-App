import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Orders";
import Product from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();

  if (req.method !== "POST") {
    res.json(req.method);
    return;
  }

  const {email, name, address, city, state} = req.body;
  const productIds = req.body.products.split(",");
  const uniqueIds = [...new Set(productIds)];
  const products = await Product.find({ _id: { $in: uniqueIds } }).exec();

  let line_items = [];
  for (let prodID of uniqueIds) {
    const quantity = productIds.filter((id) => id === prodID).length;
    const product = products.find((p) => p._id.toString() === prodID);
    line_items.push({
      quantity,
      price_data: {
        currency: "USD",
        product_data: { name: product.name },
        unit_amount: (product.price + product.price*0.01) * 100,
      },
    });
  }

  const order = await Order.create({
    products: line_items,
    name,
    email,
    address,
    city,
    state,
    paid: 0,
  })

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    metadata: {orderId: order._id.toString()}
  });
  res.redirect(303, session.url);
}
