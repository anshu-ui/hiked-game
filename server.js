const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5500;

mongoose.connect("mongodb://localhost:27017/hiked"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    working: String,

});
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");   
});

app.post("/register", (req, res) => {
    try {
        const {name,email,working}=req.body;
        const registrationData = new Registration({name,email,working});
        registrationData.save()
    }
    catch (error) {
        res.status(400).send("Error in registration");
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

