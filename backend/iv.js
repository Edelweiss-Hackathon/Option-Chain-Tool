var erf = require("@stdlib/math-base-special-erf");
const { exp, sqrt, log, PI, abs } = Math;

const normal_distribution = (d) => {
  return 0.5 * (1 + erf(d / sqrt(2)));
};

const d1 = (stock_price, strike_price, interest, volatility, expiry) => {
  return (
    (log(stock_price / strike_price) +
      (interest + volatility ** 2 / 2) * expiry) /
    (volatility * sqrt(expiry))
  );
};

const d2 = (stock_price, strike_price, interest, volatility, expiry) => {
  return (
    d1(stock_price, strike_price, interest, volatility, expiry) -
    volatility * sqrt(expiry)
  );
};

const calculateImpliedVolatility = (
  option_price, //ltp
  stock_price, //underlying
  strike_price,
  interest,
  expiry
) => {
  let volatility = 0.5; // Initial guess for volatility
  const epsilon = 0.0001;
  let iterations = 0;

  while (true) {
    const price =
      stock_price *
        normal_distribution(
          d1(stock_price, strike_price, interest, volatility, expiry)
        ) -
      strike_price *
        exp(-interest * expiry) *
        normal_distribution(
          d2(stock_price, strike_price, interest, volatility, expiry)
        );

    const vega =
      (stock_price *
        sqrt(expiry) *
        exp(
          -0.5 *
            d1(stock_price, strike_price, interest, volatility, expiry) ** 2
        )) /
      sqrt(2 * PI);

    const diff = price - option_price;

    if (abs(diff) < epsilon) {
      break;
    }

    // Adjust the volatility using Newton-Raphson method
    // suggestion from stack overflow
    volatility = volatility - diff / vega;
    iterations++;

    if (iterations > 100) {
      throw new Error("Solution Not Found");
    }
  }

  return volatility;
};

const option_price = 10;
const stock_price = 100;
const strike_price = 100;
const interest = 0.5;
const days = 1;
const expiry = days / 365;

module.exports = calculateImpliedVolatility;
