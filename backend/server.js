const app = require("./app");
const { connectDB } = require("./db/mongoClient");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
