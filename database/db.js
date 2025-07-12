const mongoose = require("mongoose");

const connect =  async () => {

    const db_url = process.env.DB_URL

    try {

        const db = mongoose.connection

        db.on("connected", () => {
            console.log("DB is connected")
        });

        db.on("error", () => {
            console.log("DB is not connected")
        });

        await mongoose.connect(db_url);

    } catch (error) {
        console.log("error:", error)

    }
}

connect();
