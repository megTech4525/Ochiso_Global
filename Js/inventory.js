document.addEventListener("DOMContentLoaded", () => {
  renderInventoryTable();

  document.querySelector(".searchBar").addEventListener("input", handleSearch);
  document.getElementById("date").addEventListener("change", filterByDate);
});

function renderInventoryTable() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  console.log(products); // Check if you can see the products and updatedSpecification in the console

  const chinaTable = document.getElementById("inventory-chinaProducts");
  const rongtaiTable = document.getElementById("inventory-rongtaiProducts");
  chinaTable.innerHTML = "";
  rongtaiTable.innerHTML = "";

  let chinaIndex = 1;
  let rongtaiIndex = 1;

  if (products.length === 0) {
    chinaTable.innerHTML = '<tr><td colspan="10" style="text-align:center;">NO DATA ENTERED</td></tr>';
    rongtaiTable.innerHTML = '<tr><td colspan="10" style="text-align:center;">NO DATA ENTERED</td></tr>';
    return;
  }

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    // Check if the product has been updated and set the stock status to "RE-STOCKED" if updated
    const stockStatus = product.updated || product.updatedSpecification ? "RE-STOCKED" : "NEW STOCK";
    const date = product.date || new Date().toISOString().split("T")[0];

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.productName}</td>
      <td>${product.category}</td>
      <td>${product.thickness}</td>
      <td>${product.color}</td>
      <td>${product.quantity}</td>
      <td>${product.costPrice ? `₦${product.costPrice}` : '-'}</td>
      <td>${product.sellingPrice ? `₦${product.sellingPrice}` : '-'}</td>
      <td>${stockStatus}</td>
      <td class="date-cell">${date}</td>
    `;

    // Check for the specification type and append to the correct table
    if (product.specification === "CHINA IMPORTED" || product.updatedSpecification === "CHINA IMPORTED") {
      row.innerHTML = `
        <td>${chinaIndex++}</td>
        <td>${product.productName}</td>
        <td>${product.category}</td>
        <td>${product.thickness}</td>
        <td>${product.color}</td>
        <td>${product.quantity}</td>
        <td>${product.costPrice ? `₦${product.costPrice}` : '-'}</td>
        <td>${product.sellingPrice ? `₦${product.sellingPrice}` : '-'}</td>
        <td>${stockStatus}</td>
        <td class="date-cell">${date}</td>
      `;
      chinaTable.appendChild(row);
    } else if (product.specification === "RONGTAI" || product.updatedSpecification === "RONGTAI") {
      row.innerHTML = `
        <td>${rongtaiIndex++}</td>
        <td>${product.productName}</td>
        <td>${product.category}</td>
        <td>${product.thickness}</td>
        <td>${product.color}</td>
        <td>${product.quantity}</td>
        <td>${product.costPrice ? `₦${product.costPrice}` : '-'}</td>
        <td>${product.sellingPrice ? `₦${product.sellingPrice}` : '-'}</td>
        <td>${stockStatus}</td>
        <td class="date-cell">${date}</td>
      `;
      rongtaiTable.appendChild(row);
    }
  });
}

// INVENTORY SEARCH BUTTON

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const allRows = document.querySelectorAll("#inventory-chinaProducts tr, #inventory-rongtaiProducts tr");

  allRows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "" : "none";
  });
}


//INVENTORY CALENDER DATE

function filterByDate(e) {
  const selectedDate = e.target.value;
  const allRows = document.querySelectorAll("#inventory-chinaProducts tr, #inventory-rongtaiProducts tr");

  allRows.forEach(row => {
      const dateCell = row.querySelector(".date-cell");
      if (dateCell) {
          const rowDate = dateCell.textContent.trim();
          row.style.display = rowDate === selectedDate ? "" : "none";
      }
  });
}























// document.addEventListener("DOMContentLoaded", () => {
//   renderInventoryTable();

//   document.querySelector(".searchBar").addEventListener("input", handleSearch);
//   document.getElementById("date").addEventListener("change", filterByDate);
// });

// function renderInventoryTable() {
//   const products = JSON.parse(localStorage.getItem("products")) || [];

//   const chinaTable = document.getElementById("inventory-chinaProducts");
//   const rongtaiTable = document.getElementById("inventory-rongtaiProducts");
//   chinaTable.innerHTML = "";
//   rongtaiTable.innerHTML = "";

//   let chinaIndex = 1;
//   let rongtaiIndex = 1;

//   if (products.length === 0) {
//       chinaTable.innerHTML = '<tr><td colspan="10" style="text-align:center;">NO DATA ENTERED</td></tr>';
//       rongtaiTable.innerHTML = '<tr><td colspan="10" style="text-align:center;">NO DATA ENTERED</td></tr>';
//       return;
//   }

//   products.forEach(product => {
//       const row = document.createElement("tr");

//       const stockStatus = product.updated ? "RE-STOCKED" : "NEW STOCK";
//       const date = product.date || new Date().toISOString().split("T")[0];

//       row.innerHTML = `
//           <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
//           <td>${product.productName}</td>
//           <td>${product.category}</td>
//           <td>${product.thickness}</td>
//           <td>${product.color}</td>
//           <td>${product.quantity}</td>
//           <td>${product.costPrice || '-'}</td>
//           <td>${product.sellingPrice || '-'}</td>
//           <td>${stockStatus}</td>
//           <td class="date-cell">${date}</td>
//       `;

