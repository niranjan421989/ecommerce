const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const { Server } = require("http");

const cors = require('cors');
app.use(cors())

process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shuting down the server due to uncaught Exception`);
    process.exit(1)
})

//config
if(process.env.NODE_ENV!=="PRODUCTION") {
    require("dotenv").config({path:"backend/config/config.env"})
}

// connecting to database
connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.port, ()=> {
    console.log(`Server is running on http://localhost:${process.env.port}`)
});

// unhandel promise rejectin
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shuting down the server due to unhandel promise rejectin`);
    server.close(()=> {
        process.exit(1);
    });
});