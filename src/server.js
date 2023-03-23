const app = require("./app");
const connectDb = require("./config/db");

const PORT = 8000;
app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server listen on port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
