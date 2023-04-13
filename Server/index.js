const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get('/',(req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/check-health", (req, res) => {
    res.send("App is working fine - React and Express app is up");
});

app.listen(3000, () => {
    console.log('Server started at port:3000');
    console.log('You can view project at http://192.168.16.55:3000/');
})