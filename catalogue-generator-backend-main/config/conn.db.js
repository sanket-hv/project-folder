const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        // console.log("Connection Successful");
    })
    .catch((error) => {
        console.log("Connection Error: " + error);
    });
