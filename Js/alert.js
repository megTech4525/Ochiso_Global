const INVENTORY_ALERT_THRESHOLD = 1000; // Define inventory alert threshold

// Function to render product data and track inventory alerts
function renderProductDatas() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    const alertchinaProducts = document.getElementById("alert-chinaProducts");
    const alertrongtaiProducts = document.getElementById("alert-rongtaiProducts");

    // Check if the table elements exist before modifying them
    if (!alertchinaProducts || !alertrongtaiProducts) {
        console.error("Missing table elements! Ensure alert-chinaProducts and alert-rongtaiProducts exist.");
        return;
    }

    alertchinaProducts.innerHTML = ""; // Clear existing rows
    alertrongtaiProducts.innerHTML = ""; // Clear existing rows

    let chinaIndex = 1, rongtaiIndex = 1;

    if (products.length === 0) {
        alertchinaProducts.innerHTML = '<tr><td colspan="7" style="text-align:center;">NO DATA ENTERED</td></tr>';
        alertrongtaiProducts.innerHTML = '<tr><td colspan="7" style="text-align:center;">NO DATA ENTERED</td></tr>';
        return;
    }

    products.forEach((product) => {
        let statusColor = parseInt(product.quantity) < INVENTORY_ALERT_THRESHOLD ? "orange" : "green";
        let stockStatus = parseInt(product.quantity) < INVENTORY_ALERT_THRESHOLD ? "LOW STOCK" : "IN STOCK";

        let addRows = document.createElement("tr");
        addRows.innerHTML = `
            <td>${product.specification.toUpperCase() === "CHINA IMPORTED" ? chinaIndex++ : rongtaiIndex++}</td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.thickness}</td>
            <td>${product.color}</td>
            <td>${product.quantity}</td>
            <td style="color: ${statusColor}; font-weight: bold;">${stockStatus}</td>
        `;

        if (product.specification.toUpperCase() === "CHINA IMPORTED") {
            alertchinaProducts.appendChild(addRows);
        } else if (product.specification.toUpperCase() === "RONGTAI") {
            alertrongtaiProducts.appendChild(addRows);
        }
    });
}

// Load product data on page load
document.addEventListener("DOMContentLoaded", () => {
    renderProductDatas();
});

