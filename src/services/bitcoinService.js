import axios from 'axios'

export const bitcoinService = {
  getRate,
  getMarketPriceHistory,
  getAvgBlockSize
}

async function getRate() {
  let rate
  try {
    // Check if the rate is already stored in local storage
    const storedRate = localStorage.getItem('bitcoinRate')
    if (storedRate) {
      rate = JSON.parse(storedRate)
    } else {
      // Make an HTTP GET request to fetch the current Bitcoin rate
      const response = await axios.get('https://blockchain.info/ticker')
      rate = response.data.USD.last
      // Save the rate to local storage
      localStorage.setItem('bitcoinRate', JSON.stringify(rate))
    }
    return rate
  } catch (error) {
    console.error('Error fetching Bitcoin rate:', error)
    throw error
  }
}

async function getMarketPriceHistory() {
  let history
  try {
    // Check if the market price history is already stored in local storage
    const storedHistory = localStorage.getItem('bitcoinMarketPriceHistory')
    if (storedHistory) {
      history = JSON.parse(storedHistory)
    } else {
      // Make an HTTP GET request to fetch the market price history of Bitcoin
      const response = await axios.get(
        'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
      )
      history = response.data
      // Save the market price history to local storage
      localStorage.setItem('bitcoinMarketPriceHistory', JSON.stringify(history))
    }
    return history
  } catch (error) {
    console.error('Error fetching Bitcoin market price history:', error)
    throw error
  }
}

async function getAvgBlockSize() {
  let avgBlockSize
  try {
    // Check if the average block size is already stored in local storage
    const storedAvgBlockSize = localStorage.getItem('bitcoinAvgBlockSize')
    if (storedAvgBlockSize) {
      avgBlockSize = JSON.parse(storedAvgBlockSize)
    } else {
      // Make an HTTP GET request to fetch the average block size of the Bitcoin blockchain
      const response = await axios.get(
        'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'
      )
      avgBlockSize = response.data
      // Save the average block size to local storage
      localStorage.setItem('bitcoinAvgBlockSize', JSON.stringify(avgBlockSize))
    }
    return avgBlockSize
  } catch (error) {
    console.error('Error fetching average block size:', error)
    throw error
  }
}

export default bitcoinService
