const shoppingService = require("../services/shopping-service");

module.exports = (app) => {
  const service = new shoppingService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log("======Shopping service received the event ==========");
    return res.status(200).json(payload);
  });
};
