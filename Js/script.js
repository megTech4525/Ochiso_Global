
// Function to update the total quantity on the product page and update the dashboard
function updateTotalQuantity() {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  let totalQuantity = products.reduce((total, product) => total + (parseInt(product.quantity) || 0), 0); // Sum of all quantities

  // Update the total in the dashboard section
  document.getElementById("allProducts").textContent = totalQuantity.toLocaleString()
    + ' ' + "BOARDS IN TOTAL STOCK";


  const LOW_STOCK_THRESHOLD = 1000;
  // Count products that have low stock
  let lowStockCount = products.filter(product => parseInt(product.quantity) < LOW_STOCK_THRESHOLD);

  // Update the low stock display on the dashboard
  let lowStockDisplay = document.getElementById("inventoryAlert");
  if (lowStockDisplay) {
      lowStockDisplay.textContent = lowStockCount.length;
  }
 
};

  // // Optionally, store the total in localStorage for persistence
  // localStorage.setItem("totalQuantity", totalQuantity);


document.addEventListener("DOMContentLoaded", () => {
  updateTotalQuantity()
});



// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [10, 8, 6, 4, 2],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ['HDF', 'Marine', 'Rongtai MDF', 'Door Skin', 'China Plywood'],
  },
  yaxis: {
    title: {
      text: 'Count',
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Purchase Orders',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Orders',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();
