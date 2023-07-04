const { TTM_Calc } = require("./ttm");

function calculateOptionPrice(
  spot_price,
  strike_price,
  interest,
  volatility,
  expiry,
  optionType
) {
  // As per formula
  const d1 =
    (Math.log(spot_price / strike_price) +
      (interest + volatility ** 2 / 2) * expiry) /
    (volatility * Math.sqrt(expiry));
  const d2 = d1 - volatility * Math.sqrt(expiry);

  if (optionType === "CE") {
    return Number(
      spot_price * Normal_distribution(d1) -
        strike_price * Math.exp(-interest * expiry) * Normal_distribution(d2)
    );
  } else if (optionType === "PE") {
    return Number(
      strike_price * Math.exp(-interest * expiry) * Normal_distribution(-d2) -
        spot_price * Normal_distribution(-d1)
    );
  } else {
    return 0;
  }
}

function calculateVega(spot_price, strike_price, interest, volatility, expiry) {
  const d1 =
    (Math.log(spot_price / strike_price) +
      (interest + volatility ** 2 / 2) * expiry) /
    (volatility * Math.sqrt(expiry));
  return spot_price * Math.sqrt(expiry) * Normal_distribution(d1);
}

function Normal_distribution(d) {
  // As per formula
  return 0.5 * (1 + erf(d / Math.sqrt(2)));
}

// stack overflow erf function
function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = (((a5 * t + a4) * t + a3) * t + a2) * t + a1;
  const erfValue = 1 - y * Math.exp(-x * x);

  return sign * erfValue;
}

function calculateImpliedVolatility(
  option_price,
  spot_price,
  strike_price,
  interest,
  expiry,
  optionType
) {
  let volatility = 0.5; // Initial volatility
  const epsilon = 0.0001;
  let iterations = 0;

  while (1) {
    const price = calculateOptionPrice(
      spot_price,
      strike_price,
      interest,
      volatility,
      expiry,
      optionType
    );

    // vega for sensitivity of option price to changes in volatility
    const vega = calculateVega(
      spot_price,
      strike_price,
      interest,
      volatility,
      expiry
    );

    const diff = Number(price) - Number(option_price);

    if (Math.abs(Number(diff)) < epsilon) {
      break;
    }

    // Adjust the volatility using Newton-Raphson method
    volatility = Number(volatility) - Number(diff) / Number(vega);
    iterations++;

    if (iterations > 100) {
      console.log(iterations);
      return 0;
    }
  }
  return volatility;
}

// const option_price = 57.35; // Option price (Last traded price/LTP)
// const spot_price = 19359.0; // Spot price or underlying price
// const strike_price = 19350.0; // Strike price
// const interest = 0.05; // Risk-free interest rate
// const expiryDate = "";
// const expiry = (TTM_Calc(expiryDate) / 365).toFixed(2); // Time to expiration in years
// const optionType = "CE"; // Option type ('call' or 'put')

module.exports = {
  calculateImpliedVolatility,
};