//       if (product.specification === "CHINA IMPORTED") {
//           chinaTable.appendChild(row);
//       } else if (product.specification === "RONGTAI") {
//           rongtaiTable.appendChild(row);
//       }
//   });
// }

// function handleSearch(e) {
//   const searchTerm = e.target.value.toLowerCase();
//   const allRows = document.querySelectorAll("#inventory-chinaProducts tr, #inventory-rongtaiProducts tr");

//   allRows.forEach(row => {
//       const text = row.innerText.toLowerCase();
//       row.style.display = text.includes(searchTerm) ? "" : "none";
//   });
// }

// function filterByDate(e) {
//   const selectedDate = e.target.value;
//   const allRows = document.querySelectorAll("#inventory-chinaProducts tr, #inventory-rongtaiProducts tr");

//   allRows.forEach(row => {
//       const dateCell = row.querySelector(".date-cell");
//       if (dateCell) {
//           const rowDate = dateCell.textContent.trim();
//           row.style.display = rowDate === selectedDate ? "" : "none";
//       }
//   });
// }































// // Function to add or update product in inventory
// function addOrUpdateProduct(product) {
//   let products = JSON.parse(localStorage.getItem("products")) || [];

//   let existingProduct = products.find(p => 
//       p.productName === product.productName &&
//       p.category === product.category &&
//       p.thickness === product.thickness &&
//       p.color === product.color &&
//       p.specification === product.specification
//   );

//   let date = new Date().toISOString().split('T')[0]; // Get today's date

//   if (existingProduct) {
//       existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(product.quantity);
//       existingProduct.status = "Restocked";
//       existingProduct.date = date;
//   } else {
//       product.status = "New Stock";
//       product.date = date;
//       products.push(product);
//   }

//   localStorage.setItem("products", JSON.stringify(products));
//   renderInventoryTable();
// }

// // Function to render inventory table
// function renderInventoryTable() {
//   let products = JSON.parse(localStorage.getItem("products")) || [];
//   let chinaTable = document.getElementById("inventory-chinaProducts");
//   let rongtaiTable = document.getElementById("inventory-rongtaiProducts");

//   chinaTable.innerHTML = "";
//   rongtaiTable.innerHTML = "";

//   let chinaIndex = 1, rongtaiIndex = 1;

//   products.forEach((product) => {
//     let row = `<tr>
//           <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
//           <td>${product.productName}</td>
//           <td>${product.category}</td>
//           <td>${product.thickness}</td>
//           <td>${product.color}</td>
//           <td>${product.quantity}</td>
//           <td>${product.costPrice}</td>
//           <td>${product.sellingPrice}</td>
//           <td style="color: ${product.status === 'New Stock' ? 'green' : 'blue'}; font-weight: bold;">${product.status}</td>
//           <td>${product.date}</td>
//       </tr>`;

