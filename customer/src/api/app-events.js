const customerService = require("../../src/services/customer-service");

module.exports = (app) => {
  const service = new customerService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log("======Shoppings service received the event ==========");
    return res.status(200).json(payload);
  });
};
