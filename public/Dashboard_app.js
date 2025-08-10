const DATA_POINTS = 25;

// Initialize data arrays with mid-range starting values
let soilData = Array(DATA_POINTS).fill(55);
let tempData = Array(DATA_POINTS).fill(25);
let humidData = Array(DATA_POINTS).fill(60);

// Labels (just indices)
const labels = Array(DATA_POINTS).fill('').map((_, i) => i - DATA_POINTS + 1);

// Random small-step update function
function randomUpdate(prev, min, max) {
  const delta = (Math.random() - 0.5) * 3; 
  let val = prev + delta;
  if (val < min) val = min;
  if (val > max) val = max;
  return Number(val.toFixed(1));
}

// Animate KPI numbers
function animateValue(id, start, end, duration = 1500) {
  const element = document.getElementById(id);
  if (!element) return;

  let startTimestamp = null;
  if (isNaN(start)) start = 0;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = start + (end - start) * progress;

    if (id.includes('temp')) {
      element.textContent = value.toFixed(1) + ' °C';
    } else {
      element.textContent = value.toFixed(1) + ' %';
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

// Get canvas contexts
const soilCtx = document.getElementById('soilChart').getContext('2d');
const tempCtx = document.getElementById('tempChart').getContext('2d');
const humidCtx = document.getElementById('humidChart').getContext('2d');

// Create Chart.js line charts
const soilChart = new Chart(soilCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Soil Moisture (%)',
      data: soilData,
      borderColor: 'rgba(34, 202, 236, 1)',
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  },
  options: {
    animation: { duration: 1000 },
    scales: { y: { min: 0, max: 100 } },
    plugins: { legend: { display: false } },
  }
});

const tempChart = new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperature (°C)',
      data: tempData,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  },
  options: {
    animation: { duration: 1000 },
    scales: { y: { min: 0, max: 50 } },
    plugins: { legend: { display: false } },
  }
});

const humidChart = new Chart(humidCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Humidity (%)',
      data: humidData,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  },
  options: {
    animation: { duration: 1000 },
    scales: { y: { min: 0, max: 100 } },
    plugins: { legend: { display: false } },
  }
});

// Update dashboard data and UI every 5 seconds
function updateDashboard() {
  // Update data arrays
  soilData.shift();
  soilData.push(randomUpdate(soilData[soilData.length - 1], 30, 80));
  
  tempData.shift();
  tempData.push(randomUpdate(tempData[tempData.length - 1], 15, 40));
  
  humidData.shift();
  humidData.push(randomUpdate(humidData[humidData.length - 1], 40, 90));
  
  // Update charts
  soilChart.data.datasets[0].data = soilData;
  soilChart.update();
  
  tempChart.data.datasets[0].data = tempData;
  tempChart.update();
  
  humidChart.data.datasets[0].data = humidData;
  humidChart.update();
  
  // Animate KPI values
  animateValue('soil-moisture-value', parseFloat(document.getElementById('soil-moisture-value').textContent) || 0, soilData[soilData.length - 1]);
  animateValue('temperature-value', parseFloat(document.getElementById('temperature-value').textContent) || 0, tempData[tempData.length - 1]);
  animateValue('humidity-value', parseFloat(document.getElementById('humidity-value').textContent) || 0, humidData[humidData.length - 1]);
}

// Initialize KPI values
document.getElementById('soil-moisture-value').textContent = soilData[soilData.length - 1].toFixed(1) + ' %';
document.getElementById('temperature-value').textContent = tempData[tempData.length - 1].toFixed(1) + ' °C';
document.getElementById('humidity-value').textContent = humidData[humidData.length - 1].toFixed(1) + ' %';

// Run update every 5 seconds
setInterval(updateDashboard, 5000);
updateDashboard();
