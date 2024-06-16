const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const sequelize = require("./db/connection");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

//PORT
const PORT = process.env.PORT || 5000;

//routes
app.use("/api/user", userRouter);
console.log("Server Port Name", PORT);

// Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
