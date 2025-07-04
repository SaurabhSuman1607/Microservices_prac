const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart({ _id }) {
    try {
      const cartItems = await this.repository.Cart(_id);
      return FormateData(cartItems);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async ManageCart(customerId, items, qty, isRemove) {
    try {
      const cartResults = await this.repository.AddToCart(
        customerId,
        items,
        qty,
        isRemove
      );
      return FormateData(cartResults);
    } catch (err) {
      throw err;
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }

  async getOrderPayload(userId, order, event) {
    if (order) {
      const payLoad = {
        event: event,
        data: { userId, order },
      };
      return FormateData(payLoad);
    } else {
      return FormateData({ error: "No order is available" });
    }
  }
}
module.exports = ShoppingService;
