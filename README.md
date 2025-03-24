# Scraper API Vote Bot

This Node.js application allows you to send multiple vote requests to the [CoinTopList](https://cointoplist.net) website using the [ScraperAPI](https://scraperapi.com). The script automates the voting process by making requests through ScraperAPI, bypassing IP restrictions.

## Features
- Sends multiple vote requests automatically.
- Uses **ScraperAPI** to bypass request limitations.
- Configurable environment variables for API key and vote target.
- ExpressJS-based REST API with a `/vote` endpoint.

---

## Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Create a `.env` File
Create a `.env` file in the project root and add the following variables:

```ini
API_KEY=your_scraperapi_key
TARGET=22037  # Replace with your coin's ID
SEND_VOTE=100  # Number of votes to send per request
PORT=9999  # Server port
```

### 4️⃣ Run the Application
```sh
node index.js
```
The server will start at:
```
🚀 Server running at http://localhost:9999
```

---

## Usage

### Send Votes
Make a **POST** request to `/vote` to send votes:
```sh
curl -X POST http://localhost:9999/vote
```

Example Response:
```json
{
  "success": true,
  "message": "100 votes sent!",
  "successCount": 95,
  "failCount": 5,
  "results": [...]
}
```

---

## How It Works
1. **ScraperAPI** is used to bypass IP restrictions.
2. The `sendVoteRequest()` function sends a vote request to `https://cointoplist.net/vote/{TARGET}`.
3. The `/vote` endpoint makes multiple concurrent requests based on the `SEND_VOTE` value.
4. The server logs the success and failure counts.

---

## Troubleshooting
- **Authentication Issues:** Ensure your ScraperAPI key is correct.
- **Request Failures:** Some requests may fail due to rate limits; try reducing `SEND_VOTE`.
- **CORS Issues:** Use a tool like Postman if your frontend has CORS restrictions.

