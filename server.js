require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());

const API_KEY =process.env.API_KEY;
const TARGET_ID = process.env.TARGET;
const SEND_VOTE=process.env.SEND_VOTE;

async function sendVoteRequest() {
    const url = `https://api.scraperapi.com?api_key=${API_KEY}&url=https://cointoplist.net/vote/${TARGET_ID}`;

    try {
        const response = await axios.post(url, { coin_id: TARGET_ID });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

app.post("/vote", async (req, res) => {
    try {
        console.log(`${SEND_VOTE} requests for votes are being sent.`);

        const results = await Promise.all(
            Array.from({ length: SEND_VOTE }, () => sendVoteRequest())
        );

        const successCount = results.filter(r => r.success).length;
        const failCount = results.length - successCount;

        console.log(`Success request : ${successCount}`);
        console.log(`Failed request: ${failCount}`);

        res.json({
            success: true,
            message: `${SEND_VOTE} oy gönderildi!`,
            successCount,
            failCount,
            results,
        });

    } catch (error) {
        console.error("Server Err :", error.message);
        res.status(500).json({
            success: false,
            message: "Server Err!",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server work http://localhost:${PORT}`);
});
