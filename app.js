const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');
const app = express();
const port = 5000;
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log("server is running  at port  ${port}");
})

mongoose.connect("mongodb://localhost:27017",{
  useNewUrlParser: true,
  setUnifiedTopology: true,
}).then(() => {
  console.log("connect");
})
const schema = mongoose.Schema;
const dataSchema = new schema({
  workingprofessional: String,
  name:String,
  email:String,
}) 

const data = mongoose.model("Data",dataSchema);
app.post('/submit', (req, res) => {
  const {working,name,email} = req.body;
  const newData = new data({
    working,
    name,
    email,
  });
  newData.save();
})