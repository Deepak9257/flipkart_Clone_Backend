const mongoose = require("mongoose");

const connect = async () => {

    const db_url = process.env.DB_URL;
    
    let isConnected = false;

    try {
        if (isConnected) return;

        await mongoose.connect(db_url);  // connect to DB

        isConnected = true;
        const db = mongoose.connection

        db.on("connected", () => {
            console.log("DB is connected")
        });

        db.on("error", () => {
            console.log("DB is not connected")
        });


    } catch (error) {
        console.log("error:", error)

    }


}

connect();



