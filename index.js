const express = require("express");
const dotenv = require("dotenv");
const App = express();
// const cors = require("cors");
dotenv.config();

App.use(express.json());
const Port = process.env.Port || 2000;
App.listen(Port, () => console.log(`Server Is Runing on ${Port}`));



// const UserRouter= require('./src/Router/userRouter')



// App.use('api/user',UserRouter)