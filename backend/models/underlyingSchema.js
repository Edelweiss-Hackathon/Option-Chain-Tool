const mongoose = require("mongoose");
const underlyingSchema = new mongoose.Schema({
  symbolName: {
    type: String,
  },
  lastTradedPrice: {
    type: mongoose.Types.Decimal128,
  },
  timestamp: {
    type: String,
  },
  prevClosePrice: {
    type: mongoose.Types.Decimal128,
  },
});

const UnderlyingPrice = mongoose.model("UnderlyingPrice", underlyingSchema);
module.exports = UnderlyingPrice;
