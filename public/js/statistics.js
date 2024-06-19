const ctx = document.getElementById('monthlyVisitsChart').getContext('2d');
const monthlyVisits = JSON.parse('<%= monthlyVisits %>');
const labels = Object.keys(monthlyVisits);
const data = Object.values(monthlyVisits);

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Monthly Visits',
      data: data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
