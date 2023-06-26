<!-- Stats.vue -->
<template>
  <div>
    <h1>Statistics Page</h1>
    <Charts :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import Charts from '../components/Charts.vue'
import bitcoinService from '../services/bitcoinService'

export default {
  components: {
    Charts
  },
  data() {
    return {
      chartData: {},
      chartOptions: {}
    }
  },
  mounted() {
    this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      try {
        const rate = await bitcoinService.getRate()
        const history = await bitcoinService.getMarketPriceHistory()
        const avgBlockSize = await bitcoinService.getAvgBlockSize()

        this.chartData = {
          labels: history.values.map((entry) => entry.x),
          datasets: [
            {
              label: 'Bitcoin Price',
              data: history.values.map((entry) => entry.y),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Average Block Size',
              data: avgBlockSize.values.map((entry) => entry.y),
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 1
            }
          ]
        }

        this.chartOptions = {
          responsive: true,
          maintainAspectRatio: false
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }
  }
}
</script>
