require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbUrl);
    console.log("CONNECTED TO ATLAS ✅");
}

main().catch(err => console.log(err));

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        const result = await Listing.insertMany(initData.data);
        console.log("Inserted:", result.length);
    } catch (err) {
        console.log("ERROR:", err);
    } finally {
        mongoose.connection.close();
    }
};

initDB();
