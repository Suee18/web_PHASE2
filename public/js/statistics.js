document.addEventListener("DOMContentLoaded", function () {
  console.log('statistics.js loaded');

  // Daily Visits Chart
  const ctx = document.getElementById('dailyVisitsChart').getContext('2d');
  const dailyVisits = JSON.parse(document.getElementById('dailyVisitsChart').getAttribute('data-daily-visits'));

  const labels = Object.keys(dailyVisits);
  const data = Object.values(dailyVisits);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Visits',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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

  // Subscription Type Chart
  const subscriptionCtx = document.getElementById('subscriptionChart').getContext('2d');
  const subscriptionCounts = JSON.parse(document.getElementById('subscriptionChart').getAttribute('data-subscription-counts'));

  const subscriptionLabels = subscriptionCounts.map(item => item._id);
  const subscriptionData = subscriptionCounts.map(item => item.count);

  new Chart(subscriptionCtx, {
    type: 'pie',
    data: {
      labels: subscriptionLabels,
      datasets: [{
        label: 'Subscription Type Distribution',
        data: subscriptionData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
});
