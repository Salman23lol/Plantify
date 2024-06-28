const express = require("express");
const mongoose = require("mongoose");
const profileRouter = require("./Routes/Profile/profileRoutes");
const { port, Mongo_uri } = require("./Config/Config");
const authRouter = require("./Routes/Auth/authRoutes");
const productRouter = require("./Routes/Product/productRoutes");

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/products', productRouter);

mongoose
  .connect(Mongo_uri)
  .then((ifConnected) => {
    console.log("connect to DB");
    app.listen(port, () => {
      console.log(`Server Runnin on ${port}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });

