require("dotenv").config();
require("./config/database")
const express = require("express");
const cors = require("cors")

const PORT = process.env.PORT || 5654;

const app = express();

const userRoute = require('./routes/userRoute');
const categoryRouter = require("./routes/categoryRoute")
const productRouter = require("./routes/productRoute")
const checkoutRouter = require("./routes/checkoutRoute")

app.use(express.json());
app.use(cors())
app.use('/api/v1', userRoute)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', checkoutRouter)






app.listen(PORT, () => {
  console.log(`server is listening to port: ${PORT}`);

})