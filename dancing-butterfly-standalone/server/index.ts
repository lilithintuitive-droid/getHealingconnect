import express from "express";
import path from "path";
import dancingButterflyRouter from "./router";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static("client/dist"));

// Use the router
app.use(dancingButterflyRouter);

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "client/dist" });
});

// Only listen when running directly
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dancing Butterfly server running on port ${PORT}`);
  });
}

export default app;