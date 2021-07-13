const postRoutes = require("./src/posts/routes/postRoutes");
const authRoutes = require("./src/users/routes/authRoutes");

module.exports = (app) => {
  // module routes
  app.use("/posts", postRoutes);
  app.use("/auth", authRoutes);

  //Default routes
  // Welcome message
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to bizzbuzz",
    });
  });

  // Default 404 error response
  app.use((req, res) => {
    res.status(404).json({ message: `Invalid endpoint: '${req.url}'` });
  });
};
