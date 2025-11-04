// const mongoose = require("mongoose");

// const connect = async () => {

//     const db_url = process.env.DB_URL;

//     try {

//         await mongoose.connect(db_url);

//         const db = mongoose.connection
        

//         db.on("connected", () => {
//             console.log("DB is connected")
//         });

//         db.on("error", () => {
//             console.log("DB is not connected")
//         });


//     } catch (error) {
//         console.log("error:", error)

//     }


// }

// connect();


const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.DB_URL, {
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
}

module.exports = connectDB;

