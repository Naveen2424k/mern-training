const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// Error handling for malformed JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    next();
});



mongoose.connect(process.env.mongo_uri).then(() => console.log("connected")).catch((err) => console.log(err))


app.get('/', (req, res) => { res.send("hello"); })

app.use('/auth', require('./Routes/AuthRoutes'))
app.use('/task',require('./Routes/TaskRoutes'))

app.listen(3000, () => console.log("server started"))

