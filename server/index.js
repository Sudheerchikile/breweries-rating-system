const express=require("express")
const axios=require("axios")

const app=express()

app.use(express.json())
const port=process.env.PORT || 5000;

require('dotenv').config();

const dbConfig=require("./config/dbconfig");



const userRouter=require("./routes/userRoute")
const reviewRouter=require("./routes/reviewRoute");
const authMiddleware = require("./middlewares/authMiddleware");

app.use("/api/user", userRouter);
app.use("/api/add",reviewRouter);


app.listen(port,()=>{
    console.log(`Listening to port`)
})






// Endpoint to handle brewery search
app.get('/api/breweries',authMiddleware, async (req, res) => {
    const { by_city, by_name, by_type, per_page } = req.query;

    let apiUrl = 'https://api.openbrewerydb.org/v1/breweries?';

    if (by_city) {
        apiUrl += `by_city=${by_city}&`;
     
    }
    if (by_name) {
        apiUrl += `by_name=${by_name}&`;
    }
    if (by_type) {
        apiUrl += `by_type=${by_type}&`;
    }

    apiUrl += `per_page=${per_page || 3}`;// Adjust per_page as needed

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
       
    } catch (error) {
        console.error('Error fetching breweries:', error);
        res.status(500).json({ error: 'Error fetching breweries' });
    }
});



