const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
console.log(API_KEY)

export async function fetchCandles(symbol, resolution = "D", from, to) {
  // Convert symbol format: EUR/USD → OANDA:EUR_USD
  const apiSymbol = `OANDA:${symbol.replace("/", "_")}`;

  const url = `https://finnhub.io/api/v1/forex/candle?symbol=${apiSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log("Using API key:", API_KEY);


  if (data.s !== "ok") {
    throw new Error("Failed to fetch data");
  }

  return data; // {c, h, l, o, s, t, v}
}
