<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { bitcoinService } from '../services/bitcoinService'

export default {
  extends: Line,
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      try {
        // Fetch data from bitcoinService
        this.chartData = await bitcoinService.getChartData()

        // Render the chart
        this.renderChart(this.chartData, this.chartOptions)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }
  }
}
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
