document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".ok-btn");
  if (addBtn) {
      addBtn.addEventListener("click", addProduct);
  }
  displayProducts();
});

function addProduct() {
  // Get values from the form
  const specification = document.getElementById("specification").value;
  const productName = document.getElementById("product-name").value;
  const category = document.getElementById("categories").value;
  const thickness = document.getElementById("thickness").value;
  const color = document.getElementById("colors").value;
  const quantity = parseInt(document.getElementById("product-quantity").value, 10); // Convert to number
  const costPrice = document.getElementById("cost-price").value;
  const sellingPrice = document.getElementById("selling-price").value;


  

  // Validation: Ensure all fields are filled
  if (!specification || !productName || !category || !thickness || !color || isNaN(quantity) || !costPrice || !sellingPrice) {
      alert("Please fill all fields before adding the product.");
      return;
  }

  // Determine stock status
  let stockStatus = "Available"; // Default
  if (quantity === 0) {
      stockStatus = "Out of Stock";
  } else if (quantity < 1000) {
      stockStatus = "Low Stock";
  }

  // Create product object
  const product = { specification, productName, category, thickness, color, quantity, costPrice, sellingPrice, stockStatus };

  // Retrieve existing products from localStorage or initialize an empty array
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  // Refresh displayed products
  displayProducts();
}

function displayProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const chinatablebody = document.getElementById("chinaProducts");
  const rongtaitablebody = document.getElementById("rongtaiProducts");

  // Clear current content
  chinatablebody.innerHTML = "";
  rongtaitablebody.innerHTML = "";

  if (products.length === 0) {
      chinatablebody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>NO DATA ENTERED</td></tr>";
      rongtaitablebody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>NO DATA ENTERED</td></tr>";
      return;
  }

  // 🔤 Sort products alphabetically by productName
  products.sort((a, b) => a.productName.localeCompare(b.productName));

  // Separate index counters for China and Rongtai sections
  let chinaIndex = 1;
  let rongtaiIndex = 1;

  // Loop through each product and add it to the respective section
  products.forEach((product) => {
      const row = document.createElement("tr");

      // Apply color styling for stock status
      let statusColor = "green"; // Default: Available
      if (product.stockStatus === "Low Stock") statusColor = "orange";
      if (product.stockStatus === "Out of Stock") statusColor = "red";

      row.innerHTML = `
          <td>${product.specification === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
          <td>${product.productName}</td>
          <td>${product.category}</td>
          <td>${product.thickness}</td>
          <td>${product.color}</td>
          <td>${product.quantity}</td>
          <td style="color: ${statusColor}; font-weight: bold;">${product.stockStatus}</td>
          
      `;

      if (product.specification === "CHINA IMPORTED") {
          chinatablebody.appendChild(row);
      } else if (product.specification === "RONGTAI") {
          rongtaitablebody.appendChild(row);
      }
  });
}



//UPDATING PRODUCT IN THE PRODUCT PAGE

const updatebtn = document.getElementById('update-btn');
updatebtn.addEventListener('click', () => {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Get values from the update form
  const updatedSpecification = document.getElementById("Uspecification").value;
  const updatedProductName = document.getElementById("Uproduct-name").value.trim();
  const updatedCategory = document.getElementById("Ucategories").value.trim();
  const updatedColor = document.getElementById("Ucolors").value.trim();
  const updatedQuantity = parseInt(document.getElementById("Uproduct-quantity").value);
  const updatedCostPrice = parseFloat(document.getElementById("Ucost-price").value);
  const updatedSellingPrice = parseFloat(document.getElementById("Uselling-price").value);

  // Ensure required fields are entered
  if (!updatedProductName || !updatedCategory || !updatedColor) {
    alert("Please enter Product Name, Category, and Color to update.");
    return;
  }

  // Determine stock status based on updated quantity
  let stockStatus = "Available";
  if (updatedQuantity === 0) {
    stockStatus = "Out of Stock";
  } else if (updatedQuantity < 1000) {
    stockStatus = "Low Stock";
  }

  // Find the product using Specification + Name + Category + Color
  let productFound = false;
  products = products.map(product => {
    if (
      product.specification === updatedSpecification &&
      product.productName.toLowerCase() === updatedProductName.toLowerCase() &&
      product.category.toLowerCase() === updatedCategory.toLowerCase() &&
      product.color.toLowerCase() === updatedColor.toLowerCase()
    ) {
      productFound = true;
      // Ensure the updated specification and other details are saved
      return {
        ...product,
        specification: updatedSpecification, // Update specification if necessary
        quantity: updatedQuantity,
        costPrice: updatedCostPrice,
        sellingPrice: updatedSellingPrice,
        stockStatus: stockStatus, // Update stock status based on quantity
        updatedSpecification: updatedSpecification // Optional: Save updated specification separately if needed
      };
    }
    return product;
  });

  if (!productFound) {
    alert(`No matching product found under ${updatedSpecification}!`);
    return;
  }

  // Save updated product list back to localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Refresh the displayed products (this is where the updated data is shown on the page)
  displayProducts(); // Make sure this function properly renders the updated data

  // Close the update popup (if you have one)
  updateProductClose();

  alert("Product updated successfully!");
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

