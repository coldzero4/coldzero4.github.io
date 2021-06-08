const express = require("express");
const app = express();

app.listen(8000, () => {
    console.log("Listening at port 8000");
})

app.get("/api_dump", (req, res) => {
    res.send("Hello wordl!!");
    res.end();
})