//     if (product.specification === "CHINA IMPORTED") {
//         chinaTable.innerHTML += row;
//     } else {
//         rongtaiTable.innerHTML += row;
//     }
//   });
// }

// // Function to filter products by date
// function filterByDate() {
//   let selectedDate = document.getElementById("date").value;
//   if (!selectedDate) return;

//   let products = JSON.parse(localStorage.getItem("products")) || [];
//   let filteredProducts = products.filter(p => p.date === selectedDate);

//   renderFilteredTable(filteredProducts);
// }

// // Function to search for products
// function searchProducts() {
//   let query = document.querySelector(".searchBar").value.toLowerCase();
//   let products = JSON.parse(localStorage.getItem("products")) || [];

//   let filteredProducts = products.filter(p => 
//       p.productName.toLowerCase().includes(query) ||
//       p.category.toLowerCase().includes(query) ||
//       p.color.toLowerCase().includes(query) ||
//       p.status.toLowerCase().includes(query)
//   );

//   renderFilteredTable(filteredProducts);
// }

// // Function to render filtered inventory table
// function renderFilteredTable(products) {
//   let chinaTable = document.getElementById("alert-chinaProducts");
//   let rongtaiTable = document.getElementById("alert-rongtaiProducts");

//   chinaTable.innerHTML = "";
//   rongtaiTable.innerHTML = "";

//   let chinaIndex = 1, rongtaiIndex = 1;

//   products.forEach((product) => {
//     let row = `<tr>
//           <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
//           <td>${product.productName}</td>
//           <td>${product.category}</td>
//           <td>${product.thickness}</td>
//           <td>${product.color}</td>
//           <td>${product.quantity}</td>
//           <td>${product.costPrice}</td>
//           <td>${product.sellingPrice}</td>
//           <td style="color: ${product.status === 'New Stock' ? 'green' : 'blue'}; font-weight: bold;">${product.status}</td>
//           <td>${product.date}</td>
//       </tr>`;

//     if (product.specification === "CHINA IMPORTED") {
//         chinaTable.innerHTML += row;
//     } else {
//         rongtaiTable.innerHTML += row;
//     }
//   });
// }

// // Event Listeners
// document.getElementById("date").addEventListener("change", filterByDate);
// document.querySelector(".searchBar").addEventListener("input", searchProducts);

// // Load Inventory on Page Load
// document.addEventListener("DOMContentLoaded", renderInventoryTable);




















// // Function to add or update product in inventory
// function addOrUpdateProduct(product) {
//   let products = JSON.parse(localStorage.getItem("products")) || [];
//   let existingProduct = products.find(p => 
//       p.productName === product.productName &&
//       p.category === product.category &&
//       p.thickness === product.thickness &&
//       p.color === product.color
//   );
  
//   let date = new Date().toISOString().split('T')[0]; // Get today's date
  
//   if (existingProduct) {
//       existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(product.quantity);
//       existingProduct.status = "Restocked";
//       existingProduct.date = date;
//   } else {
//       product.status = "New Stock";
//       product.date = date;
//       products.push(product);
//   }
  
//   localStorage.setItem("products", JSON.stringify(products));
//   renderInventoryTable();
// }

// // Function to render inventory table
// function renderInventoryTable() {
//   let products = JSON.parse(localStorage.getItem("products")) || [];
//   let chinaTable = document.getElementById("inventory-chinaProducts");
//   let rongtaiTable = document.getElementById("inventory-rongtaiProducts");
  
//   chinaTable.innerHTML = "";
//   rongtaiTable.innerHTML = "";
  
//   let chinaIndex = 1, rongtaiIndex = 1;
  
//   products.forEach((product) => {
//     let row = `<tr>
//           <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
//           <td>${product.productName}</td>
//           <td>${product.category}</td>
//           <td>${product.thickness}</td>
//           <td>${product.color}</td>
//           <td>${product.quantity}</td>
//           <td>${product.costPrice}</td>
//           <td>${product.sellingPrice}</td>
//           <td>${product.status}</td>
//           <td>${product.date}</td>
//       </tr>`;
      
