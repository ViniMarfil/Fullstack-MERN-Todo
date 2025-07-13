const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("The backend is functional! You beautiful being!")
})


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
