// import { createServer } from 'http';

// createServer((req, res) => {
//     res.writeHead(202, {'Content-Type': 'application/json'})
//     res.write(JSON.stringify({name: 'John', age: 30}))
//     res.end()
// }).listen(3000);

// console.log(process.argv)

// import colors from 'colors';
// import express from 'express';
// const app = express();

// app.get('/', (req, res) => {
//     console.log(req.query)
//     res.send(`home page ${req.query.name}`)
// })

// app.get('/about', (req, res) => {
//     res.send('About Page')
// })

// app.get('/contact/:name', (req, res)=>{
//     res.send(`Contact Page ${req.params.name}`)
// })

// app.listen(3000)

// import dbConnect from './mongodb.js';

// const collection = await dbConnect();
// const result = await collection.find({}).toArray();
// console.log(result)

import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const result = await mongoose.connect(process.env.MONGODB_URI);
mongoose.pluralize(null);

const productSchema = new mongoose.Schema({
  item: String,
  qty: Number,
  tags: [String],
  size: {
    h: Number,
    w: Number,
    uom: String,
  },
});

app.use(express.json());

const saveItem = async (Data) => {
  const Product = mongoose.model("inventory", productSchema);
  let data = new Product(Data);
  let result = await data.save();
  return result;
};

app.get("/", async (req, res) => {
  const Product = mongoose.model("inventory", productSchema);
  let result = await Product.find({});
  res.send(result);
});

app.post("/", async (req, res) => {
  const result = await saveItem(req.body);
  res.send(result);
});

const findItem = async () => {
  const Product = mongoose.model("inventory", productSchema);
  let result = await Product.find({ item: "postcard" });
  console.log(result);
};

app.delete("/:item", async (req, res) => {
  const Product = mongoose.model("inventory", productSchema);
  let result = await Product.deleteMany({
    item: req.originalUrl.split("/")[1],
  });
  res.send(result);
});

app.listen(process.env.PORT || 3000);

// import os from 'os';

// console.log(os.userInfo())
