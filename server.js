require("dotenv").config();
require("./config/database")
const express = require("express");

const PORT = process.env.PORT || 1232;

const app = express();

const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use('/api/v1', userRoute)



app.listen(PORT, () => {
  console.log(`server is listening to port: ${PORT}`);

})