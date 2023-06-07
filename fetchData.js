const axios = require('axios');
const Ticker = require('./ticker');

exports.fetchTickers=async()=> {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;
    console.log(response,"hello");

    // Extract the top 10 tickers
    const top10Tickers = Object.values(data).slice(0, 10);

    return top10Tickers;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    throw error;
  }
}

async function storeTickers() {
  try {
    const tickers = await fetchTickers();

    for (const ticker of tickers) {
      const { symbol, last, buy, sell, volume, base_unit } = ticker;

      await Ticker.create({
        name: symbol,
        last,
        buy,
        sell,
        volume,
        base_unit
      });
    }

    console.log('Tickers stored successfully.');
  } catch (error) {
    console.error('Error storing tickers:', error);
    throw error;
  }
}

storeTickers();