//       if (product.specification === "CHINA IMPORTED") {
//           chinaTable.innerHTML += row;
//       } else {
//           rongtaiTable.innerHTML += row;
//       }
//   });
// }

// // Function to filter products by date
// function filterByDate() {
//   let selectedDate = document.getElementById("date").value;
//   if (!selectedDate) return;
  
//   let products = JSON.parse(localStorage.getItem("products")) || [];
//   let filteredProducts = products.filter(p => p.date === selectedDate);
  
//   renderFilteredTable(filteredProducts);
// }

// // Function to search for products
// function searchProducts() {
//   let query = document.querySelector(".searchBar").value.toLowerCase();
//   let products = JSON.parse(localStorage.getItem("products")) || [];
//   let filteredProducts = products.filter(p => 
//       p.productName.toLowerCase().includes(query) ||
//       p.category.toLowerCase().includes(query) ||
//       p.color.toLowerCase().includes(query) ||
//       p.status.toLowerCase().includes(query)
//   );
  
//   renderFilteredTable(filteredProducts);
// }

// // Function to render filtered inventory table
// function renderFilteredTable(products) {
//   let chinaTable = document.getElementById("alert-chinaProducts");
//   let rongtaiTable = document.getElementById("alert-rongtaiProducts");
  
//   chinaTable.innerHTML = "";
//   rongtaiTable.innerHTML = "";
  
//   let chinaIndex = 1, rongtaiIndex = 1;
  
//   products.forEach((product) => {
//       let row = `<tr>
//           <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
//           <td>${product.productName}</td>
//           <td>${product.category}</td>
//           <td>${product.thickness}</td>
//           <td>${product.color}</td>
//           <td>${product.quantity}</td>
//           <td>${product.costPrice}</td>
//           <td>${product.sellingPrice}</td>
//           <td>${product.status}</td>
//           <td>${product.date}</td>
//       </tr>`;
      
//       if (product.specification === "CHINA IMPORTED") {
//           chinaTable.innerHTML += row;
//       } else {
//           rongtaiTable.innerHTML += row;
//       }
//   });
// }

// // Event Listeners
// document.getElementById("date").addEventListener("change", filterByDate);
// document.querySelector(".searchBar").addEventListener("input", searchProducts);

// // Load Inventory on Page Load
// document.addEventListener("DOMContentLoaded", renderInventoryTable);





      




// document.addEventListener("DOMContentLoaded", displayInventory);

        // function displayInventory() {
        //     const products = JSON.parse(localStorage.getItem("products")) || [];

        //     const chinaInventory = document.getElementById("chinaInventory");
        //     const rongtaiInventory = document.getElementById("rongtaiInventory");

        //     chinaInventory.innerHTML = "";
        //     rongtaiInventory.innerHTML = "";

        //     if (products.length === 0) {
        //         chinaInventory.innerHTML = "<tr><td colspan='9' style='text-align:center;'>No Data Entered</td></tr>";
        //         rongtaiInventory.innerHTML = "<tr><td colspan='9' style='text-align:center;'>No Data Entered</td></tr>";
        //         return;
        //     }

        //     let chinaIndex = 1;
        //     let rongtaiIndex = 1;

        //     products.forEach((product) => {
        //         const row = document.createElement("tr");

        //         let statusColor = "green";
        //         if (product.stockStatus === "Low Stock") statusColor = "orange";
        //         if (product.stockStatus === "Out of Stock") statusColor = "red";

        //         row.innerHTML = `
        //             <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
        //             <td>${product.productName}</td>
        //             <td>${product.category}</td>
        //             <td>${product.thickness}</td>
        //             <td>${product.color}</td>
        //             <td>${product.quantity}</td>
        //             <td style="color: ${statusColor}; font-weight: bold;">${product.stockStatus}</td>
        //         `;

        //         if (product.specification === "CHINA IMPORTED") {
        //             chinaInventory.appendChild(row);
        //         } else if (product.specification === "RONGTAI") {
        //             rongtaiInventory.appendChild(row);
        //         }
        //     });
        // }
    

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
