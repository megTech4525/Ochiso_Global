document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stock-out-china-btn").addEventListener("click", (event) => {
      event.preventDefault();
    stockOutProduct("CHINA IMPORTED");
    
  });

  document.getElementById("stock-out-rongtai-btn").addEventListener("click", (event) => {
      event.preventDefault();
      stockOutProduct("RONGTAI");
  });

  renderStockOutTable("CHINA IMPORTED");
  renderStockOutTable("RONGTAI");
});

// Function to stock out a product
function stockOutProduct(specification) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Get input values
  let productName = document.getElementById(specification === "CHINA IMPORTED" ? "stock-out-product" : "Rongtai-stock-out-product").value.trim();
  let category = document.getElementById(specification === "CHINA IMPORTED" ? "stock-out-categories" : "Rongtai-stock-out-categories").value.trim();
  let color = document.getElementById(specification === "CHINA IMPORTED" ? "stock-out-color" : "Rongtai-stock-out-color").value.trim();
  let thickness = document.getElementById(specification === "CHINA IMPORTED" ? "stock-out-thickness" : "Rongtai-stock-out-thickness").value.trim();
  let quantitySold = parseInt(document.getElementById(specification === "CHINA IMPORTED" ? "stock-out-quantity" : "Rongtai-stock-out-quantity").value.trim());

  if (!productName || !category || !color || !thickness || isNaN(quantitySold) || quantitySold <= 0) {
      alert("Please enter valid product details!");
      return;
  }
// 🔤 Sort products alphabetically by productName
products.sort((a, b) => a.productName.localeCompare(b.productName));

  // Find the product in the inventory
  let productIndex = products.findIndex(p =>
      p.productName === productName &&
      p.category === category &&
      p.color === color &&
      p.thickness === thickness &&
      p.specification === specification
  );

  if (productIndex === -1) {
      alert("Product not found in inventory!");
      return;
  }

  // Deduct quantity
  if (products[productIndex].quantity < quantitySold) {
      alert("Not enough stock available!");
      return;
  }

  products[productIndex].quantity -= quantitySold;

  // Remove the product if the quantity becomes zero
  if (products[productIndex].quantity === 0) {
      products.splice(productIndex, 1);
  }

  localStorage.setItem("products", JSON.stringify(products));
   // Get current date
   let stockOutDate = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY


  // Update Stock Out Table
  let stockOutRecords = JSON.parse(localStorage.getItem("stockOutRecords")) || [];
  stockOutRecords.push({
      productName,
      category,
      color,
      thickness,
      quantitySold,
    specification,
      stockOutDate
  });

  localStorage.setItem("stockOutRecords", JSON.stringify(stockOutRecords));

  // Show success alert
  alert(`✅ ${quantitySold} ${productName}(s) have been successfully stocked out from ${specification}!`);

  // Clear form fields
  document.getElementById(specification === "CHINA IMPORTED" ? "stockOutForm1" : "stockOutForm").reset();


  // Update UI
  renderStockOutTable(specification);
  updateInventoryAlert();
}

// Function to render Stock Out table
function renderStockOutTable(specification) {
  let stockOutRecords = JSON.parse(localStorage.getItem("stockOutRecords")) || [];
  let tableBody = document.getElementById(specification === "CHINA IMPORTED" ? "stock-out-chinaProducts" : "stock-out-rongtaiProducts");
  
  tableBody.innerHTML = "";

  let filteredRecords = stockOutRecords.filter(record => record.specification === specification);

  if (filteredRecords.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">NO DATA ENTERED</td></tr>';
      return;
  }

  filteredRecords.forEach((record, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${record.productName}</td>
          <td>${record.category}</td>
          <td>${record.thickness}</td>
          <td>${record.color}</td>
          <td>${record.quantitySold}</td>
          <td>${record.stockOutDate}</td>
      `;
      tableBody.appendChild(row);
  });
}

// Function to update inventory alerts
function updateInventoryAlert() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const LOW_STOCK_THRESHOLD = 1000;

  let lowStockCount = products.filter(product => product.quantity < LOW_STOCK_THRESHOLD).length;
  document.getElementById("inventoryAlert").textContent = lowStockCount;
}





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
// Drop Down Links
function toggleSubMenu(button) {
  // Find the parent list item to get the sub-menu
  const subMenu = button.nextElementSibling;

  // Toggle the visibility of the sub-menu
  if (subMenu.style.display === 'none' || subMenu.style.display === '') {
    subMenu.style.display = 'block';  // Show the menu
  } else {
    subMenu.style.display = 'none';   // Hide the menu
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
